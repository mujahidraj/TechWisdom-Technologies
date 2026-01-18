/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, Shield, Eye, Headphones, Globe, Smartphone, Settings, 
  Lock, CreditCard, Brain, BarChart, FileText, ArrowRight, 
  CheckCircle, Calculator, ChevronRight, Server, Calendar, 
  Megaphone, Blocks, Quote, Star, ChevronLeft, User
} from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- YOUR UI COMPONENTS ---
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

// --- MOCK TESTIMONIAL DATA (Bangladeshi Context) ---
const TESTIMONIALS = [
  {
    id: 1,
    name: "Jahangir Hossain",
    role: "CEO",
    company: "Cambry Study Abroad Agency",
    content: "আমাদের এজেন্সির জন্য এমন একটা ওয়েবসাইট দরকার ছিল যা দেখে ছাত্রছাত্রীরা ভরসা পায়। এই টিম আমাদের চাহিদা পুরোপুরি বুঝেছে এবং চমৎকার একটি প্ল্যাটফর্ম তৈরি করে দিয়েছে। এখন আমাদের স্টুডেন্ট ডাটাবেস ম্যানেজ করা অনেক সহজ হয়ে গেছে।",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80" // Professional Male
  },
  {
    id: 2,
    name: "Nehal Fatin Sohan",
    role: "Founder",
    company: "New Bangladesh Group",
    content: "টেকউইসডমের টিমটি তরুণ হলেও তাদের কাজের মান আন্তর্জাতিক লেভেলের। আমাদের গ্রুপের ডিজিটাল ব্র্যান্ডিং এবং ওয়েবসাইটের স্পিড অপ্টিমাইজেশন নিয়ে তারা যে কাজ করেছে, তা সত্যিই প্রশংসনীয়। বেস্ট অফ লাক!",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80" // Professional Male
  },
  {
    id: 3,
    name: "Nusrat Ferdaws",
    role: "Managing Director",
    company: "Juta Express",
    content: "জুতা এক্সপ্রেসের ই-কমার্স সাইটটি এত ইউজার ফ্রেন্ডলি হবে ভাবিনি। কাস্টমাররা খুব সহজেই অর্ডার করতে পারছে এবং আমাদের সেলস আগের চেয়ে দ্বিগুণ বেড়েছে। বিশেষ করে ইনভেন্টরি সিস্টেমটা আমার ব্যবসার কাজ অনেক কমিয়ে দিয়েছে।",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" // Professional Female
  },
  {
    id: 4,
    name: "Sanjidul Islam Surjo",
    role: "Managing Director",
    company: "New Organic Food",
    content: "অর্গানিক ফুড বিজনেসে কাস্টমারের বিশ্বাসটাই আসল। তারা আমাদের ওয়েবসাইটটি এত ক্লিন এবং ফাস্ট বানিয়েছে যে কাস্টমাররা ভিজিট করলেই ইমপ্রেসড হয়ে যায়। মোবাইল থেকে অর্ডার করা এখন পানির মতো সহজ।",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" // Professional Male
  }
];
// Animated Counter Component
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

