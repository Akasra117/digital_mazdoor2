import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedTools from './components/FeaturedTools';
import BlogSection from './components/BlogSection';
import CoursesSection from './components/CoursesSection';
import SolutionsSection from './components/SolutionsSection';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CRMDashboard from './components/CRM/CRMDashboard';
import LoginForm from './components/Auth/LoginForm';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { authService } from './lib/auth';
import type { AuthState } from './lib/auth';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'crm' | 'login' | 'terms' | 'privacy'>('home');
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Initialize auth check
    authService.checkAuth();
    
    // Subscribe to auth state changes
    const unsubscribe = authService.subscribe(setAuthState);
    
    return unsubscribe;
  }, []);

  const handleCRMClick = () => {
    if (authState.isAuthenticated) {
      setCurrentPage('crm');
    } else {
      setCurrentPage('login');
    }
  };

  const handleLoginSuccess = () => {
    setCurrentPage('crm');
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentPage('home');
  };

  // Show loading spinner while checking auth
  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // Render based on current page
  switch (currentPage) {
    case 'login':
      return <LoginForm onSuccess={handleLoginSuccess} />;
    
    case 'crm':
      return (
        <CRMDashboard 
          onClose={() => setCurrentPage('home')}
          onLogout={handleLogout}
        />
      );
    
    case 'terms':
      return <TermsOfService onBack={() => setCurrentPage('home')} />;
    
    case 'privacy':
      return <PrivacyPolicy onBack={() => setCurrentPage('home')} />;
    
    default:
      return (
        <div className="min-h-screen bg-white">
          <Header onCRMClick={handleCRMClick} />
          <main>
            <Hero />
            <FeaturedTools />
            <BlogSection />
            <CoursesSection />
            <SolutionsSection />
            <Testimonials />
            <Newsletter />
          </main>
          <Footer 
            onTermsClick={() => setCurrentPage('terms')}
            onPrivacyClick={() => setCurrentPage('privacy')}
          />
        </div>
      );
  }
}

export default App;