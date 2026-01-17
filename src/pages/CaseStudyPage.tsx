import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

const CaseStudyPage = () => {
  const { id } = useParams();
  const project = data.projects.find(p => p.id === id);
  if (!project) return <Layout><div className="section-padding container-custom text-center"><h1 className="text-2xl">Project not found</h1><Link to="/work" className="text-strong-blue">Back to Work</Link></div></Layout>;

  return (
    <Layout>
      <SEOHead title={project.title} description={project.challenge} path={`/work/${id}`} />
      <section className="section-padding gradient-navy">
        <div className="container-custom">
          <Link to="/work" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"><ArrowLeft size={20} /> Back to Work</Link>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white">{project.title}</motion.h1>
          <span className="inline-block mt-4 px-4 py-1 bg-white/10 rounded-full text-white/80">{project.category}</span>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12">
            <div><h2 className="text-2xl font-bold text-navy mb-4">The Challenge</h2><p className="text-navy/70">{project.challenge}</p></div>
            <div><h2 className="text-2xl font-bold text-navy mb-4">The Solution</h2><p className="text-navy/70">{project.solution}</p></div>
            <div><h2 className="text-2xl font-bold text-navy mb-4">Tech Stack</h2><div className="flex flex-wrap gap-2">{project.techStack.map((t, i) => <span key={i} className="px-4 py-2 bg-pale-blue/30 rounded-lg text-navy font-medium">{t}</span>)}</div></div>
            <div><h2 className="text-2xl font-bold text-navy mb-4">Results</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{project.results.map((r, i) => <div key={i} className="bento-card text-center"><div className="text-3xl font-bold text-strong-blue">{r.value}</div><div className="text-navy/60">{r.metric}</div></div>)}</div></div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default CaseStudyPage;
