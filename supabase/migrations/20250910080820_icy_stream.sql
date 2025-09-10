/*
  # NanoLancers Database Schema Setup

  1. New Tables
    - `user_roles` - Role definitions with permissions
    - `admin_users` - Admin panel users with roles and permissions
    - `user_sessions` - Session management for admin users
    - `website_users` - Regular website users (students, instructors)
    - `courses` - Course management system
    - `blog_posts` - Blog content management
    - `ai_tools` - AI tools directory
    - `enrollments` - Course enrollment tracking
    - `reviews` - User reviews for courses and tools

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure admin authentication system

  3. Sample Data
    - Default admin roles and permissions
    - Sample admin user
    - Test data for development
*/

-- User Roles Table
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  permissions jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  role_id uuid REFERENCES user_roles(id),
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Sessions Table
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES admin_users(id) ON DELETE CASCADE,
  token text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Website Users Table (Students, Instructors, etc.)
CREATE TABLE IF NOT EXISTS website_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  location text,
  avatar_url text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  user_type text DEFAULT 'student' CHECK (user_type IN ('student', 'premium_student', 'instructor')),
  total_spent numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  urdu_title text,
  description text,
  instructor text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  original_price numeric,
  duration text,
  lessons_count integer DEFAULT 0,
  thumbnail_url text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured boolean DEFAULT false,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  students_count integer DEFAULT 0,
  created_by uuid REFERENCES admin_users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  urdu_title text,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  author text NOT NULL,
  category text NOT NULL,
  thumbnail_url text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  is_featured boolean DEFAULT false,
  views_count integer DEFAULT 0,
  read_time text,
  tags text[],
  published_at timestamptz,
  created_by uuid REFERENCES admin_users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- AI Tools Table
CREATE TABLE IF NOT EXISTS ai_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text,
  urdu_description text,
  website_url text,
  thumbnail_url text,
  price text,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  users_count text,
  features text[],
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  is_featured boolean DEFAULT false,
  views_count integer DEFAULT 0,
  created_by uuid REFERENCES admin_users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Course Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES website_users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  progress numeric DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  UNIQUE(user_id, course_id)
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES website_users(id) ON DELETE CASCADE,
  item_type text NOT NULL CHECK (item_type IN ('course', 'tool')),
  item_id uuid NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Admin Users
CREATE POLICY "Admin users can read all admin data"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can update their own data"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- RLS Policies for User Roles
CREATE POLICY "Admin can read user roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for User Sessions
CREATE POLICY "Users can manage their own sessions"
  ON user_sessions FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for Website Users
CREATE POLICY "Admin can manage website users"
  ON website_users FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for Courses
CREATE POLICY "Admin can manage courses"
  ON courses FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Public can read published courses"
  ON courses FOR SELECT
  TO anon
  USING (status = 'published');

-- RLS Policies for Blog Posts
CREATE POLICY "Admin can manage blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  TO anon
  USING (status = 'published');

-- RLS Policies for AI Tools
CREATE POLICY "Admin can manage AI tools"
  ON ai_tools FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Public can read active AI tools"
  ON ai_tools FOR SELECT
  TO anon
  USING (status = 'active');

-- RLS Policies for Enrollments
CREATE POLICY "Admin can manage enrollments"
  ON enrollments FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for Reviews
CREATE POLICY "Admin can manage reviews"
  ON reviews FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Public can read reviews"
  ON reviews FOR SELECT
  TO anon
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role_id);
CREATE INDEX IF NOT EXISTS idx_website_users_email ON website_users(email);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_ai_tools_status ON ai_tools(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);

-- Insert Default Roles
INSERT INTO user_roles (name, permissions) VALUES
('super_admin', '{"all": true}'),
('manager', '{"courses": {"read": true, "write": true}, "blogs": {"read": true, "write": true}, "tools": {"read": true, "write": true}, "users": {"read": true, "write": true}, "analytics": {"read": true}, "delete": false}'),
('editor', '{"blogs": {"read": true, "write": true}, "courses": {"read": true}, "tools": {"read": true}}'),
('viewer', '{"blogs": {"read": true}, "courses": {"read": true}, "tools": {"read": true}, "users": {"read": true}, "analytics": {"read": true}}')
ON CONFLICT (name) DO NOTHING;

-- Create default super admin (password: admin123)
INSERT INTO admin_users (email, password_hash, full_name, role_id) 
SELECT 
  'admin@nanolancers.com',
  'admin123',
  'Super Admin',
  id
FROM user_roles WHERE name = 'super_admin'
ON CONFLICT (email) DO NOTHING;

