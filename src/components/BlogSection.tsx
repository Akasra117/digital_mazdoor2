import React from 'react';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

const BlogSection = () => {
  const posts = [
    {
      id: 1,
      title: 'AI Tools Every Pakistani Entrepreneur Should Use in 2024',
      urduTitle: '2024 میں ہر پاکستانی کاروباری کے لیے ضروری AI ٹولز',
      excerpt: 'Discover the top AI tools that are transforming businesses across Pakistan. From ChatGPT to automation tools.',
      category: 'AI Tools',
      author: 'Ahmed Khan',
      date: '2024-01-15',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true
    },
    {
      id: 2,
      title: 'Complete Guide to Digital Marketing for Small Businesses',
      urduTitle: 'چھوٹے کاروبار کے لیے ڈیجیٹل مارکیٹنگ کی مکمل گائیڈ',
      excerpt: 'Step-by-step guide to growing your business online. Learn SEO, social media marketing, and paid advertising.',
      category: 'Digital Marketing',
      author: 'Fatima Ali',
      date: '2024-01-12',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      id: 3,
      title: 'How to Start Freelancing in Pakistan: 2024 Complete Guide',
      urduTitle: 'پاکستان میں فری لانسنگ کیسے شروع کریں: 2024 مکمل گائیڈ',
      excerpt: 'Everything you need to know about starting a successful freelancing career in Pakistan.',
      category: 'Freelancing',
      author: 'Hassan Sheikh',
      date: '2024-01-10',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      id: 4,
      title: 'Top Programming Languages to Learn in 2024',
      urduTitle: '2024 میں سیکھنے کے لیے بہترین پروگرامنگ زبانیں',
      excerpt: 'Which programming languages are most in-demand and how to get started with each one.',
      category: 'Programming',
      author: 'Omar Malik',
      date: '2024-01-08',
      readTime: '15 min read',
      image: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    }
  ];

  const categories = ['All', 'AI Tools', 'Digital Marketing', 'Freelancing', 'Programming', 'Business'];

  return (
    <section id="blogs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            Latest Tech Blogs
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stay Updated with Technology Trends
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert insights, tutorials, and industry news in simple language. 
            آسان اردو اور انگریزی میں ٹیکنالوجی کی تازہ ترین معلومات۔
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                category === 'All' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {posts.filter(post => post.featured).map((post) => (
          <div key={post.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl overflow-hidden mb-12 shadow-lg">
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="bg-white px-3 py-1 rounded-full text-blue-600 text-sm font-medium">
                    {post.category}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <h4 className="text-lg text-gray-600 mb-4 text-right">
                    {post.urduTitle}
                  </h4>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center group">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 lg:h-full object-cover rounded-xl shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.filter(post => !post.featured).map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <h4 className="text-sm text-gray-600 mb-3 text-right line-clamp-1">
                  {post.urduTitle}
                </h4>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-200">
            View All Blog Posts
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;