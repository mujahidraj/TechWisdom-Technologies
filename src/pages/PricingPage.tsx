import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, HelpCircle, Server, Code, Layers, Clock, Globe, Smartphone, Edit, CreditCard, FileText } from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- YOUR UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// --- FAQ DATA ---
const FAQS = [
  {
    question: "Do I need a maintenance plan?",
    answer: "Not strictly. However, websites require hosting, security updates, and backups. If you don't choose a plan, you will need to manage hosting, SSL renewals, and security patches yourself.",
    icon: HelpCircle
  },
  {
    question: "Are there hidden fees?",
    answer: "No. The development price is a one-time fee. Third-party costs (like domain names approx ৳1000/yr or specific paid plugins) are purchased directly by you, so you retain full ownership.",
    icon: Layers
  },
  {
    question: "How long does it take to build?",
    answer: "A standard landing page takes 3-5 days. A corporate site takes 2-3 weeks, and E-commerce projects typically take 4-6 weeks depending on the complexity and number of products.",
    icon: Clock
  },
  {
    question: "Do you provide hosting and domain?",
    answer: "We don't sell domains directly, but we will guide you on how to buy one (so you own it). For hosting, you can use our Maintenance Plans, or we can deploy it to your own hosting provider.",
    icon: Server
  },
  {
    question: "Will my website be mobile-friendly?",
    answer: "Absolutely. We follow a 'Mobile-First' approach. Your website will look and perform perfectly on iPhones, iPads, Android devices, and large desktop screens.",
    icon: Smartphone
  },
  {
    question: "Can I update the website myself?",
    answer: "Yes! We build on modern CMS platforms (like WordPress or a custom Admin Dashboard). You will be able to edit text, change images, and add blog posts without writing a single line of code.",
    icon: Edit
  },
  {
    question: "What is the payment schedule?",
    answer: "We typically require a 50% deposit to start the project. The remaining 50% is due only after you have reviewed the final site and we are ready to launch.",
    icon: CreditCard
  },
  {
    question: "Do you write the content for the site?",
    answer: "Our packages include the technical build. You provide the text and images. If you need professional copywriting, we can provide that as an add-on service.",
    icon: FileText
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

  return (
    <Layout>
      <SEOHead title="Pricing - Flexible Plans" description="Transparent project and maintenance pricing in BDT." path="/pricing" />
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#0f172a] text-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container relative z-10 text-center px-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-md mb-6">
              Transparent Pricing
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Development & Maintenance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Simplified.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              Clear project fees. Optional maintenance plans. No hidden costs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== 2. PROJECT DEVELOPMENT (5 Plans) ==================== */}
      <section className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
              <Code className="text-blue-600" /> Web Development Packages
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              One-time investment for a lifetime asset. Choose the package that fits your goals.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {pricing.projectTiers.map((tier, i) => (
              <motion.div 
                key={tier.id} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] flex flex-col"
              >
                <Card className={`flex flex-col h-full hover:shadow-xl transition-all duration-300 border-slate-200 relative overflow-hidden ${tier.highlighted ? 'ring-2 ring-blue-600 shadow-lg scale-105 z-10' : ''}`}>
                  {tier.highlighted && (
                    <div className="bg-blue-600 text-white text-center text-xs font-bold uppercase tracking-widest py-1.5 absolute top-0 left-0 right-0">
                      {tier.badge}
                    </div>
                  )}
                  <CardHeader className={tier.highlighted ? 'pt-10' : ''}>
                    <CardTitle className="text-2xl font-bold text-slate-900">{tier.name}</CardTitle>
                    <CardDescription className="mt-2 text-slate-500 min-h-[40px]">{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl font-extrabold text-slate-900">{formatBDT(tier.price)}</span>
                      <span className="text-slate-500 font-medium text-sm">/ one-time</span>
                    </div>
                    <Separator className="mb-6 bg-slate-100" />
                    <ul className="space-y-3">
                      {tier.features.map((f, j) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 3. MAINTENANCE PLANS (3 Plans) ==================== */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
              <Server className="text-purple-600" /> Maintenance & Support
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              Optional recurring plans to keep your website secure, fast, and up-to-date.
            </p>

            {/* Toggle Switch */}
            <div className="flex justify-center mt-8">
              <div className="relative flex items-center bg-white p-1 rounded-full border border-slate-200 shadow-sm cursor-pointer" onClick={() => setIsYearly(!isYearly)}>
                <div 
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-slate-900 rounded-full transition-transform duration-300 ease-spring ${isYearly ? 'translate-x-full left-1' : 'left-1'}`} 
                />
                <span className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${!isYearly ? 'text-white' : 'text-slate-600'}`}>
                  {pricing.toggle.monthly}
                </span>
                <span className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2 ${isYearly ? 'text-white' : 'text-slate-600'}`}>
                  {pricing.toggle.yearly}
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    -20%
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.maintenanceTiers.map((tier, i) => {
              const price = isYearly ? Math.round(tier.yearlyPrice / 12) : tier.monthlyPrice;
              
              return (
                <motion.div 
                  key={tier.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: 0.2 + (i * 0.1) }}
                >
                  <Card className={`h-full border-none shadow-md hover:shadow-lg transition-all flex flex-col ${tier.highlighted ? 'bg-[#1e293b] text-white ring-2 ring-purple-500 scale-105 z-10' : 'bg-white text-slate-900'}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                        {tier.highlighted && <Zap className="text-yellow-400 w-5 h-5" />}
                      </div>
                      <CardDescription className={tier.highlighted ? 'text-slate-400' : 'text-slate-500'}>
                        {tier.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-bold">{formatBDT(price)}</span>
                        <span className={`text-sm ${tier.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>/mo</span>
                      </div>
                      {isYearly && (
                        <p className={`text-xs mb-6 ${tier.highlighted ? 'text-emerald-400' : 'text-emerald-600'}`}>
                          Billed {formatBDT(tier.yearlyPrice)} yearly
                        </p>
                      )}
                      <ul className="space-y-3">
                        {tier.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm">
                            <Check size={16} className={tier.highlighted ? 'text-purple-400' : 'text-blue-600'} />
                            <span className={tier.highlighted ? 'text-slate-300' : 'text-slate-600'}>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant={tier.highlighted ? 'default' : 'outline'} className={`w-full ${tier.highlighted ? 'bg-purple-600 hover:bg-purple-500 text-white border-none' : ''}`}>
                        {tier.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== 4. EXPANDED FAQ SECTION ==================== */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Everything you need to know about our pricing and process.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
             {FAQS.map((faq, index) => (
               <Card key={index} className="bg-slate-50 border-none shadow-sm hover:bg-white hover:shadow-md transition-all duration-300">
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