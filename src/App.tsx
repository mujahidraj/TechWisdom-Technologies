import { useState, useEffect, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

// --- Component Imports ---
import Loader from './components/ui/Loader'; // Your generic loader
import SplashScreen from './components/ui/SplashScreen'; // The new boot screen

// --- Page Imports (Lazy Loaded) ---
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const DemoProjects = lazy(() => import('./pages/DemoProjects'));
const DemoProjectDetails = lazy(() => import('./pages/DemoProjectDetails'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const ManifestoPage = lazy(() => import('./pages/ManifestoPage'));
const CookiesPolicy = lazy(() => import('./pages/CookiesPolicy'));
const LoaderPage = lazy(() => import('./pages/LoaderPage'));

const queryClient = new QueryClient();

// Helper to scroll top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          {/* AnimatePresence handles the exit animation of the Splash Screen */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <SplashScreen key="splash" onComplete={handleLoadComplete} />
            ) : (
              <BrowserRouter>
                <ScrollToTop />
                <Suspense fallback={<Loader />}>
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
                    <Route path="/loader" element={<LoaderPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            )}
          </AnimatePresence>

        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;