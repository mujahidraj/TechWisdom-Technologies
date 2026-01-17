import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

const PricingPage = () => {
  const [yearly, setYearly] = useState(false);
  const { pricing } = data;

  return (
    <Layout>
      <SEOHead title="Pricing" description="Transparent pricing for every business size" path="/pricing" />
      <section className="section-padding gradient-navy">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold text-white mb-6">Pricing</motion.h1>
          <p className="text-xl text-white/70 mb-8">Transparent pricing for every business size</p>
          <div className="inline-flex items-center gap-4 bg-white/10 p-1 rounded-full">
            <button onClick={() => setYearly(false)} className={`px-6 py-2 rounded-full transition-all ${!yearly ? 'bg-white text-navy' : 'text-white'}`}>{pricing.toggle.monthly}</button>
            <button onClick={() => setYearly(true)} className={`px-6 py-2 rounded-full transition-all ${yearly ? 'bg-white text-navy' : 'text-white'}`}>{pricing.toggle.yearly} <span className="text-xs text-soft-blue ml-1">{pricing.toggle.discount}</span></button>
          </div>
        </div>
      </section>
      <section className="section-padding -mt-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {pricing.tiers.map((tier, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`bg-white rounded-2xl p-6 shadow-xl relative ${tier.highlighted ? 'ring-2 ring-strong-blue glow-blue lg:scale-105' : ''}`}>
                {tier.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-strong-blue text-white text-sm rounded-full">{tier.badge}</span>}
                <h3 className="text-xl font-bold text-navy">{tier.name}</h3>
                <p className="text-navy/60 text-sm mb-4">{tier.description}</p>
                <div className="mb-6">
                  {tier.monthlyPrice ? (
                    <><span className="text-4xl font-bold text-navy">${yearly ? Math.round(tier.yearlyPrice! / 12) : tier.monthlyPrice}</span><span className="text-navy/60">/mo</span></>
                  ) : (
                    <span className="text-2xl font-bold text-navy">Custom</span>
                  )}
                </div>
                <ul className="space-y-3 mb-6">{tier.features.map((f, j) => <li key={j} className="flex items-start gap-2 text-sm text-navy/70"><Check className="w-4 h-4 text-soft-blue mt-0.5 flex-shrink-0" />{f}</li>)}</ul>
                <button className={`w-full py-3 rounded-xl font-medium transition-all ${tier.highlighted ? 'bg-strong-blue text-white hover:bg-strong-blue/90' : 'bg-pale-blue/30 text-navy hover:bg-pale-blue/50'}`}>{tier.cta}</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default PricingPage;
