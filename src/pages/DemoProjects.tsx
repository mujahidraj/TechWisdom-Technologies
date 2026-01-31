import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Layout as LayoutIcon, Code2, Layers, MessageSquare, Plus, Minus, HelpCircle, 
  Sparkles, MonitorPlay, Smartphone, Palette, TrendingUp, Cpu, Server, PenTool, Eye
} from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import data from '@/data.json';
import Layout from '@/components/layout/Layout';
import FloatingChatButton from '@/components/layout/FloatingChatButton'; 
import FloatingSpeedButton from '@/components/layout/FloatingSpeedButton';

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

const DemoProjects = () => {
  const { demoProjects } = data;
  const categories = ['All', ...new Set(demoProjects.map(item => item.category))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? demoProjects 
    : demoProjects.filter(project => project.category === activeCategory);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { question: "Do you also build the Backend and Database?", answer: "Yes, we are Full-Stack experts. While these public demos focus on UI/UX for instant browsing, our client deliverables include robust, secure backends. We specialize in Node.js, Python, and Go, coupled with scalable databases like MongoDB or PostgreSQL." },
    { question: "Why are functionalities simulated in these demos?", answer: "We simulate data processing here to protect user privacy and ensure lightning-fast performance for you (the viewer). In a real project, we replace these simulations with secure API calls, authentication systems, and real-time database connections." },
    { question: "Can you build a complex SaaS platform, not just a website?", answer: "Absolutely. These demos showcase our design capabilities, but our engineering team specializes in complex architecture. We build ERPs, CRMs, and SaaS platforms with complex logic, user roles, and payment gateways." },
    { question: "Why might I encounter bugs or glitches?", answer: "These projects are our 'Innovation Lab'. We use them to test cutting-edge features and animations before rolling them out to clients. This allows us to offer you the latest tech, but it means the demo environment is constantly evolving." },
    { question: "Is the data I enter in these demos saved?", answer: "Generally, no. For security and privacy, most input forms in these demos do not transmit data to a real server. They are designed to show you user interface interactions (validation, success states) rather than process actual information." },
    { question: "Do these demos represent your final delivery quality?", answer: "They represent our 'Visual & Interactive' quality. A final delivered project goes through rigorous QA, backend integration, and security hardening which is skipped here to allow instant public access." },
    { question: "Can you customize a design from here for my brand?", answer: "Absolutely. We can take the core logic of any demo here and completely skin it with your brand colors, typography, and content. This is often the fastest way to get your MVP (Minimum Viable Product) to market." },
    { question: "Are these optimized for mobile?", answer: "Yes, 100%. We practice 'Mobile-First' development. You can open any of these links on your phone to see how the interface adapts perfectly to smaller screens." }
  ];

  return (
    <Layout>
      <SEOHead 
        title="Demo Projects" 
        description="Explore our portfolio of demo projects showcasing our capabilities in Web Development and Custom Software." 
      />

      {/* --- BACKGROUND INJECTION --- */}
      <InteractiveBackground />

      <div className="relative z-10 text-slate-100">

        {/* --- HERO SECTION --- */}
        <div className="relative pt-32 pb-32 lg:pt-40 lg:pb-40 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 text-center">
            
            {/* Hero Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md"
            >
              <Layers size={14} /> Demonstration Environment
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Our demonstration is beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">digital excellence</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
            >
              Explore our ready-made solutions and case studies. From Real Estate platforms to Healthcare apps, see how we engineer success.
            </motion.p>
          </div>
        </div>

        {/* --- PREMIUM SHOWCASE CONTEXT SECTION --- */}
        <div className="container mx-auto px-6 -mt-16 relative z-20 pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl max-w-6xl mx-auto relative overflow-hidden"
          >
            {/* Decorative Glows */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col gap-10">
              
              {/* 1. Header */}
              <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row gap-6 items-start md:items-end justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 text-xs font-bold uppercase tracking-widest mb-4">
                    <Sparkles size={12} className="text-yellow-400" /> 
                    Prototype Environment
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                    Experience Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Digital Craftsmanship</span>
                  </h3>
                </div>
                <p className="text-slate-400 text-lg md:text-right max-w-md leading-relaxed font-medium">
                  High-fidelity prototypes designed to showcase our frontend engineering and design standards.
                </p>
              </div>

              {/* 2. Capabilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: MonitorPlay, color: "text-blue-400", title: "Web Development", desc: "Responsive, Modern UI/UX" },
                  { icon: Server, color: "text-indigo-400", title: "Backend Architecture", desc: "Node.js, Python, Go (Production)" },
                  { icon: PenTool, color: "text-emerald-400", title: "UI/UX Design", desc: "Wireframing & Prototyping" },
                  { icon: Smartphone, color: "text-purple-400", title: "Mobile Apps", desc: "iOS & Android Interfaces" },
                  { icon: Palette, color: "text-pink-400", title: "Graphic Design", desc: "Branding & Visual Identity" },
                  { icon: TrendingUp, color: "text-orange-400", title: "Digital Marketing", desc: "SEO & Conversion Strategy" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/50 border border-white/5 hover:bg-slate-800 hover:border-white/10 transition-all duration-300 group">
                    <div className={`p-3 rounded-xl bg-slate-900 shadow-inner border border-white/5 group-hover:scale-110 transition-transform ${item.color}`}>
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3. PROFESSIONAL DISCLAIMER BOX */}
              <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row gap-5 items-start shadow-inner">
                <div className="bg-slate-950 p-3 rounded-xl shadow-sm border border-white/5 text-blue-400 shrink-0">
                   <Cpu size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Important: Demonstration Purposes Only
                  </h4>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    To ensure instant loading speeds and public accessibility, these demos run in a <strong>Frontend-First environment</strong>. 
                    Real-world functionalities (Authentication, Database Storage, Payments) are <strong>simulated visually</strong>. 
                    <br className="mt-2" />
                    <span className="text-white font-semibold">For client projects:</span> We build fully functional, secure, and scalable Backends (APIs & Databases) tailored to your specific business logic.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="container mx-auto px-6 relative z-20 pb-20">
          
          {/* Category Filter */}
          <div className="bg-slate-900/60 p-2 rounded-2xl shadow-xl border border-white/10 max-w-fit mx-auto mb-16 flex flex-wrap justify-center gap-2 backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link 
                    to={`/demo-projects/${project.id}`} 
                    className="group flex flex-col bg-slate-900/40 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 h-full backdrop-blur-sm transform hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden bg-slate-800">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      
                      {/* Demo Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white rounded shadow-md flex items-center gap-1">
                          <Eye size={10} /> Demo Preview
                        </span>
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="px-6 py-2 bg-white text-slate-900 font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                          View Case Study
                        </span>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-blue-300 rounded shadow-md border border-white/10">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
                        {project.shortDescription}
                      </p>

                      {/* Footer Info */}
                      <div className="flex items-center justify-between pt-5 border-t border-white/5 mt-auto">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium bg-slate-800/50 px-2 py-1 rounded-md border border-white/5">
                          <Code2 size={14} className="text-blue-400" />
                          <span>{project.techStack[0]}</span>
                        </div>
                        
                        <span className="flex items-center text-blue-400 text-sm font-bold group-hover:translate-x-1 transition-transform">
                          Details <ArrowRight size={16} className="ml-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* --- CUSTOM DEMO REQUEST CTA --- */}
          <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 to-blue-950 overflow-hidden shadow-2xl shadow-blue-900/20 mb-24 border border-white/10">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
            <div className="relative z-10 px-8 py-12 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="max-w-2xl">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Need a Custom Solution?
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  We have hundreds of internal prototypes (Backends, APIs, Admin Panels) not listed here. 
                  Tell us your requirements, and we'll build a tailored demo for you.
                </p>
              </div>
              <Link 
                to="/contact" 
                className="shrink-0 px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
              >
                <MessageSquare size={20} />
                Request Custom Demo
              </Link>
            </div>
          </div>

          {/* --- FAQ SECTION --- */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider mb-4">
                <HelpCircle size={14} /> Demo FAQs
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-400 mt-4">
                Common questions about the nature of these prototypes.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`bg-slate-900/40 rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-sm ${
                    openFaq === index 
                      ? 'border-blue-500/50 shadow-lg shadow-blue-500/5' 
                      : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className={`font-bold text-lg ${openFaq === index ? 'text-blue-400' : 'text-slate-200'}`}>
                      {faq.question}
                    </span>
                    <span className={`p-2 rounded-full transition-colors ${openFaq === index ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
                      {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <FloatingSpeedButton />
      <FloatingChatButton />
    </Layout>
  );
};

export default DemoProjects;