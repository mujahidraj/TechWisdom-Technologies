import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layout, Code2, Layers, MessageSquare, Plus, Minus, HelpCircle, Sparkles, MonitorPlay } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import data from '@/data.json';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingChatButton from '@/components/layout/FloatingChatButton'; 
import FloatingSpeedButton from '@/components/layout/FloatingSpeedButton';

const DemoProjects = () => {
  const { demoProjects } = data;
  
  // Get unique categories
  const categories = ['All', ...new Set(demoProjects.map(item => item.category))];
  const [activeCategory, setActiveCategory] = useState('All');
  
  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Filter projects
  const filteredProjects = activeCategory === 'All' 
    ? demoProjects 
    : demoProjects.filter(project => project.category === activeCategory);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Are these real, operating business websites?",
      answer: "No. The projects listed here are conceptual prototypes and functional demonstrations. They represent fictional companies and are used to showcase our design capabilities, coding standards, and architectural patterns."
    },
    {
      question: "Do these demos have full backend functionality?",
      answer: "Most of these demos are 'Frontend-First' prototypes. While they look and feel like real apps, the data you see (users, products, dashboard stats) is often simulated or 'dummy data' to ensure fast loading and easy testing without setting up complex accounts."
    },
    {
      question: "Why might I encounter bugs or glitches?",
      answer: "These projects are our 'experimental sandboxes'. We use them to test cutting-edge features, new animations, and beta libraries before using them on client sites. As a result, you might find minor bugs or non-functional buttons, which is part of our R&D process."
    },
    {
      question: "Can I buy one of these demos as-is?",
      answer: "We don't sell these exact templates to ensure uniqueness for every client. However, if you like a specific demo, we can use its architecture as a foundation to build your custom, fully-functional software much faster."
    },
    {
      question: "Is the data I enter in these demos saved?",
      answer: "Generally, no. For security and privacy, most input forms in these demos do not transmit data to a real server. They are designed to show you user interface interactions (validation, success states) rather than process actual information."
    },
    {
      question: "Do these demos represent your final delivery quality?",
      answer: "They represent our 'Visual & Interactive' quality. However, a final delivered project goes through rigorous QA (Quality Assurance), backend integration, security hardening, and SEO optimization which might be skipped here for speed of demonstration."
    },
    {
      question: "Can you customize a design from here for my brand?",
      answer: "Absolutely. We can take the core logic of any demo here and completely skin it with your brand colors, typography, and content. This is often the fastest way to get your MVP (Minimum Viable Product) to market."
    },
    {
      question: "Are these optimized for mobile?",
      answer: "Yes, 100%. We practice 'Mobile-First' development. You can open any of these links on your phone to see how the interface adapts perfectly to smaller screens."
    },
    {
      question: "I see a feature here I want. How do I ask for it?",
      answer: "Simply take a screenshot or copy the URL of the demo, click 'Start Project', and share it with us. We can easily identify the component and implement it into your custom solution."
    },
    {
      question: "Why do you show these publicly?",
      answer: "Transparency. Most agencies only show vague screenshots. We believe in showing our actual code in action so you know exactly the level of quality and interactivity you are paying for."
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
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Layers size={14} /> Our Demo Work
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Our demonstration is beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">the digital excellence</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Explore our ready-made solutions and case studies. From Real Estate platforms to Healthcare apps, see how we engineer success.
          </p>
        </div>
      </div>

      {/* --- SHOWCASE CONTEXT SECTION (Replaced Warning) --- */}
      <div className="container mx-auto px-6 -mt-16 relative z-20 pb-16">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-200/50 max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-start relative overflow-hidden">
          
          {/* Subtle Top Border Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

          <div className="bg-blue-50 p-4 rounded-full shrink-0 text-blue-600">
            <Sparkles size={32} />
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              Experience Our Engineering & Design
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4 text-lg">
              The projects listed below are <strong>High-Fidelity Prototypes</strong>. We created them to demonstrate the quality of our code, the fluidity of our animations, and our attention to detail.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5">
                <MonitorPlay size={18} className="text-blue-500 mt-1 shrink-0" />
                <span className="text-sm text-slate-600"><strong>Visual Showcase:</strong> See our modern UI/UX capabilities in action.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Code2 size={18} className="text-purple-500 mt-1 shrink-0" />
                <span className="text-sm text-slate-600"><strong>Code Quality:</strong> Experience clean, fast, and scalable frontend architecture.</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 mt-4 italic">
              * Note: These demos contain simulated data and are for demonstration purposes only.
            </p>
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

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300 mb-16">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Layout size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No projects found</h3>
            <p className="text-slate-500">We don't have projects in this category displayed publicly yet.</p>
            <button 
              onClick={() => setActiveCategory('All')}
              className="mt-6 px-6 py-2 bg-[#0f172a] text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors"
            >
              View All Projects
            </button>
          </div>
        )}

        {/* --- CUSTOM DEMO REQUEST CTA --- */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0f172a] to-blue-900 overflow-hidden shadow-2xl shadow-blue-900/20 mb-24">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 px-8 py-12 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Didn't find what you were looking for?
              </h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                We have hundreds of internal prototypes and private case studies. 
                Tell us what you need, and we'll arrange a personalized demo for you.
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