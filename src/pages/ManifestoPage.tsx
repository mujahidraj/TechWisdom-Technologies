import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Quote, Fingerprint, Zap, Heart, ShieldCheck, PenTool, 
  Laptop, BookOpen, Smile, Users, Target, Lightbulb 
} from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

// --- INTERACTIVE BACKGROUND (Shared) ---
const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    </div>
  );
};

const ManifestoPage = () => {
  
  // 8 Culture Boxes
  const cultureCodes = [
    { title: "Remote First", icon: Laptop, desc: "Work from anywhere. We value output over hours." },
    { title: "Paid Learning", icon: BookOpen, desc: "Budget for courses & conferences." },
    { title: "Wellness", icon: Smile, desc: "Mental health days & gym stipends." },
    { title: "Team Retreats", icon: Users, desc: "Quarterly meetups in fun locations." },
    { title: "Radical Trust", icon: Target, desc: "Full autonomy and ownership." },
    { title: "Meritocracy", icon: Zap, desc: "Best ideas win, regardless of title." },
    { title: "Tech Talks", icon: Lightbulb, desc: "Weekly demos & knowledge sharing." },
    { title: "Inclusive", icon: Heart, desc: "Diversity is our greatest strength." }
  ];

  return (
    <Layout>
      <SEOHead title="The Manifesto - Our Why" description="The core beliefs and philosophy driving TechWisdom Technologies." path="/manifesto" />
      
      <InteractiveBackground />

      <div className="relative z-10 text-slate-100 font-sans selection:bg-blue-500/30">
        
        {/* --- HEADER --- */}
        <section className="relative pt-32 pb-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 mb-6 backdrop-blur-md">
              <Fingerprint size={14} className="text-purple-400" /> Our DNA
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-8">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">TechWisdom</span><br />
              Manifesto
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed font-light">
              We believe the digital world is cluttered with noise. <br className="hidden md:block"/>
              We are here to bring clarity, purpose, and excellence back to technology.
            </p>
          </motion.div>
        </section>

        {/* --- THE CREED --- */}
        <section className="py-12 px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative p-8 md:p-16 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden"
            >
              <Quote className="absolute top-8 left-8 w-16 h-16 text-white/5 -scale-x-100" />
              <Quote className="absolute bottom-8 right-8 w-16 h-16 text-white/5" />
              
              <div className="relative z-10 space-y-8 text-lg md:text-xl text-slate-300 leading-loose font-light">
                <p>
                  <strong className="text-white font-bold">We exist to prove that quality still matters.</strong> In an age of templates, AI-generated generic content, and rushed deadlines, we choose the path of the artisan.
                </p>
                <p>
                  We believe that a website is not just a URL—it is your global headquarters. An app is not just code—it is an extension of your user's capability.
                </p>
                <p>
                  We promise to never sell you something you don't need. We promise to challenge your ideas if we think there is a better way. We promise to treat your budget as if it were our own money.
                </p>
                <p className="text-white font-medium italic">
                  We are not a vendor. We are your digital co-founders.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- LEADERSHIP VOICES (ADDED) --- */}
        <section className="py-24 bg-slate-900/20 border-y border-white/5">
          <div className="container px-4 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Leadership Perspective</h2>
              <p className="text-slate-400">Insights from those who steer the ship.</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Raj (Founder) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative p-8 rounded-3xl bg-slate-900/60 border border-blue-500/20 backdrop-blur-md"
              >
                <Quote className="absolute top-6 left-6 text-blue-500/20 w-12 h-12" />
                <div className="relative z-10">
                  <p className="text-lg text-slate-300 italic mb-6 leading-relaxed">
                    "I bridge the gap between complex engineering and high-level business goals, designing scalable web ecosystems that drive growth. My focus is on merging technical precision with strategic foresight."
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-blue-500">
                      <AvatarImage src="https://i.postimg.cc/d0LwTwVh/Raj-1.png" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-white font-bold text-xl">Mujahid Rashid (Raj)</h4>
                      <p className="text-blue-400 text-sm">Founder & Full Stack Developer</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Fidbi (CEO) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative p-8 rounded-3xl bg-slate-900/60 border border-purple-500/20 backdrop-blur-md"
              >
                <Quote className="absolute top-6 left-6 text-purple-500/20 w-12 h-12" />
                <div className="relative z-10">
                  <p className="text-lg text-slate-300 italic mb-6 leading-relaxed">
                    "I balance strategic foresight with practitioner-level skill, ensuring that every business decision is grounded in technical feasibility. My focus is on scaling company infrastructure and revenue simultaneously."
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-purple-500">
                      <AvatarImage src="https://i.postimg.cc/vHbytWm9/Fidbi.png" />
                      <AvatarFallback>FH</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-white font-bold text-xl">Fidbi Hasan</h4>
                      <p className="text-purple-400 text-sm">CEO & Full Stack Developer</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- CULTURE GRID (8 BOXES ADDED) --- */}
        <section className="py-24 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Our Culture Code</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                The principles that guide our daily decisions and interactions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cultureCodes.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="h-full bg-slate-900/50 border border-white/10 hover:border-blue-500/30 hover:bg-slate-800/60 transition-all group">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <item.icon size={24} />
                      </div>
                      <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SIGNATURE / CTA --- */}
        <section className="py-24 px-4 text-center border-t border-white/5">
          <div className="container max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to build something <span className="text-purple-400">meaningful?</span>
            </h2>
            <p className="text-slate-400">
              If this manifesto resonates with you, we are probably a perfect fit.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-blue-50 px-10 h-14 rounded-full text-lg font-bold shadow-xl shadow-blue-900/20">
                Let's Work Together
              </Button>
            </Link>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default ManifestoPage;