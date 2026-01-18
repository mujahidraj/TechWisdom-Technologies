import React, { useEffect } from 'react';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <div className="mb-12 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600/10 rounded-xl">
              <Shield className="text-blue-500 w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          </div>
          <p className="text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-500" />
              1. Information We Collect
            </h2>
            <p className="leading-relaxed mb-4">
              At TechWisdom Technologies, we collect information to provide better services to all our users. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li><strong className="text-slate-200">Personal Information:</strong> Name, email address, phone number, and company details provided via forms.</li>
              <li><strong className="text-slate-200">Usage Data:</strong> Information on how the services are accessed and used (e.g., page views, time spent).</li>
              <li><strong className="text-slate-200">Cookies:</strong> We use cookies to store user preferences and track session information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-500" />
              2. How We Use Your Data
            </h2>
            <p className="leading-relaxed text-slate-400">
              We strictly use your data for the following purposes:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                <h3 className="text-white font-medium mb-2">Service Delivery</h3>
                <p className="text-sm text-slate-500">To provide, operate, and maintain our websites and services.</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                <h3 className="text-white font-medium mb-2">Communication</h3>
                <p className="text-sm text-slate-500">To contact you regarding updates, offers, and customer support.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" />
              3. Data Protection
            </h2>
            <p className="leading-relaxed text-slate-400">
              We implement a variety of security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties unless we provide users with advance notice.
            </p>
          </section>

          <section className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500" />
              Contact Us
            </h2>
            <p className="text-slate-400 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <a href="mailto:twtech@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
              twtech@gmail.com
            </a>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;