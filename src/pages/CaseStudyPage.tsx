import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Cpu, BarChart3, Layers } from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- YOUR UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const CaseStudyPage = () => {
  const { id } = useParams();
  const project = data.projects.find(p => p.id === id);

  // --- 404 State ---
  if (!project) return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Project not found</h1>
        <p className="text-slate-500 mb-8">The case study you are looking for doesn't exist.</p>
        <Link to="/work">
          <Button>Back to Work</Button>
        </Link>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <SEOHead title={`${project.title} - Case Study`} description={project.challenge} path={`/work/${id}`} />
      
      {/* ==================== 1. HERO SECTION (No Overlap) ==================== */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#0f172a] text-white">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 px-4">
          <Link to="/work">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10 mb-8 -ml-4 gap-2">
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
              <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-3 py-1 text-sm uppercase tracking-widest">
                {project.category}
              </Badge>
              <Badge variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                2024
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              {project.title}
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              How we solved complex challenges to deliver a scalable, high-performance solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== 2. FEATURED IMAGE (Standard Spacing) ==================== */}
      <section className="py-12 md:py-20 px-4 bg-slate-50 border-b border-slate-200">
        <div className="container max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white"
          >
            <AspectRatio ratio={16 / 9} className="bg-slate-100">
              <img 
                src={project.thumbnail} 
                alt={project.title} 
                className="w-full h-full object-cover"
                onError={(e) => {e.currentTarget.src = `https://placehold.co/1200x675/e2e8f0/1e293b?text=${project.title}`}}
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
            <div className="lg:col-span-2 space-y-12">
              
              {/* Challenge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="p-2 bg-red-100 text-red-600 rounded-lg"><Layers size={24} /></span>
                  The Challenge
                </h2>
                <div className="prose prose-lg text-slate-600 leading-relaxed">
                  <p>{project.challenge}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </motion.div>

              <Separator />

              {/* Solution */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><CheckCircle size={24} /></span>
                  The Solution
                </h2>
                <div className="prose prose-lg text-slate-600 leading-relaxed">
                  <p>{project.solution}</p>
                  <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Custom architecture design for scalability.</li>
                    <li>Implementation of advanced caching strategies.</li>
                    <li>Seamless third-party API integrations.</li>
                  </ul>
                </div>
              </motion.div>

            </div>

            {/* --- RIGHT: Sidebar Info --- */}
            <div className="space-y-8">
              
              {/* Tech Stack Card */}
              <Card className="border-none shadow-lg bg-slate-50">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="text-blue-600 w-5 h-5" />
                    <CardTitle className="text-lg">Technology Stack</CardTitle>
                  </div>
                  <Separator className="bg-slate-200" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="bg-white hover:bg-blue-50 border border-slate-200 text-slate-700 px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Client Info (Static/Mock for now) */}
              <Card className="border-none shadow-lg bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle className="text-lg">Project Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-slate-700 pb-2">
                    <span className="text-slate-400">Client Industry</span>
                    <span className="font-medium">Technology</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700 pb-2">
                    <span className="text-slate-400">Duration</span>
                    <span className="font-medium">4 Months</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700 pb-2">
                    <span className="text-slate-400">Services</span>
                    <span className="font-medium">Dev & Design</span>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4. RESULTS SECTION ==================== */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
              <BarChart3 className="text-blue-600" /> Key Results
            </h2>
            <p className="text-slate-500 mt-2">Measurable impact delivered.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.results.map((result, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center border-none shadow-md hover:shadow-xl transition-all h-full bg-white flex flex-col justify-center py-8">
                  <CardContent className="p-0">
                    <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                      {result.value}
                    </div>
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">
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
      <section className="py-24 bg-white">
        <div className="container max-w-4xl text-center px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to start your success story?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-slate-900 text-white hover:bg-blue-600 h-14 px-8 text-lg rounded-full">
                Start a Project
              </Button>
            </Link>
            <Link to="/work">
              <Button size="lg" variant="outline" className="border-slate-300 h-14 px-8 text-lg rounded-full hover:bg-slate-50">
                View More Cases
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default CaseStudyPage;