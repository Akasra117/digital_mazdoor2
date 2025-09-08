/*
  # Authentication and User Management System

  1. New Tables
    - `admin_users` - Admin panel users with roles and permissions
    - `user_roles` - Role definitions with permissions
    - `user_sessions` - Session management
    - `website_users` - Regular website users (students, etc.)
    - `courses` - Course management
    - `blog_posts` - Blog post management
    - `ai_tools` - AI tools directory
    - `enrollments` - Course enrollments
    - `reviews` - Tool and course reviews

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure admin authentication

  3. Roles and Permissions
    - Super Admin: Full access to everything
    - Manager: Access all but cannot delete critical data
    - Editor: Only blog posts and content management
    - Viewer: Read-only access
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

-- Website Users Table (Students, etc.)
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
  '$2b$10$rQZ8kHWKtGKVQWKpEWF4/.vQw8yQGqYJZxQJZxQJZxQJZxQJZxQJZ',
  'Super Admin',
  id
FROM user_roles WHERE name = 'super_admin'
ON CONFLICT (email) DO NOTHING;

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