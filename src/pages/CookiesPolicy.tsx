import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cookie, Info, Settings, Shield, Globe, 
  CheckCircle, XCircle, Mail, Phone, MapPin, List 
} from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';

// --- INTERACTIVE BACKGROUND (Same as previous pages) ---
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
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent blur-[120px]" />
      <div className="absolute bottom-0 inset-x-0 h-[500px] bg-gradient-to-t from-purple-600/10 via-blue-600/5 to-transparent blur-[120px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
        }}
      />
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className={`absolute rounded-full ${i % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}
            initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight + 100, opacity: 0 }}
            animate={{ y: -100, opacity: [0, 0.3, 0] }}
            transition={{ duration: Math.random() * 12 + 8, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
            style={{ width: Math.random() * 3 + 1 + 'px', height: Math.random() * 3 + 1 + 'px' }}
          />
        ))}
      </div>
      <motion.div className="absolute inset-0" animate={calculateParallax(0.015)} transition={{ type: "tween", ease: "linear", duration: 0.2 }}>
        <div className="absolute top-[30%] left-[15%] w-1.5 h-1.5 bg-blue-400 rounded-full opacity-20 blur-[1px]" />
        <div className="absolute bottom-[20%] right-[10%] w-2 h-2 bg-purple-400 rounded-full opacity-20 blur-[1px]" />
      </motion.div>
    </div>
  );
};

const CookiesPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <SEOHead title="Cookies Policy" description="Information about how TechWisdom Technologies uses cookies." path="/cookies-policy" />

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
            <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 mb-6 shadow-lg shadow-blue-500/10">
              <Cookie className="text-blue-400 w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Cookies Policy</h1>
            <p className="text-slate-400 text-lg">Last updated: February 01, 2026</p>
          </motion.div>

          {/* Main Content Container */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-12 text-sm md:text-base"
          >
            
            {/* 1. What are Cookies */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Info size={24} /></div>
                <h2 className="text-2xl font-bold text-white">What are Cookies?</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                <br /><br />
                TechWisdom Technologies ("us", "we", or "our") uses cookies to help us improve your experience when you browse our website and to analyze how our site is used.
              </p>
            </section>

            {/* 2. How We Use Cookies */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Settings size={24} /></div>
                <h2 className="text-2xl font-bold text-white">How We Use Cookies</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Shield size={18} className="text-emerald-400" /> Essential Cookies
                  </h3>
                  <p className="text-sm text-slate-400">
                    These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
                  </p>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Globe size={18} className="text-blue-400" /> Performance & Analytics
                  </h3>
                  <p className="text-sm text-slate-400">
                    These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous.
                  </p>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <List size={18} className="text-purple-400" /> Functionality Cookies
                  </h3>
                  <p className="text-sm text-slate-400">
                    These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Managing Cookies */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><CheckCircle size={24} /></div>
                <h2 className="text-2xl font-bold text-white">Managing Your Preferences</h2>
              </div>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="http://www.aboutcookies.org" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">www.aboutcookies.org</a> or <a href="http://www.allaboutcookies.org" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">www.allaboutcookies.org</a>.
                </p>
                <p>
                  Find out how to manage cookies on popular browsers:
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-emerald-500">
                  <li><a href="https://support.google.com/accounts/answer/61416?co=GENIE.Platform%3DDesktop&hl=en" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white transition-colors">Google Chrome</a></li>
                  <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white transition-colors">Microsoft Edge</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white transition-colors">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white transition-colors">Apple Safari</a></li>
                </ul>
              </div>
            </section>

            {/* 4. Changes */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400"><XCircle size={24} /></div>
                <h2 className="text-2xl font-bold text-white">Changes to this Policy</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                We may update our Cookies Policy from time to time. We will notify you of any changes by posting the new Cookies Policy on this page. You are advised to review this Cookies Policy periodically for any changes.
              </p>
            </section>

            {/* Contact Section */}
            <section className="pt-8 border-t border-white/10">
              <div className="bg-slate-950/50 border border-white/5 p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Mail size={24} /></div>
                  <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                </div>
                <p className="text-slate-400 mb-6">If you have any questions about our use of cookies, please contact us:</p>
                
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

export default CookiesPolicy;