import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gavel, AlertCircle, CheckCircle, Scale, ShieldAlert, Globe, Info } from 'lucide-react';

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
            <p className="text-slate-400 text-lg">Please read these terms carefully before using our services.</p>
          </motion.div>

          {/* Main Legal Container */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-12"
          >
            
            {/* 1. Acceptance */}
            <section className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <CheckCircle size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">1. Acceptance of Terms</h2>
              </div>
              <p className="leading-relaxed text-slate-400 text-lg">
                By accessing and using the website of <span className="text-white font-medium">TechWisdom Technologies</span>, you accept and agree to be bound by the terms and provisions of this agreement. Our services are intended for professional use, and usage signifies your consent to our operational guidelines.
              </p>
            </section>

            {/* 2. Intellectual Property */}
            <section className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  <Gavel size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">2. Intellectual Property</h2>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                <p className="leading-relaxed text-slate-400">
                  All original content, features, and functionality provided on this site are the exclusive property of TechWisdom Technologies. This includes:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Source Code', 'Design UI', 'Branding', 'Graphics'].map((item) => (
                    <div key={item} className="px-3 py-2 rounded-lg bg-slate-800/50 border border-white/5 text-center text-xs font-mono text-blue-300">
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500 italic">Protected by international copyright, trademark, and trade secret laws.</p>
              </div>
            </section>

            {/* 3. Limitation of Liability */}
            <section className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
                  <ShieldAlert size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">3. Limitation of Liability</h2>
              </div>
              <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl">
                <p className="leading-relaxed text-slate-400">
                  TechWisdom Technologies, its directors, and affiliates shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the Service. This includes, without limitation, loss of profits, data, or goodwill. We provide our services "as is" without warranties of any kind.
                </p>
              </div>
            </section>

            {/* 4. Governing Law */}
            <section className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <Globe size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">4. Governing Law</h2>
              </div>
              <p className="leading-relaxed text-slate-400 text-lg">
                These Terms shall be governed and construed in accordance with the laws of <span className="text-emerald-400 font-medium">Bangladesh</span>. Any disputes arising from these terms will be handled under the jurisdiction of the courts of Bangladesh.
              </p>
            </section>

            {/* Footer Note */}
            <section className="pt-8 border-t border-white/10">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-950/50 border border-white/5">
                <Info className="text-blue-400 shrink-0 mt-1" size={20} />
                <p className="text-sm text-slate-500 leading-relaxed">
                  TechWisdom Technologies reserves the right to modify these conditions at any time. Your continued use of the site signifies your acceptance of any adjustments. We recommend reviewing this page periodically for updates.
                </p>
              </div>
            </section>

          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditions;