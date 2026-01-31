import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, CheckCircle, Layers, Palette, Terminal, Code2, Rocket, HelpCircle, Plus, Minus } from 'lucide-react';
import data from '@/data.json';
import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout'; // Switched to Layout for consistency
import FloatingSpeedButton from '@/components/layout/FloatingSpeedButton';
import FloatingChatButton from '@/components/layout/FloatingChatButton';

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

const DemoProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = data.demoProjects.find((p) => p.id === id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    if (!project) {
      navigate('/demo-projects');
    }
    window.scrollTo(0, 0);
  }, [project, navigate]);

  if (!project) return null;

  const demoFaqs = [
    { question: "Is this a real, operating business website?", answer: "No, this is a demonstration prototype. We built this to showcase our capability to create complex, high-performance applications for this specific industry. The business logic is real, but the company and data are fictional." },
    { question: "Can I buy this exact website code 'off-the-shelf'?", answer: "We don't usually sell the exact same code to multiple clients to ensure your brand remains unique. However, we use this architecture as a foundation to build your custom solution significantly faster." },
    { question: "Is the data shown in the demo real?", answer: "No, all user profiles, products, and analytics data shown in the live preview are 'dummy data' generated for demonstration purposes only." },
    { question: "Can you customize the design to match my brand?", answer: "Absolutely. While the functionality might remain similar, we will completely overhaul the UI/UX, color palette, typography, and layout to align perfectly with your brand identity." },
    { question: "How long would it take to build a solution like this for me?", answer: "Since we already have the core architecture ready (as seen in this demo), we can reduce development time by 30-40%. A project of this magnitude typically takes 4-8 weeks to customize and launch for a client." },
    { question: "Can I access the Admin Panel of this demo?", answer: "For security reasons, public access to the Admin Panel is restricted in the live link. However, if you are interested, we can schedule a Google Meet call to give you a live walkthrough of the backend management features." },
    { question: "Is this demo optimized for SEO?", answer: "Yes, the architecture is built with Technical SEO best practices (SSR, Semantic HTML, Fast Load Times). When we build your version, we will further optimize it for your specific keywords." },
    { question: "Do I own the code if I order a project like this?", answer: "Yes. Unlike SaaS platforms where you pay rent, with TechWisdom, you pay for development and you own 100% of the source code and intellectual property upon completion." },
    { question: "What happens if I find a bug in the demo?", answer: "Our demos are constantly updated, but minor bugs may exist in experimental features. If we build this for you, it goes through rigorous QA testing to ensure a bug-free production launch." },
    { question: "I like this demo. How do we proceed?", answer: "Click the 'Get a Quote' button or 'Start Project' in the navigation. We will discuss your specific requirements, how they differ from this demo, and provide a timeline and cost estimate." }
  ];

  return (
    <Layout>
      <SEOHead 
        title={project.title} 
        description={project.shortDescription}
        image={project.image}
      />

      {/* --- BACKGROUND INJECTION --- */}
      <InteractiveBackground />

      <div className="relative z-10 text-slate-100">

        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="relative pt-32 pb-48 lg:pt-44 lg:pb-64 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            {/* Back Navigation */}
            <Link 
              to="/demo-projects" 
              className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8 group font-medium"
            >
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>

            {/* Hero Flex Layout */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
              
              {/* Left: Text Content */}
              <div className="lg:w-2/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
                    {project.category}
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                    {project.title}
                  </h1>
                  
                  <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                    {project.shortDescription}
                  </p>
                </motion.div>
              </div>

              {/* Right: GLOWING CTA Button */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="lg:w-1/3 w-full flex justify-start lg:justify-end"
              >
                <div className="relative group">
                  {/* Neon Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  
                  {/* Button */}
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative flex items-center gap-3 px-8 py-5 rounded-2xl bg-slate-900 text-white font-bold text-lg border border-white/10 hover:bg-slate-800 transition-all"
                  >
                    <Rocket size={24} className="text-blue-400 group-hover:animate-pulse" />
                    <span className="tracking-wide">View Live Demo</span>
                    <ExternalLink size={20} className="text-slate-400" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 2. MAIN CONTENT (Overlapping) ==================== */}
        <div className="container mx-auto px-6 max-w-6xl relative z-20 -mt-32 lg:-mt-48 pb-20">
          
          {/* Main Image (Floating Card) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 mb-16 border-4 border-slate-800 bg-[#0f172a]"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-auto object-cover opacity-95 hover:opacity-100 transition-opacity"
            />
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-24">
            
            {/* Left Column (Main Info) */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Overview */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></span>
                  Project Overview
                </h2>
                <div className="prose prose-lg prose-invert text-slate-400 leading-relaxed max-w-none">
                  <p>{project.fullDescription}</p>
                </div>
              </section>

              {/* Features */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Layers className="text-blue-500" /> Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/40 border border-white/10 shadow-sm hover:border-blue-500/30 transition-all backdrop-blur-sm"
                    >
                      <div className="bg-blue-500/10 p-2 rounded-full shrink-0 text-blue-400 border border-blue-500/20">
                          <CheckCircle size={20} />
                      </div>
                      <span className="text-slate-300 font-medium pt-0.5">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Development Process */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Terminal className="text-purple-500" /> Development Journey
                </h2>
                <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10">
                      <p className="text-slate-300 text-lg italic leading-relaxed border-l-4 border-purple-500 pl-6">
                      "{project.developmentProcess}"
                      </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column (Sidebar Info) */}
            <div className="space-y-8 lg:sticky lg:top-32 h-fit">
              
              {/* Tech Stack */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 shadow-xl backdrop-blur-md"
              >
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Code2 className="text-blue-400" size={20} /> Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-4 py-2 rounded-lg text-sm font-semibold bg-slate-800 text-slate-300 border border-white/5 hover:bg-slate-700 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Design Unique */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 shadow-xl backdrop-blur-md"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Palette className="text-pink-500" size={20} /> Design Philosophy
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {project.designUnique}
                </p>
              </motion.div>

              {/* CTA Box */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-white/10 text-center shadow-2xl relative overflow-hidden backdrop-blur-md"
              >
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-3">Inspired?</h3>
                  <p className="text-blue-100 mb-8 text-sm">
                    Let's build a custom version of this solution tailored to your brand.
                  </p>
                  <Link 
                    to="/contact" 
                    className="inline-block w-full py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    Get a Quote
                  </Link>
                </div>
              </motion.div>

            </div>
          </div>

          {/* --- FAQ SECTION --- */}
          <div className="max-w-4xl mx-auto border-t border-white/10 pt-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider mb-4">
                <HelpCircle size={14} /> Demo FAQs
              </div>
              <h2 className="text-3xl font-bold text-white">
                About this Demo Project
              </h2>
              <p className="text-slate-400 mt-4">
                Common questions about our demonstration prototypes.
              </p>
            </div>

            <div className="space-y-4">
              {demoFaqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`bg-slate-900/40 rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-sm ${
                    openFaq === index 
                      ? 'border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
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

export default DemoProjectDetails;