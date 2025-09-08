import React from 'react';
import { ArrowRight, Sparkles, Target, Users } from 'lucide-react';

const Hero = () => {
  const stats = [
    { icon: Sparkles, label: 'AI Tools', value: '200+' },
    { icon: Target, label: 'Success Rate', value: '95%' },
    { icon: Users, label: 'Happy Users', value: '10K+' }
  ];

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Pakistan's #1 AI & Tech Platform
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover the Best{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                  AI Tools
                </span>{' '}
                & Tech Solutions
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                آسان اردو میں AI ٹولز، ٹیکنالوجی بلاگز، آن لائن کورسز اور ڈیجیٹل حل۔ 
                پاکستانی کاروباریوں اور ٹیک شائقین کے لیے مکمل رہنمائی۔
              </p>
              
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                Get expert guidance on the latest AI tools, technology trends, and digital solutions. 
                Everything explained in simple language for Pakistani entrepreneurs and tech enthusiasts.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center group">
                Explore AI Tools
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-emerald-600 hover:text-emerald-600 transition-all duration-200">
                Browse Courses
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl mb-2 group-hover:bg-emerald-200 transition-colors">
                    <stat.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="AI Technology and Digital Solutions"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 to-blue-600/20"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg animate-bounce">
              <div className="text-emerald-600 font-bold text-lg">AI Powered</div>
              <div className="text-gray-600 text-sm">Smart Solutions</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg animate-pulse">
              <div className="text-blue-600 font-bold text-lg">24/7 Support</div>
              <div className="text-gray-600 text-sm">Expert Guidance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;