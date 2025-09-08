import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
              <Shield className="w-6 h-6 text-emerald-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="mb-8">
            <p className="text-gray-600 mb-4">Last updated: January 2024</p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-emerald-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-emerald-800 font-medium">Your Privacy Matters</p>
                  <p className="text-emerald-700 text-sm mt-1">
                    We are committed to protecting your personal information and your right to privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-emerald-600" />
              1. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              We collect information you provide directly to us, such as when you:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Create an account or profile</li>
              <li>Enroll in courses or purchase services</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us for support</li>
              <li>Participate in surveys or promotions</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
            <p className="text-gray-700 mb-4">
              This may include your name, email address, phone number, payment information, and any other information you choose to provide.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Information</h3>
            <p className="text-gray-700 mb-6">
              We automatically collect certain information about your device and how you interact with our services, including IP address, browser type, pages visited, and time spent on our platform.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-emerald-600" />
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Detect, investigate, and prevent fraudulent transactions</li>
              <li>Personalize your experience</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-emerald-600" />
              3. Information Sharing and Disclosure
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist us in operating our platform</li>
              <li>In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
            <p className="text-gray-700 mb-6">
              We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Access and update your personal information</li>
              <li>Delete your account and personal data</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data</li>
              <li>Object to processing of your data</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-6">
              We use cookies and similar tracking technologies to collect and use personal information about you. You can control cookies through your browser settings, but disabling cookies may affect the functionality of our services.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Third-Party Links</h2>
            <p className="text-gray-700 mb-6">
              Our service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 mb-6">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
            <p className="text-gray-700 mb-6">
              Your information may be transferred to and processed in countries other than Pakistan. We ensure appropriate safeguards are in place to protect your data.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">Email: privacy@nanolancers.com</p>
              <p className="text-gray-700">Phone: +92 300 1234567</p>
              <p className="text-gray-700">Address: Karachi, Pakistan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;