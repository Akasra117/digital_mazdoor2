import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Latest AI Tools & Tech News
          </h2>
          <h3 className="text-xl text-white/90 mb-4">
            تازہ ترین AI ٹولز اور ٹیکنالوجی کی خبروں سے باخبر رہیں
          </h3>
          
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Join 25,000+ Pakistani entrepreneurs and tech enthusiasts. Get weekly updates on new AI tools, 
            exclusive tutorials, course discounts, and industry insights delivered straight to your inbox.
          </p>
        </div>

        {/* Newsletter Form */}
        <div className="max-w-md mx-auto">
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/20"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center group"
              >
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white mr-3" />
              <span className="text-white font-semibold">Successfully subscribed! Check your email.</span>
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="mt-8 text-white/80">
          <p className="text-sm">
            ✅ Weekly AI tool reviews • ✅ Exclusive discounts • ✅ Free templates • ✅ No spam, unsubscribe anytime
          </p>
        </div>

        {/* Social Proof */}
        <div className="mt-6 flex items-center justify-center text-white/70 text-sm">
          <div className="flex -space-x-2 mr-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30"></div>
            ))}
          </div>
          <span>Join 25,000+ subscribers</span>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;