import React from 'react';
import { PlayCircle, Users, Clock, Award, Star } from 'lucide-react';

const CoursesSection = () => {
  const courses = [
    {
      id: 1,
      title: 'Complete AI Tools Mastery Course',
      urduTitle: 'مکمل AI ٹولز مہارت کورس',
      description: 'Master 50+ AI tools for content creation, business automation, and productivity',
      instructor: 'Ahmed Khan',
      rating: 4.9,
      students: 2500,
      duration: '12 hours',
      lessons: 45,
      price: 'PKR 15,000',
      originalPrice: 'PKR 25,000',
      level: 'Beginner to Advanced',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Lifetime Access', 'Certificate', 'Live Support', 'Project Files'],
      bestseller: true
    },
    {
      id: 2,
      title: 'Digital Marketing Bootcamp',
      urduTitle: 'ڈیجیٹل مارکیٹنگ بوٹ کیمپ',
      description: 'Complete digital marketing course covering SEO, social media, and paid advertising',
      instructor: 'Fatima Ali',
      rating: 4.8,
      students: 1800,
      duration: '20 hours',
      lessons: 60,
      price: 'PKR 20,000',
      originalPrice: 'PKR 35,000',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Real Case Studies', 'Templates', 'Tools Access', 'Job Support'],
      bestseller: false
    },
    {
      id: 3,
      title: 'Freelancing Success Formula',
      urduTitle: 'فری لانسنگ کامیابی کا فارمولا',
      description: 'Learn how to build a successful freelancing career on Upwork, Fiverr, and local platforms',
      instructor: 'Hassan Sheikh',
      rating: 4.7,
      students: 3200,
      duration: '8 hours',
      lessons: 35,
      price: 'PKR 12,000',
      originalPrice: 'PKR 20,000',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Profile Templates', '1-on-1 Session', 'Client Scripts', 'Proposal Templates'],
      bestseller: false
    }
  ];

  return (
    <section id="courses" className="py-20 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-4">
            <Award className="w-4 h-4 mr-2" />
            Expert-Led Courses
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Master New Skills with Our Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive courses designed for Pakistani learners. 
            آسان اردو میں سمجھائے گئے کورسز جو آپ کی کامیابی کو یقینی بناتے ہیں۔
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>
                
                {course.bestseller && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Bestseller
                    </span>
                  </div>
                )}
                
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                    {course.title}
                  </h3>
                  <h4 className="text-sm text-gray-600 mb-3 text-right">
                    {course.urduTitle}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <span>By {course.instructor}</span>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <Users className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-gray-900">{course.students.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Students</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <Clock className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-gray-900">{course.duration}</div>
                    <div className="text-xs text-gray-600">Duration</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <PlayCircle className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-gray-900">{course.lessons}</div>
                    <div className="text-xs text-gray-600">Lessons</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {course.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-md">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                    <span className="text-lg text-gray-500 line-through">{course.originalPrice}</span>
                  </div>
                  <span className="text-sm text-green-600 font-semibold">
                    {Math.round((1 - parseInt(course.price.replace(/\D/g, '')) / parseInt(course.originalPrice.replace(/\D/g, ''))) * 100)}% OFF
                  </span>
                </div>

                {/* Enroll Button */}
                <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Courses */}
        <div className="text-center mt-12">
          <button className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-600 hover:text-white transition-all duration-200">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;