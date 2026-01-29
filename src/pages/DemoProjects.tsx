import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Layout, Code2, Layers, MessageSquare, Plus, Minus, HelpCircle, 
  Sparkles, MonitorPlay, Smartphone, Palette, TrendingUp, AlertTriangle, Cpu, Server, PenTool, Eye
} from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import data from '@/data.json';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingChatButton from '@/components/layout/FloatingChatButton'; 
import FloatingSpeedButton from '@/components/layout/FloatingSpeedButton';

const DemoProjects = () => {
  const { demoProjects } = data;
  const categories = ['All', ...new Set(demoProjects.map(item => item.category))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? demoProjects 
    : demoProjects.filter(project => project.category === activeCategory);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Do you also build the Backend and Database?",
      answer: "Yes, we are Full-Stack experts. While these public demos focus on UI/UX for instant browsing, our client deliverables include robust, secure backends. We specialize in Node.js, Python, and Go, coupled with scalable databases like MongoDB or PostgreSQL."
    },
    {
      question: "Why are functionalities simulated in these demos?",
      answer: "We simulate data processing here to protect user privacy and ensure lightning-fast performance for you (the viewer). In a real project, we replace these simulations with secure API calls, authentication systems, and real-time database connections."
    },
    {
      question: "Can you build a complex SaaS platform, not just a website?",
      answer: "Absolutely. These demos showcase our design capabilities, but our engineering team specializes in complex architecture. We build ERPs, CRMs, and SaaS platforms with complex logic, user roles, and payment gateways."
    },
    {
      question: "Why might I encounter bugs or glitches?",
      answer: "These projects are our 'Innovation Lab'. We use them to test cutting-edge features and animations before rolling them out to clients. This allows us to offer you the latest tech, but it means the demo environment is constantly evolving."
    },
    {
      question: "Is the data I enter in these demos saved?",
      answer: "Generally, no. For security and privacy, most input forms in these demos do not transmit data to a real server. They are designed to show you user interface interactions (validation, success states) rather than process actual information."
    },
    {
      question: "Do these demos represent your final delivery quality?",
      answer: "They represent our 'Visual & Interactive' quality. A final delivered project goes through rigorous QA, backend integration, and security hardening which is skipped here to allow instant public access."
    },
    {
      question: "Can you customize a design from here for my brand?",
      answer: "Absolutely. We can take the core logic of any demo here and completely skin it with your brand colors, typography, and content. This is often the fastest way to get your MVP (Minimum Viable Product) to market."
    },
    {
      question: "Are these optimized for mobile?",
      answer: "Yes, 100%. We practice 'Mobile-First' development. You can open any of these links on your phone to see how the interface adapts perfectly to smaller screens."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SEOHead 
        title="Demo Projects" 
        description="Explore our portfolio of demo projects showcasing our capabilities in Web Development and Custom Software." 
      />

      {/* --- HERO SECTION --- */}
      <div className="relative bg-[#0f172a] pt-32 pb-32 lg:pt-40 lg:pb-40 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          
          {/* Clean, Professional Hero Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Layers size={14} /> Demonstration Environment
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Our demonstration is beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">the digital excellence</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Explore our ready-made solutions and case studies. From Real Estate platforms to Healthcare apps, see how we engineer success.
          </p>
        </div>
      </div>

      {/* --- PREMIUM SHOWCASE CONTEXT SECTION --- */}
      <div className="container mx-auto px-6 -mt-16 relative z-20 pb-16">
        <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-200/50 max-w-6xl mx-auto relative overflow-hidden ring-1 ring-slate-900/5">
          
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-10">
            
            {/* 1. Header */}
            <div className="border-b border-slate-100 pb-8 flex flex-col md:flex-row gap-6 items-start md:items-end justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest mb-4">
                  <Sparkles size={12} className="text-yellow-400" /> 
                  Prototype Environment
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  Experience Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital Craftsmanship</span>
                </h3>
              </div>
              <p className="text-slate-500 text-lg md:text-right max-w-md leading-relaxed font-medium">
                High-fidelity prototypes designed to showcase our frontend engineering and design standards.
              </p>
            </div>

            {/* 2. Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: MonitorPlay, color: "text-blue-600", title: "Web Development", desc: "Responsive, Modern UI/UX" },
                { icon: Server, color: "text-indigo-600", title: "Backend Architecture", desc: "Node.js, Python, Go (Production)" },
                { icon: PenTool, color: "text-emerald-600", title: "UI/UX Design", desc: "Wireframing & Prototyping" }, // Changed from Database to UI/UX
                { icon: Smartphone, color: "text-purple-600", title: "Mobile Apps", desc: "iOS & Android Interfaces" },
                { icon: Palette, color: "text-pink-600", title: "Graphic Design", desc: "Branding & Visual Identity" },
                { icon: TrendingUp, color: "text-orange-600", title: "Digital Marketing", desc: "SEO & Conversion Strategy" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300 group">
                  <div className={`p-3 rounded-xl bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform ${item.color}`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 3. PROFESSIONAL DISCLAIMER BOX (Updated Text) */}
            <div className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-6 border border-slate-200 flex flex-col md:flex-row gap-5 items-start shadow-inner">
              <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-blue-600 shrink-0">
                 <Cpu size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Important: Demonstration Purposes Only
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  To ensure instant loading speeds and public accessibility, these demos run in a <strong>Frontend-First environment</strong>. 
                  Real-world functionalities (Authentication, Database Storage, Payments) are <strong>simulated visually</strong>. These projects are for <b>demonstration purposes only</b> and do not represent fully deployed applications.
                  <br className="mt-2" />
                  <span className="text-slate-900 font-semibold">For client projects:</span> We build fully functional, secure, and scalable Backends (APIs & Databases) tailored to your specific business logic.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="container mx-auto px-6 relative z-20 pb-20">
        
        {/* Category Filter */}
        <div className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/50 max-w-fit mx-auto mb-16 flex flex-wrap justify-center gap-2 border border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#0f172a] text-white shadow-md transform scale-105'
                  : 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProjects.map((project) => (
            <Link 
              to={`/demo-projects/${project.id}`} 
              key={project.id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 h-full transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Demo Badge on Image */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white rounded shadow-md flex items-center gap-1">
                    <Eye size={10} /> Demo Preview
                  </span>
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-[#0f172a]/0 group-hover:bg-[#0f172a]/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="px-6 py-2 bg-white text-[#0f172a] font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                    View Case Study
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#0f172a] text-white rounded shadow-md border border-slate-700">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 flex-1 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-medium bg-slate-50 px-2 py-1 rounded-md">
                    <Code2 size={14} className="text-blue-500" />
                    <span>{project.techStack[0]}</span>
                  </div>
                  
                  <span className="flex items-center text-blue-600 text-sm font-bold group-hover:translate-x-1 transition-transform">
                    Details <ArrowRight size={16} className="ml-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* --- CUSTOM DEMO REQUEST CTA --- */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0f172a] to-blue-900 overflow-hidden shadow-2xl shadow-blue-900/20 mb-24">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 px-8 py-12 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Need a Custom Solution?
              </h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                We have hundreds of internal prototypes (Backends, APIs, Admin Panels) not listed here. 
                Tell us your requirements, and we'll build a tailored demo for you.
              </p>
            </div>
            <Link 
              to="/contact" 
              className="shrink-0 px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
            >
              <MessageSquare size={20} />
              Request Custom Demo
            </Link>
          </div>
        </div>

        {/* --- FAQ SECTION --- */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle size={14} /> Demo FAQs
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 mt-4">
              Common questions about the nature of these prototypes.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openFaq === index 
                    ? 'border-blue-200 shadow-lg shadow-blue-500/5' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-bold text-lg ${openFaq === index ? 'text-blue-600' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  <span className={`p-2 rounded-full transition-colors ${openFaq === index ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                    {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                
                <div 
                  className={`px-6 text-slate-600 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
      <FloatingSpeedButton />
      <FloatingChatButton />
    </div>
  );
};

export default DemoProjects;