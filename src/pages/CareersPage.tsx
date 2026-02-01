import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// --- ADDED NEW ICONS HERE ---
import { 
  Home, Heart, BookOpen, Clock, Plane, Laptop, 
  MapPin, Briefcase, ArrowRight, Sparkles, Send,
  Coffee, Globe, Zap, Smile, Users, Award, ShieldCheck,
  type LucideIcon
} from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Updated Icon mapping with new icons
const iconMap: Record<string, LucideIcon> = { 
  Home, Heart, BookOpen, Clock, Plane, Laptop, 
  Coffee, Globe, Zap, Smile, Users, Award, ShieldCheck 
};

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

const CareersPage = () => {
  const { careers } = data;

  // --- EXPANDED PERKS LIST (Merged existing JSON data with new items) ---
  const allPerks = [
    ...(careers.perks || []),
    {
      title: "Global Retreats",
      description: "We fly the whole team out once a year to a new destination. Connect with colleagues, explore new cultures, and recharge in style.",
      icon: "Plane"
    },
    {
      title: "Mental Health Support",
      description: "Comprehensive wellness packages including therapy subscriptions, meditation apps, and 'no-questions-asked' mental health days.",
      icon: "Heart"
    },
    {
      title: "Home Office Stipend",
      description: "Get a generous budget to set up your dream workspace. Ergonomic chairs, standing desks, or noise-canceling headphones – it's on us.",
      icon: "Laptop"
    },
    {
      title: "Profit Sharing",
      description: "When the company wins, you win. We distribute a percentage of annual profits to all eligible employees as a year-end bonus.",
      icon: "Award"
    },
    {
      title: "Flexible Hours",
      description: "Not a morning person? No problem. Set your own schedule as long as you attend core meetings and deliver quality work.",
      icon: "Clock"
    },
    {
      title: "Top-Tier Hardware",
      description: "Choose your weapon. Every new joiner gets the latest MacBook Pro or high-end Windows machine, plus a 4K monitor.",
      icon: "Zap"
    }
  ];

  const handleApplyClick = (jobTitle: string) => {
    const email = "mujahidraj65@gmail.com";
    const subject = encodeURIComponent(`Application for ${jobTitle}`);
    const body = encodeURIComponent(`Hi there,\n\nI am writing to apply for the ${jobTitle} position.\n\nPlease find my resume attached.\n\nBest regards,`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleGeneralEmailClick = () => {
    const email = "mujahidraj65@gmail.com";
    const subject = encodeURIComponent("General Job Application / Resume Submission");
    const body = encodeURIComponent("Hi there,\n\nI am interested in joining your team. Please find my resume attached for your review.\n\nBest regards,");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <Layout>
      <SEOHead title="Careers - Join the Team" description={careers.subheadline} path="/careers" />
      
      {/* --- BACKGROUND INJECTION --- */}
      <InteractiveBackground />

      <div className="relative z-10 text-slate-100">

        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="relative py-20 md:py-32 overflow-hidden min-h-[60vh] flex items-center justify-center">
          <div className="container relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-md bg-slate-900/30">
                We are hiring
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
                {careers.headline}
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                {careers.subheadline}
              </p>

              <div className="pt-6 flex justify-center">
                <Button 
                  size="lg" 
                  onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-12 text-base shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-400/20"
                >
                  View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== 2. PERKS & BENEFITS ==================== */}
        <section className="py-24 bg-transparent px-4 relative z-20">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">Why Join Us?</h2>
              <p className="text-slate-400 mt-2 text-lg">Perks that make your life easier and your work better.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allPerks.map((perk, i) => {
                const Icon = iconMap[perk.icon] || Sparkles; // Fallback icon
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="h-full border border-white/10 bg-slate-900/40 backdrop-blur-sm shadow-lg hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                        <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-4 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl font-bold text-white">{perk.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base text-slate-400 leading-relaxed">
                          {perk.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== 3. OPEN POSITIONS ==================== */}
        <section id="open-positions" className="py-24 bg-transparent border-t border-white/5">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16 space-y-4">
              <Badge variant="secondary" className="px-4 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20"> opportunities</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">Open Positions</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Find your next role. We’re looking for passionate people to join our team.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {careers.openings.map((job, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="group border border-white/10 bg-slate-900/60 backdrop-blur-md hover:border-blue-500/50 hover:bg-slate-800/80 transition-all duration-300">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      
                      {/* Left: Job Info */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="secondary" className="bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20">
                            {job.department}
                          </Badge>
                          {job.type === "Full-time" && (
                            <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                              Full-time
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <MapPin size={16} className="text-slate-500" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Briefcase size={16} className="text-slate-500" />
                            {job.type}
                          </span>
                        </div>
                        <p className="text-slate-400 max-w-xl text-sm leading-relaxed mt-2 hidden md:block">
                          {job.description}
                        </p>
                      </div>

                      {/* Right: Action */}
                      <div className="flex-shrink-0">
                        <Button 
                          onClick={() => handleApplyClick(job.title)}
                          className="w-full md:w-auto bg-white text-slate-900 hover:bg-blue-50 transition-colors font-semibold"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {careers.openings.length === 0 && (
                <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-dashed border-white/10 backdrop-blur-sm">
                  <p className="text-slate-500">No open positions at the moment. Check back later!</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==================== 4. GENERAL APPLICATION CTA ==================== */}
        <section className="py-24 bg-transparent border-t border-white/5">
          <div className="container px-4 text-center">
            <div className="max-w-3xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 overflow-hidden px-6 py-16 text-center md:px-12 md:py-20 shadow-2xl backdrop-blur-xl relative">
              
              {/* Decorative Glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles size={32} className="text-blue-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Don't see the right fit?</h3>
                <p className="text-slate-300 mb-8 max-w-lg mx-auto text-lg">
                  We are always looking for talented individuals. Send us your resume and we'll keep you in mind for future openings.
                </p>
                <Button 
                  size="lg" 
                  onClick={handleGeneralEmailClick}
                  className="bg-blue-600 hover:bg-blue-500 text-white h-12 px-8 font-semibold rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-400/20"
                >
                  Email Us Your Resume <Send size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default CareersPage;