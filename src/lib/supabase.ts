import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
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