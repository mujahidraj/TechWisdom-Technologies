import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FolderOpen } from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- YOUR UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const WorkPage = () => {
  const { projects } = data;
  
  // Extract unique categories for the filter tabs
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter logic
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <Layout>
      <SEOHead title="Our Work - Portfolio" description="Explore our portfolio of successful projects" path="/work" />
      
      {/* ==================== 1. HERO SECTION (Dark) ==================== */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0f172a] text-white">
        {/* Ambient Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 text-center px-4 ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-sm">
              Selected Works
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Digital Legacies</span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              Explore how we've helped ambitious companies transform their ideas into powerful digital products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== 2. PORTFOLIO GRID ==================== */}
      <section className="py-24 bg-slate-50 relative z-20">
        <div className="container px-4 md:px-6">
          
          {/* --- Category Filter Tabs --- */}
          <div className="flex justify-center mb-16">
            <Tabs defaultValue="All" className="w-full max-w-3xl" onValueChange={setActiveCategory}>
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white/50 border border-slate-200 p-1 h-auto rounded-full">
                {categories.map((cat) => (
                  <TabsTrigger 
                    key={cat} 
                    value={cat}
                    className="rounded-full py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-600 font-medium transition-all"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* --- Projects Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div 
                  key={project.id || i}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/work/${project.id}`} className="block h-full group">
                    <Card className="h-full overflow-hidden border-none shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
                      
                      {/* Image Area */}
                      <CardHeader className="p-0 border-b border-slate-100">
                        <AspectRatio ratio={4 / 3} className="bg-slate-100 relative overflow-hidden">
                          {/* Project thumbnail image */}
                          <img 
                            src={project.thumbnail} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            onError={(e) => {e.currentTarget.src = `https://placehold.co/800x600/e2e8f0/1e293b?text=${project.title}`}}
                          />
                          
                          {/* Overlay Button */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                             <Button variant="secondary" className="rounded-full gap-2 pointer-events-none">
                               View Case Study <ArrowUpRight size={16} />
                             </Button>
                          </div>
                        </AspectRatio>
                      </CardHeader>

                      {/* Content Area */}
                      <CardContent className="p-6 pt-8">
                        <div className="flex items-center justify-between mb-3">
                           <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100">
                             {project.category}
                           </Badge>
                           <span className="text-xs text-muted-foreground font-mono">2024</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        <CardDescription className="line-clamp-2 text-base leading-relaxed">
                          {project.challenge}
                        </CardDescription>
                      </CardContent>

                      {/* Footer Tags (Tech Stack) */}
                      <CardFooter className="p-6 pt-0 flex flex-wrap gap-2">
                        {project.techStack && project.techStack.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                            {tag}
                          </span>
                        ))}
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-slate-900">No projects found</h3>
              <p className="text-slate-500">Try selecting a different category.</p>
            </div>
          )}

        </div>
      </section>

      {/* ==================== 3. CTA SECTION ==================== */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="relative rounded-[2.5rem] bg-[#0f172a] overflow-hidden px-6 py-20 text-center md:px-12 md:py-24 shadow-2xl">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Have a project in mind?
              </h2>
              <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
                We help companies of all sizes launch their next big idea. Let's turn your vision into reality.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {/* WORKABLE BUTTONS LINKING TO CONTACT PAGE */}
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 h-14 px-8 text-lg font-semibold rounded-full shadow-xl">
                    Start a Project
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="bg-white text-slate-900 hover:bg-slate-100 h-14 px-8 text-lg font-semibold rounded-full shadow-xl">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WorkPage;