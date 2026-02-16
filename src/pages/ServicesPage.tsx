import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, FileCode, Palette, Layout as LayoutIcon,
  CheckCircle, Smartphone, Search, Target, Rocket,
  Terminal, Database, Globe, Cloud, Shield, Zap,
  ArrowRight, Layers, Cpu, Server, GitBranch,
  Lock, Clock, FileText, Settings,Play,
  Film, PenToolIcon, LucidePenTool, BarChart,
  Mail, Share2, Megaphone, ShoppingBag, Send,
    RefreshCw,ShieldCheck,  Activity,  GraduationCap, 
  BarChart3, Briefcase, Building2, Plane, Handshake, Stethoscope, 
  Hotel, Scale, BookOpen, Users, Heart, Utensils, Sun, Leaf, Wrench, 
  Dumbbell, Printer, SprayCan, Newspaper, UserPlus, Car, Factory, 
  Armchair, PaintBucket, Globe2,
  Truck,
  Microscope,
  Sprout,
  HardHat,
  Gamepad2,
  CarFront,
  Dog,
  TowerControl,
  Gem,
  Compass,
  Brain,
  CalendarCheck,
  Anchor,
  Shirt,
  Recycle,
  Sparkles,
  Dna,
  MapPin,
  Clock1
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

// Icon mapping
const iconMap: Record<string, LucideIcon> = { Code, FileCode, Palette, Layout: LayoutIcon, CheckCircle, Smartphone, Search, Target, Rocket ,Cpu, Play,BarChart3,ShieldCheck,Layers,Briefcase,Users,FileText};


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

// --- DATA CONSTANTS ---
const SERVICE_FAQS = [
  { question: "What industries do you specialize in?", answer: "We have deep experience in Fintech, Healthcare, E-commerce, and SaaS. However, our agile methodology allows us to adapt to any industry requirements effectively.", icon: Globe },
  { question: "Do you offer post-launch maintenance?", answer: "Yes. We don't just launch and leave. We offer comprehensive maintenance packages that include security patches, server monitoring, and regular feature updates.", icon: Settings },
  { question: "How do you ensure code quality?", answer: "We follow strict engineering protocols including peer code reviews, automated testing (CI/CD pipelines), and adherence to SOLID design principles.", icon: CheckCircle },
  { question: "Can you take over an existing project?", answer: "Absolutely. We start with a code audit to assess the current state of the application, then provide a roadmap for refactoring or feature expansion.", icon: RefreshCw },
  { question: "Do you build native or cross-platform apps?", answer: "We specialize in cross-platform development using React Native and Flutter. This allows you to launch on both iOS and Android with a single codebase, saving time and budget.", icon: Smartphone },
  { question: "How long does a typical project take?", answer: "It varies by complexity. A standard MVP typically takes 4-8 weeks, while full-scale enterprise solutions usually range from 3 to 6 months.", icon: Clock },
  { question: "Will I own the source code?", answer: "Yes. Upon final payment, 100% of the Intellectual Property (IP) and source code is transferred to you. We retain no ownership rights.", icon: FileCode },
  { question: "How do you handle data security?", answer: "Security is baked in from day one. We use encrypted databases, secure API authentication (OAuth/JWT), and follow OWASP top 10 security guidelines.", icon: Lock }
];

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
  { name: "Logistics", icon: Truck },
  { name: "Healthcare", icon: Microscope },
  { name: "Agritech", icon: Sprout },
  { name: "Construction", icon: HardHat },
  { name: "Gaming & Esports", icon: Gamepad2 },
  { name: "Automobile", icon: CarFront },
  { name: "Pet Care", icon: Dog },
  { name: "Cybersecurity", icon: Lock },
  { name: "Telecommunications", icon: TowerControl },
  { name: "Luxury Goods", icon: Gem },
  { name: "Architecture", icon: Compass },
  { name: "Mental Health", icon: Brain },
  { name: "Event Planning", icon: CalendarCheck },
  { name: "Maritime", icon: Anchor },
  { name: "Fashion Labels", icon: Shirt },
  { name: "Waste Management", icon: Recycle },
  { name: "Beauty & Spas", icon: Sparkles },
  { name: "Manufacturing", icon: Settings },
  { name: "BioTech", icon: Dna },
  { name: "Aerospace", icon: Rocket }
];

