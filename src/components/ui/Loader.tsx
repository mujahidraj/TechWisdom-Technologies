import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617] overflow-hidden">
      
      {/* --- BACKGROUND EFFECTS --- */}
      
      {/* 1. Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      {/* 2. Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]" />

      {/* --- LOADER CORE --- */}
      <div className="relative flex flex-col items-center">
        
        {/* Outer Rotating Ring (Cyan) */}
        <motion.div
          className="w-32 h-32 rounded-full border-t-4 border-l-2 border-cyan-500/50 absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Rotating Ring (Purple - Reverse) */}
        <motion.div
          className="w-24 h-24 rounded-full border-b-4 border-r-2 border-purple-500/50 absolute top-4"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Pulsing Core */}
        <motion.div
          className="w-16 h-16 bg-blue-600/20 rounded-full blur-xl absolute top-8"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Center Solid Dot */}
        <div className="w-2 h-2 bg-white rounded-full absolute top-[60px] shadow-[0_0_20px_rgba(255,255,255,0.8)]" />

        {/* --- TEXT & LOADING BAR --- */}
        <div className="mt-48 text-center space-y-4">
          
          {/* Typing Text Effect */}
          <motion.h2 
            className="text-blue-400 font-mono text-sm tracking-[0.3em] font-bold"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            INITIALIZING_SYSTEM...
          </motion.h2>

          {/* Progress Bar Container */}
          <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden relative">
            {/* Moving Bar */}
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 w-full"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          
          {/* Meta Data */}
          <div className="flex justify-between text-[10px] font-mono text-slate-600 uppercase w-64 mx-auto">
            <span>Mem: 64MB</span>
            <span>Net: Secure</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Loader;