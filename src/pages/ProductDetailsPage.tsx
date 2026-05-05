import { useEffect } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Camera, 
  Layers, 
  CheckCircle2, 
  Star, 
  Zap,
  Cpu,
  Globe,
  BarChart3,
  Rocket,
  Smartphone,
  Monitor,
  Apple,
  CreditCard,
  Gem,
  Award,
  Download
} from 'lucide-react';
import MainLayout from '@/components/layout/Layout';
import SEOHead from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import data from '@/data.json';
import productCatalog from '@/productCatalog.json';
import InteractiveBackground from '@/components/ui/InteractiveBackground';

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProductDetailsPage = () => {
  const { id } = useParams();

  // @ts-ignore - Added SaaS properties to the interface via the JSON update
  const product = productCatalog.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [id]);

  if (!product) {
    return <Navigate to="/our-product" replace />;
  }

  return (
    <MainLayout>
      <SEOHead
        title={`${product.title} — TechWisdom`}
        description={product.summary}
        path={`/our-product/${product.id}`}
      />

      <InteractiveBackground />

      <div className="relative z-10 text-slate-100">
        
        {/* ==================== 1. PREMIUM HERO SECTION ==================== */}
        <section className="relative pt-28 md:pt-36 pb-16 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            {/* Breadcrumb / Back Link */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link to="/our-product" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group font-medium text-sm uppercase tracking-widest">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Suite
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
              <motion.div variants={heroStagger} initial="hidden" animate="visible" className="space-y-8">
                <motion.div variants={heroItem} transition={{ duration: 0.6 }}>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1.5 text-xs uppercase tracking-[0.2em] backdrop-blur-md">
                    Premium SaaS App
                  </Badge>
                </motion.div>

                <motion.h1 
                  variants={heroItem} 
                  transition={{ duration: 0.6 }}
                  className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white"
                >
                  {product.title}
                </motion.h1>

                {product.developer && (
                   <motion.div 
                     variants={heroItem}
                     className="text-sm font-bold text-blue-400/80 uppercase tracking-[0.3em] -mt-4"
                   >
                     by {product.developer}
                   </motion.div>
                )}

                <motion.p 
                  variants={heroItem}
                  className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 font-bold"
                >
                  {product.tagline}
                </motion.p>

                <motion.p 
                  variants={heroItem}
                  className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed font-light"
                >
                  {product.summary}
                </motion.p>

                <motion.div variants={heroItem} className="flex flex-wrap gap-4 pt-2">
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 h-14 shadow-xl shadow-blue-900/30 transition-all duration-300">
                    <a href="#pricing" className="inline-flex items-center gap-3 font-bold">
                      View Subscriptions
                      <CreditCard size={18} />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-blue-500/20 bg-blue-500/5 h-14 px-8 hover:bg-blue-500/10 text-blue-400 transition-all shadow-lg shadow-blue-900/10">
                    <a href={product.webAppUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-bold">
                      Launch Web App
                      <Globe size={18} />
                    </a>
                  </Button>
                  <div className="flex gap-2">
                     <Button asChild variant="outline" className="rounded-xl border-white/10 bg-white/5 h-14 px-4 hover:bg-white/10 transition-all">
                        <a href={product.appStoreUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                           <Apple size={24} />
                           <div className="text-left">
                              <div className="text-[8px] uppercase leading-none opacity-50">Download on the</div>
                              <div className="text-sm font-bold leading-none">App Store</div>
                           </div>
                        </a>
                     </Button>
                     <Button asChild variant="outline" className="rounded-xl border-white/10 bg-white/5 h-14 px-4 hover:bg-white/10 transition-all">
                        <a href={product.playStoreUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                           <Smartphone size={24} className="text-emerald-400" />
                           <div className="text-left">
                              <div className="text-[8px] uppercase leading-none opacity-50">Get it on</div>
                              <div className="text-sm font-bold leading-none">Google Play</div>
                           </div>
                        </a>
                     </Button>
                  </div>
                </motion.div>
                
                {/* Micro Stats */}
                <motion.div variants={heroItem} className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
                   <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Current Version</div>
                      <div className="text-white font-bold flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         v2.4.0 (Stable)
                      </div>
                   </div>
                   <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Platforms</div>
                      <div className="text-white font-bold flex items-center gap-2">
                         <div className="flex -space-x-1">
                            {product.platforms?.map((p: string) => (
                               <div key={p} className="p-1 rounded-full bg-slate-800 border border-white/10" title={p}>
                                  {p === 'iOS' ? <Apple size={10} /> : p === 'Android' ? <Smartphone size={10} /> : <Monitor size={10} />}
                               </div>
                            ))}
                         </div>
                         <span className="text-xs">{product.platforms?.join(' + ')}</span>
                      </div>
                   </div>
                   <div className="hidden md:block">
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">User Rating</div>
                      <div className="text-white font-bold flex items-center gap-2">
                         <Star size={14} className="text-amber-400 fill-amber-400" />
                         4.9/5.0
                      </div>
                   </div>
                </motion.div>
              </motion.div>

              {/* Snapshot Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-indigo-600/20 blur-3xl rounded-[3rem] opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="relative rounded-[2.5rem] border border-white/10 bg-slate-900/40 backdrop-blur-2xl p-4 md:p-6 shadow-2xl overflow-hidden">
                   <div className="flex items-center justify-between mb-4 px-4 pt-2">
                      <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                         <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                         <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono tracking-tighter">{product.id}_mobile_view.png</div>
                   </div>
                   <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-950/60 aspect-[9/16] md:aspect-[4/3] relative">
                     <img 
                       src={product.heroImage} 
                       alt={`${product.title} interface`} 
                       className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out opacity-90 group-hover:opacity-100" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40" />
                   </div>
                   
                   <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                         <div className="text-[10px] text-blue-400 uppercase font-bold mb-1">Best For</div>
                         <div className="text-xs text-white leading-tight font-medium">{product.builtFor}</div>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                         <div className="text-[10px] text-purple-400 uppercase font-bold mb-1">Architecture</div>
                         <div className="text-xs text-white leading-tight font-medium">Cloud Hybrid</div>
                      </div>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 2. OVERVIEW & CAPABILITIES ==================== */}
        <section className="relative py-12 border-t border-white/5">
           <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-12 gap-12">
                 
                 {/* Sticky Side Label */}
                 <div className="lg:col-span-3 lg:sticky lg:top-32 h-fit">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-8 h-px bg-blue-500" />
                       <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">Features</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Core Experience</h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                       Built with the same attention to detail as our flagship VocabVault engine.
                    </p>
                    
                    <div className="space-y-4">
                       {[
                         { label: 'Security', icon: ShieldCheck, value: 'End-to-End' },
                         { label: 'Performance', icon: Zap, value: '60 FPS UI' },
                         { label: 'Cloud Sync', icon: Globe, value: 'Instant' }
                       ].map((item, i) => (
                         <div key={i} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                            <item.icon size={16} className="text-blue-400" />
                            <div>
                               <div className="text-[10px] text-slate-500 uppercase font-bold">{item.label}</div>
                               <div className="text-xs text-white font-bold">{item.value}</div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Main Content Area */}
                 <div className="lg:col-span-9 space-y-12">
                    <motion.div
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       className="rounded-[2.5rem] border border-white/10 bg-slate-900/30 backdrop-blur-md p-8 md:p-12"
                    >
                       <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                          <Rocket size={24} className="text-blue-500" />
                          App Philosophy
                       </h3>
                       <p className="text-xl text-slate-300 leading-relaxed font-light mb-12">
                          {product.overview}
                       </p>

                       <div className="grid md:grid-cols-2 gap-8 pt-12 border-t border-white/5">
                          <div>
                             <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Award className="text-amber-500" size={20} />
                                Key Highlights
                             </h4>
                             <div className="grid gap-4">
                                {product.highlights.map((item: string, idx: number) => (
                                  <motion.div 
                                    key={item}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group"
                                  >
                                    <CheckCircle2 className="text-blue-500 group-hover:scale-110 transition-transform" size={18} />
                                    <span className="text-slate-200 text-sm font-medium group-hover:text-white transition-colors">{item}</span>
                                  </motion.div>
                                ))}
                             </div>
                          </div>

                          <div className="bg-blue-600/5 rounded-3xl p-8 border border-blue-500/10 h-fit">
                             <h4 className="text-lg font-bold text-white mb-4">Deep Integration</h4>
                             <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                Whether on iOS, Android, or Web, the experience remains consistent, fast, and secure.
                             </p>
                             <div className="flex gap-4">
                                <Apple className="text-slate-500" size={24} />
                                <Smartphone className="text-slate-500" size={24} />
                                <Monitor className="text-slate-500" size={24} />
                             </div>
                          </div>
                       </div>
                    </motion.div>
                 </div>
              </div>
           </div>
        </section>

        {/* ==================== 3. PRICING SECTION ==================== */}
        <section id="pricing" className="py-24 bg-transparent relative overflow-hidden border-t border-white/5">
           <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                 <Badge variant="outline" className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1 uppercase tracking-widest">Subscription Tiers</Badge>
                 <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Choose Your Level</h2>
                 <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                   Flexible plans designed for individuals, teams, and large-scale institutions.
                 </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                 {product.pricing?.map((plan: any, i: number) => (
                    <motion.div
                       key={plan.plan}
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className={`relative p-8 rounded-[2.5rem] border ${plan.popular ? 'border-blue-500 bg-blue-600/5 shadow-2xl shadow-blue-900/20' : 'border-white/10 bg-slate-900/40'} flex flex-col`}
                    >
                       {plan.popular && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                             Most Popular
                          </div>
                       )}
                       
                       <div className="mb-8">
                          <h4 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">{plan.plan}</h4>
                          <div className="text-4xl font-black text-white">{plan.price}</div>
                          {plan.price !== 'Free' && plan.price !== 'Custom' && <span className="text-xs text-slate-500 font-medium">per month</span>}
                       </div>

                       <div className="space-y-4 mb-10 flex-1">
                          {plan.features.map((feature: string) => (
                             <div key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                                <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                                {feature}
                             </div>
                          ))}
                       </div>

                       <Button asChild size="lg" className={`w-full rounded-full font-bold ${plan.popular ? 'bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30' : 'bg-white text-slate-900 hover:bg-slate-200'}`}>
                          <Link to="/contact">{plan.cta}</Link>
                       </Button>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* ==================== 4. FEATURE GALLERY ==================== */}
        <section className="py-24 bg-transparent border-t border-white/5 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-1 uppercase tracking-widest">Interface Tour</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Experience the UI</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                A premium user interface built for engagement, focus, and speed.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {product.gallery.map((image: string, index: number) => (
                <motion.div
                  key={image}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-[2rem] overflow-hidden border border-white/10"
                >
                  <img src={image} alt="UI Screenshot" className="aspect-[16/10] w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <Camera size={14} className="text-white" />
                     </div>
                     <span className="text-[10px] text-white/70 uppercase font-black tracking-widest">Preview {index + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. EXPANDED SOCIAL PROOF ==================== */}
        <section className="py-24 bg-slate-950/20 border-y border-white/5 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
           <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-center md:text-left">
                 <div className="max-w-2xl">
                    <Badge variant="outline" className="mb-4 bg-amber-500/10 text-amber-500 border-amber-500/20 px-4 py-1 uppercase tracking-widest">User Wall</Badge>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Voices of Trust</h2>
                    <p className="text-slate-400 mt-4 text-lg">Join over 50,000+ power users achieving mastery every day.</p>
                 </div>
                 <div className="flex flex-col items-center md:items-end gap-2">
                    <div className="flex gap-1">
                       {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Average Rating: 4.9/5.0</span>
                 </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[
                   {
                     quote: "The sequential mastery system is a game-changer. I've never retained vocabulary this effectively before. Worth every penny of the Pro sub.",
                     author: "Alex Rivera",
                     role: "Language Enthusiast",
                     avatar: "AR"
                   },
                   {
                     quote: "VocabVault has completely transformed how our students learn. The school management features in EduSphere are equally impressive.",
                     author: "Dr. Sarah Miller",
                     role: "Head of Academics",
                     avatar: "SM"
                   },
                   {
                     quote: "Finally, a wellness app that doesn't feel like a chore. LifeFlow's focus tracking is light-years ahead of the competition.",
                     author: "James Chen",
                     role: "Executive Founder",
                     avatar: "JC"
                   },
                   {
                     quote: "The interface is just... wow. It's rare to find an app that is both technically deep and visually stunning. Peak performance.",
                     author: "Elena Petrova",
                     role: "UX Designer",
                     avatar: "EP"
                   },
                   {
                     quote: "I use this daily on my commute. The offline mode is flawless and the sync between my iPhone and Mac is instantaneous.",
                     author: "Michael Ross",
                     role: "Daily Power User",
                     avatar: "MR"
                   },
                   {
                     quote: "As a school administrator, I've tried many SIS platforms. EduSphere is the first one that actually feels like it's from the 21st century.",
                     author: "Kevin Wright",
                     role: "Operations Director",
                     avatar: "KW"
                   }
                 ].map((review, index) => (
                    <motion.div
                       key={index}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: index * 0.1 }}
                       className="group relative p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 backdrop-blur-xl hover:border-blue-500/20 transition-all flex flex-col shadow-xl shadow-black/20"
                    >
                       <p className="text-slate-300 leading-relaxed italic mb-8 flex-1">"{review.quote}"</p>
                       <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-sm font-black text-white border border-white/20">
                             {review.avatar}
                          </div>
                          <div>
                             <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{review.author}</div>
                             <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{review.role}</div>
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* ==================== 6. FINAL ACTION ==================== */}
        <section className="py-24 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] border border-white/10 bg-gradient-to-br from-blue-600/20 via-slate-900/60 to-purple-600/20 backdrop-blur-2xl p-12 md:p-20 overflow-hidden group text-center"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
              Ready to Upgrade?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 font-light">
              Join thousands of users already achieving mastery with {product.title}. Get started for free today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
               <Button asChild size="lg" className="rounded-full px-12 h-16 bg-blue-600 hover:bg-blue-500 font-black text-lg shadow-2xl shadow-blue-600/40 transition-all hover:scale-105">
                  <Link to="/contact">Get Premium Access</Link>
               </Button>
               <Button asChild size="lg" variant="outline" className="rounded-full px-12 h-16 border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-400 text-lg transition-all shadow-xl shadow-blue-900/10">
                  <a href={product.webAppUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                     <Globe size={20} />
                     Launch Web App
                  </a>
               </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-4">
                <Button asChild variant="outline" className="rounded-xl border-white/10 bg-white/5 h-12 px-6 hover:bg-white/10 transition-all">
                  <a href={product.appStoreUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                      <Apple size={20} />
                      <span className="text-sm font-bold">App Store</span>
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-xl border-white/10 bg-white/5 h-12 px-6 hover:bg-white/10 transition-all">
                  <a href={product.playStoreUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                      <Smartphone size={20} className="text-emerald-400" />
                      <span className="text-sm font-bold">Google Play</span>
                  </a>
                </Button>
            </div>
          </motion.div>
        </section>

      </div>
    </MainLayout>
  );
};

export default ProductDetailsPage;