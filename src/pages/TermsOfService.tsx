import React from 'react';
import { ArrowLeft, FileText, Shield, AlertCircle } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="flex items-center text-emerald-600 hover:text-emerald-700 mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-emerald-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="mb-8">
            <p className="text-gray-600 mb-4">Last updated: January 2024</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-blue-800 font-medium">Important Notice</p>
                  <p className="text-blue-700 text-sm mt-1">
                    Please read these terms carefully before using NanoLancers services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using NanoLancers ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              NanoLancers provides:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>AI tools directory and reviews</li>
              <li>Technology education courses</li>
              <li>Digital marketing and freelancing guidance</li>
              <li>Business automation solutions</li>
              <li>Tech blog and tutorials</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Course Enrollment and Payment</h2>
            <p className="text-gray-700 mb-4">
              Course fees are clearly displayed before enrollment. All payments are processed securely. Refunds are available within 30 days of purchase if you're not satisfied with the course content.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
            <p className="text-gray-700 mb-4">
              The service and its original content, features, and functionality are and will remain the exclusive property of NanoLancers and its licensors. The service is protected by copyright, trademark, and other laws.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">6. User Content</h2>
            <p className="text-gray-700 mb-4">
              Our service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the service.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">
              You may not use our service:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Disclaimer</h2>
            <p className="text-gray-700 mb-6">
              The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              In no event shall NanoLancers, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
            <p className="text-gray-700 mb-6">
              These Terms shall be interpreted and governed by the laws of Pakistan, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">Email: legal@nanolancers.com</p>
              <p className="text-gray-700">Phone: +92 300 1234567</p>
              <p className="text-gray-700">Address: Karachi, Pakistan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;