const ServicesPage = () => {
  const { services, process } = data;

  const techStack = {
    frontend: {
      label: "Frontend & UI", icon: LayoutIcon, tools: [
        { name: "React", desc: "Interactive UIs", icon: Code },
        { name: "Next.js", desc: "Production Framework", icon: Globe },
        { name: "Tailwind CSS", desc: "Rapid Styling", icon: Palette },
        { name: "TypeScript", desc: "Type Safety", icon: FileCode },
        { name: "Framer Motion", desc: "Animations", icon: Zap },
      ]
    },
    backend: {
      label: "Backend & API", icon: Server, tools: [
        { name: "Node.js", desc: "Runtime Environment", icon: Terminal },
        { name: "Nest.js", desc: "Backend Framework", icon: Code },
        { name: "PostgreSQL", desc: "Relational DB", icon: Database },
        { name: "MongoDB", desc: "Flexible DB", icon: Globe },
        { name: "Python", desc: "AI & Scripting", icon: Code },
      ]
    },
    mobile: {
      label: "Mobile Apps", icon: Smartphone, tools: [
        { name: "React Native", desc: "Cross-Platform", icon: Code },
        { name: "Flutter", desc: "Native Performance", icon: Layers },
        { name: "Kotlin", desc: "Android Native", icon: Rocket },
        { name: "Swift", desc: "iOS Native", icon: Smartphone },
      ]
    },
    devops: {
      label: "DevOps & Cloud", icon: Cloud, tools: [
        { name: "AWS", desc: "Cloud Infrastructure", icon: Cloud },
        { name: "Docker", desc: "Containerization", icon: Layers },
        { name: "Kubernetes", desc: "Orchestration", icon: GitBranch },
        { name: "Vercel", desc: "Edge Deployment", icon: Globe },
        { name: "GitHub Actions", desc: "CI/CD Pipelines", icon: Terminal },
      ]
    },
    design: {
      label: "Graphics & Design", icon: LucidePenTool, tools: [
        { name: "Figma", desc: "UI/UX Design", icon: PenToolIcon },
        { name: "Adobe Photoshop", desc: "Image Editing", icon: FileText },
        { name: "Adobe Illustrator", desc: "Vector Graphics", icon: PenToolIcon },
        { name: "Canva", desc: "Rapid Design", icon: Palette },
        { name: "Capcut", desc: "Motion Graphics", icon: Film },
      ]
    },
    marketing: {
      label: "Digital Marketing", icon: Megaphone, tools: [
        { name: "Google Analytics", desc: "Data Insights", icon: BarChart },
        { name: "SEO", desc: "Search Optimization", icon: Search },
        { name: "Google Ads", desc: "PPC Campaigns", icon: Target },
        { name: "Meta Ads", desc: "Social Advertising", icon: Share2 },
      ]
    }
  };

  const stats = [
    { label: "Projects Delivered", value: "15+", icon: Rocket },
    { label: "Client Retention", value: "98%", icon: Target },
    { label: "Uptime Guarantee", value: "99.8%", icon: Cloud },
    { label: "Support", value: "24/7", icon: Shield },
  ];

  // --- HELPER FUNCTION FOR SCROLLING ---
  const scrollToServices = () => {
    const element = document.getElementById('services-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      <SEOHead title="Services - Digital Solutions" description="Comprehensive web and software services tailored to your business needs." path="/services" />

      {/* --- BACKGROUND --- */}
      <InteractiveBackground />

      <div className="relative z-10 text-slate-100">

        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="container relative z-10 px-4 py-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-md bg-slate-900/30">
                World-Class Engineering
              </Badge>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white">
                We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">Digital Engines</span> <br />
                That Drive Growth.
              </h1>

              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                Stop worrying about technology. We provide the strategy, design, and code to take your business from idea to market leader.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                {/* --- FIXED: Added Link --- */}
                <Link to="/contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-12 text-base shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-400/20">
                    Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                {/* --- FIXED: Added onClick scroll --- */}
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full px-8 h-12 text-base"
                  onClick={scrollToServices}
                >
                  Explore Services
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

{/* ==================== 5.5 GLOBAL ECOSYSTEM ==================== */}
        <section className="py-24 bg-transparent border-t border-white/5 overflow-hidden">
          <div className="container px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              
              {/* Left Side: Stats */}
              <div className="w-full lg:w-1/2 space-y-8 order-2 lg:order-1">
                <Badge variant="outline" className="bg-sky-500/10 text-sky-400 border border-sky-500/20">Global Reach</Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-white">Borderless engineering for a global market.</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  TechWisdom operates as a hyper-connected, remote-native ecosystem. We serve visionaries across multiple continents, bringing international standards to every line of code we write.
                </p>
                
                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-3xl font-bold text-white flex items-center gap-2 mb-2">
                      <MapPin size={24} className="text-sky-400" /> 15+
                    </div>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Countries Served</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white flex items-center gap-2 mb-2">
                      <Clock1 size={24} className="text-sky-400" /> 24/7
                    </div>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Monitoring Support</p>
                  </div>
                </div>
              </div>

              {/* Right Side: Solar System Visual */}
              <div className="w-full lg:w-1/2 order-1 lg:order-2 relative h-[400px] md:h-[500px] flex items-center justify-center">
                {/* Deep space ambient glow */}
                <div className="absolute inset-0 bg-sky-600/5 blur-[100px] rounded-full pointer-events-none" />
                
                {/* Solar System Container */}
                <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
                  
                  {/* The Sun / Central Core */}
                  <div className="absolute z-20 w-20 h-20 rounded-full bg-slate-900 border border-sky-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.2)]">
                    <Globe2 size={40} className="text-sky-400" />
                  </div>

                  {/* Orbit 1 (Inner Ring - Fast) */}
                  <div 
                    className="absolute inset-[30%] rounded-full border border-white/10 border-dashed"
                    style={{ animation: 'spin 15s linear infinite' }}
                  >
                    {/* Planet 1 */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_15px_#34d399]" />
                  </div>

                  {/* Orbit 2 (Middle Ring - Medium, Reverse Direction) */}
                  <div 
                    className="absolute inset-[15%] rounded-full border border-white/5"
                    style={{ animation: 'spin 25s linear infinite reverse' }}
                  >
                    {/* Planet 2 */}
                    <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-5 h-5 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7]" />
                    {/* Planet 3 (Small Node) */}
                    <div className="absolute top-1/4 right-0 w-2 h-2 bg-slate-300 rounded-full shadow-[0_0_5px_#cbd5e1]" />
                  </div>

                  {/* Orbit 3 (Outer Ring - Slow) */}
                  <div 
                    className="absolute inset-[0%] rounded-full border border-white/5"
                    style={{ animation: 'spin 40s linear infinite' }}
                  >
                    {/* Planet 4 */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6]" />
                    {/* Planet 5 */}
                    <div className="absolute top-1/4 -right-1.5 w-3 h-3 bg-rose-400 rounded-full shadow-[0_0_10px_#fb7185]" />
                  </div>

                  {/* Distant Stars / Dust */}
                  <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <div className="absolute top-10 left-10 w-1 h-1 bg-white/40 rounded-full animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-sky-200/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-0 w-1 h-1 bg-purple-200/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==================== 2. SERVICE LIST ==================== */}
        {/* --- FIXED: Added ID for scrolling --- */}
        <section id="services-grid" className="py-24 bg-transparent relative z-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">Our Expertise</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
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
                    <Card className="h-full bg-slate-900/40 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 group">
                      <CardHeader>
                        <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors border border-blue-500/20">
                          {Icon && <Icon className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors" />}
                        </div>
                        <CardTitle className="text-xl font-bold text-white">{service.title}</CardTitle>
                        <p className="text-slate-400 text-sm mt-2">{service.description}</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {service.features.map((f, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-sm text-slate-400">
                              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        {/* Link to the new dynamic route */}
                        <Link to={`/services/${service.id}`} className="w-full">
                          <Button variant="ghost" className="w-full justify-between text-blue-400 hover:text-white hover:bg-blue-500/10">
                            Learn more <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>



                  <section className="py-24 bg-transparent">
          <div className="container px-4 md:px-6 grid lg:grid-cols-1 gap-16">
            <div>
              <div className='mb-12 text-center'>
                <Badge variant="secondary" className="mb-4 bg-green-500/10 text-green-300 border border-green-500/20">Serving Industries</Badge>
                <h2 className="text-3xl mb-2 font-bold tracking-tighter sm:text-4xl text-white">Industries We Serve</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">We specialize in delivering tailored digital solutions across a wide range of industries, helping businesses transform and thrive in the digital landscape.</p>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {industries.map((ind, i) => (
                  <div key={i} className="p-6 bg-slate-900/50 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-slate-800 transition-colors group text-center h-full">
                    <ind.icon className="w-10 h-10 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
                    <span className="text-white font-medium text-sm">{ind.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>


        {/* ==================== 3. TECH STACK ==================== */}
        <section className="py-24 bg-transparent overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <Badge variant="outline" className="text-purple-400 border-purple-400/30 bg-purple-500/10 px-3 py-1 mb-4">Technical Excellence</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white">Our Technology Stack</h2>
                <p className="text-slate-400 text-lg">
                  We leverage the most advanced and reliable frameworks to ensure your product is future-proof, scalable, and secure.
                </p>
              </div>
              <div className="hidden md:flex gap-4">
                <Cpu className="w-12 h-12 text-slate-700 opacity-50 animate-pulse" />
                <Database className="w-12 h-12 text-slate-700 opacity-50" />
                <Cloud className="w-12 h-12 text-slate-700 opacity-50" />
              </div>
            </div>

            <Tabs defaultValue="frontend" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-slate-900/60 border border-white/10 p-1 rounded-xl mb-12 h-auto backdrop-blur-md">
                {Object.entries(techStack).map(([key, data]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="rounded-lg py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <data.icon className="w-4 h-4" />
                      <span className="capitalize hidden md:inline">{key}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              <AnimatePresence mode="wait">
                {Object.entries(techStack).map(([key, data]) => (
                  <TabsContent key={key} value={key} className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                    >
                      {data.tools.map((tool, idx) => (
                        <Card key={idx} className="bg-slate-900/40 border border-white/5 hover:border-blue-500/50 hover:bg-slate-800/60 transition-all duration-300 group backdrop-blur-sm">
                          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors border border-white/5">
                              <tool.icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">{tool.name}</h4>
                              <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{tool.desc}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </Tabs>
          </div>
        </section>

        {/* ==================== 4. WORK PROCESS ==================== */}
        <section className="py-24 bg-transparent relative">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* Left: Sticky Header */}
              <div className="lg:sticky lg:top-24 space-y-8">
                <Badge variant="secondary" className="px-4 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/20">How We Work</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Transparent Process.<br />
                  <span className="text-slate-400">Predictable Results.</span>
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  We believe in keeping you in the loop. Our agile methodology ensures you know exactly what is happening at every stage of development, eliminating surprises.
                </p>

                {/* 

[Image of agile software development lifecycle diagram]
 */}

                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-900/50 border border-white/5">
                    <span className="text-4xl font-bold text-blue-400">100%</span>
                    <span className="text-sm text-slate-400 font-medium uppercase tracking-wide">Transparency</span>
                  </div>
                  <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-900/50 border border-white/5">
                    <span className="text-4xl font-bold text-purple-400">2-Week</span>
                    <span className="text-sm text-slate-400 font-medium uppercase tracking-wide">Sprints</span>
                  </div>
                </div>

                <Link to="/contact" className="inline-block mt-6">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    Contact Us
                  </Button>
                </Link>
              </div>

              {/* Right: Vertical Step Timeline */}
              <div className="relative pl-8 border-l border-white/10 space-y-12">
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
                      <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-slate-900 bg-blue-500 shadow-[0_0_10px_#3b82f6] z-10" />

                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-blue-400 uppercase tracking-wider">Step 0{i + 1}</span>
                          <Separator className="w-12 bg-white/10" />
                        </div>

                        <Card className="bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 bg-slate-800 rounded-lg text-slate-300 border border-white/5">
                                {Icon && <Icon size={20} />}
                              </div>
                              <CardTitle className="text-xl text-white">{p.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-400 leading-relaxed">{p.description}</p>
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
        <section className="py-24 bg-transparent border-y border-white/5">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 bg-slate-900/50 border border-white/10 rounded-full flex items-center justify-center group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="text-4xl font-extrabold text-white mb-2">{stat.value}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 6. SERVICE FAQ SECTION ==================== */}
        <section className="py-24 bg-transparent">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
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
                  <Card className="bg-slate-900/40 backdrop-blur-sm border border-white/10 hover:bg-slate-800/50 hover:border-blue-500/30 transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-start gap-3 leading-snug text-slate-200">
                        <faq.icon className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-slate-400 text-sm leading-relaxed pl-14">
                      {faq.answer}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 7. CTA ==================== */}
        <section className="py-24 bg-transparent">
          <div className="container px-4 md:px-6">
            <div className="relative rounded-[2.5rem] bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 overflow-hidden px-6 py-20 text-center md:px-12 md:py-24 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                  Ready to Scale Your Business?
                </h2>
                <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
                  Join hundreds of satisfied clients who have transformed their digital presence with us.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/contact" className="inline-block">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-14 text-lg font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                      Get Started Today
                    </Button>
                  </Link>
                  
                  {/* --- FIXED: Added Link for Case Studies --- */}
                  <Link to="/demo-projects">
                    <Button size="lg" variant="outline" className="text-white border-white/10 bg-white/5 hover:bg-white/10 h-14 px-8 text-lg font-semibold rounded-full">
                      View Case Studies
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default ServicesPage;