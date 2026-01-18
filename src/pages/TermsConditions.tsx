import React, { useEffect } from 'react';
import { Gavel, AlertCircle, CheckCircle, Scale } from 'lucide-react';

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <div className="mb-12 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-600/10 rounded-xl">
              <Scale className="text-purple-500 w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold text-white">Terms & Conditions</h1>
          </div>
          <p className="text-slate-400">Please read these terms carefully before using our services.</p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed text-slate-400">
              By accessing and using the website of TechWisdom Technologies, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <Gavel className="w-5 h-5 text-blue-500" />
              2. Intellectual Property
            </h2>
            <p className="leading-relaxed text-slate-400 mb-4">
              The Site and its original content, features, and functionality are owned by TechWisdom Technologies and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              3. Limitation of Liability
            </h2>
            <p className="leading-relaxed text-slate-400">
              In no event shall TechWisdom Technologies, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Governing Law</h2>
            <p className="leading-relaxed text-slate-400">
              These Terms shall be governed and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          <section className="border-t border-slate-800 pt-8 mt-8">
             <p className="text-sm text-slate-500">
               TechWisdom Technologies reserves the right to change these conditions from time to time as it sees fit and your continued use of the site will signify your acceptance of any adjustment to these terms.
             </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsConditions;