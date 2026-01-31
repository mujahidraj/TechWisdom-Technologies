import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Mail, Server, Cookie, Users, CheckCircle } from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';

// --- INTERACTIVE BACKGROUND ---
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
      <SEOHead title="Privacy Policy" description="How we handle and protect your data." path="/privacy-policy" />
      
      {/* --- BACKGROUND INJECTION --- */}
      <InteractiveBackground />

      <div className="relative z-10 text-slate-100 pt-24 pb-20">
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
            <p className="text-slate-400 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          </motion.div>

          {/* Main Content Container (Glassmorphism) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-16"
          >
            
            {/* Section 1: Collection */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  <Eye size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
              </div>
              <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                At TechWisdom Technologies, we collect specific types of information to ensure the best possible experience for our users. This allows us to tailor our services to your needs.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors">
                  <Users className="text-purple-400 mb-4 w-8 h-8" />
                  <h3 className="text-white font-semibold mb-2">Personal Data</h3>
                  <p className="text-sm text-slate-400">Name, email address, phone number, and company details provided via forms.</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors">
                  <Server className="text-blue-400 mb-4 w-8 h-8" />
                  <h3 className="text-white font-semibold mb-2">Usage Data</h3>
                  <p className="text-sm text-slate-400">Information on how services are accessed (IP address, browser type, pages visited).</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                  <Cookie className="text-emerald-400 mb-4 w-8 h-8" />
                  <h3 className="text-white font-semibold mb-2">Cookies</h3>
                  <p className="text-sm text-slate-400">We use cookies to store user preferences and track session information.</p>
                </div>
              </div>
            </section>

            {/* Section 2: Usage */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <FileText size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">2. How We Use Your Data</h2>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6 text-lg">
                We strictly use your data for legitimate business purposes:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle className="text-blue-500 mt-1 shrink-0" size={20} />
                  <div>
                    <h3 className="text-white font-medium">Service Delivery</h3>
                    <p className="text-slate-400 text-sm">To provide, operate, and maintain our websites and digital services efficiently.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle className="text-blue-500 mt-1 shrink-0" size={20} />
                  <div>
                    <h3 className="text-white font-medium">Communication</h3>
                    <p className="text-slate-400 text-sm">To contact you regarding updates, offers, security alerts, and customer support.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle className="text-blue-500 mt-1 shrink-0" size={20} />
                  <div>
                    <h3 className="text-white font-medium">Improvement</h3>
                    <p className="text-slate-400 text-sm">To analyze user behavior and improve website functionality and user experience.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Protection */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <Lock size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">3. Data Protection</h2>
              </div>
              <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 p-6 rounded-2xl border border-emerald-500/20">
                <p className="leading-relaxed text-slate-300">
                  We implement industry-standard security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties without your consent, except for trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section className="pt-8 border-t border-white/10">
              <div className="bg-slate-950/50 p-8 rounded-2xl border border-white/10 text-center">
                <div className="inline-flex p-3 bg-blue-500/10 rounded-full text-blue-400 mb-4">
                  <Mail size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Have Questions?
                </h2>
                <p className="text-slate-400 mb-6 max-w-lg mx-auto">
                  If you have any questions or concerns about this Privacy Policy, please do not hesitate to contact us.
                </p>
                <a 
                  href="mailto:twtech@gmail.com" 
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-lg font-medium hover:underline underline-offset-4"
                >
                  twtech@gmail.com
                </a>
              </div>
            </section>

          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;