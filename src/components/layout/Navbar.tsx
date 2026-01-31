import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Sun, Sparkles } from 'lucide-react';
import data from '@/data.json';
import logo from "../../assets/techwisdom.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { navigation } = data;

  // --- FIXED: Initialize state based on current scroll position to prevent "glitch" ---
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > 20;
    }
    return false;
  });

  // Active state checks
  const isDemoActive = location.pathname === '/demo-projects';
  const isContactActive = location.pathname === '/contact';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] border-b ${
          scrolled 
            ? 'bg-[#0f172a]/80 backdrop-blur-xl border-white/10 py-3 shadow-lg shadow-blue-900/5' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            
            {/* --- Logo --- */}
            <Link to="/" className="flex items-center gap-2 group relative z-50">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 rounded-full"></div>
                <img src={logo} className='w-32 relative z-10 transition-transform duration-500 group-hover:scale-105' alt="TechWisdom" />
              </div>
            </Link>

            {/* --- Desktop Navigation --- */}
            <div className="hidden lg:flex items-center p-1.5 rounded-full border border-white/5 bg-slate-900/40 backdrop-blur-sm shadow-inner">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-500 ease-out group"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-blue-600 rounded-full shadow-lg shadow-blue-600/20"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors duration-300'}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* --- CTA & Mobile Button --- */}
            <div className="flex items-center gap-4">
              
              {/* Desktop: Horizontal Buttons */}
              <div className="hidden lg:flex items-center gap-4">
                
                {/* Demo Projects Button */}
                <Link
                  to="/demo-projects"
                  className={`relative group overflow-hidden px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-500 border ${
                    isDemoActive 
                      ? 'bg-slate-800 border-blue-500/50 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]' 
                      : 'border-white/10 text-slate-300 hover:border-blue-500/30 hover:text-blue-300 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles size={14} className={`transition-colors duration-300 ${isDemoActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'}`} />
                    Demo Projects
                  </span>
                </Link>

                {/* Start Project Button */}
                <Link
                  to="/contact"
                  className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-500 shadow-lg group overflow-hidden ${
                    isContactActive
                      ? 'bg-white text-blue-700 shadow-white/20'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
                  <Sun size={16} className={`relative z-10 ${isContactActive ? 'text-blue-600' : 'text-yellow-300'}`} />
                  <span className="relative z-10">Start Project</span>
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative z-50"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, y: 0, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, y: -20, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ type: "spring", stiffness: 80, damping: 20, mass: 1 }}
            className="fixed inset-0 z-40 bg-[#0f172a]/98 backdrop-blur-3xl lg:hidden flex flex-col pt-28 px-6 overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="flex flex-col gap-2 relative z-10">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05), duration: 0.4 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-2xl text-lg font-medium border border-transparent transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'bg-blue-600/10 border-blue-500/30 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {location.pathname === item.path && <ChevronRight size={20} />}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="h-px bg-white/10 my-6" 
              />

              {/* Mobile Buttons */}
              <div className="flex flex-col gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className={`w-full flex items-center justify-center py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                      isContactActive 
                        ? 'bg-white text-blue-900' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-900/20'
                    }`}
                  >
                    Start Project
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    to="/demo-projects"
                    onClick={() => setIsOpen(false)}
                    className={`w-full flex items-center justify-center py-4 rounded-xl border font-bold text-lg transition-all ${
                      isDemoActive
                        ? 'bg-slate-800 border-blue-500 text-blue-400'
                        : 'border-white/10 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    Demo Projects
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;