import { motion } from 'framer-motion';
import { Code, FileCode, Palette, Layout as LayoutIcon, CheckCircle, Smartphone, Search, Target, Rocket } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

const iconMap: Record<string, any> = { Code, FileCode, Palette, Layout: LayoutIcon, CheckCircle, Smartphone, Search, Target, Rocket };

const ServicesPage = () => {
  const { services, process } = data;
  return (
    <Layout>
      <SEOHead title="Services" description="Explore our comprehensive digital services" path="/services" />
      <section className="section-padding gradient-navy">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold text-white mb-6">Our Services</motion.h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Comprehensive digital solutions tailored to your needs</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bento-card">
                  {Icon && <Icon className="w-10 h-10 text-strong-blue mb-4" />}
                  <h3 className="text-xl font-semibold text-navy mb-2">{service.title}</h3>
                  <p className="text-navy/60 mb-4">{service.description}</p>
                  <ul className="space-y-2">{service.features.map((f, j) => <li key={j} className="text-sm text-navy/70 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-soft-blue" />{f}</li>)}</ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Our Process</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {process.map((p, i) => {
              const Icon = iconMap[p.icon];
              return (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex-1 min-w-[200px] max-w-[250px] text-center p-6 bg-white rounded-2xl shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-strong-blue text-white flex items-center justify-center mx-auto mb-4 font-bold">{p.step}</div>
                  {Icon && <Icon className="w-8 h-8 text-soft-blue mx-auto mb-2" />}
                  <h3 className="font-semibold text-navy">{p.title}</h3>
                  <p className="text-sm text-navy/60 mt-2">{p.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default ServicesPage;
