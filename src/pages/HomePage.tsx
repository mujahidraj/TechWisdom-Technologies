/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {Infinity as InfinityIcon, // Renamed to avoid TypeScript error,
  Zap, Shield, Eye, Headphones, Globe, Smartphone, Settings,
  Lock, CreditCard, Brain, BarChart, FileText, ArrowRight,
  CheckCircle, Calculator, ChevronRight, Server, Calendar,
  Megaphone, Blocks, Quote, Star, ChevronLeft, User, ShieldCheck, ShoppingBag, Activity, Cloud, GraduationCap,LayoutTemplate,  Code2, Database,  
  BrainCircuit, LayoutDashboard, Figma, HardDrive, Box, Cpu, 
  BarChart3, Hexagon, MonitorPlay, TestTube, Wind, Palette,
   Briefcase, Building2, Plane, Handshake, Stethoscope,
  Hotel, Scale, BookOpen, Users, Heart, Utensils, Sun, Leaf, Wrench,
  Dumbbell, Printer, SprayCan, Newspaper, UserPlus, Car, Factory,
  Armchair, PaintBucket, Globe2,
  ChevronDown,
 


  Search,
  Rocket,
  CheckCircle2,
  Link2,
  MessageSquare,
  Mail,
  MessageSquareCode,
  Send,
  MapPin,
  Clock,
  Clock1,
  TrendingUp,
  XCircle,
  TrendingDown,
  FileKey,
  Fingerprint,
  ShieldAlert,
  ShoppingCart
} from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const iconMap: Record<string, any> = {
  Zap, Shield, Eye, Headphones, Globe, Smartphone, Settings,
  Lock, CreditCard, Brain, BarChart, FileText, Server,
  Calendar, Megaphone, Blocks
};

const industries = [
  { name: "EdTech", icon: GraduationCap },
  { name: "MarTech", icon: Megaphone },
  { name: "Digital Marketing", icon: BarChart3 },
  { name: "Agencies", icon: Briefcase },
  { name: "Real Estate", icon: Building2 },
  { name: "Hajj & Umrah", icon: Plane },
  { name: "E-Commerce", icon: ShoppingBag },
  { name: "B2B Service Partners", icon: Handshake },
  { name: "Specialized Clinics", icon: Stethoscope },
  { name: "Resorts & Hotels", icon: Hotel },
  { name: "Law Chambers", icon: Scale },
  { name: "Coaching Centers", icon: BookOpen },
  { name: "Convention Centers", icon: Users },
  { name: "NGOs & Non-Profits", icon: Heart },
  { name: "Security Services", icon: ShieldCheck },
  { name: "Catering & Food", icon: Utensils },
  { name: "Solar & Energy", icon: Sun },
  { name: "Organic Food", icon: Leaf },
  { name: "Vocational Training", icon: Wrench },
  { name: "Gyms & Fitness", icon: Dumbbell },
  { name: "Packaging & Printing", icon: Printer },
  { name: "Pest Control", icon: SprayCan },
  { name: "News Portals", icon: Newspaper },
  { name: "Recruiting Agencies", icon: UserPlus },
  { name: "Rent-A-Car", icon: Car },
  { name: "Export Factories", icon: Factory },
  { name: "Furniture Showrooms", icon: Armchair },
  { name: "Interior Design", icon: PaintBucket },
  { name: "Study Abroad & Visa", icon: Globe2 },
  { name: "Fintech", icon: Activity },
  { name: "SaaS", icon: Cloud },
];

