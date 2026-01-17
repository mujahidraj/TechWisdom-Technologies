import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Shield, Eye, Headphones, Globe, Smartphone, Settings, Lock, CreditCard, Brain, BarChart, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

const iconMap: Record<string, any> = { Zap, Shield, Eye, Headphones, Globe, Smartphone, Settings, Lock, CreditCard, Brain, BarChart, FileText };

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count}{suffix}</span>;
};

const HomePage = () => {
  const { hero, stats, whyUs, partners, costEstimator } = data;
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, any>>({});
  const [email, setEmail] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculateScore = () => {
    let score = 50;
    if (selections.platform) score *= selections.platform.multiplier || 1;
    if (selections.design) score *= selections.design.multiplier || 1;
    if (selections.features) score += selections.features.reduce((acc: number, f: any) => acc + (f.points || 0), 0);
    return Math.min(Math.round(score), 100);
  };

  return (
    <Layout>
      <SEOHead title="Home" description={hero.subheadline} path="/" />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(73,136,196,0.15),transparent_50%)]" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl">
              {hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-strong-blue to-soft-blue text-white rounded-xl font-semibold text-center hover:opacity-90 transition-opacity">
                {hero.cta.primary}
              </Link>
              <Link to="/work" className="px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-center hover:bg-white/10 transition-colors">
                {hero.cta.secondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-8 rounded-2xl bg-pale-blue/20">
                <div className="text-5xl md:text-6xl font-bold text-strong-blue mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-navy/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Estimator */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-4">{costEstimator.title}</h2>
            <p className="text-navy/70 text-center mb-12">{costEstimator.subtitle}</p>
            
            <div className="bg-white rounded-3xl shadow-xl p-8">
              {!showResult ? (
                <>
                  <div className="flex gap-2 mb-8">
                    {costEstimator.steps.map((_, i) => (
                      <div key={i} className={`flex-1 h-2 rounded-full ${i <= step ? 'bg-strong-blue' : 'bg-pale-blue'}`} />
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-navy mb-2">{costEstimator.steps[step].title}</h3>
                  <p className="text-navy/60 mb-6">{costEstimator.steps[step].description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {costEstimator.steps[step].options.map((opt) => {
                      const Icon = iconMap[opt.icon as string];
                      const isSelected = step === 2 
                        ? selections.features?.some((f: any) => f.id === opt.id)
                        : (step === 0 ? selections.platform?.id : selections.design?.id) === opt.id;
                      
                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            if (step === 2) {
                              const current = selections.features || [];
                              const exists = current.some((f: any) => f.id === opt.id);
                              setSelections({ ...selections, features: exists ? current.filter((f: any) => f.id !== opt.id) : [...current, opt] });
                            } else {
                              setSelections({ ...selections, [step === 0 ? 'platform' : 'design']: opt });
                            }
                          }}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${isSelected ? 'border-strong-blue bg-pale-blue/30' : 'border-pale-blue/50 hover:border-soft-blue'}`}
                        >
                          {Icon && <Icon className="w-6 h-6 text-strong-blue mb-2" />}
                          <div className="font-medium text-navy">{opt.label}</div>
                          {opt.description && <div className="text-sm text-navy/60">{opt.description}</div>}
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-between">
                    <button onClick={() => setStep(Math.max(0, step - 1))} className={`px-6 py-2 rounded-lg ${step === 0 ? 'invisible' : 'bg-muted text-navy'}`}>Back</button>
                    <button
                      onClick={() => step < 2 ? setStep(step + 1) : setShowResult(true)}
                      className="px-6 py-2 rounded-lg bg-strong-blue text-white"
                    >
                      {step < 2 ? 'Next' : 'See Results'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl font-bold text-strong-blue mb-4">{calculateScore()}</div>
                  <p className="text-navy/70 mb-6">{costEstimator.result.title}</p>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={costEstimator.result.emailPlaceholder} className="w-full max-w-md px-4 py-3 rounded-lg border border-pale-blue mb-4" />
                  <button className="px-8 py-3 bg-strong-blue text-white rounded-lg font-medium">{costEstimator.result.buttonText}</button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <p className="text-center text-navy/50 mb-8 text-sm uppercase tracking-wider">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
            {partners.map((p, i) => (
              <div key={i} className="text-2xl font-bold text-navy/30">{p.name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bento-card">
                  {Icon && <Icon className="w-10 h-10 text-strong-blue mb-4" />}
                  <h3 className="text-xl font-semibold text-navy mb-2">{item.title}</h3>
                  <p className="text-navy/60 text-sm">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
