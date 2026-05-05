import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/seo/SEOHead';
import data from '@/data.json';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import InteractiveBackground from '@/components/ui/InteractiveBackground';

const OurProduct = () => {
  const products = [
    {
      id: 'trust-guard',
      title: 'TrustGuard',
      tagline: 'Digital trust & identity toolkit',
      desc: 'A secure, embeddable set of identity and verification widgets for marketplaces and platforms.',
    },
    {
      id: 'insight-hub',
      title: 'InsightHub',
      tagline: 'Analytics & conversion insights',
      desc: 'Lightweight analytics dashboard focused on conversions, funnels and campaign attribution.',
    },
    {
      id: 'forms-flow',
      title: 'FormsFlow',
      tagline: 'Smart forms and workflows',
      desc: 'No-code form builder with conditional flows, webhooks and submission pipelines.',
    }
  ];

  return (
    <Layout>
      <SEOHead title="Our Product — TechWisdom" description={data.site.description} />

      <InteractiveBackground />

      <div className="relative z-10 text-slate-100">
        <section className="relative pt-10 pb-12 md:pt-12 md:pb-16 overflow-hidden min-h-[72vh] flex items-center justify-center">
          <div className="container relative z-10 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-3 py-0.5 text-[11px] uppercase tracking-[0.28em] backdrop-blur-md bg-slate-900/30">
                Owned Product Suite
              </Badge>

              <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500 drop-shadow-2xl">
                Built to prove what we can ship
              </h1>

              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                These are the products TechWisdom builds, owns, and evolves internally. They share the same design language, motion system, and trust-first approach as the rest of the site.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-0">
                <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all">
                  <a href="#products" className="inline-flex items-center gap-2">
                    Explore products
                    <ArrowRight size={18} />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-white/10 bg-white/5 text-slate-100 hover:bg-white/10 hover:text-white">
                  <a href="/contact" className="inline-flex items-center gap-2">
                    Talk to us
                    <Sparkles size={18} />
                  </a>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-3xl mx-auto">
                {[
                  { label: 'Secure by design', value: 'Bank-grade' },
                  { label: 'Built in-house', value: '100%' },
                  { label: 'Consistent UI system', value: 'Shared' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/30 backdrop-blur-md p-5 text-left shadow-[0_0_30px_rgba(15,23,42,0.25)]">
                    <div className="flex items-center gap-2 text-blue-400 text-sm font-medium uppercase tracking-wider">
                      <ShieldCheck size={14} />
                      {item.label}
                    </div>
                    <div className="mt-3 text-2xl font-bold text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="products" className="container mx-auto px-6 pb-28">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Products we actually own and maintain</h2>
            <p className="mt-4 text-slate-400 leading-relaxed text-lg">
              Each product below is designed with the same dark, glassy, motion-rich language you already see on the homepage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {products.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Card className="h-full bg-slate-900/30 border border-white/5 backdrop-blur-sm hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.12)] transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <p className="font-medium text-slate-200">{p.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                    <div className="mt-6">
                      <Button asChild className="rounded-full bg-white text-blue-700 hover:bg-blue-50">
                        <a href={`/products/${p.id}`} className="inline-flex items-center gap-2">
                          Learn more
                          <ArrowRight size={16} />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default OurProduct;
