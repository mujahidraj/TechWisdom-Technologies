import { motion } from 'framer-motion';
import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

const AboutPage = () => {
  const { about, team, timeline } = data;
  return (
    <Layout>
      <SEOHead title="About Us" description={about.mission.content} path="/about" />
      <section className="section-padding gradient-navy">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold text-white mb-6">{about.mission.title}</motion.h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">{about.mission.content}</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bento-card text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-strong-blue to-soft-blue mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">{member.name.charAt(0)}</div>
                <h3 className="text-xl font-semibold text-navy">{member.name}</h3>
                <p className="text-soft-blue font-medium mb-2">{member.role}</p>
                <p className="text-navy/60 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-6 mb-8">
                <div className="w-20 text-right"><span className="text-2xl font-bold text-strong-blue">{item.year}</span></div>
                <div className="flex-1 pb-8 border-l-2 border-pale-blue pl-6 relative"><div className="absolute w-4 h-4 bg-strong-blue rounded-full -left-[9px] top-1" /><h3 className="font-semibold text-navy">{item.title}</h3><p className="text-navy/60">{item.description}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default AboutPage;
