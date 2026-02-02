import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Zap } from "lucide-react"; // Using Zap as a generic logo placeholder, replace with your logo if needed

// --- REUSABLE BACKGROUND COMPONENTS (Matches Home Page) ---
const CircuitBackground = () => (
  <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="circuit-splash" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M10 10h80v80h-80z" fill="none" />
        <path d="M10 10h20v20h-20z" fill="currentColor" className="text-blue-500" />
        <path d="M70 70h20v20h-20z" fill="currentColor" className="text-purple-500" />
        <path d="M30 10h40" stroke="currentColor" strokeWidth="2" className="text-blue-400" />
        <path d="M10 30v40" stroke="currentColor" strokeWidth="2" className="text-blue-400" />
        <circle cx="50" cy="50" r="4" fill="currentColor" className="text-emerald-400" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#circuit-splash)" />
    </svg>
  </div>
);

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 600); // Wait a bit before unmounting
          return 100;
        }
        // Smooth random increment
        return prev + Math.floor(Math.random() * 5) + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Smooth fade out
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* --- 1. Background Effects (Matches Home) --- */}
      
      {/* Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      
      {/* Circuit Pattern */}
      <CircuitBackground />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500 blur-[1px]"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* --- 2. Center Content --- */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        
        {/* Pulsing Logo Container */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Outer Ring */}
          <div className="absolute inset-0 -m-4 border border-blue-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
          
          {/* Logo Box */}
          <div className="w-20 h-20 bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
            <Zap className="text-blue-500 w-10 h-10 fill-blue-500/20" />
          </div>
        </motion.div>

        {/* Brand Name */}
        <div className="text-center">
          <motion.h1 
            className="text-3xl font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            TechWisdom
          </motion.h1>
          <motion.p 
            className="text-sm text-slate-500 tracking-widest uppercase mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Loading Experience
          </motion.p>
        </div>

        {/* --- 3. Sleek Progress Bar --- */}
        <div className="w-64 h-1 bg-slate-800/50 rounded-full overflow-hidden relative backdrop-blur-sm mt-4">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 w-full"
            initial={{ x: "-100%" }}
            animate={{ x: `${progress - 100}%` }}
            transition={{ type: "tween", ease: "linear", duration: 0.2 }}
          />
          {/* Shimmer Effect on Bar */}
          <motion.div 
            className="absolute top-0 left-0 h-full w-full bg-white/20"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>

      </div>
    </motion.div>
  );
};

export default SplashScreen;