// --- MOCK TESTIMONIAL DATA ---
const TESTIMONIALS = [
  {
    id: 1,
    name: "Jahangir Hossain",
    role: "CEO",
    company: "Cambry Study Abroad Agency",
    content: "আমাদের এজেন্সির জন্য এমন একটা ওয়েবসাইট দরকার ছিল যা দেখে ছাত্রছাত্রীরা ভরসা পায়। এই টিম আমাদের চাহিদা পুরোপুরি বুঝেছে এবং চমৎকার একটি প্ল্যাটফর্ম তৈরি করে দিয়েছে।",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Nehal Fatin Sohan",
    role: "Founder",
    company: "New Bangladesh Group",
    content: "টেকউইসডমের টিমটি তরুণ হলেও তাদের কাজের মান আন্তর্জাতিক লেভেলের। আমাদের গ্রুপের ডিজিটাল ব্র্যান্ডিং এবং ওয়েবসাইটের স্পিড অপ্টিমাইজেশন নিয়ে তারা যে কাজ করেছে, তা সত্যিই প্রশংসনীয়।",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Nusrat Ferdaws",
    role: "Managing Director",
    company: "Juta Express",
    content: "জুতা এক্সপ্রেসের ই-কমার্স সাইটটি এত ইউজার ফ্রেন্ডলি হবে ভাবিনি। কাস্টমাররা খুব সহজেই অর্ডার করতে পারছে এবং আমাদের সেলস আগের চেয়ে দ্বিগুণ বেড়েছে।",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    name: "Sanjidul Islam Surjo",
    role: "Managing Director",
    company: "New Organic Food",
    content: "অর্গানিক ফুড বিজনেসে কাস্টমারের বিশ্বাসটাই আসল। তারা আমাদের ওয়েবসাইটটি এত ক্লিন এবং ফাস্ট বানিয়েছে যে কাস্টমাররা ভিজিট করলেই ইমপ্রেসড হয়ে যায়।",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
];

// --- INTERACTIVE BACKGROUND (Spotlight + Particles + Parallax + Top/Bottom Lights) ---
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
      {/* --- NEW: TOP & BOTTOM AMBIENT LIGHTS --- */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-600/20 via-purple-600/5 to-transparent blur-[120px]" />
      <div className="absolute bottom-0 inset-x-0 h-[500px] bg-gradient-to-t from-indigo-600/20 via-blue-600/5 to-transparent blur-[120px]" />

      {/* A. Grid Background Base */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      {/* B. Mouse-Tracking Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 40%)`,
        }}
      />

      {/* C. AUTOMATICALLY MOVING PARTICLES (Floating Upwards) */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className={`absolute rounded-full ${i % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              opacity: 0
            }}
            animate={{
              y: -100,
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10, // Random speed between 10s and 20s
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
            }}
          />
        ))}
      </div>

      {/* D. 3D Parallax Particles (Interactive Layers) */}
      <motion.div
        className="absolute inset-0"
        animate={calculateParallax(0.02)}
        transition={{ type: "tween", ease: "linear", duration: 0.2 }}
      >
        <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-blue-500 rounded-full opacity-20 blur-[1px]" />
        <div className="absolute top-[60%] left-[80%] w-3 h-3 bg-purple-500 rounded-full opacity-20 blur-[1px]" />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={calculateParallax(0.04)}
        transition={{ type: "tween", ease: "linear", duration: 0.2 }}
      >
        <div className="absolute top-[15%] left-[70%] w-1.5 h-1.5 bg-blue-400 rounded-full opacity-30" />
        <div className="absolute top-[80%] left-[20%] w-2 h-2 bg-indigo-400 rounded-full opacity-30 blur-[2px]" />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={calculateParallax(0.07)}
        transition={{ type: "tween", ease: "linear", duration: 0.2 }}
      >
        <div className="absolute top-[50%] left-[50%] w-1 h-1 bg-white rounded-full opacity-40" />
      </motion.div>
    </div>
  );
};

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

// --- NEW HELPER COMPONENT FOR FAQ ---
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

const HomePage = () => {
  const { hero, stats, whyUs, partners, costEstimator: originalEstimator, services, projects, blog } = data;

  // --- TESTIMONIAL STATE ---
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  // --- EXTENDED ESTIMATOR DATA ---
  const extendedEstimatorSteps = [
    { ...originalEstimator.steps[0], type: 'single', key: 'platform' },
    { ...originalEstimator.steps[1], type: 'single', key: 'design' },
    { ...originalEstimator.steps[2], type: 'multi', key: 'features' },
    {
      title: "Integrations",
      description: "Do you need to connect with other systems?",
      type: 'multi',
      key: 'integrations',
      options: [
        { id: "crm", label: "CRM (Salesforce/HubSpot)", icon: "Blocks", points: 15, description: "Sync customer data." },
        { id: "chat", label: "Live Chat / Chatbot", icon: "Headphones", points: 10, description: "Automated support." },
        { id: "maps", label: "Google Maps / Location", icon: "MapPin", points: 8, description: "Geolocation services." }
      ]
    },
    {
      title: "Content & Growth",
      description: "How do you want to handle content and visibility?",
      type: 'multi',
      key: 'marketing',
      options: [
        { id: "seo", label: "Advanced SEO Setup", icon: "BarChart", points: 12, description: "Rank higher on Google." },
        { id: "copy", label: "Professional Copywriting", icon: "FileText", points: 20, description: "We write your content." },
        { id: "social", label: "Social Media Integration", icon: "Megaphone", points: 5, description: "Feed & Sharing." }
      ]
    },
    {
      title: "Timeline",
      description: "How fast do you need this delivered?",
      type: 'single',
      key: 'timeline',
      options: [
        { id: "standard", label: "Standard", icon: "Calendar", multiplier: 1, description: "Regular flexible pace." },
        { id: "fast", label: "Expedited", icon: "Zap", multiplier: 1.25, description: "Priority development (+25%)." },
        { id: "rush", label: "Rush / ASAP", icon: "Shield", multiplier: 1.5, description: "All hands on deck (+50%)." }
      ]
    }
  ];

  // Cost Estimator State
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, any>>({});
  const [showResult, setShowResult] = useState(false);

  // Calculation Logic
  const calculateScore = () => {
    let score = 3000;
    if (selections.platform) score *= selections.platform.multiplier || 1;
    if (selections.design) score *= selections.design.multiplier || 1;
    if (selections.timeline) score *= selections.timeline.multiplier || 1;

    const addOnKeys = ['features', 'integrations', 'marketing'];
    addOnKeys.forEach(key => {
      if (selections[key]) {
        score += selections[key].reduce((acc: number, item: any) => acc + (item.points * 150 || 0), 0);
      }
    });
    return Math.round(score);
  };

  const currentStepData = extendedEstimatorSteps[step];

  const handleSelection = (option: any) => {
    const key = currentStepData.key;
    if (currentStepData.type === 'single') {
      setSelections({ ...selections, [key]: option });
      if (step < extendedEstimatorSteps.length - 1) setTimeout(() => setStep(step + 1), 250);
    } else {
      const current = (selections[key] as Array<{ id: string }>) || [];
      const exists = current.some((f: { id: string }) => f.id === option.id);
      const updated = exists ? current.filter((f: { id: string }) => f.id !== option.id) : [...current, option];
      setSelections({ ...selections, [key]: updated });
    }
  };

  const isSelected = (optionId: string) => {
    const key = currentStepData.key;
    if (currentStepData.type === 'single') return selections[key]?.id === optionId;
    return (selections[key] as Array<{ id: string }>)?.some((item: { id: string }) => item.id === optionId);
  };

  return (
    <Layout>
      <SEOHead title="Home - Digital Excellence" description={hero.subheadline} path="/" />

      {/* --- BACKGROUND INJECTION --- */}
      <InteractiveBackground />

      {/* --- CONTENT WRAPPER --- */}
      <div className="relative z-10 text-slate-100">

        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="relative pt-24 pb-24 md:pt-12 md:pb-24 overflow-hidden min-h-[90vh] flex items-center justify-center">

          <div className="container relative z-10 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto space-y-8"
            >
              <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-md bg-slate-900/30">
                Technological Agency
              </Badge>

              <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500 drop-shadow-2xl">
                {hero.headline}
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
                {hero.subheadline}
              </p>

              <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-14 text-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-400/20">
                    {hero.cta.primary} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/work">
                  <Button size="lg" variant="outline" className="text-white border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full px-8 h-14 text-lg">
                    {hero.cta.secondary}
                  </Button>
                </Link>
              </div>

              <div className="pt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto border-t border-white/10 mt-12 backdrop-blur-sm bg-slate-900/20 rounded-xl p-6">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== 0. ANNOUNCEMENT MARQUEE ==================== */}
        <div className="bg-slate-900/50 backdrop-blur-lg border-y border-white/10 text-white py-3 overflow-hidden relative z-49">
          <motion.div
            className="flex whitespace-nowrap items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
            }}
            style={{ width: "max-content" }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 mx-4">
                <span className="flex items-center gap-2 text-sm md:text-base font-semibold text-yellow-400">
                  🎉 GRAND LAUNCH OFFER: <span className="text-white font-normal">Flat <span className="font-bold text-yellow-300">35% - 50% DISCOUNT</span> on Web Design, App Development, UI/UX & SEO!</span>
                </span>
                <span className="text-blue-500">•</span>
                <span className="text-sm md:text-base text-blue-100 flex items-center gap-2">
                  ⏳ <span className="font-medium">Offer ends in 30 Days</span>
                </span>
                <span className="text-blue-500">•</span>
                <span className="text-sm md:text-base text-white flex items-center gap-2">
                  📢 <span className="font-bold text-sky-300">NEWS:</span> TechWisdom is now hiring new member.
                </span>
                <span className="text-blue-500">•</span>
                <span className="text-sm md:text-base text-slate-200">
                  🚀 <span className="text-white font-medium">New Service:</span> Digital Marketing is now available
                </span>
                <span className="text-blue-500">•</span>
                <span className="text-sm md:text-base text-emerald-300 font-medium">
                  🛡️ FREE 1-Month Maintenance with every Premium Package
                </span>
                <div className="w-12"></div>
              </div>
            ))}
          </motion.div>
        </div>


        {/* ==================== 2. TRUST BAR ==================== */}
        <section className="py-10 border-b border-white/5 bg-transparent">
          <div className="container px-4">
            <p className="text-center text-slate-400 text-sm font-semibold uppercase tracking-widest mb-6">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 hover:opacity-100 transition-opacity duration-500">
              {partners.map((p, i) => (
                <div key={i} className="text-xl md:text-xl font-bold text-slate-300 flex flex-col-reverse items-center gap-2">
                  {p.name}
                  <img src={p.logo} className='h-10 rounded-full grayscale hover:grayscale-0 transition-all' alt={p.name} />
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* ==================== 3. SERVICES TEASER ==================== */}
        <section className="py-24 bg-transparent">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">Our Core Pillars</h2>
              <p className="text-slate-400 max-w-2xl mx-auto mt-4 text-lg">
                We don't just build websites; we build comprehensive digital ecosystems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.slice(0, 3).map((service, i) => {
                const Icon = iconMap[service.icon];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="h-full border border-white/10 bg-slate-900/40 backdrop-blur-sm shadow-lg hover:shadow-blue-900/20 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                        <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                            {Icon && <Icon size={24} />}
                          </div>
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-400 leading-relaxed mb-6">
                          {service.description}
                        </p>
                        <ul className="space-y-2 mb-6">
                          {service.features.slice(0, 3).map((f, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm text-slate-500">
                              <CheckCircle size={14} className="text-emerald-500" /> {f}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Link to="/services" className="w-full">
                          <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/10 bg-transparent">Learn More</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Industries Section - Marquee */}
        <div className="w-full py-10 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 mx-4 gap-4">
              <div className=''>
                <Badge variant="secondary" className="mb-4 bg-blue-500/10 text-blue-300 border border-blue-500/20">Industries</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">Industries We Serve</h2>
              </div>
              <Link to="/services">
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10">
                  View Our Services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          <div className="relative w-full">
            {/* Left Fade Gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none" />

            {/* Right Fade Gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none" />

            {/* Marquee Track */}
            <motion.div
              className="flex gap-4 w-max"
              animate={{ x: "-50%" }}
              transition={{
                duration: 80, // Adjust speed (higher = slower)
                ease: "linear",
                repeat: Infinity
              }}
            >
              {/* We map the array TWICE to create a seamless infinite loop */}
              {[...industries, ...industries].map((ind, i) => (
                <div
                  key={i}
                  className="w-[200px] h-[100px] p-4 bg-slate-900/50 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-slate-800 hover:border-blue-500/30 transition-all group text-center shrink-0 cursor-default"
                >
                  <ind.icon className="w-9 h-9 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
                  <span className="text-white font-medium text-sm leading-tight">{ind.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ==================== 4. FEATURED WORK ==================== */}
        <section className="py-24 bg-transparent">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <Badge variant="secondary" className="mb-4 bg-blue-500/10 text-blue-300 border border-blue-500/20">Portfolio</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">Featured Work</h2>
              </div>
              <Link to="/work">
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-16">
              {projects.slice(0, 3).map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="w-full lg:w-3/5 group cursor-pointer">
                    <Link to={`/work/${project.id}`}>
                      <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-800 relative">
                        <AspectRatio ratio={16 / 9}>
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                            onError={(e) => { e.currentTarget.src = `https://placehold.co/1200x675/1e293b/ffffff?text=${project.title}` }}
                          />
                        </AspectRatio>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <Button className="bg-white text-slate-900 hover:bg-slate-200">View Case Study</Button>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="w-full lg:w-2/5 space-y-6">
                    <Badge variant="outline" className="text-blue-400 border-blue-500/30 bg-blue-500/10">{project.category}</Badge>
                    <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed">{project.challenge}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, t) => (
                        <Badge key={t} variant="secondary" className="bg-slate-800 text-slate-300 border border-white/5">{tech}</Badge>
                      ))}
                    </div>
                    <Link to={`/work/${project.id}`}>
                      <Button variant="link" className="p-0 text-blue-400 hover:text-blue-300 h-auto font-semibold text-lg mt-2">
                        Read Success Story <ChevronRight size={18} />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

{/* ==================== 4.8 SEAMLESS INTEGRATIONS ==================== */}
        <section className="py-24 bg-transparent border-t border-white/5">
          <div className="container px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                <Badge variant="outline" className="bg-blue-500/10 text-blue-300 border border-blue-500/20">Ecosystem</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white">We play nicely with others.</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  A powerful digital product doesn't live in isolation. We build robust APIs and webhooks to seamlessly connect your new platform with the tools you already use every day.
                </p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4">
                  {["Payment Gateways", "CRM Systems", "Email Marketing", "ERP Software", "Social APIs"].map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-slate-800 text-slate-300 border-white/5">{tag}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="w-full lg:w-2/5 relative h-[350px] flex items-center justify-center mt-10 lg:mt-0">
                {/* Central Node */}
                <div className="absolute z-20 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.5)] border-4 border-[#020617]">
                  <Link2 size={32} className="text-white" />
                </div>
                
                {/* 8 Orbiting/Connected Nodes */}
                {[
                  // Original 4 (Corners)
                  { icon: CreditCard, color: "text-green-400", pos: "-top-6 left-10" },
                  { icon: MessageSquare, color: "text-blue-400", pos: "top-4 -right-4" },
                  { icon: Mail, color: "text-red-400", pos: "-bottom-4 right-10" },
                  { icon: Database, color: "text-purple-400", pos: "bottom-6 -left-4" },
                  
                  // New 4 (Top, Bottom, Left, Right edges)
                  { icon: ShoppingCart, color: "text-orange-400", pos: "top-1/2 -left-12 -translate-y-1/2" },
                  { icon: Cloud, color: "text-sky-400", pos: "top-1/2 -right-12 -translate-y-1/2" },
                  { icon: Activity, color: "text-yellow-400", pos: "-top-12 left-1/2 -translate-x-1/2" },
                  { icon: Shield, color: "text-emerald-400", pos: "-bottom-12 left-1/2 -translate-x-1/2" },
                ].map((node, i) => (
                  <motion.div 
                    key={i}
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: i * 0.3, // staggered floating effect
                      ease: "easeInOut" 
                    }}
                    className={`absolute z-10 w-14 h-14 bg-slate-800 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg ${node.pos}`}
                  >
                    <node.icon size={24} className={node.color} />
                  </motion.div>
                ))}

                {/* Connecting Lines (SVG) - Updated with 8 lines */}
                <svg className="absolute inset-0 w-full h-full z-0 opacity-20" style={{ strokeDasharray: "4 4" }}>
                  {/* Lines to corners */}
                  <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="white" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="75%" y2="30%" stroke="white" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="white" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="25%" y2="70%" stroke="white" strokeWidth="2" />
                  
                  {/* Lines to edges */}
                  <line x1="50%" y1="50%" x2="0%" y2="50%" stroke="white" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="50%" y2="0%" stroke="white" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

{/* ==================== 4.5 OUR TECH STACK ==================== */}
        <section className="py-24 bg-transparent border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-purple-500/10 text-purple-300 border border-purple-500/20">Technology</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Powered by Modern Tech</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                From frontend frameworks to AI models and blockchain architecture, we use enterprise-grade stacks to build your digital assets.
              </p>
            </div>

            {/* Grid expanded to fit 18 items (3 rows of 6 on large screens) */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                // Web, Fullstack, & SaaS
                { name: "React & Next.js", icon: LayoutTemplate, color: "text-cyan-400" },
                { name: "Node & NestJS", icon: Server, color: "text-green-500" },
                { name: "TypeScript", icon: Code2, color: "text-blue-500" },
                { name: "PostgreSQL", icon: Database, color: "text-indigo-400" },
                { name: "AWS Cloud", icon: Cloud, color: "text-orange-400" },
                { name: "Tailwind CSS", icon: Wind, color: "text-cyan-300" },
                
                // Mobile, CMS, UI/UX & DBs
                { name: "React Native", icon: Smartphone, color: "text-sky-400" },
                { name: "WordPress CMS", icon: LayoutDashboard, color: "text-blue-400" },
                { name: "Figma UI/UX", icon: Figma, color: "text-purple-400" },
                { name: "MongoDB", icon: HardDrive, color: "text-emerald-500" },
                { name: "Docker & CI/CD", icon: Box, color: "text-blue-400" },
                { name: "Automated QA", icon: TestTube, color: "text-green-400" },

                // AI, Data, Web3, & Graphics
                { name: "Python & Data", icon: BrainCircuit, color: "text-yellow-400" },
                { name: "OpenAI & LLMs", icon: Cpu, color: "text-emerald-400" },
                { name: "GA4 Analytics", icon: BarChart3, color: "text-yellow-500" },
                { name: "Web3 & Solidity", icon: Hexagon, color: "text-slate-300" },
                { name: "Motion & VFX", icon: MonitorPlay, color: "text-red-400" },
                { name: "Adobe Creative", icon: Palette, color: "text-pink-400" }
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }} // Faster delay for smoother cascade
                  className="bg-slate-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-slate-800 hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] group cursor-default"
                >
                  <tech.icon className={`w-8 h-8 ${tech.color} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`} />
                  <span className="text-slate-300 font-medium text-sm text-center">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ==================== 5. TESTIMONIALS SLIDER ==================== */}
        <section className="py-24 bg-transparent relative overflow-hidden">
          <div className="container px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Trusted by Visionaries</h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Hear what our partners have to say about their journey with us.
              </p>
            </div>

            <div className="max-w-4xl mx-auto relative">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 relative"
                >
                  <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 text-blue-500/20 rotate-12">
                    <Quote size={80} fill="currentColor" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-lg md:text-2xl leading-relaxed text-slate-200 font-light italic">
                      "{TESTIMONIALS[currentTestimonial].content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 border-2 border-blue-500">
                        <AvatarImage src={TESTIMONIALS[currentTestimonial].image} />
                        <AvatarFallback><User /></AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <h4 className="font-bold text-white text-lg">{TESTIMONIALS[currentTestimonial].name}</h4>
                        <p className="text-blue-400 text-sm">{TESTIMONIALS[currentTestimonial].role} at {TESTIMONIALS[currentTestimonial].company}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-4 mt-8">
                <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full border-white/20 text-slate-300 hover:bg-white/10 hover:text-white bg-transparent">
                  <ChevronLeft size={20} />
                </Button>
                <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full border-white/20 text-slate-300 hover:bg-white/10 hover:text-white bg-transparent">
                  <ChevronRight size={20} />
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* ==================== 6. UNIQUE VALUE PROP ==================== */}
        <section className="py-16 md:py-24 bg-transparent overflow-hidden">
          <div className="container px-4">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              <div className="space-y-8 order-2 lg:order-1">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white text-center lg:text-left">
                  Why industry leaders choose us.
                </h2>
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed text-center lg:text-left">
                  We bridge the gap between creative design and technical engineering. No outsourcing, no shortcuts.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  {whyUs.map((item, i) => {
                    const Icon = iconMap[item.icon];
                    return (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                          {Icon && <Icon size={24} />}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-1 text-white">{item.title}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="relative order-1 lg:order-2 w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20 transform rotate-3 scale-95 lg:scale-100"></div>
                <div className="relative bg-[#0b1121] border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl w-full mx-auto max-w-lg lg:max-w-none">
                  <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-8">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500" />
                  </div>

                  <div className="space-y-3 md:space-y-4 font-mono text-xs md:text-sm overflow-x-auto">
                    <div className="flex gap-2 md:gap-4 whitespace-nowrap">
                      <span className="text-purple-400">import</span>
                      <span className="text-white">{'{ Future }'}</span>
                      <span className="text-purple-400">from</span>
                      <span className="text-emerald-400">'@TechWisdom/Tech'</span>;
                    </div>
                    <div className="text-slate-500 pl-2 md:pl-4 whitespace-nowrap">// Delivering excellence since 2024</div>
                    <div className="flex gap-2 md:gap-4 pl-2 md:pl-4 whitespace-nowrap">
                      <span className="text-blue-400">const</span>
                      <span className="text-yellow-200">results</span>
                      <span className="text-white">=</span>
                      <span className="text-purple-400">await</span>
                      <span className="text-white">TechWisdom.build();</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

{/* ==================== 6.8 ENGAGEMENT MODELS ==================== */}
        <section className="py-24 bg-transparent border-t border-white/5">
          <div className="container px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-orange-500/10 text-orange-300 border border-orange-500/20">Partnership</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Flexible Engagement Models</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Whether you need a full product built from scratch or an extension of your current team, we adapt to your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Fixed-Price Project", 
                  icon: Briefcase, 
                  desc: "Perfect for well-defined projects. We agree on a strict scope, timeline, and budget upfront.",
                  features: ["Predictable costs", "Clear milestones", "Dedicated project manager"]
                },
                { 
                  title: "Dedicated Team", 
                  icon: Users, 
                  desc: "Scale your startup fast. Hire our developers, designers, or QA engineers full-time for your project.",
                  features: ["Direct communication", "Highly scalable", "Weekly sprint planning"]
                },
                { 
                  title: "Monthly Retainer", 
                  icon: InfinityIcon, // <-- Using the TypeScript-safe alias here
                  desc: "Ongoing support for Marketing, SEO, and Maintenance to keep your business growing month over month.",
                  features: ["Priority support", "Continuous optimization", "Monthly reporting"]
                }
              ].map((model, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-900/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-slate-800/80 hover:border-blue-500/30 transition-all group flex flex-col"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                    <model.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{model.title}</h3>
                  <p className="text-slate-400 mb-6 min-h-[80px]">{model.desc}</p>
                  
                  <ul className="space-y-3 mb-8 flex-1">
                    {model.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-slate-300 text-sm">
                        <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/contact" className="mt-auto w-full">
                    <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/10 bg-transparent">
                      Discuss Model
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* ==================== 7. EXTENDED COST ESTIMATOR ==================== */}
        <section className="py-24 bg-transparent">
          <div className="container max-w-5xl px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-blue-500/30 bg-blue-500/10 text-blue-400">Interactive Tool</Badge>
              <h2 className="text-3xl font-bold text-white mb-4">{originalEstimator.title}</h2>
              <p className="text-slate-400">{originalEstimator.subtitle}</p>
            </div>

            <Card className="bg-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden min-h-[500px] flex flex-col md:flex-row">
              <div className="bg-slate-950/80 text-white p-8 md:w-1/3 flex flex-col border-r border-white/5">
                <div className="mb-8">
                  <Calculator className="w-10 h-10 text-blue-400 mb-6" />
                  <h3 className="text-xl font-bold mb-2">Estimate Cost</h3>
                  <p className="text-slate-400 text-sm">Select options to get an instant figure.</p>
                </div>
                <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                  {extendedEstimatorSteps.map((s, i) => (
                    <div key={i} className={`flex items-center gap-3 ${i <= step ? 'opacity-100' : 'opacity-40'} transition-opacity`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${i <= step ? 'bg-blue-600 border-blue-600' : 'border-slate-600'}`}>
                        {i < step ? <CheckCircle size={14} /> : i + 1}
                      </div>
                      <span className="text-sm font-medium">{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 md:w-2/3 flex flex-col">
                <AnimatePresence mode='wait'>
                  {!showResult ? (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col h-full"
                    >
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{currentStepData.title}</h3>
                        <p className="text-slate-400">{currentStepData.description}</p>
                        {currentStepData.type === 'multi' && (
                          <Badge variant="secondary" className="mt-2 text-xs bg-slate-800 text-slate-300">Multi-select allowed</Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4 mb-8 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                        {currentStepData.options?.map((opt: any) => {
                          const Icon = iconMap[opt.icon];
                          const selected = isSelected(opt.id);
                          return (
                            <div
                              key={opt.id}
                              onClick={() => handleSelection(opt)}
                              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${selected ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 bg-slate-800/30 hover:border-slate-500'}`}
                            >
                              <div className={`p-2 rounded-lg ${selected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                {Icon ? <Icon size={20} /> : <CheckCircle size={20} />}
                              </div>
                              <div className="flex-1">
                                <div className={`font-bold ${selected ? 'text-blue-300' : 'text-slate-200'}`}>{opt.label}</div>
                                {opt.description && <div className="text-xs text-slate-500">{opt.description}</div>}
                              </div>
                              {selected && <CheckCircle className="text-blue-500" size={20} />}
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex justify-between mt-auto">
                        <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="text-slate-400 hover:text-white hover:bg-white/5">
                          Back
                        </Button>
                        <Button
                          onClick={() => step < extendedEstimatorSteps.length - 1 ? setStep(step + 1) : setShowResult(true)}
                          className="bg-blue-600 hover:bg-blue-500"
                        >
                          {step < extendedEstimatorSteps.length - 1 ? 'Next Step' : 'Calculate'}
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 flex flex-col h-full justify-center items-center">
                      <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                        <DollarSignIcon />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Estimated Investment</h3>
                      <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
                        BDT{calculateScore().toLocaleString()}
                      </div>
                      <p className="text-slate-400 mb-8 max-w-sm">
                        {originalEstimator.result.title}. This is a rough estimate based on your selections.
                      </p>
                      <Link to="/contact" className="w-full max-w-xs">
                        <Button size="lg" className="w-full bg-white text-slate-900 hover:bg-slate-200">
                          {originalEstimator.result.buttonText}
                        </Button>
                      </Link>
                      <Button variant="link" onClick={() => { setShowResult(false); setStep(0); setSelections({}); }} className="mt-4 text-slate-500 hover:text-slate-300">
                        Start Over
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </div>
        </section>
        {/* ==================== 8.5 FAQS ==================== */}
        <section className="py-24 bg-transparent border-t border-white/5">
          <div className="container max-w-4xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Got Questions?</h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Everything you need to know about working with TechWisdom.
              </p>
            </div>

            <div className="space-y-4">
              <FaqItem 
                question="Do you use templates or write custom code?" 
                answer="We write 100% custom code tailored to your exact business needs. We never use pre-bought themes, ensuring your product is uniquely yours, highly secure, and lightning-fast." 
              />
              <FaqItem 
                question="Will I own the source code?" 
                answer="Absolutely. Upon final payment, 100% of the intellectual property, source code, and design assets are legally transferred to you. You are never locked in with us." 
              />
              <FaqItem 
                question="How long does a typical project take?" 
                answer="A standard corporate website takes 3-5 weeks. Complex SaaS applications or E-commerce platforms typically take 8-12 weeks, depending on the feature scope." 
              />
              <FaqItem 
                question="Do you provide support after the launch?" 
                answer="Yes! Every project includes a 30-day free warranty period for bug fixes. We also offer affordable monthly retainers for ongoing maintenance, updates, and SEO." 
              />
            </div>
          </div>
        </section>

        {/* ==================== 8.8 NEWSLETTER CAPTURE ==================== */}
        <section className="py-20 bg-transparent">
          <div className="container max-w-4xl px-4">
            <div className="bg-gradient-to-br from-slate-900 to-[#0b1121] border border-blue-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-900/50">
                  <Mail size={32} className="text-white" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-bold text-white">Stay Ahead of the Tech Curve</h3>
                  <p className="text-slate-400">Join 5,000+ founders getting our weekly insights on AI, SaaS scaling, and Web3 trends. No spam, just value.</p>
                </div>

                <div className="w-full md:w-auto flex-shrink-0">
                  <form className="flex w-full max-w-sm items-center space-x-2 relative" onSubmit={(e) => e.preventDefault()}>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="flex h-12 w-full md:w-64 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                      required
                    />
                    <Button type="submit" size="icon" className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-500 flex-shrink-0">
                      <Send size={18} />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 8. BLOG HIGHLIGHTS ==================== */}
        <section className="py-24 bg-transparent">
          <div className="container px-4">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl font-bold text-white">Latest Insights</h2>
              <Link to="/blog" className="hidden md:block">
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 bg-transparent">View All Articles</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blog.posts.slice(0, 3).map((post, i) => (
                <Link key={i} to="/blog">
                  <Card className="h-full border border-white/10 bg-slate-900/40 backdrop-blur-sm hover:shadow-lg hover:border-blue-500/30 transition-all hover:-translate-y-1">
                    <CardHeader className="p-0">
                      <AspectRatio ratio={16 / 10} className="bg-slate-800 rounded-t-xl overflow-hidden">
                        <img src={post.image || "/placeholder.svg"} alt={post.title} className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity" />
                      </AspectRatio>
                    </CardHeader>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3 bg-slate-800 text-slate-300">{post.category}</Badge>
                      <h3 className="text-lg font-bold text-white line-clamp-2 mb-2">{post.title}</h3>
                      <p className="text-slate-400 text-sm line-clamp-2">{post.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link to="/blog">
                <Button variant="outline" className="w-full border-white/10 text-white">View All Articles</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ==================== 9. FINAL CTA ==================== */}
        <section className="py-24 bg-transparent text-center border-t border-white/5">
          <div className="container px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to transform your business?</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              Stop waiting. Start building. Join the industry leaders who trust us with their digital future.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 h-16 px-10 text-xl rounded-full shadow-2xl shadow-blue-900/50">
                Start Your Project Now
              </Button>
            </Link>
          </div>
        </section>

      </div> {/* End of Z-index Content Wrapper */}
    </Layout>
  );
};

// Helper Icon
const DollarSignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
);

export default HomePage;