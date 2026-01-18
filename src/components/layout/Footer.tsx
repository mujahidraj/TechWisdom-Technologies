import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Phone, 
  Heart, 
  ArrowRight,
  Send
} from 'lucide-react';
import data from '@/data.json';
import logo from "../../assets/techwisdom.png"

const Footer = () => {
  const { site, footer, navigation } = data;
  const currentYear = new Date().getFullYear();
  
  // Specific Company Name Request
  const companyName = "TechWisdom Technologies";

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return <Linkedin size={18} />;
      case 'github': return <Github size={18} />;
      case 'twitter': return <Twitter size={18} />;
      default: return null;
    }
  };

  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden font-sans">
      {/* --- Decorative Background Elements --- */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-6 pt-20 pb-10 relative z-10">
        
        {/* --- Main Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* 1. Brand Section (Spans 4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img src={logo} className='w-20' alt="" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-white tracking-tight group-hover:text-blue-400 transition-colors">
                  TechWisdom
                </span>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                  Technologies
                </span>
              </div>
            </Link>
            
            <p className="text-slate-400 leading-relaxed max-w-sm">
              {footer.description || "Empowering businesses with cutting-edge web solutions. We build the digital future, one pixel at a time."}
            </p>

            <div className="flex gap-3">
              {footer.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  aria-label={link.platform}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links (Spans 2 columns) */}
          <div className="lg:col-span-2 lg:pl-4">
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              Explore
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            </h4>
            <ul className="space-y-4">
              {navigation.slice(0, 5).map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Legal/Support (Spans 2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              Legal
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            </h4>
            <ul className="space-y-4">
              {footer.legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-purple-400 transition-colors text-sm block hover:translate-x-1 duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact & Newsletter (Spans 4 columns) */}
          <div className="lg:col-span-4 bg-slate-900/50 rounded-2xl p-6 border border-slate-800/50 backdrop-blur-sm">
            <h4 className="text-white font-semibold mb-2">Stay Connected</h4>
            <p className="text-slate-500 text-sm mb-6">Join our newsletter for the latest tech trends.</p>
            
            <div className="relative mb-8 group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <button className="absolute right-1.5 top-1.5 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md transition-colors">
                <Send size={16} />
              </button>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <Mail size={18} className="text-blue-500 mt-0.5 shrink-0" />
                <span>{site.email}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={18} className="text-blue-500 mt-0.5 shrink-0" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <Phone size={18} className="text-blue-500 mt-0.5 shrink-0" />
                <span>{site.phone}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row justify-evenly items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {currentYear} <span className="text-slate-300 font-medium">{companyName}</span>. All rights reserved.
          </p>
          
          {/* Requested 'Developed by' Section */}
          <div className="flex items-center gap-2 text-sm font-medium bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800 hover:border-blue-500/30 transition-colors shadow-sm">
            <span className="text-slate-400">Developed by</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
              TechWisdom Technologies
            </span>
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;