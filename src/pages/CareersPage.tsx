import { motion } from 'framer-motion';
import { Home, Heart, BookOpen, Clock, Plane, Laptop, MapPin, Briefcase } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

const iconMap: Record<string, any> = { Home, Heart, BookOpen, Clock, Plane, Laptop };

const CareersPage = () => {
  const { careers } = data;
  return (
    <Layout>
      <SEOHead title="Careers" description={careers.subheadline} path="/careers" />
      <section className="section-padding gradient-navy">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold text-white mb-6">{careers.headline}</motion.h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">{careers.subheadline}</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Perks & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.perks.map((perk, i) => {
              const Icon = iconMap[perk.icon];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bento-card">
                  {Icon && <Icon className="w-10 h-10 text-strong-blue mb-4" />}
                  <h3 className="text-xl font-semibold text-navy mb-2">{perk.title}</h3>
                  <p className="text-navy/60">{perk.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Open Positions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {careers.openings.map((job, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-navy">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-navy/60">
                    <span className="flex items-center gap-1"><Briefcase size={16} />{job.department}</span>
                    <span className="flex items-center gap-1"><MapPin size={16} />{job.location}</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <button className="px-6 py-2 bg-strong-blue text-white rounded-lg font-medium hover:bg-strong-blue/90 transition-colors">Apply Now</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default CareersPage;
