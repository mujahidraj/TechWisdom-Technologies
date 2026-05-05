import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/seo/SEOHead';
import data from '@/data.json';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Code2, 
  Database, 
  Cpu, 
  Globe, 
  Lock, 
  LifeBuoy, 
  MessageSquare, 
  ChevronDown,
  Layers,
  Zap,
  CheckCircle2,
  Settings,
  HeartHandshake
} from 'lucide-react';
import InteractiveBackground from '@/components/ui/InteractiveBackground';
import productCatalog from '@/productCatalog.json';

const heroStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-2xl bg-slate-900/20 backdrop-blur-sm overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="text-slate-400 group-hover:text-blue-400 transition-colors" size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const OurProduct = () => {
  const products = productCatalog;

  return (
    <Layout>
      <SEOHead title="Our Product — TechWisdom" description={data.site.description} />

      <InteractiveBackground />

      <div className="relative z-10 text-slate-100">
        
        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="relative pt-10 pb-12 md:pt-12 md:pb-16 overflow-hidden min-h-[72vh] flex items-center justify-center">
          <div className="container relative z-10 px-4 text-center">
            <motion.div
              variants={heroStagger}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto space-y-6"
            >
              <motion.div variants={heroItem} transition={{ duration: 0.55 }}>
                <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-3 py-0.5 text-[11px] uppercase tracking-[0.28em] backdrop-blur-md bg-slate-900/30">
                  Owned Product Suite
                </Badge>
              </motion.div>

              <motion.div variants={heroItem} transition={{ duration: 0.65 }}>
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500 drop-shadow-2xl">
                  Built to prove what we can ship
                </h1>
              </motion.div>

              <motion.div variants={heroItem} transition={{ duration: 0.65, delay: 0.05 }}>
                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                  These are the products TechWisdom builds, owns, and evolves internally. They share the same design language, motion system, and trust-first approach as the rest of the site.
                </p>
              </motion.div>

              <motion.div variants={heroItem} transition={{ duration: 0.65, delay: 0.1 }}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-0">
                  <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all">
                    <a href="#products" className="inline-flex items-center gap-2">
                      Explore products
                      <ArrowRight size={18} />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-white/10 bg-white/5 text-slate-100 hover:bg-white/10 hover:text-white">
                    <Link to="/contact" className="inline-flex items-center gap-2">
                      Talk to us
                      <Sparkles size={18} />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Quick Stats Grid */}
              <motion.div variants={heroItem} transition={{ duration: 0.65, delay: 0.15 }}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-3xl mx-auto">
                  {[
                    { label: 'Secure by design', value: 'Bank-grade', icon: ShieldCheck },
                    { label: 'Built in-house', value: '100%', icon: Code2 },
                    { label: 'Consistent UI system', value: 'Shared', icon: Layers },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      className="rounded-2xl border border-white/10 bg-slate-900/30 backdrop-blur-md p-5 text-left shadow-[0_0_30px_rgba(15,23,42,0.25)] group hover:border-blue-500/30 transition-all"
                    >
                      <div className="flex items-center gap-2 text-blue-400 text-sm font-medium uppercase tracking-wider">
                        <item.icon size={14} className="group-hover:scale-110 transition-transform" />
                        {item.label}
                      </div>
                      <div className="mt-3 text-2xl font-bold text-white">{item.value}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ==================== 2. PRODUCT GRID SECTION ==================== */}
        <section id="products" className="py-24 bg-transparent relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55 }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4 bg-blue-500/10 text-blue-300 border border-blue-500/20">Product Portfolio</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Products we actually own and maintain</h2>
              <p className="mt-4 text-slate-400 leading-relaxed text-lg max-w-2xl mx-auto">
                Each product below is designed with the same dark, glassy, motion-rich language you already see on the homepage.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 relative z-10 max-w-5xl mx-auto">
              {products.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 28, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-slate-900/40 border border-white/10 backdrop-blur-xl hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:-translate-y-2 transition-all duration-500 group flex flex-col">
                    <CardHeader className="relative overflow-hidden p-0">
                       <div className="aspect-video w-full bg-slate-800 relative overflow-hidden">
                          <img 
                            src={p.heroImage} 
                            alt={p.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                       </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-1">
                      <div className="flex items-center justify-between mb-3">
                         <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{p.title}</h3>
                         <Zap size={18} className="text-blue-500" />
                      </div>
                      <p className="font-medium text-blue-300/80 text-sm mb-3">{p.tagline}</p>
                      <p className="text-sm leading-relaxed text-slate-400 line-clamp-3">{p.summary}</p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button asChild className="w-full rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 group/btn">
                        <Link to={`/our-product/${p.id}`} className="inline-flex items-center gap-2">
                          View Case Study
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 3. PHILOSOPHY SECTION ==================== */}
        <section className="py-24 bg-slate-950/20 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">The Why</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">Our Development Philosophy</h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  We don't just build software; we build digital legacies. Every product in our suite goes through a rigorous process of validation, engineering, and refinement.
                </p>
                
                <div className="space-y-6">
                  {[
                    { title: 'User-Centric Design', desc: 'Interfaces that feel natural and intuitive.', icon: Sparkles },
                    { title: 'Performance First', desc: 'Zero bloat, lightning fast execution.', icon: Zap },
                    { title: 'Scalable Architecture', desc: 'Built to handle growth from day one.', icon: Layers },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">{item.title}</h4>
                        <p className="text-slate-500 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full" />
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="relative bg-slate-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-md"
                >
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all">
                        <Code2 className="text-blue-400 mb-4" size={32} />
                        <div className="text-2xl font-bold text-white">Clean</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Codebase</div>
                      </div>
                      <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all mt-8">
                        <ShieldCheck className="text-purple-400 mb-4" size={32} />
                        <div className="text-2xl font-bold text-white">Secure</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">By Default</div>
                      </div>
                      <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all -mt-4">
                        <Zap className="text-emerald-400 mb-4" size={32} />
                        <div className="text-2xl font-bold text-white">Fast</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Performance</div>
                      </div>
                      <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all mt-4">
                        <Database className="text-orange-400 mb-4" size={32} />
                        <div className="text-2xl font-bold text-white">Robust</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Infrastructure</div>
                      </div>
                   </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 4. TECH STACK SECTION ==================== */}
        <section className="py-24 bg-transparent">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
               <Badge variant="secondary" className="mb-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">The Engine</Badge>
               <h2 className="text-3xl md:text-4xl font-bold text-white">Powered by Modern Tech</h2>
               <p className="text-slate-400 mt-4 max-w-xl mx-auto">We use the same industry-leading tools to build our products as we do for our high-end enterprise clients.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'React / Next.js', icon: Globe, color: 'text-blue-400' },
                { name: 'TypeScript', icon: Code2, color: 'text-blue-600' },
                { name: 'Node.js', icon: Cpu, color: 'text-emerald-500' },
                { name: 'Tailwind CSS', icon: Sparkles, color: 'text-sky-400' },
                { name: 'PostgreSQL', icon: Database, color: 'text-indigo-400' },
                { name: 'Framer Motion', icon: Zap, color: 'text-purple-400' },
                { name: 'Docker / K8s', icon: Layers, color: 'text-blue-500' },
                { name: 'Redis', icon: Zap, color: 'text-red-500' },
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 flex flex-col items-center justify-center gap-4 hover:bg-slate-800/50 transition-all hover:border-blue-500/20 group"
                >
                  <tech.icon className={`${tech.color} group-hover:scale-110 transition-transform`} size={32} />
                  <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. SECURITY SECTION ==================== */}
        <section className="py-24 bg-slate-900/30 backdrop-blur-md relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />
           <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-3xl mx-auto text-center mb-16">
                 <Lock className="w-16 h-16 text-blue-500 mx-auto mb-6 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20" />
                 <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Security is not an afterthought</h2>
                 <p className="text-lg text-slate-400 leading-relaxed">
                   In a world of digital threats, we build our products with a "Trust First" mindset. From encrypted data at rest to zero-trust architecture, your data's safety is our priority.
                 </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                 {[
                   { title: 'End-to-End Encryption', desc: 'Sensitive data is encrypted from the moment it leaves the browser.' },
                   { title: 'Regular Audits', desc: 'Continuous security scanning and quarterly external penetration tests.' },
                   { title: 'GDPR Compliant', desc: 'Built-in privacy controls and strict data handling protocols.' },
                 ].map((feat, i) => (
                   <div key={i} className="p-8 rounded-3xl border border-white/10 bg-slate-950/40 hover:border-blue-500/30 transition-all">
                      <CheckCircle2 className="text-emerald-500 mb-4" size={24} />
                      <h4 className="text-white font-bold text-xl mb-2">{feat.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* ==================== 6. SUPPORT SECTION ==================== */}
        <section className="py-24 bg-transparent">
           <div className="container mx-auto px-6">
              <div className="bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900 border border-white/10 rounded-[2.5rem] p-12 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
                 
                 <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                       <Badge variant="outline" className="mb-4 border-emerald-500/30 bg-emerald-500/10 text-emerald-400">Ongoing Care</Badge>
                       <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Unmatched Support & Maintenance</h2>
                       <p className="text-slate-400 text-lg leading-relaxed mb-8">
                         Building the product is just the beginning. We provide continuous updates, security patches, and performance tuning to ensure your digital tools remain top-tier.
                       </p>
                       
                       <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-slate-300">
                             <LifeBuoy size={18} className="text-emerald-400" />
                             <span>24/7 Monitoring</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                             <Settings size={18} className="text-emerald-400" />
                             <span>Weekly Updates</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                             <HeartHandshake size={18} className="text-emerald-400" />
                             <span>Direct Access</span>
                          </div>
                       </div>
                    </div>
                    
                    <div className="bg-slate-950/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                       <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                          <MessageSquare className="text-blue-400" size={24} />
                          Need a Custom Solution?
                       </h3>
                       <p className="text-slate-400 mb-8">If our standard products don't fit your exact workflow, we can adapt them or build a bespoke version just for you.</p>
                       <Button asChild className="w-full bg-white text-slate-900 hover:bg-slate-200 rounded-full h-12">
                          <Link to="/contact">Get a Custom Quote</Link>
                       </Button>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* ==================== 7. FAQ SECTION ==================== */}
        <section className="py-24 bg-transparent border-t border-white/5">
           <div className="container max-w-4xl mx-auto px-6">
              <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Product FAQ</h2>
                 <p className="text-slate-400">Common questions about our internal product suite.</p>
              </div>
              
              <div className="space-y-4">
                 <FaqItem 
                   question="Are these products available for white-labeling?" 
                   answer="Yes, most of our internal products can be white-labeled and re-skinned to match your company's brand identity. We offer flexible licensing models for this." 
                 />
                 <FaqItem 
                   question="How do you handle product updates?" 
                   answer="Updates are rolled out seamlessly. Since we use a modular micro-frontend architecture, we can update core features without any downtime for your users." 
                 />
                 <FaqItem 
                   question="Can these products be hosted on my own servers?" 
                   answer="While we recommend our managed cloud hosting for peak performance, we do offer on-premise deployment options for enterprise clients with strict data residency requirements." 
                 />
                 <FaqItem 
                   question="Do you offer training for my team?" 
                   answer="Absolutely. Every product rollout includes a comprehensive training session and detailed digital documentation for your administrative and end-user teams." 
                 />
              </div>
           </div>
        </section>

        {/* ==================== 8. FINAL CTA SECTION ==================== */}
        <section className="py-24 bg-transparent text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-blue-600/5 blur-[150px] pointer-events-none" />
           <div className="container mx-auto px-6 relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to see it in action?</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                Join the growing number of businesses leveraging TechWisdom's proprietary product suite to scale faster and more securely.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <Button asChild size="lg" className="rounded-full px-12 h-16 text-lg bg-blue-600 hover:bg-blue-500 shadow-2xl shadow-blue-600/40 border border-blue-400/20">
                    <Link to="/contact">Schedule a Demo</Link>
                 </Button>
                 <Button asChild size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md">
                    <Link to="/work">View Client Work</Link>
                 </Button>
              </div>
           </div>
        </section>

      </div>
    </Layout>
  );
};

export default OurProduct;
