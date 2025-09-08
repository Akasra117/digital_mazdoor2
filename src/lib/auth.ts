import { supabase } from './supabase';
import type { AdminUser } from './supabase';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class AuthService {
  private static instance: AuthService;
  private authState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true
  };
  private listeners: ((state: AuthState) => void)[] = [];

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
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
      // First, get user by email
      const { data: users, error: userError } = await supabase
        .from('admin_users')
        .select(`
          *,
          role:user_roles(*)
        `)
        .eq('email', credentials.email)
        .eq('is_active', true)
        .single();

      if (userError || !users) {
        return { success: false, error: 'Invalid credentials' };
      }

      // For demo purposes, we'll use a simple password check
      // In production, you should use proper password hashing
      const isValidPassword = await this.verifyPassword(credentials.password, users.password_hash);
      
      if (!isValidPassword) {
        return { success: false, error: 'Invalid credentials' };
      }

      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', users.id);

      // Create session token
      const token = this.generateToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour session

      await supabase
        .from('user_sessions')
        .insert({
          user_id: users.id,
          token,
          expires_at: expiresAt.toISOString()
        });

      // Store token in localStorage
      localStorage.setItem('admin_token', token);

      this.updateState({
        user: users,
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
      await supabase
        .from('user_sessions')
        .delete()
        .eq('token', token);
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
      const { data: session, error } = await supabase
        .from('user_sessions')
        .select(`
          *,
          admin_users!inner(
            *,
            role:user_roles(*)
          )
        `)
        .eq('token', token)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !session) {
        localStorage.removeItem('admin_token');
        this.updateState({ isLoading: false });
        return;
      }

      this.updateState({
        user: session.admin_users,
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
    // For demo purposes, we'll use simple comparison
    // In production, use bcrypt or similar
    return password === 'admin123' || password === hash;
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

export const authService = AuthService.getInstance();