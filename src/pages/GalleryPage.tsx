import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Maximize2, X, Camera, MapPin } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';

// --- MOCK GALLERY DATA ---
const GALLERY_ITEMS = [

  { 
    id: 2, category: "events", 
    src: "https://i.postimg.cc/8s8SjRcn/AAA-0111.jpg", 
    alt: "Team brainstorming session", title: "SaaS Design Sprint", 
    desc: "The UI/UX team mapping out user journeys for a new Fintech client. We believe the best digital products start with whiteboards and sticky notes." 
  },
  { 
    id: 3, category: "retreats", 
    src: "https://i.postimg.cc/j21jvn5T/2025-09-02-19-02-IMG-4646.avif", 
    alt: "Annual team retreat at the beach", title: "Cox's Bazar Retreat 2024", 
    desc: "Taking a break from screens to reconnect with nature. Our annual retreats are focused on team building, relaxation, and celebrating the year's milestones." 
  },
  { 
    id: 4, category: "office", 
    src: "https://i.postimg.cc/Bbn8mGCs/2025_09_02_18_21_IMG_4634.avif", 
    alt: "Developers coding", title: "Engineering in the Zone", 
    desc: "Our backend developers locked in during a two-week sprint. We provide top-tier hardware and noise-canceling setups to ensure maximum productivity." 
  },
  { 
    id: 5, category: "events", 
    src: "https://i.postimg.cc/4yX9990B/Gemini-Generated-Image-72b3ro72b3ro72b3.png", 
    alt: "Tech meetup hosted by TechWisdom", title: "React Native Meetup", 
    desc: "Hosting the local developer community for an evening of knowledge sharing, pizza, and live coding demonstrations led by our senior engineers." 
  },
  { 
    id: 6, category: "retreats", 
    src: "https://i.postimg.cc/y8x0j08S/Gemini-Generated-Image-s8f7ccs8f7ccs8f7.png", 
    alt: "Team dinner", title: "Project Launch Gala", 
    desc: "A massive celebration dinner after successfully migrating a legacy enterprise system to the cloud with zero downtime. Work hard, celebrate harder." 
  },
  { 
    id: 7, category: "office", 
    src: "https://i.postimg.cc/Jhycrjwm/Gemini-Generated-Image-t8uifft8uifft8ui.png", 
    alt: "Casual meeting area", title: "The Brainstorm Lounge", 
    desc: "A casual corner of the office where the best spontaneous ideas happen over freshly brewed coffee." 
  },
  { 
    id: 8, category: "events", 
    src: "https://i.postimg.cc/kgYzYNNZ/Gemini-Generated-Image-oq3r09oq3r09oq3r.png", 
    alt: "Hackathon winners", title: "Internal Hackathon 3.0", 
    desc: "24 hours of non-stop coding. Our internal hackathons push the team to experiment with AI, new frameworks, and out-of-the-box product ideas." 
  },
  { 
    id: 9, category: "events", 
    src: "https://i.postimg.cc/cCTXgZFv/Gemini-Generated-Image-vinf1fvinf1fvinf.png", 
    alt: "Hackathon winners", title: "Internal Hackathon 3.0", 
    desc: "24 hours of non-stop coding. Our internal hackathons push the team to experiment with AI, new frameworks, and out-of-the-box product ideas." 
  },
  { 
    id: 10, category: "events", 
    src: "https://i.postimg.cc/CM8PHTQ8/DSC-0037.jpg", 
    alt: "Hackathon winners", title: "Internal Hackathon 3.0", 
    desc: "24 hours of non-stop coding. Our internal hackathons push the team to experiment with AI, new frameworks, and out-of-the-box product ideas." 
  },
  { 
    id: 11, category: "events", 
    src: "https://i.postimg.cc/Hs632Yd7/Gemini-Generated-Image-87ntty87ntty87nt.png", 
    alt: "Hackathon winners", title: "Internal Hackathon 3.0", 
    desc: "24 hours of non-stop coding. Our internal hackathons push the team to experiment with AI, new frameworks, and out-of-the-box product ideas." 
  },
   { 
    id: 12, category: "events", 
    src: "https://i.postimg.cc/Sxw6Tj5q/Gemini-Generated-Image-4a5vh4a5vh4a5vh4.png", 
    alt: "Hackathon winners", title: "Internal Hackathon 3.0", 
    desc: "24 hours of non-stop coding. Our internal hackathons push the team to experiment with AI, new frameworks, and out-of-the-box product ideas." 
  },
   { 
    id: 14, category: "events", 
    src: "https://i.postimg.cc/k4MBfmnq/Gemini-Generated-Image-rkbto9rkbto9rkbt.png", 
    alt: "Hackathon winners", title: "Internal Hackathon 3.0", 
    desc: "24 hours of non-stop coding. Our internal hackathons push the team to experiment with AI, new frameworks, and out-of-the-box product ideas." 
  }
];

const CATEGORIES = [
  { id: "all", label: "All Moments" },
  { id: "office", label: "Workspace & Culture" },
  { id: "events", label: "Events & Workshops" },
  { id: "retreats", label: "Team Retreats" }
];

