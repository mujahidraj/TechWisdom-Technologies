import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- YOUR UI COMPONENTS ---
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  const { notFound } = data;

  return (
    <Layout>
      <SEOHead title="404 - Page Not Found" description={notFound.description} />
      
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0f172a] text-white">
        
        {/* ==================== BACKGROUND EFFECTS ==================== */}
        {/* Grid Pattern */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
        
        {/* Glowing Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" 
        />

        {/* ==================== CONTENT ==================== */}
        <div className="container relative z-10 text-center px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Big 404 Text */}
            <h1 className="text-[150px] md:text-[220px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-slate-700/50 to-slate-900/0 select-none">
              404
            </h1>

            {/* Content Overlay */}
            <div className="-mt-12 md:-mt-24 relative z-20 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                {notFound.title || "Lost in Space?"}
              </h2>
              
              <p className="text-lg md:text-xl text-slate-400 max-w-lg mx-auto">
                {notFound.description || "The page you are looking for seems to have wandered off into the digital void."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link to="/">
                  <Button size="lg" className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 text-base">
                    <Home className="mr-2 h-5 w-5" /> {notFound.cta || "Back to Home"}
                  </Button>
                </Link>
                
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white text-base">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;