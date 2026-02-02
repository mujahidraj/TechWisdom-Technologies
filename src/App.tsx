import { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

// --- Page Imports ---
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import WorkPage from "./pages/WorkPage";
import CaseStudyPage from "./pages/CaseStudyPage";
import PricingPage from "./pages/PricingPage";
import CareersPage from "./pages/CareersPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import DemoProjects from './pages/DemoProjects';
import DemoProjectDetails from './pages/DemoProjectDetails';
import ServiceDetails from './pages/ServiceDetails';
import ManifestoPage from './pages/ManifestoPage';
import CookiesPolicy from './pages/CookiesPolicy';

// --- Splash Screen Import ---
import SplashScreen from './components/ui/SplashScreen';

const queryClient = new QueryClient();

const App = () => {
  // 1. State to track if the splash screen should be visible
  const [isLoading, setIsLoading] = useState(true);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          {/* 2. Splash Screen Logic */}
          <AnimatePresence mode="wait">
            {isLoading && (
              <SplashScreen onComplete={() => setIsLoading(false)} />
            )}
          </AnimatePresence>

          {/* 3. Main Website (Always rendered or rendered after, depending on preference) */}
          {/* Note: Rendering it only after loading prevents "double scrollbar" issues during fade-out */}
          {!isLoading && (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="/work/:id" element={<CaseStudyPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/demo-projects" element={<DemoProjects />} />
                <Route path="/demo-projects/:id" element={<DemoProjectDetails />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/services/:id" element={<ServiceDetails />} />
                <Route path="/manifesto" element={<ManifestoPage />} />
                <Route path="/cookies-policy" element={<CookiesPolicy />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          )}

        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;