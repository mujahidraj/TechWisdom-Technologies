import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Sun } from 'lucide-react';
import data from '@/data.json';
import logo from "../../assets/techwisdom.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { navigation } = data;

  // Active state checks
  const isDemoActive = location.pathname === '/demo-projects';
  const isContactActive = location.pathname === '/contact';

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-5 transition-all">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            
            {/* --- Logo --- */}
            <Link to="/" className="flex items-center gap-1 group">
              <img src={logo} className='w-28 ' alt="TechWisdom" />
            </Link>

            {/* --- Desktop Navigation --- */}
            <div className="hidden lg:flex items-center p-1 rounded-full border bg-white/5 border-white/5">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-5 py-2 text-sm font-medium transition-colors rounded-full ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* --- CTA & Mobile Button --- */}
            <div className="flex items-center gap-3">
              
              {/* Desktop: Horizontal Buttons (Side by Side) */}
              <div className="hidden lg:flex items-center gap-3">
                
                {/* Demo Projects Button */}
                <Link
                  to="/demo-projects"
                  className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                    isDemoActive 
                      ? 'bg-blue-600 text-white border border-blue-500/50' 
                      : 'border border-blue-500/30 text-blue-400 hover:bg-blue-500/30'
                  }`}
                >
                  Demo Projects
                </Link>

                {/* Start Project Button */}
                <Link
                  to="/contact"
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-md ${
                    isContactActive
                      ? 'bg-blue-700 text-white ring-2 ring-blue-400 ring-offset-1 ring-offset-[#0f172a]'
                      : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20'
                  }`}
                >
                  <Sun size={18} /> Start Project
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay --- */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#0f172a] flex flex-col pt-24 px-6 lg:hidden overflow-y-auto">
          <div className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl text-base font-medium border border-transparent transition-all ${
                  location.pathname === item.path
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
                {location.pathname === item.path && <ChevronRight size={18} className="text-blue-500" />}
              </Link>
            ))}
            
            {/* Mobile Buttons */}
            <div className="mt-6 flex flex-col gap-3 pb-8">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center justify-center py-3.5 rounded-xl font-bold text-base transition-colors ${
                  isContactActive 
                    ? 'bg-blue-700 text-white border-2 border-blue-400' 
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
              >
                Start Project
              </Link>

              <Link
                to="/demo-projects"
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center justify-center py-3.5 rounded-xl border font-bold text-base transition-colors ${
                  isDemoActive
                    ? 'bg-white/10 border-blue-500 text-white'
                    : 'border-white/10 text-white hover:bg-white/5'
                }`}
              >
                Demo Projects
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;