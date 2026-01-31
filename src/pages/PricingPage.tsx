/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, HelpCircle, Server, Code, Layers, Smartphone, Palette, Megaphone, Zap, ArrowRight, Sparkles } from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// --- INTERACTIVE BACKGROUND ---
const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateParallax = (factor: number) => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { x, y };
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020617] pointer-events-none">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-600/20 via-purple-600/5 to-transparent blur-[120px]" />
      <div className="absolute bottom-0 inset-x-0 h-[500px] bg-gradient-to-t from-indigo-600/20 via-blue-600/5 to-transparent blur-[120px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 40%)`,
        }}
      />
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className={`absolute rounded-full ${i % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}
            initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight + 100, opacity: 0 }}
            animate={{ y: -100, opacity: [0, 0.4, 0] }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
            style={{ width: Math.random() * 4 + 1 + 'px', height: Math.random() * 4 + 1 + 'px' }}
          />
        ))}
      </div>
      <motion.div className="absolute inset-0" animate={calculateParallax(0.02)} transition={{ type: "tween", ease: "linear", duration: 0.2 }}>
        <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-blue-500 rounded-full opacity-20 blur-[1px]" />
      </motion.div>
    </div>
  );
};

// --- FAQ DATA ---
const FAQS = [
  { question: "Do I need a maintenance plan?", answer: "Not strictly. However, websites require hosting, security updates, and backups. If you don't choose a plan, you will need to manage hosting, SSL renewals, and security patches yourself.", icon: HelpCircle },
  { question: "Are there hidden fees?", answer: "No. The development price is a one-time fee. Third-party costs (like domain names approx ৳1000/yr or specific paid plugins/ad spend) are purchased directly by you, so you retain full ownership.", icon: Layers },
  { question: "How long does it take to build?", answer: "A standard landing page takes 3-5 days. A corporate site takes 2-3 weeks, and E-commerce/App projects typically take 4-6 weeks depending on the complexity and number of features.", icon: Zap },
  { question: "What is the payment schedule?", answer: "We typically require a 50% deposit to start the project. The remaining 50% is due only after you have reviewed the final product and we are ready to launch.", icon: Server }
];

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(true);
  const { pricing } = data;

  const formatBDT = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('BDT', '৳');
  };

  // Pricing Card Component
  const PricingCard = ({ tier, isMaintenance = false }: { tier: any, isMaintenance?: boolean }) => {
    const price = isMaintenance && isYearly ? Math.round(tier.yearlyPrice / 12) : (isMaintenance ? tier.monthlyPrice : tier.price);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="h-full"
      >
        <Card className={`flex flex-col h-full transition-all duration-500 relative overflow-hidden bg-slate-900/40 backdrop-blur-sm ${
          tier.highlighted 
            ? 'border-blue-500/50 shadow-[0_0_40px_rgba(37,99,235,0.15)] scale-100 md:scale-105 z-10' 
            : 'border-white/10 hover:border-white/20 hover:shadow-xl'
        }`}>
          {tier.highlighted && (
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
          )}
          
          <CardHeader className="pt-8">
            {tier.highlighted && (
              <Badge className="w-fit mb-4 bg-blue-500 text-white border-none shadow-lg shadow-blue-500/20">
                <Sparkles size={12} className="mr-1" /> Most Popular
              </Badge>
            )}
            <CardTitle className="text-2xl font-bold text-white">{tier.name}</CardTitle>
            <CardDescription className="mt-2 text-slate-400 min-h-[40px] leading-relaxed">
              {tier.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-grow">
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                {formatBDT(price)}
              </span>
              <span className="text-slate-500 font-medium text-sm">
                {isMaintenance ? "/mo" : "/one-time"}
              </span>
            </div>
            
            {isMaintenance && isYearly && (
              <p className="text-xs text-emerald-400 font-medium mb-6 bg-emerald-500/10 w-fit px-2 py-1 rounded">
                Billed {formatBDT(tier.yearlyPrice)} yearly (Save 20%)
              </p>
            )}
            {!isMaintenance && <div className="h-6 mb-4" />} {/* Spacer for alignment */}

            <Separator className="mb-6 bg-white/10" />
            
            <ul className="space-y-4">
              {tier.features.map((f: string, j: number) => (
                <li key={j} className="flex items-start gap-3 text-sm text-slate-300">
                  <div className="mt-0.5 p-0.5 rounded-full bg-blue-500/20 text-blue-400">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
          
          <CardFooter className="pb-8">
            <Button className={`w-full h-12 font-semibold text-lg transition-all duration-300 ${
              tier.highlighted 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/5'
            }`}>
              {tier.cta} <ArrowRight size={16} className="ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  return (
    <Layout>
      <SEOHead title="Pricing - Flexible Plans" description="Transparent pricing for Web, App, Graphics & Marketing." path="/pricing" />

      {/* --- BACKGROUND INJECTION --- */}
      <InteractiveBackground />

      <div className="relative z-10 text-slate-100">

        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="relative py-20 md:py-28 overflow-hidden min-h-[50vh] flex items-center justify-center">
          <div className="container relative z-10 text-center px-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-md bg-slate-900/30 mb-6">
                Transparent Pricing
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
                Packages for every <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Business Stage.</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                Whether you need a website, mobile app, branding, or marketing - we have a plan designed for your growth.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ==================== 2. MAIN PRICING TABS ==================== */}
        <section className="py-20 bg-transparent relative z-20">
          <div className="container max-w-7xl mx-auto px-4">

            <Tabs defaultValue="web" className="w-full">
              {/* Tab Navigation */}
              <div className="flex justify-center mb-16">
                <TabsList className="bg-slate-900/60 border border-white/10 p-1.5 rounded-full overflow-x-auto max-w-[95vw] flex justify-start md:justify-center h-auto backdrop-blur-md no-scrollbar">
                  {[
                    { val: "web", icon: Code, label: "Web Dev" },
                    { val: "app", icon: Smartphone, label: "Mobile App" },
                    { val: "graphics", icon: Palette, label: "Graphics" },
                    { val: "marketing", icon: Megaphone, label: "Marketing" },
                    { val: "maintenance", icon: Server, label: "Maintenance" },
                  ].map((tab) => (
                    <TabsTrigger 
                      key={tab.val}
                      value={tab.val} 
                      className="rounded-full px-6 py-3 text-slate-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                      <tab.icon className="w-4 h-4" /> {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* --- WEB CONTENT --- */}
              <TabsContent value="web" className="mt-0 space-y-12">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white">Web Development Packages</h2>
                  <p className="text-slate-400 mt-2">From landing pages to complex portals.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pricing.projectTiers.map((tier) => <PricingCard key={tier.id} tier={tier} />)}
                </div>
              </TabsContent>

              {/* --- APP CONTENT --- */}
              <TabsContent value="app" className="mt-0 space-y-12">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white">Mobile App Development</h2>
                  <p className="text-slate-400 mt-2">Native performance for iOS and Android.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {pricing.appTiers.map((tier) => <PricingCard key={tier.id} tier={tier} />)}
                </div>
              </TabsContent>

              {/* --- GRAPHICS CONTENT --- */}
              <TabsContent value="graphics" className="mt-0 space-y-12">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white">Graphics & Branding</h2>
                  <p className="text-slate-400 mt-2">Visual identity that speaks volumes.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {pricing.graphicsTiers.map((tier) => <PricingCard key={tier.id} tier={tier} />)}
                </div>
              </TabsContent>

              {/* --- MARKETING CONTENT --- */}
              <TabsContent value="marketing" className="mt-0 space-y-12">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white">Digital Marketing</h2>
                  <p className="text-slate-400 mt-2">Grow your audience and sales.</p>
                  
                  {/* Maintenance Toggle (Used here for monthly marketing too) */}
                  <div className="flex justify-center mt-8">
                    <div className="relative flex items-center bg-slate-900 border border-white/10 p-1 rounded-full cursor-pointer" onClick={() => setIsYearly(!isYearly)}>
                      <div
                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-blue-600 shadow-md rounded-full transition-transform duration-300 ease-spring ${isYearly ? 'translate-x-full left-1' : 'left-1'}`}
                      />
                      <span className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${!isYearly ? 'text-white' : 'text-slate-400'}`}>
                        Monthly
                      </span>
                      <span className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2 ${isYearly ? 'text-white' : 'text-slate-400'}`}>
                        Yearly
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                          -20%
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {pricing.marketingTiers.map((tier) => <PricingCard key={tier.id} tier={tier} isMaintenance={true} />)}
                </div>
              </TabsContent>

              {/* --- MAINTENANCE CONTENT --- */}
              <TabsContent value="maintenance" className="mt-0 space-y-12">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white">Support & Maintenance</h2>
                  <p className="text-slate-400 mt-2">Keep your website secure and up-to-date.</p>

                  {/* Maintenance Toggle */}
                  <div className="flex justify-center mt-8">
                    <div className="relative flex items-center bg-slate-900 border border-white/10 p-1 rounded-full cursor-pointer" onClick={() => setIsYearly(!isYearly)}>
                      <div
                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-blue-600 shadow-md rounded-full transition-transform duration-300 ease-spring ${isYearly ? 'translate-x-full left-1' : 'left-1'}`}
                      />
                      <span className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${!isYearly ? 'text-white' : 'text-slate-400'}`}>
                        Monthly
                      </span>
                      <span className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2 ${isYearly ? 'text-white' : 'text-slate-400'}`}>
                        Yearly
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                          -20%
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {pricing.maintenanceTiers.map((tier) => <PricingCard key={tier.id} tier={tier} isMaintenance={true} />)}
                </div>
              </TabsContent>

            </Tabs>
          </div>
        </section>

        {/* ==================== 3. FAQ ==================== */}
        <section className="py-24 bg-transparent border-t border-white/10">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Everything you need to know about our pricing and process.
              </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {FAQS.map((faq, index) => (
                <Card key={index} className="bg-slate-900/40 backdrop-blur-sm border border-white/10 hover:bg-slate-800/60 hover:border-blue-500/30 transition-all duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-3 leading-snug text-slate-200">
                      <div className="mt-1 p-1 bg-blue-500/10 rounded text-blue-400">
                        <faq.icon size={18} />
                      </div>
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-400 text-sm leading-relaxed pl-14">
                    {faq.answer}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default PricingPage;