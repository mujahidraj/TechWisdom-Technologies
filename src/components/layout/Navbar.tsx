import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Sun } from 'lucide-react';
import data from '@/data.json';
import logo from "../../assets//techwisdom.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { navigation } = data;

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
              
              <img src={logo} className='w-32 h-12' alt="" />
               
              
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
            <div className="flex items-center gap-4">
              <Link
                to="/contact"
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white font-medium text-sm hover:bg-blue-500 transition-colors shadow-md shadow-blue-500/20"
              >
                <span className='flex gap-1.5'><Sun size={20}></Sun>Start Project</span>
              </Link>

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
        <div className="fixed inset-0 z-40 bg-[#0f172a] flex flex-col pt-24 px-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between p-4 rounded-xl text-lg font-medium border border-transparent transition-all ${
                  location.pathname === item.path
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
                {location.pathname === item.path && <ChevronRight size={20} className="text-blue-500" />}
              </Link>
            ))}
            
            <div className="mt-4">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center py-4 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-500 transition-colors"
              >
                Start Project
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;