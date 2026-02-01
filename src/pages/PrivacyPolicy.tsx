import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Lock, Eye, FileText, Mail, Server, Cookie, Users, CheckCircle, 
  MapPin, Phone, Globe, AlertCircle 
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
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-600/20 via-purple-600/5 to-transparent blur-[120px]" />
      <div className="absolute bottom-0 inset-x-0 h-[500px] bg-gradient-to-t from-indigo-600/20 via-blue-600/5 to-transparent blur-[120px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 40%)`,
        }}
      />
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className={`absolute rounded-full ${i % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}
            initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight + 100, opacity: 0 }}
            animate={{ y: -100, opacity: [0, 0.4, 0] }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
            style={{ width: Math.random() * 4 + 1 + 'px', height: Math.random() * 4 + 1 + 'px' }}
          />
        ))}
      </div>
      <motion.div className="absolute inset-0" animate={calculateParallax(0.02)} transition={{ type: "tween", ease: "linear", duration: 0.2 }}>
        <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-blue-500 rounded-full opacity-20 blur-[1px]" />
      </motion.div>
    </div>
  );
};

const PrivacyPolicy = () => {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <SEOHead title="Privacy Policy" description="How TechWisdom handles and protects your data." path="/privacy-policy" />
      
      {/* --- BACKGROUND --- */}
      <InteractiveBackground />

      <div className="relative z-10 text-slate-300 pt-24 pb-20 text-sm md:text-base">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 mb-4 shadow-lg shadow-blue-500/10">
              <Shield className="text-blue-400 w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Privacy Policy</h1>
            <p className="text-slate-400 text-lg">Last updated: 1 February 2026</p>
          </motion.div>

          {/* Main Content Container */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-12"
          >
            
            {/* Intro */}
            <section>
              <p className="leading-relaxed">
                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                <br /><br />
                We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </section>

            {/* 1. Definitions */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  <FileText size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">1. Interpretation and Definitions</h2>
              </div>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p><strong>Interpretation:</strong> The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                <p className="text-white font-medium mb-2 mt-4">Definitions:</p>
                <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                  <li><strong>Account:</strong> A unique account created for You to access our Service or parts of our Service.</li>
                  <li><strong>Company:</strong> (referred to as "We", "Us" or "Our") refers to TechWisdom Technologies.</li>
                  <li><strong>Cookies:</strong> Small files placed on Your device containing details of Your browsing history.</li>
                  <li><strong>Device:</strong> Any device that can access the Service such as a computer, a cellphone, or a digital tablet.</li>
                  <li><strong>Personal Data:</strong> Any information that relates to an identified or identifiable individual.</li>
                  <li><strong>Service:</strong> Refers to the Website.</li>
                  <li><strong>Service Provider:</strong> Any natural or legal person who processes the data on behalf of the Company.</li>
                  <li><strong>Usage Data:</strong> Data collected automatically, either generated by the use of the Service or from the Service infrastructure itself.</li>
                  <li><strong>Website:</strong> Refers to TechWisdom, accessible from <a href="https://techwisdom.site" className="text-blue-400 hover:underline">https://techwisdom.site</a>.</li>
                  <li><strong>You:</strong> The individual accessing or using the Service, or the company/legal entity on behalf of which such individual is accessing or using the Service.</li>
                </ul>
              </div>
            </section>

            {/* 2. Collection & Use */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <Eye size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">2. Collecting Your Personal Data</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Users size={18} className="text-purple-400" /> Personal Data
                  </h3>
                  <p className="text-sm text-slate-400">
                    While using Our Service, We may ask You to provide Us with certain personally identifiable information including:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-slate-400 marker:text-purple-500">
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Address, State, Province, ZIP/Postal code, City</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Server size={18} className="text-blue-400" /> Usage Data
                  </h3>
                  <p className="text-sm text-slate-400">
                    Collected automatically when using the Service. Includes IP address, browser type, pages visited, time spent, and unique device identifiers.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                 <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Cookie size={18} className="text-emerald-400" /> Tracking Technologies
                  </h3>
                  <p className="text-sm text-slate-400 mb-2">
                    We use Cookies and similar tracking technologies to track the activity on Our Service. Technologies used include beacons, tags, and scripts.
                  </p>
                  <p className="text-sm text-slate-400">
                    <strong>Necessary Cookies:</strong> Essential for website operation.<br/>
                    <strong>Functionality Cookies:</strong> Remember your choices (login, language).<br/>
                    <strong>Tracking Cookies:</strong> Track traffic and user behavior.
                  </p>
              </div>
            </section>

            {/* 3. Use of Data */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <CheckCircle size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">3. How We Use Your Data</h2>
              </div>
              <p className="text-slate-400 mb-4">The Company may use Personal Data for the following purposes:</p>
              <div className="grid gap-3">
                {[
                  "To provide and maintain our Service.",
                  "To manage Your Account.",
                  "To contact You via email, phone, or SMS regarding updates.",
                  "To provide news and special offers about similar goods/services.",
                  "To manage Your requests.",
                  "For business transfers (mergers, acquisitions).",
                  "For data analysis and improving our Service."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                    <CheckCircle className="text-blue-500 mt-0.5 shrink-0" size={16} />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Security & Retention */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
                  <Lock size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">4. Security & Retention</h2>
              </div>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  <strong>Retention:</strong> We will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy and to comply with legal obligations.
                </p>
                <p>
                  <strong>Transfer:</strong> Your information may be transferred to computers located outside of Your jurisdiction where data protection laws may differ. Your consent to this Privacy Policy represents Your agreement to that transfer.
                </p>
                <p>
                  <strong>Security:</strong> The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet is 100% secure. We strive to use commercially acceptable means to protect Your data but cannot guarantee absolute security.
                </p>
              </div>
            </section>

            {/* 5. CCPA & GDPR Rights */}
            <section className="bg-slate-800/30 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                  <Globe size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">5. Your Privacy Rights (GDPR & CCPA)</h2>
              </div>
              <div className="space-y-4 text-sm text-slate-400">
                <p><strong className="text-white">GDPR:</strong> If you are in the EU, you have the right to access, correct, delete, or transfer your personal data. You can also object to processing or withdraw consent.</p>
                <p><strong className="text-white">CCPA:</strong> If you are a California resident, you have the right to notice, the right to request disclosure of data collected, the right to opt-out of data sales, the right to deletion, and the right not to be discriminated against.</p>
                <p><strong className="text-white">Do Not Track:</strong> Our Service does not respond to DNT signals.</p>
              </div>
            </section>

            {/* 6. Children's Privacy */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400"><AlertCircle size={24} /></div>
                <h2 className="text-2xl font-bold text-white">6. Children's Privacy</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us.
              </p>
            </section>

            {/* Contact Section */}
            <section className="pt-8 border-t border-white/10">
              <div className="bg-slate-950/50 p-8 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Mail size={24} /></div>
                  <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                </div>
                <p className="text-slate-400 mb-6">If you have any questions about this Privacy Policy, You can contact us:</p>
                
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
                      <h4 className="text-white font-medium">Address</h4>
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

export default PrivacyPolicy;