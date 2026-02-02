import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// 👇 Import your logo
import logo from "@/assets/techwisdom.png";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM...");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 600);
          return 100;
        }

        // Update Status Text based on progress milestones
        if (prev === 20) setStatusText("LOADING CORE ASSETS...");
        if (prev === 50) setStatusText("ESTABLISHING SECURE CONNECTION...");
        if (prev === 80) setStatusText("RENDERING INTERFACE...");
        if (prev === 98) setStatusText("ACCESS GRANTED");

        return prev + 1;
      });
    }, 25); // 2.5s duration

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]" />

      {/* --- CENTER CORE --- */}
      <div className="relative flex flex-col items-center">

        {/* Outer Rotating Ring (Brand Blue) */}
        <motion.div
          className="w-64 h-64 rounded-full border-t-6 border-l-4 border-blue-500/40 absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner Rotating Ring (Brand Purple - Reverse) */}
        <motion.div
          className="w-48 h-48 rounded-full border-b-6 border-r-4 border-purple-500/40 absolute top-8"
          animate={{ rotate: -360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Pulsing Core Background */}
        <motion.div
          className="w-40 h-40 bg-blue-600/10 rounded-full blur-3xl absolute top-12"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* --- COMPANY LOGO (Upscaled) --- */}
        <div className="relative z-10 top-16 w-32 h-32 flex items-center justify-center bg-[#0b1121] rounded-full border border-slate-800 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
          <img
            src={logo}
            alt="TechWisdom"
            className="w-20 h-20  object-contain"
          />
        </div>

        {/* --- TEXT & LOADING BAR (Upscaled) --- */}
        <div className="mt-40 text-center space-y-8 w-full max-w-md px-6">

          {/* Company Name */}
          <div>
            <motion.h1
              className="text-white text-3xl md:text-3xl font-black tracking-tight mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              TECHWISDOM TECHNOLOGIES
            </motion.h1>

            {/* Dynamic Status Text */}
            <motion.p
              className="text-blue-400 font-mono text-sm tracking-[0.25em] uppercase h-6 font-semibold"
              key={statusText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {statusText}
            </motion.p>
          </div>

          {/* Sleek Progress Bar (Thicker) */}
          <div className="w-full h-[10px] bg-slate-800 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 h-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "tween", ease: "linear", duration: 0.1 }}
            />
            {/* Shimmer overlay */}
            <motion.div
              className="absolute top-0 left-0 h-full w-full bg-white/30"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>

          {/* Tech Metadata (Larger) */}
          <div className="flex justify-between text-xs font-mono text-slate-500 uppercase pt-1 px-1 tracking-wider">
            <span>TechWisdom: Secure</span>

            <span>{progress}%</span>

          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;