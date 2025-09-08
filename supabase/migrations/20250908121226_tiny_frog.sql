-- NanoLancers Database Schema for FastPanel Hosting
-- Execute these commands in your MySQL/MariaDB database via phpMyAdmin or SSH

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS nanolancers_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nanolancers_db;

-- User Roles Table
CREATE TABLE user_roles (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(50) UNIQUE NOT NULL,
    permissions JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admin Users Table
CREATE TABLE admin_users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role_id CHAR(36),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES user_roles(id) ON DELETE SET NULL
);

-- User Sessions Table
CREATE TABLE user_sessions (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
);

-- Website Users Table (Students, etc.)
CREATE TABLE website_users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    location VARCHAR(255),
    avatar_url TEXT,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    user_type ENUM('student', 'premium_student', 'instructor') DEFAULT 'student',
    total_spent DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE courses (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(500) NOT NULL,
    urdu_title VARCHAR(500),
    description TEXT,
    instructor VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    original_price DECIMAL(10,2),
    duration VARCHAR(50),
    lessons_count INT DEFAULT 0,
    thumbnail_url TEXT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    rating DECIMAL(2,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    students_count INT DEFAULT 0,
    created_by CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Blog Posts Table
CREATE TABLE blog_posts (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(500) NOT NULL,
    urdu_title VARCHAR(500),
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    thumbnail_url TEXT,
    status ENUM('draft', 'published', 'scheduled') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    views_count INT DEFAULT 0,
    read_time VARCHAR(20),
    tags JSON,
    published_at TIMESTAMP NULL,
    created_by CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- AI Tools Table
CREATE TABLE ai_tools (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    urdu_description TEXT,
    website_url TEXT,
    thumbnail_url TEXT,
    price VARCHAR(50),
    rating DECIMAL(2,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    users_count VARCHAR(20),
    features JSON,
    status ENUM('pending', 'active', 'inactive') DEFAULT 'pending',
    is_featured BOOLEAN DEFAULT FALSE,
    views_count INT DEFAULT 0,
    created_by CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Course Enrollments Table
CREATE TABLE enrollments (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    course_id CHAR(36) NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    progress DECIMAL(5,2) DEFAULT 0.00 CHECK (progress >= 0 AND progress <= 100),
    UNIQUE KEY unique_enrollment (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES website_users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Reviews Table
CREATE TABLE reviews (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    item_type ENUM('course', 'tool') NOT NULL,
    item_id CHAR(36) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES website_users(id) ON DELETE CASCADE
);

-- Insert Default Roles
INSERT INTO user_roles (name, permissions) VALUES
('super_admin', '{"all": true}'),
('manager', '{"courses": {"read": true, "write": true}, "blogs": {"read": true, "write": true}, "tools": {"read": true, "write": true}, "users": {"read": true, "write": true}, "analytics": {"read": true}, "delete": false}'),
('editor', '{"blogs": {"read": true, "write": true}, "courses": {"read": true}, "tools": {"read": true}}'),
('viewer', '{"blogs": {"read": true}, "courses": {"read": true}, "tools": {"read": true}, "users": {"read": true}, "analytics": {"read": true}}');

-- Create default super admin (password: admin123)
INSERT INTO admin_users (email, password_hash, full_name, role_id) 
SELECT 
    'admin@nanolancers.com',
    'admin123',
    'Super Admin',
    id
FROM user_roles WHERE name = 'super_admin';

-- Create indexes for better performance
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_role ON admin_users(role_id);
CREATE INDEX idx_website_users_email ON website_users(email);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_ai_tools_status ON ai_tools(status);
CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);

-- Sample data for testing
INSERT INTO website_users (email, full_name, phone, location, user_type, total_spent) VALUES
('ahmed.hassan@email.com', 'Ahmed Hassan', '+92 300 1234567', 'Karachi, Pakistan', 'student', 45000.00),
('fatima.khan@email.com', 'Fatima Khan', '+92 321 9876543', 'Lahore, Pakistan', 'premium_student', 75000.00),
('hassan.sheikh@email.com', 'Hassan Sheikh', '+92 333 5555555', 'Islamabad, Pakistan', 'student', 15000.00);

INSERT INTO courses (title, urdu_title, instructor, category, price, original_price, duration, lessons_count, status, is_featured, rating, students_count, thumbnail_url) VALUES
('Complete AI Tools Mastery Course', 'مکمل AI ٹولز مہارت کورس', 'Ahmed Khan', 'AI Tools', 15000.00, 25000.00, '12 hours', 45, 'published', TRUE, 4.9, 2500, 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'),
('Digital Marketing Bootcamp', 'ڈیجیٹل مارکیٹنگ بوٹ کیمپ', 'Fatima Ali', 'Marketing', 20000.00, 35000.00, '20 hours', 60, 'published', FALSE, 4.8, 1800, 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'),
('Freelancing Success Formula', 'فری لانسنگ کامیابی کا فارمولا', 'Hassan Sheikh', 'Business', 12000.00, 20000.00, '8 hours', 35, 'published', FALSE, 4.7, 3200, 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg');

INSERT INTO blog_posts (title, urdu_title, slug, excerpt, author, category, status, is_featured, views_count, read_time, thumbnail_url) VALUES
('AI Tools Every Pakistani Entrepreneur Should Use in 2024', '2024 میں ہر پاکستانی کاروباری کے لیے ضروری AI ٹولز', 'ai-tools-pakistani-entrepreneurs-2024', 'Discover the top AI tools that are transforming businesses across Pakistan. From ChatGPT to automation tools.', 'Ahmed Khan', 'AI Tools', 'published', TRUE, 15420, '8 min read', 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'),
('Complete Guide to Digital Marketing for Small Businesses', 'چھوٹے کاروبار کے لیے ڈیجیٹل مارکیٹنگ کی مکمل گائیڈ', 'digital-marketing-guide-small-businesses', 'Step-by-step guide to growing your business online. Learn SEO, social media marketing, and paid advertising.', 'Fatima Ali', 'Digital Marketing', 'published', FALSE, 12350, '12 min read', 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg');

INSERT INTO ai_tools (name, category, description, urdu_description, website_url, price, rating, users_count, features, status, is_featured, views_count, thumbnail_url) VALUES
('ChatGPT Plus', 'AI Writing', 'Advanced AI assistant for content creation, coding, and problem-solving', 'کنٹینٹ بنانے، کوڈنگ اور مسائل حل کرنے کے لیے بہترین AI اسسٹنٹ', 'https://chat.openai.com', '$20/month', 4.9, '100M+', '["Text Generation", "Code Assistant", "Language Translation"]', 'active', TRUE, 15420, 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'),
('Midjourney', 'AI Art', 'Create stunning AI-generated images and artwork from text prompts', 'ٹیکسٹ سے خوبصورت AI امیجز اور آرٹ ورک بنائیں', 'https://midjourney.com', '$10/month', 4.8, '15M+', '["Image Generation", "Artistic Styles", "High Resolution"]', 'active', TRUE, 12350, 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg');