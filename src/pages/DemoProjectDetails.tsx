import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, CheckCircle, Layers, Palette, Terminal, Code2, Rocket, HelpCircle, Plus, Minus } from 'lucide-react';
import data from '@/data.json';
import SEOHead from '@/components/seo/SEOHead';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingSpeedButton from '@/components/layout/FloatingSpeedButton';
import FloatingChatButton from '@/components/layout/FloatingChatButton';

const DemoProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = data.demoProjects.find((p) => p.id === id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Redirect if project not found
  useEffect(() => {
    if (!project) {
      navigate('/demo-projects');
    }
    window.scrollTo(0, 0); // Scroll to top on load
  }, [project, navigate]);

  if (!project) return null;

  const demoFaqs = [
    {
      question: "Is this a real, operating business website?",
      answer: "No, this is a demonstration prototype. We built this to showcase our capability to create complex, high-performance applications for this specific industry. The business logic is real, but the company and data are fictional."
    },
    {
      question: "Can I buy this exact website code 'off-the-shelf'?",
      answer: "We don't usually sell the exact same code to multiple clients to ensure your brand remains unique. However, we use this architecture as a foundation to build your custom solution significantly faster."
    },
    {
      question: "Is the data shown in the demo real?",
      answer: "No, all user profiles, products, and analytics data shown in the live preview are 'dummy data' generated for demonstration purposes only."
    },
    {
      question: "Can you customize the design to match my brand?",
      answer: "Absolutely. While the functionality might remain similar, we will completely overhaul the UI/UX, color palette, typography, and layout to align perfectly with your brand identity."
    },
    {
      question: "How long would it take to build a solution like this for me?",
      answer: "Since we already have the core architecture ready (as seen in this demo), we can reduce development time by 30-40%. A project of this magnitude typically takes 4-8 weeks to customize and launch for a client."
    },
    {
      question: "Can I access the Admin Panel of this demo?",
      answer: "For security reasons, public access to the Admin Panel is restricted in the live link. However, if you are interested, we can schedule a Google Meet call to give you a live walkthrough of the backend management features."
    },
    {
      question: "Is this demo optimized for SEO?",
      answer: "Yes, the architecture is built with Technical SEO best practices (SSR, Semantic HTML, Fast Load Times). When we build your version, we will further optimize it for your specific keywords."
    },
    {
      question: "Do I own the code if I order a project like this?",
      answer: "Yes. Unlike SaaS platforms where you pay rent, with TechWisdom, you pay for development and you own 100% of the source code and intellectual property upon completion."
    },
    {
      question: "What happens if I find a bug in the demo?",
      answer: "Our demos are constantly updated, but minor bugs may exist in experimental features. If we build this for you, it goes through rigorous QA testing to ensure a bug-free production launch."
    },
    {
      question: "I like this demo. How do we proceed?",
      answer: "Click the 'Get a Quote' button or 'Start Project' in the navigation. We will discuss your specific requirements, how they differ from this demo, and provide a timeline and cost estimate."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SEOHead 
        title={project.title} 
        description={project.shortDescription}
        image={project.image}
      />

      {/* --- HERO SECTION --- */}
      <div className="relative bg-[#0f172a] pt-32 pb-48 lg:pt-44 lg:pb-64 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Back Navigation */}
          <Link 
            to="/demo-projects" 
            className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8 group font-medium"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          {/* Hero Flex Layout */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
            
            {/* Left: Text Content */}
            <div className="lg:w-2/3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                {project.category}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {project.title}
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                {project.shortDescription}
              </p>
            </div>

            {/* Right: SUPER GLOWING CTA Button */}
            <div className="lg:w-1/3 w-full flex justify-start lg:justify-end">
              <div className="relative group">
                
                {/* 1. The Super Neon Glow (Always Visible & Pulsing) */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-lg opacity-100 animate-pulse duration-1000"></div>
                
                {/* 2. The Button Itself */}
                <a 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-3 px-8 py-5 rounded-2xl bg-blue-600 text-white font-bold text-lg border border-white/10 hover:bg-slate-800 transition-all transform hover:-translate-y-1 hover:scale-105 shadow-2xl"
                >
                  <Rocket size={24} className="text-cyan-400  animate-bounce" />
                  <span className="tracking-wide">View Live Demo</span>
                  <ExternalLink size={20} className="text-purple-400" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- MAIN CONTENT (Overlapping) --- */}
      <div className="container mx-auto px-6 max-w-6xl relative z-20 -mt-32 lg:-mt-48 pb-20">
        
        {/* Main Image (Floating Card) */}
        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/20 mb-16 border-4 border-white/10 bg-[#0f172a]">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-[350px] md:h-[600px] object-cover opacity-95 hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-24">
          
          {/* Left Column (Main Info) */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                Project Overview
              </h2>
              <div className="prose prose-lg text-slate-600 leading-relaxed max-w-none">
                <p>{project.fullDescription}</p>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-8 flex items-center gap-3">
                <Layers className="text-blue-600" /> Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-green-50 p-2 rounded-full shrink-0 text-green-600">
                        <CheckCircle size={20} />
                    </div>
                    <span className="text-slate-700 font-medium pt-0.5">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Development Process */}
            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6 flex items-center gap-3">
                <Terminal className="text-blue-600" /> Development Journey
              </h2>
              <div className="p-8 rounded-3xl bg-[#0f172a] text-white shadow-xl relative overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                    <p className="text-slate-200 text-lg italic leading-relaxed border-l-4 border-blue-500 pl-6">
                    "{project.developmentProcess}"
                    </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (Sidebar Info) */}
          <div className="space-y-8 lg:sticky lg:top-32 h-fit">
            
            {/* Tech Stack */}
            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 className="text-lg font-bold text-[#0f172a] mb-6 flex items-center gap-2">
                <Code2 className="text-blue-600" size={20} /> Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-slate-50 text-slate-700 border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Design Unique */}
            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 className="text-lg font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                <Palette className="text-purple-600" size={20} /> Design Philosophy
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {project.designUnique}
              </p>
            </div>

            {/* CTA Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-700 text-center shadow-xl shadow-blue-500/20 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">Inspired?</h3>
                <p className="text-blue-100 mb-8 text-sm">
                  Let's build a custom version of this solution tailored to your brand.
                </p>
                <Link 
                  to="/contact" 
                  className="inline-block w-full py-4 rounded-xl bg-white text-blue-700 font-bold hover:bg-slate-50 transition-colors shadow-lg"
                >
                  Get a Quote
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* --- FAQ SECTION --- */}
        <div className="max-w-4xl mx-auto border-t border-slate-200 pt-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle size={14} /> Demo FAQs
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              About this Demo Project
            </h2>
            <p className="text-slate-500 mt-4">
              Common questions about our demonstration prototypes.
            </p>
          </div>

          <div className="space-y-4">
            {demoFaqs.map((faq, index) => (
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

export default DemoProjectDetails;