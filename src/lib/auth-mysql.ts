import { mysql_client, executeQuery } from './mysql';
import type { AdminUser } from './mysql';
import bcrypt from 'bcryptjs';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class MySQLAuthService {
  private static instance: MySQLAuthService;
  private authState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true
  };
  private listeners: ((state: AuthState) => void)[] = [];

  static getInstance(): MySQLAuthService {
    if (!MySQLAuthService.instance) {
      MySQLAuthService.instance = new MySQLAuthService();
    }
    return MySQLAuthService.instance;
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.authState));
  }

  private updateState(updates: Partial<AuthState>) {
    this.authState = { ...this.authState, ...updates };
    this.notify();
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> {
    try {
      // Get user by email with role information
      const query = `
        SELECT 
          au.*,
          ur.name as role_name,
          ur.permissions as role_permissions
        FROM admin_users au
        LEFT JOIN user_roles ur ON au.role_id = ur.id
        WHERE au.email = ? AND au.is_active = 1
      `;
      
      const results = await executeQuery(query, [credentials.email]) as any[];
      
      if (!results || results.length === 0) {
        return { success: false, error: 'Invalid credentials' };
      }

      const user = results[0];
      
      // Verify password
      const isValidPassword = await this.verifyPassword(credentials.password, user.password_hash);
      
      if (!isValidPassword) {
        return { success: false, error: 'Invalid credentials' };
      }

      // Update last login
      await executeQuery(
        'UPDATE admin_users SET last_login = NOW() WHERE id = ?',
        [user.id]
      );

      // Create session token
      const token = this.generateToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour session

      await executeQuery(
        'INSERT INTO user_sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
        [user.id, token, expiresAt]
      );

      // Store token in localStorage
      localStorage.setItem('admin_token', token);

      // Format user object
      const formattedUser: AdminUser = {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role_id: user.role_id,
        is_active: user.is_active,
        last_login: user.last_login,
        created_at: user.created_at,
        role: {
          id: user.role_id,
          name: user.role_name,
          permissions: JSON.parse(user.role_permissions || '{}')
        }
      };

      this.updateState({
        user: formattedUser,
        isAuthenticated: true,
        isLoading: false
      });

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  }

  async logout() {
    const token = localStorage.getItem('admin_token');
    if (token) {
      // Remove session from database
      await executeQuery('DELETE FROM user_sessions WHERE token = ?', [token]);
    }

    localStorage.removeItem('admin_token');
    this.updateState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  }

  async checkAuth(): Promise<void> {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      this.updateState({ isLoading: false });
      return;
    }

    try {
      // Verify session
      const query = `
        SELECT 
          us.*,
          au.*,
          ur.name as role_name,
          ur.permissions as role_permissions
        FROM user_sessions us
        JOIN admin_users au ON us.user_id = au.id
        LEFT JOIN user_roles ur ON au.role_id = ur.id
        WHERE us.token = ? AND us.expires_at > NOW()
      `;

      const results = await executeQuery(query, [token]) as any[];

      if (!results || results.length === 0) {
        localStorage.removeItem('admin_token');
        this.updateState({ isLoading: false });
        return;
      }

      const session = results[0];

      const formattedUser: AdminUser = {
        id: session.user_id,
        email: session.email,
        full_name: session.full_name,
        role_id: session.role_id,
        is_active: session.is_active,
        last_login: session.last_login,
        created_at: session.created_at,
        role: {
          id: session.role_id,
          name: session.role_name,
          permissions: JSON.parse(session.role_permissions || '{}')
        }
      };

      this.updateState({
        user: formattedUser,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('admin_token');
      this.updateState({ isLoading: false });
    }
  }

  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    // For demo purposes, we'll use simple comparison first
    // In production, use bcrypt
    if (password === 'admin123' && hash === 'admin123') {
      return true;
    }
    
    try {
      return await bcrypt.compare(password, hash);
    } catch {
      return password === hash; // Fallback for plain text passwords
    }
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  getAuthState(): AuthState {
    return this.authState;
  }

  hasPermission(permission: string): boolean {
    if (!this.authState.user?.role) return false;
    
    const permissions = this.authState.user.role.permissions;
    
    // Super admin has all permissions
    if (permissions.all) return true;
    
    // Check specific permission
    const [resource, action] = permission.split('.');
    return permissions[resource]?.[action] === true;
  }
}

export const mysqlAuthService = MySQLAuthService.getInstance();