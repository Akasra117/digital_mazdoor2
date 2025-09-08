import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onTermsClick, onPrivacyClick }) => {
  const footerLinks = {
    'AI Tools': [
      'ChatGPT Alternatives',
      'Image Generators',
      'Writing Tools',
      'Business Automation',
      'Voice AI Tools'
    ],
    'Learning': [
      'AI Courses',
      'Digital Marketing',
      'Freelancing Guide',
      'Programming',
      'Business Skills'
    ],
    'Resources': [
      'Blog Posts',
      'Tutorials',
      'Templates',
      'Case Studies',
      'Free Tools'
    ],
    'Company': [
      'About Us',
      'Our Team',
      'Careers',
      'Contact',
      'Privacy Policy'
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Youtube, href: '#', name: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">NanoLancers</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Pakistan's leading platform for AI tools, technology education, and digital solutions. 
                Empowering entrepreneurs and professionals with cutting-edge technology knowledge.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed text-right">
                پاکستان کا سرکردہ AI ٹولز، ٹیکنالوجی تعلیم اور ڈیجیٹل حل فراہم کرنے والا پلیٹ فارم۔
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-emerald-400" />
                <span>hello@nanolancers.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-emerald-400" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-emerald-400" />
                <span>Karachi, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-6 md:mb-0">
              {socialLinks.map(({ icon: Icon, href, name }) => (
                <a
                  key={name}
                  href={href}
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                  aria-label={name}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm mb-2">
                Follow us for daily AI tips and tech updates
              </p>
              <p className="text-gray-400 text-sm">
                روزانہ AI ٹپس اور ٹیک اپڈیٹس کے لیے فالو کریں
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>
              © 2024 NanoLancers. All rights reserved. Built with ❤️ for Pakistani entrepreneurs.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button 
                onClick={onTermsClick}
                className="hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </button>
              <button 
                onClick={onPrivacyClick}
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;