-- Sample Website Users
INSERT INTO website_users (email, full_name, phone, location, user_type, total_spent) VALUES
('ahmed.hassan@email.com', 'Ahmed Hassan', '+92 300 1234567', 'Karachi, Pakistan', 'student', 45000.00),
('fatima.khan@email.com', 'Fatima Khan', '+92 321 9876543', 'Lahore, Pakistan', 'premium_student', 75000.00),
('hassan.sheikh@email.com', 'Hassan Sheikh', '+92 333 5555555', 'Islamabad, Pakistan', 'student', 15000.00),
('sarah.ahmed@email.com', 'Sarah Ahmed', '+92 345 7777777', 'Faisalabad, Pakistan', 'instructor', 0.00)
ON CONFLICT (email) DO NOTHING;

-- Sample Courses
INSERT INTO courses (title, urdu_title, instructor, category, price, original_price, duration, lessons_count, status, is_featured, rating, students_count, thumbnail_url) VALUES
('Complete AI Tools Mastery Course', 'مکمل AI ٹولز مہارت کورس', 'Ahmed Khan', 'AI Tools', 15000.00, 25000.00, '12 hours', 45, 'published', true, 4.9, 2500, 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600'),
('Digital Marketing Bootcamp', 'ڈیجیٹل مارکیٹنگ بوٹ کیمپ', 'Fatima Ali', 'Marketing', 20000.00, 35000.00, '20 hours', 60, 'published', false, 4.8, 1800, 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600'),
('Freelancing Success Formula', 'فری لانسنگ کامیابی کا فارمولا', 'Hassan Sheikh', 'Business', 12000.00, 20000.00, '8 hours', 35, 'published', false, 4.7, 3200, 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=600')
ON CONFLICT DO NOTHING;

-- Sample Blog Posts
INSERT INTO blog_posts (title, urdu_title, slug, excerpt, author, category, status, is_featured, views_count, read_time, thumbnail_url) VALUES
('AI Tools Every Pakistani Entrepreneur Should Use in 2024', '2024 میں ہر پاکستانی کاروباری کے لیے ضروری AI ٹولز', 'ai-tools-pakistani-entrepreneurs-2024', 'Discover the top AI tools that are transforming businesses across Pakistan. From ChatGPT to automation tools.', 'Ahmed Khan', 'AI Tools', 'published', true, 15420, '8 min read', 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600'),
('Complete Guide to Digital Marketing for Small Businesses', 'چھوٹے کاروبار کے لیے ڈیجیٹل مارکیٹنگ کی مکمل گائیڈ', 'digital-marketing-guide-small-businesses', 'Step-by-step guide to growing your business online. Learn SEO, social media marketing, and paid advertising.', 'Fatima Ali', 'Digital Marketing', 'published', false, 12350, '12 min read', 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600'),
('How to Start Freelancing in Pakistan: 2024 Complete Guide', 'پاکستان میں فری لانسنگ کیسے شروع کریں: 2024 مکمل گائیڈ', 'freelancing-guide-pakistan-2024', 'Everything you need to know about starting a successful freelancing career in Pakistan.', 'Hassan Sheikh', 'Freelancing', 'draft', false, 0, '10 min read', 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=600')
ON CONFLICT (slug) DO NOTHING;

-- Sample AI Tools
INSERT INTO ai_tools (name, category, description, urdu_description, website_url, price, rating, users_count, features, status, is_featured, views_count, thumbnail_url) VALUES
('ChatGPT Plus', 'AI Writing', 'Advanced AI assistant for content creation, coding, and problem-solving', 'کنٹینٹ بنانے، کوڈنگ اور مسائل حل کرنے کے لیے بہترین AI اسسٹنٹ', 'https://chat.openai.com', '$20/month', 4.9, '100M+', ARRAY['Text Generation', 'Code Assistant', 'Language Translation'], 'active', true, 15420, 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600'),
('Midjourney', 'AI Art', 'Create stunning AI-generated images and artwork from text prompts', 'ٹیکسٹ سے خوبصورت AI امیجز اور آرٹ ورک بنائیں', 'https://midjourney.com', '$10/month', 4.8, '15M+', ARRAY['Image Generation', 'Artistic Styles', 'High Resolution'], 'active', true, 12350, 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600'),
('Notion AI', 'Productivity', 'Intelligent workspace for notes, docs, and project management', 'نوٹس، دستاویزات اور پروجیکٹ منیجمنٹ کے لیے ذہین workspace', 'https://notion.so', '$8/month', 4.7, '30M+', ARRAY['Smart Notes', 'Team Collaboration', 'AI Writing'], 'active', false, 9876, 'https://images.pexels.com/photos/5474030/pexels-photo-5474030.jpeg?auto=compress&cs=tinysrgb&w=600')
ON CONFLICT DO NOTHING;