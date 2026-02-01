import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FolderOpen, Layers, Zap, CheckCircle2, MessageSquare, Briefcase, HelpCircle, ChevronDown, Rocket, Users, Globe, Lock, ShieldCheck, PenTool, ShieldCheckIcon, ShoppingBagIcon, ActivityIcon, CloudAlert, SearchCheck, PenToolIcon, Code2, RocketIcon , ShoppingBag, Activity, Cloud, GraduationCap, Megaphone, 
  BarChart3,  Building2, Plane, Handshake, Stethoscope, 
  Hotel, Scale, BookOpen, Heart, Utensils, Sun, Leaf, Wrench, 
  Dumbbell, Printer, SprayCan, Newspaper, UserPlus, Car, Factory, 
  Armchair, PaintBucket, Globe2 } from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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

// --- FAQ ACCORDION COMPONENT ---
const FaqItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-blue-400' : 'text-slate-200 group-hover:text-white'}`}>
          {question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : 'group-hover:text-white'}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WorkPage = () => {
  const { projects } = data;
  
  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter logic
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  // --- NEW DATA FOR EXTRA SECTIONS ---
  const processSteps = [
    { title: "Discovery", desc: "We dive deep into your business goals.", icon: SearchCheck },
    { title: "Design", desc: "Wireframing and prototyping the UX.", icon: PenToolIcon },
    { title: "Development", desc: "Agile sprints with clean code.", icon: Code2 },
    { title: "Launch", desc: "Deployment and post-launch support.", icon: RocketIcon },
  ];

  const testimonials = [
    { text: "They transformed our outdated site into a lead generation machine.", author: "Sarah J., CEO TechFlow" },
    { text: "Best development team we've ever worked with. Truly professional.", author: "Mark D., Founder EduSmart" },
    { text: "Delivered on time and under budget. Highly recommended.", author: "Emily R., CTO HealthPlus" },
  ];



  const faqs = [
    { q: "What is your typical project timeline?", a: "Timelines vary by complexity. A simple website takes 2-4 weeks, while a custom web app can take 8-12 weeks." },
    { q: "Do you provide post-launch support?", a: "Yes, we offer 30 days of free support and various monthly maintenance packages thereafter." },
    { q: "What technologies do you use?", a: "We specialize in the MERN stack (MongoDB, Express, React, Node.js), Next.js, and WordPress." },
    { q: "Will I own the source code?", a: "Yes, once the final payment is made, you own 100% of the IP and source code." },
    { q: "Can you help with SEO?", a: "Absolutely. All our websites are built with SEO best practices (meta tags, fast loading, mobile responsive)." },
    { q: "Do you work with startups?", a: "Yes! We love working with startups to build MVPs and scalable products." },
    { q: "How do you handle payments?", a: "We typically require a 50% deposit to start, with the remaining 50% due upon completion." },
    { q: "Can you update my existing website?", a: "Yes, we can audit your current site and propose a redesign or refactoring plan." },
    { q: "Do you design mobile apps?", a: "Yes, we design and build cross-platform mobile apps using React Native." },
    { q: "Where is your team located?", a: "We are a distributed team with our HQ in Bangladesh, serving clients globally." },
  ];

  


  return (
    <Layout>
      <SEOHead title="Our Work - Portfolio" description="Explore our portfolio of successful projects" path="/work" />
      
      {/* --- BACKGROUND INJECTION --- */}
      <InteractiveBackground />

      <div className="relative z-10 text-slate-100">

        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="container relative z-10 text-center px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-md bg-slate-900/30">
                Selected Works
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">Digital Legacies</span>
              </h1>
              
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                Explore how we've helped ambitious companies transform their ideas into powerful, scalable digital products.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ==================== 2. PORTFOLIO GRID ==================== */}
        <section className="py-24 bg-transparent relative z-20">
          <div className="container px-4 md:px-6">
            
            {/* --- Category Filter Tabs --- */}
            <div className="flex justify-center mb-16">
              <Tabs defaultValue="All" className="w-full max-w-3xl" onValueChange={setActiveCategory}>
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-slate-900/60 border border-white/10 p-1 h-auto rounded-full backdrop-blur-md">
                  {categories.map((cat) => (
                    <TabsTrigger 
                      key={cat} 
                      value={cat}
                      className="rounded-full py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400 hover:text-white font-medium transition-all"
                    >
                      {cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* --- Projects Grid --- */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <motion.div 
                    layout
                    key={project.id || i}
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={`/work/${project.id}`} className="block h-full group">
                      <Card className="h-full overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-sm shadow-lg hover:shadow-blue-900/20 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2">
                        
                        {/* Image Area */}
                        <CardHeader className="p-0 border-b border-white/5">
                          <AspectRatio ratio={4 / 3} className="bg-slate-800 relative overflow-hidden">
                            <img 
                              src={project.thumbnail} 
                              alt={project.title} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                              onError={(e) => {e.currentTarget.src = `https://placehold.co/800x600/1e293b/ffffff?text=${project.title}`}}
                            />
                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                               <Button className="rounded-full gap-2 pointer-events-none bg-white text-slate-900 hover:bg-white">
                                 View Case Study <ArrowUpRight size={16} />
                               </Button>
                            </div>
                          </AspectRatio>
                        </CardHeader>

                        {/* Content Area */}
                        <CardContent className="p-6 pt-8">
                          <div className="flex items-center justify-between mb-4">
                             <div className="flex items-center gap-2">
                                <Layers size={14} className="text-blue-400" />
                                <span className="text-xs text-blue-300 font-medium tracking-wide uppercase">{project.category}</span>
                             </div>
                             <span className="text-xs text-slate-500 font-mono border border-white/10 px-2 py-0.5 rounded">2024</span>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h3>
                          
                          <CardDescription className="line-clamp-2 text-base leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
                            {project.challenge}
                          </CardDescription>
                        </CardContent>

                        {/* Footer Tags */}
                        <CardFooter className="p-6 pt-0 flex flex-wrap gap-2">
                          {project.techStack && project.techStack.slice(0, 3).map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-white/5 font-normal">
                              {tag}
                            </Badge>
                          ))}
                          {project.techStack && project.techStack.length > 3 && (
                             <Badge variant="outline" className="text-slate-500 border-white/10">+{project.techStack.length - 3}</Badge>
                          )}
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-center py-24 border border-dashed border-white/10 rounded-2xl bg-slate-900/20"
              >
                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                   <FolderOpen className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">No projects found</h3>
                <p className="text-slate-400">Try selecting a different category or check back later.</p>
                <Button 
                  variant="link" 
                  onClick={() => setActiveCategory("All")}
                  className="mt-4 text-blue-400 hover:text-blue-300"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}

          </div>
        </section>

        {/* ======================================================= */}
        {/* --- NEW SECTION 1: OUR PROCESS (ADDED) --- */}
        {/* ======================================================= */}
        <section className="py-24 bg-slate-900/30 border-y border-white/5">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">How We Deliver Results</h2>
              <p className="text-slate-400">Our proven methodology for success.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <div key={i} className="relative p-6 border border-white/5 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="absolute -top-6 left-6 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center border-4 border-[#020617] text-white">
                    <step.icon size={20} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

     

        {/* ======================================================= */}
        {/* --- NEW SECTION 3: FAQ ACCORDION (ADDED) --- */}
        {/* ======================================================= */}
        <section className="py-24 bg-slate-900/20 border-t border-white/5">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-400">Everything you need to know about working with us.</p>
            </div>
            
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <FaqItem 
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

        {/* ==================== CTA SECTION ==================== */}
        <section className="py-24 bg-transparent border-t border-white/5">
          <div className="container px-4 md:px-6">
            <div className="relative rounded-[2.5rem] bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 overflow-hidden px-6 py-20 text-center md:px-12 md:py-24 shadow-2xl backdrop-blur-xl group">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
              
              {/* Decorative Glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-500/30 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-500/30 transition-colors duration-500" />
              
              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/30 rotate-3 group-hover:rotate-6 transition-transform">
                    <Zap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                  Have a project in mind?
                </h2>
                <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
                  We help companies of all sizes launch their next big idea. Let's turn your vision into reality.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/contact">
                    <Button size="lg" className="bg-white text-slate-900 hover:bg-blue-50 h-14 px-8 text-lg font-semibold rounded-full shadow-xl">
                      Start a Project
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="text-white border-white/10 bg-white/5 hover:bg-white/10 h-14 px-8 text-lg font-semibold rounded-full backdrop-blur-sm">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default WorkPage;