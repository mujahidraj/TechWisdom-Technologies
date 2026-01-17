import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

const WorkPage = () => {
  const { projects } = data;
  return (
    <Layout>
      <SEOHead title="Our Work" description="Explore our portfolio of successful projects" path="/work" />
      <section className="section-padding gradient-navy">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold text-white mb-6">Our Work</motion.h1>
          <p className="text-xl text-white/70">Case studies that showcase our expertise</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={`/work/${project.id}`} className="block bento-card group overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-strong-blue/20 to-soft-blue/20 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold text-strong-blue/30">{project.title.charAt(0)}</span>
                  </div>
                  <span className="text-sm text-soft-blue font-medium">{project.category}</span>
                  <h3 className="text-xl font-semibold text-navy group-hover:text-strong-blue transition-colors">{project.title}</h3>
                  <p className="text-navy/60 mt-2 line-clamp-2">{project.challenge}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default WorkPage;
