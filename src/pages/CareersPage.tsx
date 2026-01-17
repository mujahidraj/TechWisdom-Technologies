import { motion } from 'framer-motion';
import { 
  Home, Heart, BookOpen, Clock, Plane, Laptop, 
  MapPin, Briefcase, ArrowRight, Sparkles,
  type LucideIcon
} from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- YOUR UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Icon mapping for dynamic icons from JSON
const iconMap: Record<string, LucideIcon> = { Home, Heart, BookOpen, Clock, Plane, Laptop };

const CareersPage = () => {
  const { careers } = data;

  // Function 1: Handle Specific Job Application
  const handleApplyClick = (jobTitle: string) => {
    const email = "mujahidraj65@gmail.com";
    const subject = encodeURIComponent(`Application for ${jobTitle}`);
    const body = encodeURIComponent(`Hi there,\n\nI am writing to apply for the ${jobTitle} position.\n\nPlease find my resume attached.\n\nBest regards,`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  // Function 2: Handle General Resume Submission
  const handleGeneralEmailClick = () => {
    const email = "mujahidraj65@gmail.com";
    const subject = encodeURIComponent("General Job Application / Resume Submission");
    const body = encodeURIComponent("Hi there,\n\nI am interested in joining your team. Please find my resume attached for your review.\n\nBest regards,");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <Layout>
      <SEOHead title="Careers - Join the Team" description={careers.subheadline} path="/careers" />
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#0f172a] text-white">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-md mb-2">
              We are hiring
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              {careers.headline}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              {careers.subheadline}
            </p>

            <div className="pt-6 flex justify-center">
              <Button 
                size="lg" 
                onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-12 text-base shadow-lg shadow-blue-900/20"
              >
                View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== 2. PERKS & BENEFITS ==================== */}
      <section className="py-24 bg-slate-50 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900">Why Join Us?</h2>
             <p className="text-slate-500 mt-2">Perks that make your life easier.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.perks.map((perk, i) => {
              const Icon = iconMap[perk.icon];
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                        {Icon && <Icon className="w-6 h-6" />}
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900">{perk.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-slate-600 leading-relaxed">
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
      <section id="open-positions" className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">Open Positions</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
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
                <Card className="group hover:border-blue-500 transition-all duration-300 hover:shadow-lg bg-white overflow-hidden border-slate-200">
                  <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    {/* Left: Job Info */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-100">
                          {job.department}
                        </Badge>
                        {job.type === "Full-time" && (
                          <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                            Full-time
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={16} className="text-slate-400" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={16} className="text-slate-400" />
                          {job.type}
                        </span>
                      </div>
                      <p className="text-slate-600 max-w-xl text-sm leading-relaxed mt-2 hidden md:block">
                        {job.description}
                      </p>
                    </div>

                    {/* Right: Action */}
                    <div className="flex-shrink-0">
                      <Button 
                        onClick={() => handleApplyClick(job.title)}
                        className="w-full md:w-auto bg-slate-900 text-white hover:bg-blue-600 transition-colors"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {careers.openings.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">No open positions at the moment. Check back later!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== 4. GENERAL APPLICATION CTA ==================== */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4 text-center">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Don't see the right fit?</h3>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto">
              We are always looking for talented individuals. Send us your resume and we'll keep you in mind for future openings.
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleGeneralEmailClick}
              className="border-slate-300 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-600"
            >
              Email Us Your Resume
            </Button>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default CareersPage;