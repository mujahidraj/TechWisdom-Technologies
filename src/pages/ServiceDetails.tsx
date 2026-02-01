/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, Layers, Cpu, HelpCircle, 
  ArrowRight, ChevronDown, Check, Package 
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import data from '@/data.json';

// --- 1. INTERACTIVE BACKGROUND COMPONENT ---
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
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { x, y };
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020617] pointer-events-none">
      {/* Gradients */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-600/20 via-purple-600/5 to-transparent blur-[120px]" />
      <div className="absolute bottom-0 inset-x-0 h-[500px] bg-gradient-to-t from-indigo-600/20 via-blue-600/5 to-transparent blur-[120px]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      {/* Mouse Spotlight */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 40%)`,
        }}
      />

      {/* Floating Orbs */}
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

// --- 2. ACCORDION COMPONENT ---
const AccordionItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className={`border rounded-xl overflow-hidden mb-4 transition-all duration-300 ${isOpen ? 'bg-slate-900/60 border-blue-500/30' : 'bg-slate-900/40 border-white/10 hover:border-white/20'} backdrop-blur-md`}>
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-blue-400' : 'text-slate-200'}`}>
          {question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-5 pt-0 text-slate-400 border-t border-white/5 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 3. MAIN PAGE COMPONENT ---
const ServiceDetails = () => {
  const { id } = useParams();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  const basicInfo = data.services.find(s => s.id === id);
  const detailInfo = data.serviceDetails?.[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!basicInfo || !detailInfo) {
    return (
      <Layout>
        <InteractiveBackground />
        <div className="min-h-screen relative z-10 text-white flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/services" className="text-blue-400 hover:underline">Back to Services</Link>
        </div>
      </Layout>
    );
  }

  const { title } = basicInfo;
  const { tagline, heroImage, overview, process, techStack, benefits, faqs, deliverables } = detailInfo;

  return (
    <Layout>
      {/* 4. INSERT BACKGROUND */}
      <InteractiveBackground />

      {/* 5. WRAP CONTENT IN RELATIVE Z-10 */}
      <div className="relative z-10 min-h-screen text-slate-300 font-sans selection:bg-blue-500/30">
        
        {/* --- SECTION 1: HERO --- */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="container mx-auto relative z-10">
            <Link to="/services" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium text-sm mb-6 backdrop-blur-md">
                  Premium Service
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                  {title}
                </h1>
                <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium mb-8">
                  {tagline}
                </p>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  {overview}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {benefits.map((benefit: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-slate-300 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-12 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all">
                      Start Your Project
                    </Button>
                  </Link>
                 <Link to="/work">
                  <Button size="lg" variant="outline" className="text-white border-white/10 bg-white/5 hover:bg-white/10 rounded-full px-8 h-12 backdrop-blur-sm">
                    View Portfolio
                  </Button>
                 </Link>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group aspect-video lg:aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-40 z-10" />
                  <img 
                    src={heroImage} 
                    alt={title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" 
                  />
                </div>
                
                <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl hidden md:block max-w-sm">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Cpu size={18} className="text-purple-400" /> Powered By
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {techStack.slice(0, 6).map((tech: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-xs text-slate-300 border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: DELIVERABLES --- */}
        <section className="py-20 border-y border-white/5 bg-slate-900/20 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">What You Get</h2>
              <p className="text-slate-400">Tangible deliverables included in this service package.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {deliverables?.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-xl bg-[#020617]/50 border border-white/10 hover:border-blue-500/40 hover:bg-[#020617]/80 transition-all group backdrop-blur-md">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors border border-blue-500/20">
                    <Package size={20} />
                  </div>
                  <span className="font-medium text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 3: PROCESS --- */}
        <section className="py-24 px-6">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                  <Layers size={20} /> OUR METHODOLOGY
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">How We Deliver Results</h2>
              </div>
              <p className="text-slate-400 max-w-md text-right md:text-left">
                A transparent, step-by-step process designed to minimize risk and maximize quality.
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {process.map((step: any, index: number) => (
                <div key={index} className="relative p-6 pt-12 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/20 transition-all group backdrop-blur-sm">
                  <div className="absolute top-6 left-6 text-6xl font-bold text-white/5 group-hover:text-blue-500/10 transition-colors">
                    0{index + 1}
                  </div>
                  <h3 className="relative text-lg font-bold text-white mb-3 z-10">{step.title}</h3>
                  <p className="relative text-slate-400 text-sm z-10">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 4: DETAILED FAQ --- */}
        <section className="py-24 bg-slate-900/20 backdrop-blur-sm border-t border-white/5">
          <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-600/20">
                  <HelpCircle size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Everything you need to know about our {title} service. Can't find the answer you're looking for?
                </p>
                <Link to="/contact">
                  <Button variant="outline" className="border-white/10 text-slate-800 hover:bg-white/10 w-full sm:w-auto backdrop-blur-md">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8">
              {faqs.map((faq: any, i: number) => (
                <AccordionItem 
                  key={i}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaqIndex === i}
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                />
              ))}
            </div>

          </div>
        </section>

        {/* --- SECTION 5: CTA --- */}
        <section className="py-24 px-6 text-center">
          <div className="container mx-auto max-w-4xl">
            <div className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-b from-blue-900/20 to-[#020617]/80 border border-white/10 relative overflow-hidden shadow-2xl backdrop-blur-xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 blur-[100px] pointer-events-none" />
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10 tracking-tight">
                Ready to elevate your {title}?
              </h2>
              <p className="text-slate-300 mb-10 text-xl relative z-10 max-w-2xl mx-auto">
                Stop waiting. Let's turn your vision into a high-performing reality today.
              </p>
              <Link to="/contact">
                <Button className="relative z-10 bg-white text-[#020617] px-10 py-7 rounded-full text-lg font-bold hover:bg-slate-200 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                  Get a Free Quote <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default ServiceDetails;