import React from 'react';
import { Star, ExternalLink, Zap, Users, Award } from 'lucide-react';

const FeaturedTools = () => {
  const tools = [
    {
      id: 1,
      name: 'ChatGPT Plus',
      category: 'AI Writing',
      description: 'Advanced AI assistant for content creation, coding, and problem-solving',
      urduDescription: 'کنٹینٹ بنانے، کوڈنگ اور مسائل حل کرنے کے لیے بہترین AI اسسٹنٹ',
      rating: 4.9,
      users: '100M+',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Text Generation', 'Code Assistant', 'Language Translation'],
      price: '$20/month',
      badge: 'Editor\'s Choice'
    },
    {
      id: 2,
      name: 'Midjourney',
      category: 'AI Art',
      description: 'Create stunning AI-generated images and artwork from text prompts',
      urduDescription: 'ٹیکسٹ سے خوبصورت AI امیجز اور آرٹ ورک بنائیں',
      rating: 4.8,
      users: '15M+',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Image Generation', 'Artistic Styles', 'High Resolution'],
      price: '$10/month',
      badge: 'Popular'
    },
    {
      id: 3,
      name: 'Notion AI',
      category: 'Productivity',
      description: 'Intelligent workspace for notes, docs, and project management',
      urduDescription: 'نوٹس، دستاویزات اور پروجیکٹ منیجمنٹ کے لیے ذہین workspace',
      rating: 4.7,
      users: '30M+',
      image: 'https://images.pexels.com/photos/5474030/pexels-photo-5474030.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Smart Notes', 'Team Collaboration', 'AI Writing'],
      price: '$8/month',
      badge: 'Best Value'
    }
  ];

  return (
    <section id="tools" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Featured AI Tools
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Best AI Tools for Pakistani Businesses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hand-picked AI tools that are changing the game. Each tool is tested and reviewed by our experts.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tool.badge === 'Editor\'s Choice' ? 'bg-emerald-100 text-emerald-800' :
                    tool.badge === 'Popular' ? 'bg-blue-100 text-blue-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {tool.badge}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{tool.rating}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-emerald-600 font-medium">{tool.category}</span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {tool.users}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {tool.name}
                </h3>

                <p className="text-gray-600 mb-2 text-sm leading-relaxed">
                  {tool.description}
                </p>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right">
                  {tool.urduDescription}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">{tool.price}</div>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors duration-200 flex items-center group">
                    Try Now
                    <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-200">
            View All 200+ Tools
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;