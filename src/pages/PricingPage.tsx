import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, HelpCircle, Server, Code, Layers, Smartphone, Palette, Megaphone, Zap } from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- YOUR UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// --- FAQ DATA ---
const FAQS = [
  {
    question: "Do I need a maintenance plan?",
    answer: "Not strictly. However, websites require hosting, security updates, and backups. If you don't choose a plan, you will need to manage hosting, SSL renewals, and security patches yourself.",
    icon: HelpCircle
  },
  {
    question: "Are there hidden fees?",
    answer: "No. The development price is a one-time fee. Third-party costs (like domain names approx ৳1000/yr or specific paid plugins/ad spend) are purchased directly by you, so you retain full ownership.",
    icon: Layers
  },
  {
    question: "How long does it take to build?",
    answer: "A standard landing page takes 3-5 days. A corporate site takes 2-3 weeks, and E-commerce/App projects typically take 4-6 weeks depending on the complexity and number of features.",
    icon: Zap
  },
  {
    question: "What is the payment schedule?",
    answer: "We typically require a 50% deposit to start the project. The remaining 50% is due only after you have reviewed the final product and we are ready to launch.",
    icon: Server
  }
];

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(true);
  const { pricing } = data;

  // Helper for currency formatting
  const formatBDT = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('BDT', '৳');
  };

  // Pricing Card Component to avoid repetition
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PricingCard = ({ tier, isMaintenance = false }: { tier: any, isMaintenance?: boolean }) => {
    const price = isMaintenance && isYearly ? Math.round(tier.yearlyPrice / 12) : (isMaintenance ? tier.monthlyPrice : tier.price);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="h-full"
      >
        <Card className={`flex flex-col h-full hover:shadow-xl transition-all duration-300 border-slate-200 relative overflow-hidden ${tier.highlighted ? 'ring-2 ring-blue-600 shadow-lg scale-100 md:scale-105 z-10' : ''}`}>
          {tier.highlighted && (
            <div className="bg-blue-600 text-white text-center text-xs font-bold uppercase tracking-widest py-1.5 absolute top-0 left-0 right-0">
              {tier.badge || "Popular"}
            </div>
          )}
          <CardHeader className={tier.highlighted ? 'pt-10' : ''}>
            <CardTitle className="text-2xl font-bold text-slate-900">{tier.name}</CardTitle>
            <CardDescription className="mt-2 text-slate-500 min-h-[40px]">{tier.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-extrabold text-slate-900">{formatBDT(price)}</span>
              <span className="text-slate-500 font-medium text-sm">
                {isMaintenance ? "/mo" : "/one-time"}
              </span>
            </div>
            {isMaintenance && isYearly && (
              <p className={`text-xs -mt-4 mb-4 ${tier.highlighted ? 'text-emerald-600' : 'text-slate-400'}`}>
                Billed {formatBDT(tier.yearlyPrice)} yearly
              </p>
            )}
            <Separator className="mb-6 bg-slate-100" />
            <ul className="space-y-3">
              {tier.features.map((f: string, j: number) => (
                <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                  <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className={`w-full ${tier.highlighted ? 'bg-blue-600 hover:bg-blue-500' : 'bg-slate-900 hover:bg-slate-800'}`}>
              {tier.cta}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  return (
    <Layout>
      <SEOHead title="Pricing - Flexible Plans" description="Transparent pricing for Web, App, Graphics & Marketing." path="/pricing" />

      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-[#0f172a] text-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 text-center px-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-md mb-6">
              Transparent Pricing
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Packages for every <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Business Stage.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              Whether you need a website, mobile app, branding, or marketing - we have a plan for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== 2. MAIN PRICING TABS ==================== */}
      <section className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4">

          <Tabs defaultValue="web" className="w-full">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-16">
              <TabsList className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 p-1 rounded-full overflow-x-auto max-w-[100vw] flex justify-start md:justify-center md:flex-wrap h-auto">
                <TabsTrigger value="web" className="rounded-full text-white px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
                  <Code className="w-4 h-4 mr-2" /> Web Dev
                </TabsTrigger>
                <TabsTrigger value="app" className="rounded-full text-white px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
                  <Smartphone className="w-4 h-4 mr-2" /> Mobile App
                </TabsTrigger>
                <TabsTrigger value="graphics" className="rounded-full text-white px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
                  <Palette className="w-4 h-4 mr-2" /> Graphics
                </TabsTrigger>
                <TabsTrigger value="marketing" className="rounded-full text-white px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
                  <Megaphone className="w-4 h-4 mr-2" /> Marketing
                </TabsTrigger>
                <TabsTrigger value="maintenance" className="rounded-full text-white px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
                  <Server className="w-4 h-4 mr-2" /> Maintenance
                </TabsTrigger>
              </TabsList>
            </div>

            {/* --- WEB CONTENT --- */}
            <TabsContent value="web" className="mt-0">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-slate-900">Web Development Packages</h2>
                <p className="text-slate-500">From landing pages to complex portals.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-8">
                {pricing.projectTiers.map((tier, i) => (
                  <div key={tier.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
                    <PricingCard tier={tier} />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* --- APP CONTENT --- */}
            <TabsContent value="app" className="mt-0">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-slate-900">Mobile App Development</h2>
                <p className="text-slate-500">Native performance for iOS and Android.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricing.appTiers.map((tier) => (
                  <PricingCard key={tier.id} tier={tier} />
                ))}
              </div>
            </TabsContent>

            {/* --- GRAPHICS CONTENT --- */}
            <TabsContent value="graphics" className="mt-0">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-slate-900">Graphics & Branding</h2>
                <p className="text-slate-500">Visual identity that speaks volumes.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricing.graphicsTiers.map((tier) => (
                  <PricingCard key={tier.id} tier={tier} />
                ))}
              </div>
            </TabsContent>

            {/* --- MARKETING CONTENT --- */}
            <TabsContent value="marketing" className="mt-0">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-slate-900">Digital Marketing</h2>
                <p className="text-slate-500">Grow your audience and sales.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricing.marketingTiers.map((tier) => (
                  <PricingCard key={tier.id} tier={tier} isMaintenance={true} /> // Treated as recurring
                ))}
              </div>
            </TabsContent>

            {/* --- MAINTENANCE CONTENT --- */}
            <TabsContent value="maintenance" className="mt-0">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-slate-900">Support & Maintenance</h2>
                <p className="text-slate-500">Keep your website secure and up-to-date.</p>

                {/* Maintenance Toggle */}
                <div className="flex justify-center mt-6">
                  <div className="relative flex items-center bg-slate-100 p-1 rounded-full cursor-pointer" onClick={() => setIsYearly(!isYearly)}>
                    <div
                      className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white shadow-sm rounded-full transition-transform duration-300 ease-spring ${isYearly ? 'translate-x-full left-1' : 'left-1'}`}
                    />
                    <span className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${!isYearly ? 'text-slate-900' : 'text-slate-500'}`}>
                      Monthly
                    </span>
                    <span className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2 ${isYearly ? 'text-slate-900' : 'text-slate-500'}`}>
                      Yearly
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        -20%
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricing.maintenanceTiers.map((tier) => (
                  <PricingCard key={tier.id} tier={tier} isMaintenance={true} />
                ))}
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </section>

      {/* ==================== 3. FAQ ==================== */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Everything you need to know about our pricing and process.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, index) => (
              <Card key={index} className="bg-white border-none shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-3 leading-snug">
                    <faq.icon className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 text-sm leading-relaxed pl-14">
                  {faq.answer}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default PricingPage;