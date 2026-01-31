import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Cpu, BarChart3, Layers, Calendar, User, Clock, ArrowRight } from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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

const CaseStudyPage = () => {
  const { id } = useParams();
  const project = data.projects.find(p => p.id === id);

  // --- 404 State ---
  if (!project) return (
    <Layout>
      <InteractiveBackground />
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative z-10 text-white">
        <h1 className="text-4xl font-bold mb-4">Project not found</h1>
        <p className="text-slate-400 mb-8">The case study you are looking for doesn't exist.</p>
        <Link to="/work">
          <Button className="bg-blue-600 hover:bg-blue-500 text-white">Back to Work</Button>
        </Link>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <SEOHead title={`${project.title} - Case Study`} description={project.challenge} path={`/work/${id}`} />
      
      {/* --- BACKGROUND INJECTION --- */}
      <InteractiveBackground />

      <div className="relative z-10 text-slate-100">

        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="container relative z-10 px-4">
            <Link to="/work">
              <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5 mb-8 -ml-4 gap-2">
                <ArrowLeft size={18} /> Back to Projects
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="flex gap-3 mb-6">
                <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-3 py-1 text-sm uppercase tracking-widest bg-blue-500/10 backdrop-blur-md">
                  {project.category}
                </Badge>
                <Badge variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/5">
                  2024
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white">
                {project.title}
              </h1>
              
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
                How we solved complex challenges to deliver a scalable, high-performance solution.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ==================== 2. FEATURED IMAGE ==================== */}
        <section className="py-12 md:py-20 px-4 border-b border-white/5">
          <div className="container max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-white/10 bg-slate-800/50 backdrop-blur-sm"
            >
              <AspectRatio ratio={16 / 9} className="bg-slate-900">
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {e.currentTarget.src = `https://placehold.co/1200x675/1e293b/ffffff?text=${project.title}`}}
                />
              </AspectRatio>
            </motion.div>
          </div>
        </section>

        {/* ==================== 3. CONTENT & SIDEBAR ==================== */}
        <section className="py-24">
          <div className="container max-w-6xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
              
              {/* --- LEFT: Main Narrative --- */}
              <div className="lg:col-span-2 space-y-16">
                
                {/* Challenge */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="p-2 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20"><Layers size={24} /></span>
                    The Challenge
                  </h2>
                  <div className="prose prose-lg prose-invert text-slate-400 leading-relaxed">
                    <p className="text-slate-300 text-lg">{project.challenge}</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </motion.div>

                <Separator className="bg-white/10" />

                {/* Solution */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20"><CheckCircle size={24} /></span>
                    The Solution
                  </h2>
                  <div className="prose prose-lg prose-invert text-slate-400 leading-relaxed">
                    <p className="text-slate-300 text-lg">{project.solution}</p>
                    <ul className="space-y-4 mt-6">
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Custom architecture design for scalability and high availability.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Implementation of advanced caching strategies (Redis/CDN).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Seamless third-party API integrations and secure data handling.</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

              </div>

              {/* --- RIGHT: Sidebar Info --- */}
              <div className="space-y-8">
                
                {/* Tech Stack Card */}
                <Card className="border border-white/10 shadow-xl bg-slate-900/60 backdrop-blur-md">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="text-blue-400 w-5 h-5" />
                      <CardTitle className="text-lg text-white">Technology Stack</CardTitle>
                    </div>
                    <Separator className="bg-white/10" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="bg-slate-800 text-slate-300 border border-white/10 hover:bg-slate-700 px-3 py-1">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Client Info */}
                <Card className="border border-white/10 shadow-xl bg-slate-900/60 backdrop-blur-md">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="text-purple-400 w-5 h-5" />
                      <CardTitle className="text-lg text-white">Project Info</CardTitle>
                    </div>
                    <Separator className="bg-white/10" />
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-slate-400 flex items-center gap-2"><Layers size={14} /> Industry</span>
                      <span className="font-medium text-white">Technology</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-slate-400 flex items-center gap-2"><Clock size={14} /> Duration</span>
                      <span className="font-medium text-white">4 Months</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-400 flex items-center gap-2"><Calendar size={14} /> Year</span>
                      <span className="font-medium text-white">2024</span>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>

        {/* ==================== 4. RESULTS SECTION ==================== */}
        <section className="py-24 bg-slate-900/30 border-y border-white/5 backdrop-blur-sm">
          <div className="container max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                <BarChart3 className="text-blue-500" /> Key Results
              </h2>
              <p className="text-slate-400 mt-2">Measurable impact delivered.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.results.map((result, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="text-center border border-white/5 shadow-lg bg-slate-900/60 backdrop-blur-md hover:border-blue-500/30 hover:shadow-blue-500/10 transition-all duration-300 h-full flex flex-col justify-center py-10 group">
                    <CardContent className="p-0">
                      <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                        {result.value}
                      </div>
                      <div className="text-sm font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">
                        {result.metric}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. NEXT PROJECT CTA ==================== */}
        <section className="py-24 bg-transparent">
          <div className="container max-w-4xl text-center px-4">
            <div className="relative rounded-[2.5rem] bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 overflow-hidden px-6 py-20 shadow-2xl backdrop-blur-xl">
               <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
               
               <div className="relative z-10 space-y-8">
                 <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                   Ready to start your success story?
                 </h2>
                 <p className="text-slate-300 text-lg">
                   Let's build something extraordinary together.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                   <Link to="/contact">
                     <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white h-14 px-8 text-lg rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                       Start a Project
                     </Button>
                   </Link>
                   <Link to="/work">
                     <Button size="lg" variant="outline" className="text-white border-white/10 bg-white/5 hover:bg-white/10 h-14 px-8 text-lg rounded-full backdrop-blur-sm">
                       View More Cases
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

export default CaseStudyPage;