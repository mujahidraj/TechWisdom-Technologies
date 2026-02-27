/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Briefcase, Building, 
  Send, CheckCircle, Clock, DollarSign,
  Target,
  User
} from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Import the new data file
import openingsData from '../openings.json';

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
      <motion.div className="absolute inset-0" animate={calculateParallax(0.04)} transition={{ type: "tween", ease: "linear", duration: 0.2 }}>
        <div className="absolute top-[80%] left-[20%] w-2 h-2 bg-indigo-400 rounded-full opacity-30 blur-[2px]" />
      </motion.div>
    </div>
  );
};

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    // Find the specific job based on the URL parameter
    const foundJob = openingsData.openings.find(j => j.id === jobId);
    if (foundJob) {
      setJob(foundJob);
      window.scrollTo(0, 0); // Scroll to top on load
    } else {
      // If job ID doesn't exist, redirect back to careers
      navigate('/careers');
    }
  }, [jobId, navigate]);

  if (!job) return null; // Or a loading spinner

  const handleApplyClick = () => {
    const email = "twtech.contact@gmail.com";
    const subject = encodeURIComponent(`Application for ${job.title}`);
    const body = encodeURIComponent(`Hi TechWisdom Team,\n\nI am writing to apply for the ${job.title} position.\n\nPlease find my resume attached.\n\nBest regards,`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <Layout>
      <SEOHead title={`${job.title} - Careers at TechWisdom`} description={job.shortDescription} />
      
      {/* --- BACKGROUND INJECTION --- */}
      <InteractiveBackground />

      <div className="relative z-10 text-slate-100 min-h-screen pt-32 pb-24">
        <div className="container max-w-4xl mx-auto px-4">
          
          {/* Back Navigation */}
          <Link to="/careers" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Back to Careers
          </Link>

          {/* Job Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="secondary" className="bg-purple-500/10 text-purple-300 border border-purple-500/20 px-3 py-1 text-sm">
                <Building size={14} className="mr-2 inline" /> {job.department}
              </Badge>
              <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-white/10 px-3 py-1 text-sm">
                <MapPin size={14} className="mr-2 inline" /> {job.location}
              </Badge>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 text-sm">
                <Briefcase size={14} className="mr-2 inline" /> {job.type}
              </Badge>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1 text-sm">
                <DollarSign size={14} className="mr-1 inline" /> {job.salary}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              {job.title}
            </h1>
            
            <p className="text-xl text-slate-300 font-light leading-relaxed">
              {job.shortDescription}
            </p>
          </motion.div>

          {/* Apply Button Sticky Bar (Desktop) / Normal Button (Mobile) */}
          <Card className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-12 shadow-2xl">
            <div>
              <h3 className="text-white font-bold text-lg">Ready to make an impact?</h3>
              <p className="text-slate-400 text-sm">Apply via email. Don't forget to attach your resume!</p>
            </div>
            <Button 
              size="lg" 
              onClick={handleApplyClick}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 h-14 text-lg font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              Apply for this position <Send size={18} className="ml-2" />
            </Button>
          </Card>

          {/* Job Details Content */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="space-y-12 bg-slate-900/30 p-6 md:p-10 rounded-3xl border border-white/5"
          >
            {/* About the Role */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <User size={18} />
                </div>
                About the Role
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                {job.aboutRole}
              </p>
            </section>

            <Separator className="bg-white/5" />

            {/* Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <CheckCircle size={18} />
                </div>
                What You'll Do
              </h2>
              <ul className="space-y-4">
                {job.responsibilities.map((req: string, i: number) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                    <span className="text-slate-300 text-lg leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            <Separator className="bg-white/5" />

            {/* Requirements */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Target size={18} />
                </div>
                What We're Looking For
              </h2>
              <ul className="space-y-4">
                {job.requirements.map((req: string, i: number) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-slate-300 text-lg leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

          </motion.div>

        </div>
      </div>
    </Layout>
  );
};

export default JobDetailsPage;