const HomePage = () => {
  const { hero, stats, whyUs, partners, costEstimator: originalEstimator, services, projects, blog } = data;

  // --- TESTIMONIAL STATE ---
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000); // Auto-rotate every 5 seconds
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
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="relative pt-24 pb-24 md:pt-12 md:pb-24 overflow-hidden bg-[#0f172a] text-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-md">
              Technological Agency
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {hero.headline}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              {hero.subheadline}
            </p>

            <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-14 text-lg shadow-lg shadow-blue-900/20">
                  {hero.cta.primary} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/work">
                <Button size="lg" variant="outline" className="text-white border-white/20 bg-blue-600 hover:bg-blue-500 rounded-full px-8 h-14 text-lg">
                  {hero.cta.secondary}
                </Button>
              </Link>
            </div>

            <div className="pt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto border-t border-white/10 mt-12">
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
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white py-3 overflow-hidden relative z-50 border-b border-white/10 shadow-lg">
        <motion.div
          className="flex whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40, // Slightly slower so people can read the news
          }}
          style={{ width: "max-content" }}
        >
          {/* Duplicated content for seamless loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4">
              
              {/* --- MAIN OFFER (ALL SERVICES) --- */}
              <span className="flex items-center gap-2 text-sm md:text-base font-semibold text-yellow-400">
                🎉 GRAND LAUNCH OFFER: <span className="text-white font-normal">Flat <span className="font-bold text-yellow-300">35% - 50% DISCOUNT</span> on Web Design, App Development, UI/UX & SEO!</span>
              </span>
              
              <span className="text-blue-500">•</span>

              {/* --- DEADLINE --- */}
              <span className="text-sm md:text-base text-blue-100 flex items-center gap-2">
                ⏳ <span className="font-medium">Offer ends in 30 Days</span>
              </span>

              <span className="text-blue-500">•</span>

              {/* --- NEWS UPDATE 1 --- */}
              <span className="text-sm md:text-base text-white flex items-center gap-2">
                📢 <span className="font-bold text-sky-300">NEWS:</span> TechWisdom is now hiring new member across different departments. 
              </span>

              <span className="text-blue-500">•</span>

              {/* --- NEWS UPDATE 2 / FEATURE --- */}
              <span className="text-sm md:text-base text-slate-200">
                🚀 <span className="text-white font-medium">New Service:</span> Digital Marketing is now available
              </span>

              <span className="text-blue-500">•</span>

              {/* --- BONUS --- */}
              <span className="text-sm md:text-base text-emerald-300 font-medium">
                🛡️ FREE 1-Month Maintenance with every Premium Package
              </span>
              
              {/* Spacing for the loop */}
              <div className="w-12"></div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ==================== 2. TRUST BAR ==================== */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="container px-4">
          <p className="text-center text-slate-400 text-sm font-semibold uppercase tracking-widest mb-6">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {partners.map((p, i) => (
              <div key={i} className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
                 <div className="w-8 h-8 bg-slate-200 rounded-full" /> 
                 {p.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 3. SERVICES TEASER ==================== */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">Our Core Pillars</h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-lg">
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
                  <Card className="h-full border-t-8 border-sky-600 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 leading-relaxed mb-6">
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
                        <Button variant="outline" className="w-full">Learn More</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== 4. FEATURED WORK ==================== */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
               <Badge variant="secondary" className="mb-4">Portfolio</Badge>
               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">Featured Work</h2>
            </div>
            <Link to="/work">
               <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">
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
                     <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-50 relative">
                       <AspectRatio ratio={16 / 9}>
                         <img 
                           src={project.thumbnail} 
                           alt={project.title} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                           onError={(e) => {e.currentTarget.src = `https://placehold.co/1200x675/e2e8f0/1e293b?text=${project.title}`}}
                         />
                       </AspectRatio>
                       <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button className="bg-white text-slate-900 hover:bg-slate-100">View Case Study</Button>
                       </div>
                     </div>
                   </Link>
                </div>
                <div className="w-full lg:w-2/5 space-y-6">
                   <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">{project.category}</Badge>
                   <h3 className="text-3xl font-bold text-slate-900">{project.title}</h3>
                   <p className="text-slate-600 text-lg leading-relaxed">{project.challenge}</p>
                   <div className="flex flex-wrap gap-2">
                     {project.techStack.map((tech, t) => (
                       <Badge key={t} variant="secondary" className="bg-slate-100 text-slate-600">{tech}</Badge>
                     ))}
                   </div>
                   <Link to={`/work/${project.id}`}>
                      <Button variant="link" className="p-0 text-blue-600 h-auto font-semibold text-lg mt-2">
                        Read Success Story <ChevronRight size={18} />
                      </Button>
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 5. TESTIMONIALS SLIDER (NEW) ==================== */}
      <section className="py-24 bg-[#0f172a] text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Visionaries</h2>
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
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 md:p-12 relative"
              >
                <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 text-blue-600/20 rotate-12">
                  <Quote size={80} fill="currentColor" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-lg md:text-2xl leading-relaxed text-slate-200 font-light italic">
                    "{TESTIMONIALS[currentTestimonial].content}"
                  </p>

                  {/* Author */}
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

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent">
                <ChevronLeft size={20} />
              </Button>
              <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent">
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 6. UNIQUE VALUE PROP ==================== */}
      {/* ==================== 6. UNIQUE VALUE PROP ==================== */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container px-4">
          {/* Changed grid layout for better mobile stacking */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Text Content */}
            <div className="space-y-8 order-2 lg:order-1">
               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 text-center lg:text-left">
                 Why industry leaders choose us.
               </h2>
               <p className="text-slate-500 text-lg md:text-xl leading-relaxed text-center lg:text-left">
                 We bridge the gap between creative design and technical engineering. No outsourcing, no shortcuts.
               </p>
               
               {/* Grid for Icon Boxes */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                 {whyUs.map((item, i) => {
                   const Icon = iconMap[item.icon];
                   return (
                     <div key={i} className="flex gap-4 items-start">
                       <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                          {Icon && <Icon size={24} />}
                       </div>
                       <div>
                          <h4 className="font-bold text-lg mb-1 text-slate-900">{item.title}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                       </div>
                     </div>
                   )
                 })}
               </div>
            </div>

            {/* Right Column: Code Editor Visual */}
            <div className="relative order-1 lg:order-2 w-full">
               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20 transform rotate-3 scale-95 lg:scale-100"></div>
               <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl w-full mx-auto max-w-lg lg:max-w-none">
                  {/* Mac Window Dots */}
                  <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-8">
                     <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500" />
                     <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500" />
                     <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500" />
                  </div>
                  
                  {/* Code Content - Responsive Text Size */}
                  <div className="space-y-3 md:space-y-4 font-mono text-xs md:text-sm overflow-x-auto">
                     <div className="flex gap-2 md:gap-4 whitespace-nowrap">
                        <span className="text-blue-400">import</span> 
                        <span className="text-white">{'{ Future }'}</span> 
                        <span className="text-blue-400">from</span> 
                        <span className="text-emerald-400">'@TechWisdom/Tech'</span>;
                     </div>
                     <div className="text-slate-400 pl-2 md:pl-4 whitespace-nowrap">// Delivering excellence since 2024</div>
                     <div className="flex gap-2 md:gap-4 pl-2 md:pl-4 whitespace-nowrap">
                        <span className="text-purple-400">const</span> 
                        <span className="text-yellow-200">results</span> 
                        <span className="text-white">=</span> 
                        <span className="text-blue-300">await</span> 
                        <span className="text-white">TechWisdom.build();</span>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 7. EXTENDED COST ESTIMATOR ==================== */}
      <section className="py-24 bg-slate-50">
        <div className="container max-w-5xl px-4">
           <div className="text-center mb-12">
             <Badge variant="outline" className="mb-4 border-blue-200 bg-blue-50 text-blue-700">Interactive Tool</Badge>
             <h2 className="text-3xl font-bold text-slate-900 mb-4">{originalEstimator.title}</h2>
             <p className="text-slate-500">{originalEstimator.subtitle}</p>
           </div>

           <Card className="bg-white border-none shadow-2xl overflow-hidden min-h-[500px] flex flex-col md:flex-row">
             <div className="bg-slate-900 text-white p-8 md:w-1/3 flex flex-col">
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

             <div className="p-8 md:w-2/3 bg-white flex flex-col">
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
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{currentStepData.title}</h3>
                        <p className="text-slate-500">{currentStepData.description}</p>
                        {currentStepData.type === 'multi' && (
                           <Badge variant="secondary" className="mt-2 text-xs">Multi-select allowed</Badge>
                        )}
                     </div>
                     
                     <div className="grid grid-cols-1 gap-4 mb-8 overflow-y-auto max-h-[300px] pr-2">
                       {currentStepData.options?.map((opt: any) => {
                         const Icon = iconMap[opt.icon];
                         const selected = isSelected(opt.id);
                         return (
                           <div
                             key={opt.id}
                             onClick={() => handleSelection(opt)}
                             className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${selected ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
                           >
                             <div className={`p-2 rounded-lg ${selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                               {Icon ? <Icon size={20} /> : <CheckCircle size={20} />}
                             </div>
                             <div className="flex-1">
                                <div className={`font-bold ${selected ? 'text-blue-900' : 'text-slate-700'}`}>{opt.label}</div>
                                {opt.description && <div className="text-xs text-slate-500">{opt.description}</div>}
                             </div>
                             {selected && <CheckCircle className="text-blue-600" size={20} />}
                           </div>
                         );
                       })}
                     </div>
                     
                     <div className="flex justify-between mt-auto">
                       <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
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
                     <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                        <DollarSignIcon />
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-2">Estimated Investment</h3>
                     <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                       BDT{calculateScore().toLocaleString()}
                     </div>
                     <p className="text-slate-500 mb-8 max-w-sm">
                       {originalEstimator.result.title}. This is a rough estimate based on your selections.
                     </p>
                     <Link to="/contact" className="w-full max-w-xs">
                        <Button size="lg" className="w-full bg-slate-900 text-white hover:bg-slate-800">
                           {originalEstimator.result.buttonText}
                        </Button>
                     </Link>
                     <Button variant="link" onClick={() => { setShowResult(false); setStep(0); setSelections({}); }} className="mt-4 text-slate-400">
                       Start Over
                     </Button>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
           </Card>
        </div>
      </section>

      {/* ==================== 8. BLOG HIGHLIGHTS ==================== */}
      <section className="py-24 bg-white">
        <div className="container px-4">
           <div className="flex justify-between items-end mb-12">
             <h2 className="text-3xl font-bold text-slate-900">Latest Insights</h2>
             <Link to="/blog" className="hidden md:block">
                <Button variant="outline">View All Articles</Button>
             </Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blog.posts.slice(0, 3).map((post, i) => (
                 <Link key={i} to="/blog">
                    <Card className="h-full border-none shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                       <CardHeader className="p-0">
                          <AspectRatio ratio={16/10} className="bg-slate-100 rounded-t-xl overflow-hidden">
                             <img src={post.image || "/placeholder.svg"} alt={post.title} className="object-cover w-full h-full" />
                          </AspectRatio>
                       </CardHeader>
                       <CardContent className="p-6">
                          <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                          <h3 className="text-lg font-bold text-slate-900 line-clamp-2 mb-2">{post.title}</h3>
                          <p className="text-slate-500 text-sm line-clamp-2">{post.excerpt}</p>
                       </CardContent>
                    </Card>
                 </Link>
              ))}
           </div>
           
           <div className="mt-8 text-center md:hidden">
              <Link to="/blog">
                 <Button variant="outline" className="w-full">View All Articles</Button>
              </Link>
           </div>
        </div>
      </section>

      {/* ==================== 9. FINAL CTA ==================== */}
      <section className="py-24 bg-[#0f172a] text-white text-center">
         <div className="container px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to transform your business?</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
               Stop waiting. Start building. Join the industry leaders who trust us with their digital future.
            </p>
            <Link to="/contact">
               <Button size="lg" className="bg-blue-600 hover:bg-blue-500 h-16 px-10 text-xl rounded-full shadow-2xl shadow-blue-900/50">
                  Start Your Project Now
               </Button>
            </Link>
         </div>
      </section>

    </Layout>
  );
};

// Helper Icon
const DollarSignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);

export default HomePage;