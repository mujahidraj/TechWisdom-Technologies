import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, Flag, ImageIcon, ArrowDown, Calendar, User, Lightbulb, Coffee, Globe, Briefcase, Heart, BookOpen, Zap, Smile, Laptop, Users, TrendingDown, XCircle, TrendingUp, CheckCircle } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Link, useNavigate } from 'react-router-dom';

// --- INTERACTIVE BACKGROUND (Same as Home) ---
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
      <motion.div className="absolute inset-0" animate={calculateParallax(0.04)} transition={{ type: "tween", ease: "linear", duration: 0.2 }}>
        <div className="absolute top-[80%] left-[20%] w-2 h-2 bg-indigo-400 rounded-full opacity-30 blur-[2px]" />
      </motion.div>
    </div>
  );
};

const AboutPage = () => {
  const { about, team, timeline, gallery } = data;
  const navigate = useNavigate();

  // Scroll Helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      <SEOHead title="About Us - Mission & Vision" description={about.mission.content} path="/about" />
      
      {/* --- BACKGROUND INJECTION --- */}
      <InteractiveBackground />

      {/* --- CONTENT WRAPPER --- */}
      <div className="relative z-10 text-slate-100">

        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="container relative z-10 text-center px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-md bg-slate-900/30">
                Our Story
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                We Are <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{data.site.name}</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
                We are dedicated to redefining the digital experience by merging technical excellence with human-centric strategy.
              </p>

              <div className="pt-8 flex justify-center gap-4">
               <Link to="/work">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                   // Scrolls to gallery
                >
                  View Our Work
                </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="text-white border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full px-8">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce"
            >
              <ArrowDown size={28} />
            </motion.div>
          </div>
        </section>

        {/* ==================== 2. CORE VALUES ==================== */}
        <section className="py-24 bg-transparent relative z-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16 space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Driven by Purpose</h2>
              <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl/relaxed">
                Our core values define who we are and how we work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mission */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card className="h-full bg-slate-900/40 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center mb-4 border border-blue-500/20">
                      <Compass size={24} />
                    </div>
                    <CardTitle className="text-white">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400 leading-relaxed">{about.mission.content}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Vision */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <Card className="h-full bg-slate-900/40 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-lg flex items-center justify-center mb-4 border border-purple-500/20">
                      <Target size={24} />
                    </div>
                    <CardTitle className="text-white">{about.vision?.title || "Our Vision"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400 leading-relaxed">{about.vision?.content || "Defining the future of digital excellence."}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Goals */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <Card className="h-full bg-slate-900/40 backdrop-blur-sm border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center mb-4 border border-emerald-500/20">
                      <Flag size={24} />
                    </div>
                    <CardTitle className="text-white">Strategic Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {about.goals?.map((goal, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="text-emerald-500 font-bold">✓</span> {goal}
                        </li>
                      )) || <li>Add goals to data.json</li>}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

                {/* ==================== 2.5 PAIN VS SOLUTION ==================== */}
                <section className="py-24 bg-transparent relative overflow-hidden">
                  <div className="container px-4">
                    <div className="text-center mb-16">
                      <Badge variant="outline" className="mb-4 bg-red-500/10 text-red-400 border border-red-500/20">The Challenge</Badge>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Standard</h2>
                      <p className="text-slate-400 max-w-2xl mx-auto">
                        Slow load times, broken user journeys, and outdated tech stacks are silently killing your conversion rates.
                      </p>
                    </div>
        
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                      {/* The Old Way (Pain) */}
                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-red-950/20 border border-red-500/20 rounded-3xl p-8 relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full" />
                        <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-3">
                          <TrendingDown size={24} /> The Old Way
                        </h3>
                        <ul className="space-y-4">
                          {[
                            "Templates that look like everyone else",
                            "Spaghetti code that breaks on every update",
                            "3+ second page load speeds (losing 50% of traffic)",
                            "Vulnerable to basic security threats",
                            "Developers who vanish after launch"
                          ].map((pain, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300">
                              <XCircle size={20} className="text-red-500/70 shrink-0 mt-0.5" />
                              <span className="text-sm leading-relaxed">{pain}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
        
                      {/* The TechWisdom Way (Solution) */}
                      <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-emerald-950/20 border border-emerald-500/30 rounded-3xl p-8 relative overflow-hidden group shadow-[0_0_30px_rgba(16,185,129,0.05)]"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
                        <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
                          <TrendingUp size={24} /> The TechWisdom Standard
                        </h3>
                        <ul className="space-y-4">
                          {[
                            "100% Custom architecture built for your exact needs",
                            "Clean, documented code that scales effortlessly",
                            "Sub-second load times optimized for Core Web Vitals",
                            "Bank-grade security and data encryption",
                            "Long-term partnership with proactive maintenance"
                          ].map((solution, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-200">
                              <CheckCircle size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                              <span className="text-sm leading-relaxed">{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                </section>

        <Separator className="bg-white/10" />

        {/* ==================== 3. HISTORY TIMELINE ==================== */}
        <section className="py-24 bg-transparent overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center mb-20 text-center space-y-4">
              <Badge variant="secondary" className="px-4 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/20">Our Journey</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Defining Moments</h2>
              <p className="text-slate-400 max-w-2xl">
                From our humble beginnings to industry leadership.
              </p>
            </div>

            <div className="max-w-5xl mx-auto relative">
              {/* Central Vertical Line */}
              <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 md:-translate-x-1/2"></div>

              <div className="space-y-16">
                {timeline.map((item, i) => {
                  const isEven = i % 2 === 0;
                  
                  return (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                    >
                      {/* Content Side */}
                      <div className="flex-1 w-full pl-16 md:pl-0">
                        <Card className={`relative group border border-white/10 bg-slate-900/60 backdrop-blur-md ${isEven ? 'md:text-left' : 'md:text-right'} hover:border-blue-500/30 transition-colors`}>
                          <CardHeader className="pb-2">
                             <div className={`flex items-center gap-2 mb-1 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <Badge variant="outline" className="font-mono text-base border-white/20 text-white">{item.year}</Badge>
                             </div>
                             <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                          </CardContent>

                          {/* Horizontal Connector Line */}
                          <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5 w-8 bg-white/10 
                              ${isEven ? '-right-8' : '-left-8'}
                              group-hover:bg-blue-500/50 transition-colors
                          `}></div>
                        </Card>
                      </div>

                      {/* Center Pivot Point */}
                      <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 w-8 h-8 rounded-full bg-slate-900 border-4 border-white/20 z-10 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                          <div className={`w-2.5 h-2.5 rounded-full ${isEven ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-purple-500 shadow-[0_0_10px_#a855f7]'}`}></div>
                      </div>

                      {/* Empty Side (Desktop) */}
                      <div className="flex-1 hidden md:block"></div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 4. TEAM SECTION ==================== */}
        <section className="py-24 bg-transparent">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center mb-16 text-center space-y-2">
               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">Meet the Team</h2>
               <p className="text-slate-400">The innovators behind the magic.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500"></div>
                  
                  <div className="relative h-full bg-slate-900 rounded-2xl p-8 border border-white/10 overflow-hidden flex flex-col items-center text-center">
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-blue-900/20 to-transparent opacity-50" />

                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
                      <Avatar className="w-32 h-32 border-4 border-slate-900 shadow-xl group-hover:scale-105 transition-transform duration-500 ring-2 ring-white/10 group-hover:ring-blue-500/50">
                        <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                        <AvatarFallback className="bg-slate-800 text-3xl font-bold text-slate-400">
                           {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="relative z-10 space-y-3">
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                        {member.name}
                      </h3>
                      
                      <Badge variant="secondary" className="bg-slate-800 text-blue-300 border-white/5 hover:bg-slate-700">
                        {member.role}
                      </Badge>
                      
                      <p className="text-sm text-slate-400 leading-relaxed pt-2">
                        {member.bio}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* --- NEW SECTION 1: OUR PHILOSOPHY (ADDED) --- */}
        {/* ======================================================= */}
        <section className="py-24 bg-slate-900/30 border-y border-white/5">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge variant="outline" className="mb-4 text-purple-400 border-purple-500/30">Our Philosophy</Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Innovation Through <span className="text-purple-400">Empathy</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-6">
                  We believe that the best technology goes unnoticed. It solves problems so seamlessly that it feels like magic. Our philosophy is rooted in deep empathy for the end-user, ensuring that every line of code we write serves a human purpose.
                </p>
                <ul className="space-y-4">
                  {[
                    "User-First Architecture",
                    "Sustainable Code Practices",
                    "Radical Transparency"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <div className="p-1 rounded-full bg-purple-500/20 text-purple-400">
                        <Lightbulb size={16} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl" />
                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                  <div className="text-4xl md:text-6xl font-black text-white/10 mb-4">WHY</div>
                  <h3 className="text-2xl font-bold text-white mb-4">We don't just build software. We build legacies.</h3>
                  <p className="text-slate-400 mb-6">
                    Every project is an opportunity to push the boundaries of what is possible on the web. We treat your business as our own.
                  </p>
                  {/* Fixed Button: Use Link if it's internal, otherwise style as link */}
                  <Link to="/manifesto">
                    <Button variant="link" className="text-purple-400 p-0 hover:text-purple-300">Read our Manifesto &rarr;</Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* --- NEW SECTION 2: CULTURE & LIFE (ADDED & EXPANDED) --- */}
        {/* ======================================================= */}
        <section className="py-24 bg-transparent">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">More Than Just Code</h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
                We believe that a great product is a reflection of the people who build it. That's why we've cultivated an environment where creativity thrives, failure is a stepping stone, and diversity is our strength.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">The {data.site.name} DNA</h3>
                <h1 className="text-xl font-bold text-blue-400">Radical Trust & Autonomy</h1>
                <p className="text-slate-400 leading-relaxed">
                  We operate on the belief that exceptional people do their best work when trusted, not managed. We hire capable individuals and empower them to take full ownership of their projects, removing the bottlenecks of micromanagement so they can focus on mastery and execution.
                </p>
                <h1 className="text-xl font-bold text-blue-400">Open Communication & Transparency</h1>
                <p className="text-slate-400 leading-relaxed">
                  We believe in open, honest communication. Every team member has access to the same information and is encouraged to speak up, ask questions, and share ideas freely. This transparency fosters a culture of trust and mutual respect.
                </p>
                <h1 className="text-xl font-bold text-blue-400">Continuous Learning & Growth</h1>
                <p className="text-slate-400 leading-relaxed">
                  Innovation takes precedence over hierarchy. We have built an environment where titles take a backseat to the quality of an idea. Whether you are a junior developer or a senior architect, your perspective is valued, and your voice has the power to shape our direction.
                </p>
                <h1 className="text-xl font-bold text-blue-400">Remote-First & Human-Centric</h1>
                <p className="text-slate-400 leading-relaxed">
                  We are unapologetically remote-first but intentionally human-centric. While we celebrate the freedom and flexibility to work from anywhere in the world, we understand that true collaboration is built on real connection. That’s why we cherish our quarterly retreats—dedicated time to disconnect from screens, step away from the code, and genuinely reconnect with each other in nature, building memories and bonds that go far beyond the workspace.
                </p>
                <h1 className="text-xl font-bold text-blue-400">Meaningful Disconnection</h1>
                <p className="text-slate-400 leading-relaxed">
                  To balance our digital-first nature, we prioritize quarterly retreats designed for genuine connection. These are dedicated times to step away from screens, enjoy nature, and build the deep, personal bonds that turn a group of coworkers into a cohesive team.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {/* --- Culture Cards --- */}
                <Card className="bg-slate-900/50 border border-white/10 p-4 hover:border-blue-500/30 transition-colors">
                  <Laptop className="w-8 h-8 text-blue-400 mb-2" />
                  <h4 className="text-white font-semibold">Remote First</h4>
                  <p className="text-xs text-slate-500">Work from anywhere in the world.</p>
                </Card>

                <Card className="bg-slate-900/50 border border-white/10 p-4 hover:border-purple-500/30 transition-colors">
                  <BookOpen className="w-8 h-8 text-purple-400 mb-2" />
                  <h4 className="text-white font-semibold">Paid Learning</h4>
                  <p className="text-xs text-slate-500">Budget for courses & conferences.</p>
                </Card>

                <Card className="bg-slate-900/50 border border-white/10 p-4 hover:border-emerald-500/30 transition-colors">
                  <Smile className="w-8 h-8 text-emerald-400 mb-2" />
                  <h4 className="text-white font-semibold">Wellness</h4>
                  <p className="text-xs text-slate-500">Mental health days & gym stipends.</p>
                </Card>

                <Card className="bg-slate-900/50 border border-white/10 p-4 hover:border-orange-500/30 transition-colors">
                  <Users className="w-8 h-8 text-orange-400 mb-2" />
                  <h4 className="text-white font-semibold">Team Retreats</h4>
                  <p className="text-xs text-slate-500">Quarterly meetups in fun locations.</p>
                </Card>

                <Card className="bg-slate-900/50 border border-white/10 p-4 hover:border-pink-500/30 transition-colors">
                  <Target className="w-8 h-8 text-pink-400 mb-2" />
                  <h4 className="text-white font-semibold">Radical Trust</h4>
                  <p className="text-xs text-slate-500">Full autonomy and ownership.</p>
                </Card>

                <Card className="bg-slate-900/50 border border-white/10 p-4 hover:border-cyan-500/30 transition-colors">
                  <Zap className="w-8 h-8 text-cyan-400 mb-2" />
                  <h4 className="text-white font-semibold">Meritocracy</h4>
                  <p className="text-xs text-slate-500">Best ideas win, regardless of title.</p>
                </Card>

                <Card className="bg-slate-900/50 border border-white/10 p-4 hover:border-yellow-500/30 transition-colors">
                  <Lightbulb className="w-8 h-8 text-yellow-400 mb-2" />
                  <h4 className="text-white font-semibold">Tech Talks</h4>
                  <p className="text-xs text-slate-500">Weekly demos & knowledge sharing.</p>
                </Card>

                <Card className="bg-slate-900/50 border border-white/10 p-4 hover:border-red-500/30 transition-colors">
                  <Heart className="w-8 h-8 text-red-400 mb-2" />
                  <h4 className="text-white font-semibold">Inclusive</h4>
                  <p className="text-xs text-slate-500">Diversity is our greatest strength.</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* --- NEW SECTION 3: GLOBAL REACH (ADDED) --- */}
        {/* ======================================================= */}
        <section className="py-24 bg-transparent border-t border-white/5">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-12">Global Impact</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
              {[
                { label: "Countries Served", value: "5+" },
                { label: "Lines of Code", value: "2M+" },
                { label: "Team Members", value: "8+" },
                { label: "Years of Experience", value: "2+" },
                { label: "Satisfied client", value: "15+" },
                { label: "Projects Completed", value: "30+" }
              ].map((stat, i) => (
                <div key={i} className="p-6">
                  <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-blue-400 font-medium tracking-widest uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* --- NEW SECTION 4: JOIN US CTA (ADDED & FIXED) --- */}
        {/* ======================================================= */}
        <section className="py-24 px-6">
          <div className="container mx-auto">
            <div className="relative rounded-3xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 p-10 md:p-20 overflow-hidden text-center">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <Badge className="bg-white/10 text-white hover:bg-white/20 mb-2">We are hiring!</Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-white">Join Our Mission</h2>
                <p className="text-slate-300 text-lg">
                  We are always looking for passionate thinkers and doers. If you want to build the future of digital, we want to hear from you.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/careers">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg shadow-blue-900/20">
                      <Briefcase className="mr-2 h-4 w-4" /> View Openings
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/20 text-black hover:bg-white/10 hover:text-white rounded-full hover:border-white/40 transition-colors"
                    onClick={() => scrollToSection('gallery-section')} // Scroll to gallery on click
                  >
                    <Heart className="mr-2 h-4 w-4" /> Life at {data.site.name}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 5. GALLERY SECTION (EXISTING) ==================== */}
        {/* Added ID for scrolling anchor */}
        <section id="gallery-section" className="py-24 bg-transparent border-t border-white/5">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
               <h2 className="text-3xl font-bold tracking-tighter text-white">Life at {data.site.name}</h2>
               {/* Fixed Button Style: Added border and hover effect to be visible */}
               <Button variant="outline" className="gap-2 text-slate-700 border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20">
                  <ImageIcon size={18} /> View All
               </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery && gallery.map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-xl overflow-hidden shadow-lg border border-white/10 bg-slate-800 ${
                    (i === 0 || i === 3) ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <AspectRatio ratio={16 / 9} className="h-full">
                      <img 
                       src={img.src} 
                       alt={img.alt} 
                       className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 opacity-80 hover:opacity-100"
                       onError={(e) => {e.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'}}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                         <span className="text-white font-medium text-sm">Team Event 2024</span>
                      </div>
                  </AspectRatio>
                </motion.div>
              ))}
              {!gallery && <div className="col-span-full text-center p-10 text-slate-500 border border-dashed border-white/10 rounded-lg">No gallery images found in data.json</div>}
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default AboutPage;