import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, FileCode, Palette, Layout as LayoutIcon, 
  CheckCircle, Smartphone, Search, Target, Rocket, 
  Terminal, Database, Globe, Cloud, Shield, Zap,
  ArrowRight, Layers, Cpu, Server, GitBranch,
  HelpCircle, RefreshCw, Lock, Clock, FileText, Settings
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- YOUR UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Icon mapping for dynamic icons from JSON
const iconMap: Record<string, LucideIcon> = { Code, FileCode, Palette, Layout: LayoutIcon, CheckCircle, Smartphone, Search, Target, Rocket };

// --- FAQ DATA ---
const SERVICE_FAQS = [
  {
    question: "What industries do you specialize in?",
    answer: "We have deep experience in Fintech, Healthcare, E-commerce, and SaaS. However, our agile methodology allows us to adapt to any industry requirements effectively.",
    icon: Globe
  },
  {
    question: "Do you offer post-launch maintenance?",
    answer: "Yes. We don't just launch and leave. We offer comprehensive maintenance packages that include security patches, server monitoring, and regular feature updates.",
    icon: Settings
  },
  {
    question: "How do you ensure code quality?",
    answer: "We follow strict engineering protocols including peer code reviews, automated testing (CI/CD pipelines), and adherence to SOLID design principles.",
    icon: CheckCircle
  },
  {
    question: "Can you take over an existing project?",
    answer: "Absolutely. We start with a code audit to assess the current state of the application, then provide a roadmap for refactoring or feature expansion.",
    icon: RefreshCw
  },
  {
    question: "Do you build native or cross-platform apps?",
    answer: "We specialize in cross-platform development using React Native and Flutter. This allows you to launch on both iOS and Android with a single codebase, saving time and budget.",
    icon: Smartphone
  },
  {
    question: "How long does a typical project take?",
    answer: "It varies by complexity. A standard MVP typically takes 4-8 weeks, while full-scale enterprise solutions usually range from 3 to 6 months.",
    icon: Clock
  },
  {
    question: "Will I own the source code?",
    answer: "Yes. Upon final payment, 100% of the Intellectual Property (IP) and source code is transferred to you. We retain no ownership rights.",
    icon: FileCode
  },
  {
    question: "How do you handle data security?",
    answer: "Security is baked in from day one. We use encrypted databases, secure API authentication (OAuth/JWT), and follow OWASP top 10 security guidelines.",
    icon: Lock
  }
];

