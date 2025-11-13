import mysql from 'mysql2/promise';

// MySQL Database Configuration
const dbConfig = {
  host: process.env.VITE_DB_HOST || 'localhost',
  user: process.env.VITE_DB_USER || 'root',
  password: process.env.VITE_DB_PASSWORD || '',
  database: process.env.VITE_DB_NAME || 'nanolancers_db',
  port: parseInt(process.env.VITE_DB_PORT || '3306'),
  charset: 'utf8mb4'
};

// Create connection pool
export const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Database types (same as Supabase types)
export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role_id: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  role?: UserRole;
}

export interface UserRole {
  id: string;
  name: string;
  permissions: Record<string, any>;
}

export interface WebsiteUser {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  location?: string;
  avatar_url?: string;
  status: 'active' | 'inactive' | 'suspended';
  user_type: 'student' | 'premium_student' | 'instructor';
  total_spent: number;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  urdu_title?: string;
  description?: string;
  instructor: string;
  category: string;
  price: number;
  original_price?: number;
  duration?: string;
  lessons_count: number;
  thumbnail_url?: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  rating: number;
  students_count: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  urdu_title?: string;
  slug: string;
  excerpt?: string;
  content?: string;
  author: string;
  category: string;
  thumbnail_url?: string;
  status: 'draft' | 'published' | 'scheduled';
  is_featured: boolean;
  views_count: number;
  read_time?: string;
  tags?: string[];
  published_at?: string;
  created_at: string;
}

export interface AITool {
  id: string;
  name: string;
  category: string;
  description?: string;
  urdu_description?: string;
  website_url?: string;
  thumbnail_url?: string;
  price?: string;
  rating: number;
  users_count?: string;
  features?: string[];
  status: 'pending' | 'active' | 'inactive';
  is_featured: boolean;
  views_count: number;
  created_at: string;
}

// Helper functions for database operations
export const executeQuery = async (query: string, params: any[] = []) => {
  try {
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

export const getConnection = async () => {
  return await pool.getConnection();
};

// MySQL client instance
export const mysql_client = pool;