import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      title: 'CEO, TechStart Karachi',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'NanoLancers helped us implement AI tools that increased our productivity by 300%. Their guidance in simple Urdu made it easy for our entire team to understand.',
      urduText: 'NanoLancers نے ہمیں AI ٹولز استعمال کرنے میں مدد کی جس سے ہماری پیداوار 300% بڑھ گئی۔'
    },
    {
      id: 2,
      name: 'Fatima Khan',
      title: 'Freelancer & Course Student',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The freelancing course changed my life! I went from earning PKR 20,000 to PKR 80,000 per month within 6 months. The practical tips were game-changing.',
      urduText: 'فری لانسنگ کورس نے میری زندگی بدل دی! چھ مہینوں میں میں 20,000 سے 80,000 روپے ماہانہ کمانے لگی۔'
    },
    {
      id: 3,
      name: 'Omar Ali',
      title: 'Digital Marketing Manager',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Their blog posts and tutorials are incredibly helpful. I learned more about AI tools in 2 months than I did in 2 years elsewhere. Highly recommended!',
      urduText: 'ان کے بلاگ پوسٹس اور ٹیوٹوریلز بہت مددگار ہیں۔ دو مہینوں میں میں نے AI کے بارے میں بہت کچھ سیکھا۔'
    },
    {
      id: 4,
      name: 'Sarah Ahmed',
      title: 'E-commerce Business Owner',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The custom automation solution they built for my e-commerce store saved me 10 hours per week. Now I can focus on growing my business instead of manual tasks.',
      urduText: 'انہوں نے میرے آن لائن اسٹور کے لیے جو آٹومیشن بنایا، اس سے مجھے ہفتے میں 10 گھنٹے بچتے ہیں۔'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-4">
            <Star className="w-4 h-4 mr-2" />
            Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from Pakistani entrepreneurs and professionals who transformed their careers with our guidance.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-10 h-10 text-emerald-600" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <div className="mb-6">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                <p className="text-gray-600 text-sm leading-relaxed text-right font-medium">
                  "{testimonial.urduText}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-emerald-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-emerald-600 mb-2">10,000+</div>
            <div className="text-gray-600">Happy Students</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Businesses Helped</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;