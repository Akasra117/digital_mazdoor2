import React from 'react';
import { Rocket, Shield, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react';

const SolutionsSection = () => {
  const solutions = [
    {
      id: 1,
      icon: Rocket,
      title: 'Business Automation',
      urduTitle: 'کاروباری آٹومیشن',
      description: 'Automate your business processes with AI-powered solutions',
      urduDescription: 'AI کی مدد سے اپنے کاروبار کو خودکار بنائیں',
      features: [
        'Customer Support Bots',
        'Inventory Management',
        'Sales Process Automation',
        'Email Marketing Automation'
      ],
      price: 'Starting from PKR 50,000',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 2,
      icon: Shield,
      title: 'Digital Security Solutions',
      urduTitle: 'ڈیجیٹل سیکیورٹی حل',
      description: 'Protect your business with comprehensive cybersecurity services',
      urduDescription: 'اپنے کاروبار کو مکمل سائبر سیکیورٹی سے محفوظ کریں',
      features: [
        'Data Encryption',
        'Firewall Setup',
        'Security Auditing',
        'Staff Training'
      ],
      price: 'Starting from PKR 30,000',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 3,
      icon: Zap,
      title: 'Custom Software Development',
      urduTitle: 'کسٹم سافٹ ویئر ڈیولپمنٹ',
      description: 'Build custom applications tailored to your business needs',
      urduDescription: 'اپنے کاروبار کی ضروریات کے مطابق سافٹ ویئر بنائیں',
      features: [
        'Web Applications',
        'Mobile Apps',
        'Database Systems',
        'API Integration'
      ],
      price: 'Starting from PKR 100,000',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const benefits = [
    'Free consultation and project analysis',
    'Dedicated Pakistani support team',
    'Flexible payment plans available',
    '30-day money-back guarantee',
    'Ongoing maintenance and updates',
    'Training for your team included'
  ];

  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Technology Solutions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Custom Solutions for Your Business
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your business with our tailored technology solutions. 
            اپنے کاروبار کو جدید ٹیکنالوجی کے ساتھ آگے بڑھائیں۔
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution) => (
            <div key={solution.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl">
                    <solution.icon className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {solution.title}
                </h3>
                <h4 className="text-sm text-gray-600 mb-3 text-right">
                  {solution.urduTitle}
                </h4>
                
                <p className="text-gray-600 mb-2 text-sm leading-relaxed">
                  {solution.description}
                </p>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right">
                  {solution.urduDescription}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Key Features:</h5>
                  <ul className="space-y-2">
                    {solution.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="text-lg font-bold text-purple-600">{solution.price}</div>
                  <div className="text-sm text-gray-500">One-time setup fee</div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center group">
                  Get Free Quote
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose NanoLancers Solutions?
              </h3>
              <p className="text-gray-600 mb-6">
                We understand Pakistani businesses and provide solutions that work in our local context. 
                Our team has helped 500+ businesses transform digitally.
              </p>
              
              <div className="grid gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Technology Solutions Team"
                className="w-full rounded-xl shadow-lg"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -right-4 bg-purple-600 text-white p-4 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-gray-600 mb-6">
            Get a free consultation with our experts. No commitment required.
          </p>
          <button className="bg-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-all duration-200 mr-4">
            Schedule Free Consultation
          </button>
          <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200">
            View Portfolio
          </button>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;