import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Gavel, AlertCircle, CheckCircle, Scale, ShieldAlert, Globe, 
  Info, BookOpen, Link as LinkIcon, XCircle, FileText, Mail, Phone, MapPin 
} from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';

// --- INTERACTIVE BACKGROUND (Same as before) ---
const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateParallax = (factor: number) => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { x, y };
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020617] pointer-events-none">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-purple-600/10 via-blue-600/5 to-transparent blur-[120px]" />
      <div className="absolute bottom-0 inset-x-0 h-[500px] bg-gradient-to-t from-blue-600/10 via-purple-600/5 to-transparent blur-[120px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.1), transparent 40%)`,
        }}
      />
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className={`absolute rounded-full ${i % 2 === 0 ? 'bg-purple-500' : 'bg-blue-500'}`}
            initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight + 100, opacity: 0 }}
            animate={{ y: -100, opacity: [0, 0.3, 0] }}
            transition={{ duration: Math.random() * 12 + 8, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
            style={{ width: Math.random() * 3 + 1 + 'px', height: Math.random() * 3 + 1 + 'px' }}
          />
        ))}
      </div>
      <motion.div className="absolute inset-0" animate={calculateParallax(0.015)} transition={{ type: "tween", ease: "linear", duration: 0.2 }}>
        <div className="absolute top-[30%] left-[15%] w-1.5 h-1.5 bg-purple-400 rounded-full opacity-20 blur-[1px]" />
        <div className="absolute bottom-[20%] right-[10%] w-2 h-2 bg-blue-400 rounded-full opacity-20 blur-[1px]" />
      </motion.div>
    </div>
  );
};

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <SEOHead title="Terms & Conditions" description="Legal agreement and terms of service for TechWisdom Technologies." path="/terms-conditions" />

      {/* --- BACKGROUND --- */}
      <InteractiveBackground />

      <div className="relative z-10 text-slate-300 pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 mb-6 shadow-lg shadow-purple-500/10">
              <Scale className="text-purple-400 w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Terms & Conditions</h1>
            <p className="text-slate-400 text-lg">Last updated: February 01, 2026</p>
          </motion.div>

          {/* Main Legal Container */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-12 text-sm md:text-base"
          >
            
            {/* 1. Interpretation & Definitions */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><BookOpen size={24} /></div>
                <h2 className="text-2xl font-bold text-white">Interpretation and Definitions</h2>
              </div>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p><strong>Interpretation:</strong> The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                <p className="text-white font-medium mb-2 mt-4">Definitions:</p>
                <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                  <li><strong>Affiliate:</strong> An entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
                  <li><strong>Country:</strong> Refers to Bangladesh.</li>
                  <li><strong>Company:</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to <span className="text-blue-400">TechWisdom Technologies</span>, SADHIN GATE , BLOCK-C, BASHUNDHARA R/A, Dhaka - 1212.</li>
                  <li><strong>Device:</strong> Any device that can access the Service such as a computer, a cell phone or a digital tablet.</li>
                  <li><strong>Service:</strong> Refers to the Website.</li>
                  <li><strong>Terms and Conditions:</strong> (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</li>
                  <li><strong>Third-Party Social Media Service:</strong> Any services or content (including data, information, products or services) provided by a third-party that is displayed, included or made available by the Service.</li>
                  <li><strong>Website:</strong> Refers to techwisdom, accessible from <a href="https://techwisdom.site/" className="text-blue-400 hover:underline">https://techwisdom.site/</a></li>
                  <li><strong>You:</strong> The individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                </ul>
              </div>
            </section>

            {/* 2. Acknowledgment */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><CheckCircle size={24} /></div>
                <h2 className="text-2xl font-bold text-white">Acknowledgment</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                <br /><br />
                Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service. By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
                <br /><br />
                You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service. Your access to and use of the Service is also subject to Our Privacy Policy.
              </p>
            </section>

            {/* 3. Links to Other Websites */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><LinkIcon size={24} /></div>
                <h2 className="text-2xl font-bold text-white">Links to Other Websites</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Our Service may contain links to third-party websites or services that are not owned or controlled by the Company. The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such websites or services.
                <br /><br />
                We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.
              </p>
            </section>

            {/* 4. Termination */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-400"><XCircle size={24} /></div>
                <h2 className="text-2xl font-bold text-white">Termination</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions. Upon termination, Your right to use the Service will cease immediately.
              </p>
            </section>

            {/* 5. Limitation of Liability */}
            <section className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-400"><ShieldAlert size={24} /></div>
                <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
                <br /><br />
                To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of these Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
              </p>
            </section>

            {/* 6. "AS IS" and "AS AVAILABLE" Disclaimer */}
            <section className="bg-orange-500/5 border border-orange-500/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400"><AlertCircle size={24} /></div>
                <h2 className="text-2xl font-bold text-white">"AS IS" Disclaimer</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company expressly disclaims all warranties, whether express, implied, statutory or otherwise, including implied warranties of merchantability, fitness for a particular purpose, title and non-infringement.
                <br /><br />
                Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.
              </p>
            </section>

            {/* 7. Governing Law & Disputes */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Gavel size={24} /></div>
                <h2 className="text-2xl font-bold text-white">Governing Law</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                The laws of the Country, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
                <br /><br />
                <strong>Disputes Resolution:</strong> If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
              </p>
            </section>

            {/* 8. Compliance & Legal */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Globe size={24} /></div>
                <h2 className="text-2xl font-bold text-white">Compliance & Severability</h2>
              </div>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p><strong>For European Union (EU) Users:</strong> If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.</p>
                <p><strong>United States Legal Compliance:</strong> You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</p>
                <p><strong>Severability:</strong> If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>
                <p><strong>Waiver:</strong> Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.</p>
              </div>
            </section>

            {/* 9. Changes to Terms */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><FileText size={24} /></div>
                <h2 className="text-2xl font-bold text-white">Changes to These Terms</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion. By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms.
              </p>
            </section>

            {/* 10. Contact Us */}
            <section className="pt-8 border-t border-white/10">
              <div className="bg-slate-950/50 border border-white/5 p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Info size={24} /></div>
                  <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                </div>
                <p className="text-slate-400 mb-6">If you have any questions about these Terms and Conditions, You can contact us:</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Mail className="text-blue-400 mt-1 shrink-0" size={20} />
                    <div>
                      <h4 className="text-white font-medium">Email</h4>
                      <a href="mailto:twtech.contact@gmail.com" className="text-slate-400 hover:text-white transition-colors">twtech.contact@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="text-blue-400 mt-1 shrink-0" size={20} />
                    <div>
                      <h4 className="text-white font-medium">Phone</h4>
                      <a href="tel:+8801799269699" className="text-slate-400 hover:text-white transition-colors">01799269699</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:col-span-2">
                    <MapPin className="text-blue-400 mt-1 shrink-0" size={20} />
                    <div>
                      <h4 className="text-white font-medium">Office Address</h4>
                      <p className="text-slate-400">SADHIN GATE , BLOCK-C, Bashundhara R/A, Dhaka - 1212</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditions;