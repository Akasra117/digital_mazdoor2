import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  Zap, 
  PenTool, 
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  UserCheck,
  Calendar
} from 'lucide-react';
import CoursesManager from './CoursesManager';
import BlogManager from './BlogManager';
import AIToolsManager from './AIToolsManager';
import UsersManager from './UsersManager';
import UserManagement from './UserManagement';
import AnalyticsDashboard from './AnalyticsDashboard';
import { authService } from '../../lib/auth';

interface CRMDashboardProps {
  onClose?: () => void;
  onLogout?: () => void;
}

const CRMDashboard: React.FC<CRMDashboardProps> = ({ onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const authState = authService.getAuthState();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    ...(authService.hasPermission('courses.read') ? [{ id: 'courses', label: 'Courses', icon: BookOpen }] : []),
    ...(authService.hasPermission('blogs.read') ? [{ id: 'blogs', label: 'Tech Blogs', icon: PenTool }] : []),
    ...(authService.hasPermission('tools.read') ? [{ id: 'tools', label: 'AI Tools', icon: Zap }] : []),
    ...(authService.hasPermission('users.read') ? [{ id: 'users', label: 'Website Users', icon: Users }] : []),
    ...(authService.hasPermission('users.read') ? [{ id: 'admin-users', label: 'Admin Users', icon: Settings }] : []),
    ...(authService.hasPermission('analytics.read') ? [{ id: 'analytics', label: 'Analytics', icon: TrendingUp }] : [])
  ].filter(Boolean);

  const stats = [
    {
      title: 'Total Users',
      value: '12,543',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Courses',
      value: '45',
      change: '+8%',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Blog Posts',
      value: '234',
      change: '+15%',
      icon: PenTool,
      color: 'bg-purple-500'
    },
    {
      title: 'AI Tools Listed',
      value: '189',
      change: '+23%',
      icon: Zap,
      color: 'bg-orange-500'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return <CoursesManager />;
      case 'blogs':
        return <BlogManager />;
      case 'tools':
        return <AIToolsManager />;
      case 'users':
        return <UsersManager />;
      case 'admin-users':
        return <UserManagement />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'dashboard':
      default:
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Course Enrollments</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Ahmed Khan', course: 'AI Tools Mastery', time: '2 hours ago' },
                    { name: 'Fatima Ali', course: 'Digital Marketing', time: '4 hours ago' },
                    { name: 'Hassan Sheikh', course: 'Freelancing Success', time: '6 hours ago' }
                  ].map((enrollment, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-gray-900">{enrollment.name}</p>
                        <p className="text-sm text-gray-600">{enrollment.course}</p>
                      </div>
                      <span className="text-sm text-gray-500">{enrollment.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular AI Tools</h3>
                <div className="space-y-4">
                  {[
                    { name: 'ChatGPT Plus', views: '2,543', rating: '4.9' },
                    { name: 'Midjourney', views: '1,876', rating: '4.8' },
                    { name: 'Notion AI', views: '1,432', rating: '4.7' }
                  ].map((tool, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-gray-900">{tool.name}</p>
                        <p className="text-sm text-gray-600">{tool.views} views</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-600 ml-1">{tool.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-emerald-600">NanoLancers CRM</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, {authState.user?.full_name}
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Website
                </button>
              )}
              <button
                onClick={onLogout}
                className="flex items-center px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Search className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {authState.user?.full_name?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-8">
            <div className="px-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${
                    activeTab === item.id
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default CRMDashboard;