const ServicesPage = () => {
  const { services, process } = data;

  // --- EXTENDED TECH STACK DATA ---
  const techStack = {
    frontend: {
      label: "Frontend & UI",
      icon: LayoutIcon,
      tools: [
        { name: "React", desc: "Interactive UIs", icon: Code },
        { name: "Next.js", desc: "Production Framework", icon: Globe },
        { name: "Tailwind CSS", desc: "Rapid Styling", icon: Palette },
        { name: "TypeScript", desc: "Type Safety", icon: FileCode },
        { name: "Framer Motion", desc: "Animations", icon: Zap },
      ]
    },
    backend: {
      label: "Backend & API",
      icon: Server,
      tools: [
        { name: "Node.js", desc: "Runtime Environment", icon: Terminal },
        { name: "Python", desc: "AI & Scripting", icon: Code },
        { name: "PostgreSQL", desc: "Relational DB", icon: Database },
        { name: "GraphQL", desc: "Flexible APIs", icon: Globe },
        { name: "Redis", desc: "Caching", icon: Zap },
      ]
    },
    mobile: {
      label: "Mobile Development",
      icon: Smartphone,
      tools: [
        { name: "React Native", desc: "Cross-Platform", icon: Code },
        { name: "Flutter", desc: "Native Performance", icon: Layers },
        { name: "Expo", desc: "Rapid Iteration", icon: Rocket },
        { name: "Swift", desc: "iOS Native", icon: Smartphone },
      ]
    },
    devops: {
      label: "DevOps & Cloud",
      icon: Cloud,
      tools: [
        { name: "AWS", desc: "Cloud Infrastructure", icon: Cloud },
        { name: "Docker", desc: "Containerization", icon: Layers },
        { name: "Kubernetes", desc: "Orchestration", icon: GitBranch },
        { name: "Vercel", desc: "Edge Deployment", icon: Globe },
        { name: "GitHub Actions", desc: "CI/CD Pipelines", icon: Terminal },
      ]
    }
  };

  // --- STATS DATA ---
  const stats = [
    { label: "Projects Delivered", value: "150+", icon: Rocket },
    { label: "Client Retention", value: "98%", icon: Target },
    { label: "Uptime Guarantee", value: "99.9%", icon: Cloud },
    { label: "Support", value: "24/7", icon: Shield },
  ];

  return (
    <Layout>
      <SEOHead title="Services - Digital Solutions" description="Comprehensive web and software services tailored to your business needs." path="/services" />
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#0f172a] text-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 px-4 py-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-md">
              World-Class Engineering
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Digital Engines</span> <br />
              That Drive Growth.
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              Stop worrying about technology. We provide the strategy, design, and code to take your business from idea to market leader.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-12 text-base">
                Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 bg-blue-600 hover:bg-blue-500 rounded-full px-8 h-12 text-base">
                Explore Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== 2. SERVICE LIST ==================== */}
      <section className="py-24 bg-slate-50 relative z-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 mb-4">Our Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Scalable, secure, and user-centric solutions designed for the modern web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border-t-4 border-t-transparent hover:border-t-blue-500 hover:shadow-xl transition-all duration-300 group bg-white">
                    <CardHeader>
                      <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                        {Icon && <Icon className="w-7 h-7 text-slate-700 group-hover:text-blue-600 transition-colors" />}
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {service.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full justify-between hover:text-blue-600 group-hover:bg-blue-50">
                        Learn more <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== 3. TECH STACK ==================== */}
      <section className="py-24 bg-[#0f172a] text-white overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <Badge variant="outline" className="text-purple-400 border-purple-400/30 px-3 py-1 mb-4">Technical Excellence</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Our Technology Stack</h2>
              <p className="text-slate-400 text-lg">
                We leverage the most advanced and reliable frameworks to ensure your product is future-proof, scalable, and secure.
              </p>
            </div>
            {/* Visual decoration */}
            <div className="hidden md:flex gap-2">
               <Cpu className="w-12 h-12 text-slate-700 opacity-50" />
               <Database className="w-12 h-12 text-slate-700 opacity-50" />
               <Cloud className="w-12 h-12 text-slate-700 opacity-50" />
            </div>
          </div>

          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-slate-800/50 p-1 rounded-xl mb-12 h-auto">
              {Object.entries(techStack).map(([key, data]) => (
                <TabsTrigger 
                  key={key} 
                  value={key} 
                  className="rounded-lg py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <data.icon className="w-4 h-4" />
                    <span className="capitalize">{key}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(techStack).map(([key, data]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                  {data.tools.map((tool, idx) => (
                    <Card key={idx} className="bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-colors group">
                      <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-900/30 transition-colors">
                          <tool.icon className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{tool.name}</h4>
                          <p className="text-xs text-slate-500">{tool.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ==================== 4. WORK PROCESS ==================== */}
      <section className="py-24 bg-white relative">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Sticky Header */}
            <div className="lg:sticky lg:top-24 space-y-8">
              <Badge variant="secondary" className="px-4 py-1">How We Work</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                Transparent Process.<br />
                Predictable Results.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We believe in keeping you in the loop. Our agile methodology ensures you know exactly what is happening at every stage of development, eliminating surprises and ensuring timely delivery.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex flex-col gap-2">
                   <span className="text-4xl font-bold text-blue-600">100%</span>
                   <span className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Transparency</span>
                </div>
                <div className="flex flex-col gap-2">
                   <span className="text-4xl font-bold text-purple-600">2-Week</span>
                   <span className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Sprints</span>
                </div>
              </div>

              <Button size="lg" className="mt-4 bg-slate-900 text-white hover:bg-slate-800">
                Book a Process Walkthrough
              </Button>
            </div>

            {/* Right: Vertical Step Timeline */}
            <div className="relative pl-8 border-l border-slate-200 space-y-12">
              {process.map((p, i) => {
                const Icon = iconMap[p.icon];
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-white bg-blue-600 shadow-md z-10" />
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Step 0{i + 1}</span>
                        <Separator className="w-12" />
                      </div>
                      
                      <Card className="border-l-4 border-l-blue-100 hover:border-l-blue-500 transition-all duration-300 shadow-sm hover:shadow-md">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
                              {Icon && <Icon size={20} />}
                            </div>
                            <CardTitle className="text-xl">{p.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 leading-relaxed">{p.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 5. PROOF (Stats) ==================== */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Card key={i} className="text-center border-none shadow-lg bg-white group hover:-translate-y-1 transition-transform duration-300">
                <CardContent className="pt-8 pb-8">
                  <div className="w-12 h-12 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-4xl font-extrabold text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 6. SERVICE FAQ SECTION (NEW) ==================== */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Common questions about our development services and technical capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
             {SERVICE_FAQS.map((faq, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.05 }}
               >
                 <Card className="bg-slate-50 border-none shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 h-full">
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
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* ==================== 7. CTA ==================== */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="relative rounded-[2.5rem] bg-[#0f172a] overflow-hidden px-6 py-20 text-center md:px-12 md:py-24 shadow-2xl">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Ready to Scale Your Business?
              </h2>
              <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
                Join hundreds of satisfied clients who have transformed their digital presence with us.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-blue-600 h-14 px-8 text-lg font-semibold rounded-full shadow-xl">
                  Get a Free Consultation
                </Button>
                <Button size="lg" variant="outline" className="bg-white text-blue-600 h-14 px-8 text-lg font-semibold rounded-full shadow-xl">
                  View Case Studies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default ServicesPage;