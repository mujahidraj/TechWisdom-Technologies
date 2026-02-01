/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, HelpCircle, Server, Code, Layers, Smartphone, Palette, Megaphone, Zap, ArrowRight, Sparkles, TrendingUp, ShieldCheck, Clock, RocketIcon, Rocket } from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

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

// --- UPDATED FAQ DATA (10 Items) ---
const FAQS = [
  { question: "Do I need a maintenance plan?", answer: "Not strictly. However, websites require hosting, security updates, and backups. If you don't choose a plan, you will need to manage hosting, SSL renewals, and security patches yourself.", icon: HelpCircle },
  { question: "Are there hidden fees?", answer: "No. The development price is a one-time fee. Third-party costs (like domain names approx ৳1000/yr or specific paid plugins/ad spend) are purchased directly by you, so you retain full ownership.", icon: Layers },
  { question: "How long does it take to build?", answer: "A standard landing page takes 3-5 days. A corporate site takes 2-3 weeks, and E-commerce/App projects typically take 4-6 weeks depending on the complexity and number of features.", icon: Zap },
  { question: "What is the payment schedule?", answer: "We typically require a 50% deposit to start the project. The remaining 50% is due only after you have reviewed the final product and we are ready to launch.", icon: Server },
  { question: "Can I upgrade my plan later?", answer: "Absolutely. You can start with a basic package (MVP) and upgrade to a more advanced plan as your business grows. You only pay the difference in features.", icon: TrendingUp },
  { question: "Do you offer refunds?", answer: "If we haven't started work, yes. Once work begins, the deposit covers the initial design and setup costs. However, we offer unlimited revisions during the design phase to ensuring satisfaction.", icon: ShieldCheck },
  { question: "Is hosting included in the price?", answer: "Hosting is included only in our monthly maintenance packages. For one-time builds, we will help you set up your own hosting account (AWS, Vercel, etc.) so you own it.", icon: Cloud },
  { question: "Do you charge VAT/Tax?", answer: "Our listed prices are exclusive of VAT. Applicable taxes will be added to the final invoice based on local regulations.", icon: FileText },
  { question: "What if I need a custom feature?", answer: "Our packages cover standard features. Any custom functionality (like AI integration, complex algorithms) will be quoted separately as an add-on.", icon: Code },
  { question: "Do you offer discounts for non-profits?", answer: "Yes, we offer special pricing for registered NGOs and educational institutions. Please contact our sales team for details.", icon: Heart }
];

// Helper icons needed locally
import { Cloud, FileText, Heart } from 'lucide-react';

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
           <Link to="/contact" className="w-full">
            <Button className={`w-full h-12 font-semibold text-lg transition-all duration-300 ${
              tier.highlighted 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/5'
            }`}>
              {tier.cta} <ArrowRight size={16} className="ml-2" />
            </Button>
            </Link>
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

        {/* ======================================================= */}
        {/* --- NEW SECTION 1: VALUE PROPOSITION (ADDED) --- */}
        {/* ======================================================= */}
        <section className="py-24 bg-slate-900/30 border-y border-white/5">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4 text-emerald-400 border-emerald-500/30">Why Invest?</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Why "Cheap" Development is Actually Expensive
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Cutting corners on development leads to security breaches, slow loading times, and lost customers. Our pricing reflects the quality of code, security standards, and scalable architecture we provide.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 shrink-0">
                      <Zap size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">The Cost of Downtime</h4>
                      <p className="text-sm text-slate-500">A cheap site that crashes during traffic spikes loses revenue instantly.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">The ROI of Speed</h4>
                      <p className="text-sm text-slate-500">A 1-second delay in mobile load times can impact conversion rates by up to 20%.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full" />
                <Card className="relative bg-slate-900/80 border border-white/10 p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Total Cost of Ownership (3 Years)</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white">Freelancer / Cheap Agency</span>
                        <span className="text-red-400">৳2,50,000+</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-[80%] bg-red-500/50" />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Initial build + fixes + hacks + lost sales</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white">TechWisdom Professional Build</span>
                        <span className="text-emerald-400">৳1,50,000</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-[40%] bg-emerald-500" />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">One-time build + standard maintenance. No surprises.</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* --- NEW SECTION 2: PAYMENT TIMELINE (ADDED) --- */}
        {/* ======================================================= */}
        <section className="py-24 bg-transparent">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Simple Payment Structure</h2>
              <p className="text-slate-400">We keep it fair and transparent.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Kickoff", desc: "Hosting acess Or 10%  Upfront Deposit to secure resources and start design.", icon: Zap },
                { step: "02", title: "Development", desc: "Weekly updates and demos. No payment required during this phase.", icon: Code },
                { step: "03", title: "Launch", desc: "Final 90% due only after your approval and delivery.", icon: Rocket }
              ].map((item, i) => (
                <div key={i} className="relative p-8 border border-white/10 rounded-2xl bg-slate-900/40 text-center group hover:bg-slate-800/60 transition-colors">
                  <div className="w-16 h-16 mx-auto bg-blue-600/10 rounded-full flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                    <item.icon size={32} />
                  </div>
                  <div className="text-5xl font-bold text-white/5 absolute top-4 right-6">{item.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* --- NEW SECTION 3: GUARANTEE (ADDED) --- */}
        {/* ======================================================= */}
        <section className="py-16 bg-slate-900/30 border-y border-white/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
                <ShieldCheck className="w-12 h-12 text-white" />
              </div>
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold text-white mb-2">100% Satisfaction Guarantee</h3>
                <p className="text-slate-400">
                  We are confident in our code. If we miss a deadline or deliverables don't match the scope, we fix it at our own cost. We offer a 30-day bug-free warranty on all delivered code.
                </p>
              </div>
              <Link to="/contact">
                <Button variant="outline" className="border-white/10 text-black hover:bg-white/5">
                  Read Terms
                </Button>
              </Link>
            </div>
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