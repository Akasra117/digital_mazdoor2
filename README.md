# NanoLancers - AI Tools & Tech Solutions Platform

A comprehensive platform for AI tools, technology education, and digital solutions designed for Pakistani entrepreneurs and tech enthusiasts.

## Features

### Public Website
- **AI Tools Directory**: Curated collection of 200+ AI tools with reviews and ratings
- **Tech Blog**: Educational content in both English and Urdu
- **Online Courses**: Expert-led courses on AI, digital marketing, and freelancing
- **Digital Solutions**: Custom business automation and software development services
- **Newsletter**: Weekly updates on latest AI tools and tech trends

### Admin CRM System
- **Role-based Access Control**: Super Admin, Manager, Editor, and Viewer roles
- **User Management**: Manage both admin users and website users
- **Content Management**: Create and manage blog posts, courses, and AI tools
- **Analytics Dashboard**: Track performance metrics and user engagement
- **Secure Authentication**: JWT-based authentication with session management

## User Roles & Permissions

### Super Admin
- Full access to all features
- Can create, edit, and delete all content
- User management capabilities
- System settings access

### Manager
- Access to all content areas (courses, blogs, tools, users)
- Can create and edit content
- Cannot delete critical data
- Analytics access

### Editor
- Limited to blog posts and content management
- Can create and edit blog posts
- Read-only access to courses and tools

### Viewer
- Read-only access to all content
- Analytics viewing
- No editing capabilities

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Custom JWT-based auth system
- **Icons**: Lucide React
- **Build Tool**: Vite

## Database Setup

### For Supabase (Recommended)
1. Create a new Supabase project
2. Run the migration file: `supabase/migrations/create_auth_system.sql`
3. Update your `.env` file with Supabase credentials

### For FastPanel/Traditional Hosting
1. Create a MySQL/MariaDB database
2. Execute the `database_schema.sql` file via phpMyAdmin or SSH
3. Update database connection settings

## Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# JWT Secret for local auth
VITE_JWT_SECRET=your_jwt_secret_here
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nanolancers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your Supabase credentials

4. **Run database migrations**
   - For Supabase: Use the Supabase CLI or dashboard
   - For traditional hosting: Execute `database_schema.sql`

5. **Start development server**
   ```bash
   npm run dev
   ```

## Default Admin Credentials

- **Email**: admin@nanolancers.com
- **Password**: admin123

*Change these credentials immediately after first login*

## Deployment

### Build for Production
```bash
npm run build:prod
```

### Deploy to FastPanel
1. Build the project: `npm run build`
2. Upload the `dist` folder contents to your web directory
3. Set up the database using the provided schema
4. Configure environment variables on your hosting panel

## Database Schema Overview

### Core Tables
- `user_roles`: Role definitions with permissions
- `admin_users`: CRM admin users
- `user_sessions`: Session management
- `website_users`: Public website users (students, etc.)
- `courses`: Course management
- `blog_posts`: Blog content management
- `ai_tools`: AI tools directory
- `enrollments`: Course enrollments
- `reviews`: User reviews for courses and tools

## Security Features

- **Row Level Security (RLS)**: Database-level security policies
- **JWT Authentication**: Secure token-based authentication
- **Role-based Permissions**: Granular access control
- **Session Management**: Secure session handling
- **Password Hashing**: Secure password storage (implement bcrypt in production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Support

For support, email: support@nanolancers.com

## FastPanel Hosting Setup Guide

### Via SSH (Recommended)
```bash
# Connect to your server
ssh username@your-server-ip

# Navigate to your web directory
cd /home/username/public_html

# Upload and extract your build files
# Then set up the database
mysql -u username -p database_name < database_schema.sql
```

### Via cPanel/phpMyAdmin
1. Upload the `dist` folder contents to `public_html`
2. Create a new database in cPanel
3. Import `database_schema.sql` via phpMyAdmin
4. Update database connection settings

The platform is now ready for production use with full CRM functionality and role-based access control.