// --- INTERACTIVE BACKGROUND (Restored for consistency) ---
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
      <motion.div className="absolute inset-0" animate={calculateParallax(0.04)} transition={{ type: "tween", ease: "linear", duration: 0.2 }}>
        <div className="absolute top-[80%] left-[20%] w-2 h-2 bg-indigo-400 rounded-full opacity-30 blur-[2px]" />
      </motion.div>
    </div>
  );
};

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const filteredImages = activeCategory === "all" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(img => img.category === activeCategory);

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // CRITICAL FIX: Lock body scroll when modal is open so the footer doesn't ride up!
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup on unmount
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  return (
    <Layout>
      <SEOHead title="Gallery - Life at TechWisdom" description="Explore the vibrant culture, modern workspace, and team events at TechWisdom." path="/gallery" />

      {/* --- BACKGROUND INJECTION --- */}
      <InteractiveBackground />

      {/* --- CONTENT WRAPPER --- */}
      <div className="relative w-full overflow-x-hidden z-10 text-slate-100 min-h-screen pb-24 -mt-24">
        
        {/* ==================== 1. PAGE HEADER ==================== */}
        <section className="relative pt-40 md:pt-56 pb-20 px-4 text-center z-20 flex flex-col items-center justify-center min-h-[50vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-4xl mx-auto space-y-6"
          >
            <Badge variant="outline" className="text-blue-400 border-blue-500/30 px-5 py-1.5 text-sm uppercase tracking-widest backdrop-blur-md bg-slate-900/30">
              <Camera className="w-4 h-4 mr-2 inline-block" /> Visual Journey
            </Badge>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-tight">
              Life at <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">TechWisdom</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              Peek behind the screens. Discover the culture, the workspace, and the brilliant minds building the future of digital.
            </p>
          </motion.div>
        </section>

        {/* ==================== 2. FILTER TABS ==================== */}
        <section className="sticky top-[72px] md:top-[88px] z-30 pb-8 pt-4 bg-transparent backdrop-blur-sm border-b border-white/5">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-slate-900/60 backdrop-blur-xl rounded-full border border-white/10 w-max max-w-full shadow-2xl">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat.id 
                      ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105' 
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 3. TRUE MASONRY GALLERY ==================== */}
        <section className="py-8 relative z-20">
          <div className="container mx-auto px-4 md:px-6">
            
            <motion.div 
              layout 
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
            >
              <AnimatePresence>
                {filteredImages.map((img) => (
                  <motion.div
                    layout
                    key={img.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-900 shadow-xl break-inside-avoid border border-white/10"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8">
                      
                      <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className="bg-blue-600/90 text-white backdrop-blur-md border-none px-3 py-1">
                            {CATEGORIES.find(c => c.id === img.category)?.label}
                          </Badge>
                          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center ml-auto">
                            <Maximize2 size={14} className="text-white" />
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{img.title}</h3>
                        <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed font-light">{img.desc}</p>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredImages.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-40 border border-dashed border-white/10 rounded-[3rem] bg-slate-900/40 backdrop-blur-sm"
              >
                <ImageIcon className="w-20 h-20 text-slate-700 mx-auto mb-6" />
                <h3 className="text-2xl text-white font-bold mb-2">No moments captured yet</h3>
                <p className="text-slate-400 text-lg">Check back later for updates to this category.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* ==================== 4. CINEMATIC LIGHTBOX MODAL (Boxed & High-Z) ==================== */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              // FIXED: z-[9999] forces it strictly above footer. pt-[72px] ensures navbar visibility.
              className="fixed inset-0 pt-[72px] md:pt-[88px] z-[9999] flex items-center justify-center bg-[#020617]/95 backdrop-blur-xl p-4 md:p-8"
              onClick={() => setSelectedImage(null)}
            >
              {/* Floating Close Button */}
              <button 
                className="absolute top-[90px] right-4 md:top-[110px] md:right-8 p-3 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full transition-all duration-300 z-[10000] hover:rotate-90 border border-white/20 shadow-2xl"
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              >
                <X size={20} />
              </button>

              {/* Beautiful Constrained Box Layout */}
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-6xl max-h-full flex flex-col lg:flex-row bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Left Side: Image View (Constrained) */}
                <div className="w-full lg:w-[55%] flex items-center justify-center p-4 lg:p-8 bg-black/40">
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.alt} 
                    className="max-w-full max-h-[45vh] lg:max-h-[70vh] object-contain rounded-xl border border-white/5 shadow-2xl"
                  />
                </div>
                
                {/* Right Side: Info Panel */}
                <div className="w-full lg:w-[45%] flex flex-col p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-white/5 overflow-y-auto">
                  <Badge variant="outline" className="w-max bg-blue-500/10 text-blue-400 border-blue-500/20 mb-6 px-4 py-1.5 uppercase tracking-widest text-xs font-bold">
                    {CATEGORIES.find(c => c.id === selectedImage.category)?.label}
                  </Badge>
                  
                  <h3 className="text-3xl lg:text-4xl font-black text-white mb-6 leading-tight">
                    {selectedImage.title}
                  </h3>
                  
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8" />
                  
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light mb-10">
                    {selectedImage.desc}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-3 text-slate-500 text-sm font-medium tracking-wide uppercase">
                    <MapPin size={16} className="text-blue-500" /> TechWisdom Studios
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </Layout>
  );
};

export default GalleryPage;