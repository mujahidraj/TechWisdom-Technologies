import { useEffect } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Camera, Layers, CheckCircle2, Star, Zap } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import data from '@/data.json';
import productCatalog from '@/productCatalog.json';

const heroStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const ProductDetailsPage = () => {
  const { id } = useParams();

  const product = productCatalog.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [id]);

  if (!product) {
    return <Navigate to="/our-product" replace />;
  }

  return (
    <Layout>
      <SEOHead
        title={`${product.title} — TechWisdom`}
        description={product.summary}
        path={`/our-product/${product.id}`}
      />

      <div className="fixed inset-0 z-0 overflow-hidden bg-[#020617] pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-600/20 via-purple-600/5 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 inset-x-0 h-[500px] bg-gradient-to-t from-indigo-600/20 via-blue-600/5 to-transparent blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="relative z-10 text-slate-100">
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/our-product" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group font-medium">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Products
            </Link>

            <motion.div variants={heroStagger} initial="hidden" animate="visible" className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
              <motion.div variants={heroItem} transition={{ duration: 0.6 }} className="space-y-6">
                <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest bg-blue-500/10 backdrop-blur-md">
                  Product Suite
                </Badge>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
                  {product.title}
                </h1>

                <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium">
                  {product.tagline}
                </p>

                <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
                  {product.summary}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-full px-8 h-12 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300">
                      <Link to="/contact" className="inline-flex items-center gap-2">
                        Talk to us
                        <Sparkles size={16} />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild size="lg" variant="outline" className="text-white border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 rounded-full px-8 h-12 backdrop-blur-sm transition-all duration-300">
                      <Link to="/our-product" className="inline-flex items-center gap-2">
                        Explore other products
                        <ArrowRight size={16} />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                variants={heroItem}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-slate-900/40 to-purple-500/10 backdrop-blur-md p-8 shadow-2xl shadow-blue-900/20 hover:border-blue-400/30 hover:shadow-blue-900/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 text-blue-400 uppercase tracking-[0.28em] text-xs font-semibold group-hover:text-blue-300 transition-colors">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                    <Camera size={16} />
                  </motion.div>
                  Product Snapshot
                </div>
                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 group-hover:border-blue-400/20 transition-all duration-300">
                  <img 
                    src={product.heroImage} 
                    alt={`${product.title} preview`} 
                    className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="mt-6 space-y-5">
                  <div className="group/item">
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold group-hover/item:text-blue-400 transition-colors">Status</div>
                    <div className="mt-2 text-lg text-white font-semibold group-hover/item:text-blue-200 transition-colors">{product.status}</div>
                  </div>
                  <div className="group/item">
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold group-hover/item:text-blue-400 transition-colors">Built For</div>
                    <div className="mt-2 text-slate-200 leading-relaxed group-hover/item:text-white transition-colors">{product.builtFor}</div>
                  </div>
                  <div className="group/item">
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold group-hover/item:text-blue-400 transition-colors">Site Context</div>
                    <div className="mt-2 text-slate-200 leading-relaxed group-hover/item:text-white transition-colors">{data.site.description}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-6 pt-8 pb-24">
          <div className="relative mb-8">
            <div className="absolute -left-6 top-0 w-1 h-12 bg-gradient-to-b from-blue-500 to-transparent" />
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Layers size={28} className="text-blue-400" /> 
              <span>Key Capabilities</span>
            </h2>
            <p className="mt-2 text-slate-400 leading-relaxed max-w-2xl">What makes this product stand out</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-2 rounded-3xl border border-white/10 bg-slate-900/30 backdrop-blur-md p-8 hover:border-blue-400/20 transition-all duration-300 space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Overview</h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {product.overview}
                </p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-bold text-white mb-4">Key Features</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.highlights.map((item, idx) => (
                    <motion.div 
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 group"
                    >
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-400 shrink-0 group-hover:scale-150 transition-transform duration-300" />
                      <span className="text-slate-200 group-hover:text-white transition-colors leading-relaxed">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        <section className="container mx-auto px-6 py-24">
          <div className="mb-12 relative">
            <div className="absolute -left-6 top-0 w-1 h-12 bg-gradient-to-b from-blue-500 to-transparent" />
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 mb-2">
              <Camera size={28} className="text-blue-400" />
              Feature Screenshots
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-3xl">
              See the product in action with these carefully curated interface moments.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {product.gallery.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 hover:border-blue-400/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                <img 
                  src={image} 
                  alt={`${product.title} screenshot ${index + 1}`} 
                  className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <Zap size={24} className="text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="container mx-auto px-6 py-24">
          <div className="mb-12 relative">
            <div className="absolute -left-6 top-0 w-1 h-12 bg-gradient-to-b from-purple-500 to-transparent" />
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 mb-2">
              <CheckCircle2 size={28} className="text-purple-400" />
              How it compares
            </h2>
            <p className="text-slate-400 leading-relaxed">See the difference our approach makes.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              className="group"
            >
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6 group-hover:border-slate-300/20 transition-all duration-300">
                <div className="text-xs uppercase tracking-[0.28em] text-slate-400 font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-500" />
                  Traditional approach
                </div>
                <ul className="mt-6 space-y-4">
                  {product.comparison.traditional.map((item) => (
                    <li key={item} className="flex gap-3 group/item">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-slate-500 shrink-0 group-hover/item:scale-125 transition-transform" />
                      <span className="text-slate-400 group-hover/item:text-slate-300 transition-colors leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="group"
            >
              <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/15 via-slate-900/40 to-blue-600/5 p-6 group-hover:border-blue-400/50 transition-all duration-300 shadow-lg shadow-blue-600/10">
                <div className="text-xs uppercase tracking-[0.28em] text-blue-300 font-semibold flex items-center gap-2">
                  <Sparkles size={14} />
                  With TechWisdom
                </div>
                <ul className="mt-6 space-y-4">
                  {product.comparison.withTechWisdom.map((item) => (
                    <li key={item} className="flex gap-3 group/item">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-400 shrink-0 group-hover/item:scale-125 transition-transform" />
                      <span className="text-blue-100 group-hover/item:text-white transition-colors leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-24">
          <div className="mb-12 relative">
            <div className="absolute -left-6 top-0 w-1 h-12 bg-gradient-to-b from-amber-400 to-transparent" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Star size={28} className="text-amber-400 fill-amber-400" />
              What users say
            </h2>
            <p className="text-slate-400 leading-relaxed">Real feedback from teams who've built with our products.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "This tool transformed how we handle identity verification. The documentation is incredibly clear and the support team was responsive to every question.",
                author: "Sarah Chen",
                role: "Product Lead at DataFlow Inc.",
                avatar: "SC",
                rating: 5,
              },
              {
                quote: "We were skeptical about implementation time, but it took less than two weeks to integrate fully. The architecture is so well-thought-out.",
                author: "Marcus Johnson",
                role: "CTO at FinanceHub",
                avatar: "MJ",
                rating: 5,
              },
              {
                quote: "The best part isn't the features—it's the philosophy behind them. This is how software should be built. Highly recommend.",
                author: "Priya Sharma",
                role: "Founder at TrustAI Labs",
                avatar: "PS",
                rating: 5,
              },
            ].map((review, index) => (
              <motion.div
                key={review.author}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/5 via-slate-900/40 to-orange-500/5 backdrop-blur-md p-6 hover:border-amber-400/30 transition-all duration-300 flex flex-col"
              >
                <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-5 transition-opacity duration-300 blur-2xl" />
                
                <div className="mb-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-200 leading-relaxed italic">"{review.quote}"</p>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-white/10 mt-auto">
                  <motion.div 
                    className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 10 }}
                  >
                    {review.avatar}
                  </motion.div>
                  <div>
                    <div className="text-sm font-semibold text-white">{review.author}</div>
                    <div className="text-xs text-slate-400">{review.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55 }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/15 via-slate-900/40 to-purple-600/15 backdrop-blur-md p-8 md:p-12 hover:border-blue-400/30 transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute -right-40 -top-40 w-80 h-80 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-3xl" />
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 relative z-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Ready to transform your business?
                </h2>
                <p className="mt-4 text-slate-300 leading-relaxed text-lg">
                  Adapt this product into a custom solution tailored to your workflows and brand identity.
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="rounded-full px-10 h-14 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:shadow-2xl transition-all duration-300 whitespace-nowrap">
                  <Link to="/contact" className="inline-flex items-center gap-3">
                    Start a conversation
                    <ArrowRight size={20} />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;