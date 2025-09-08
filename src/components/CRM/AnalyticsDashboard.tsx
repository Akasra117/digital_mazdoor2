import React from 'react';
import { TrendingUp, Users, BookOpen, Zap, DollarSign, Eye, Download, Calendar } from 'lucide-react';

const AnalyticsDashboard = () => {
  const metrics = [
    {
      title: 'Total Revenue',
      value: 'PKR 2,45,000',
      change: '+15.3%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Page Views',
      value: '1,24,567',
      change: '+8.2%',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Course Enrollments',
      value: '3,456',
      change: '+23.1%',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Tool Reviews',
      value: '8,901',
      change: '+12.7%',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const topCourses = [
    { name: 'AI Tools Mastery', enrollments: 2500, revenue: 'PKR 3,75,000' },
    { name: 'Digital Marketing Bootcamp', enrollments: 1800, revenue: 'PKR 3,60,000' },
    { name: 'Freelancing Success', enrollments: 3200, revenue: 'PKR 3,84,000' }
  ];

  const topTools = [
    { name: 'ChatGPT Plus', views: 15420, rating: 4.9 },
    { name: 'Midjourney', views: 12350, rating: 4.8 },
    { name: 'Notion AI', views: 9876, rating: 4.7 }
  ];

  const recentActivity = [
    { type: 'Course Enrollment', user: 'Ahmed Khan', item: 'AI Tools Mastery', time: '2 hours ago' },
    { type: 'Tool Review', user: 'Fatima Ali', item: 'ChatGPT Plus', time: '4 hours ago' },
    { type: 'Blog Comment', user: 'Hassan Sheikh', item: 'Digital Marketing Guide', time: '6 hours ago' },
    { type: 'Course Completion', user: 'Sarah Ahmed', item: 'Freelancing Success', time: '8 hours ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Track your platform performance and user engagement</p>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </button>
          <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <p className={`text-sm mt-1 ${metric.color}`}>{metric.change} from last month</p>
              </div>
              <div className={`${metric.bgColor} p-3 rounded-lg`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <p className="text-gray-600">Revenue chart visualization</p>
              <p className="text-sm text-gray-500">Integration with chart library needed</p>
            </div>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <p className="text-gray-600">User growth chart visualization</p>
              <p className="text-sm text-gray-500">Integration with chart library needed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Courses */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Courses</h3>
          <div className="space-y-4">
            {topCourses.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{course.name}</h4>
                  <p className="text-sm text-gray-600">{course.enrollments} enrollments</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{course.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top AI Tools */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Viewed AI Tools</h3>
          <div className="space-y-4">
            {topTools.map((tool, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{tool.name}</h4>
                  <p className="text-sm text-gray-600">{tool.views.toLocaleString()} views</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold text-gray-900 ml-1">{tool.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  activity.type === 'Course Enrollment' ? 'bg-green-500' :
                  activity.type === 'Tool Review' ? 'bg-blue-500' :
                  activity.type === 'Blog Comment' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">
                    {activity.user} - {activity.type}
                  </p>
                  <p className="text-sm text-gray-600">{activity.item}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;