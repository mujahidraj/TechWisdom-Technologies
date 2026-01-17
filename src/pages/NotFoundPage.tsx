import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

const NotFoundPage = () => {
  const { notFound } = data;
  return (
    <Layout>
      <SEOHead title="404 - Not Found" description={notFound.description} />
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <h1 className="text-8xl md:text-9xl font-bold text-gradient mb-4">404</h1>
            <h2 className="text-3xl font-bold text-navy mb-4">{notFound.title}</h2>
            <p className="text-navy/60 mb-8 max-w-md mx-auto">{notFound.description}</p>
            <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-strong-blue to-soft-blue text-white rounded-xl font-semibold hover:opacity-90 transition-opacity">
              <Home size={20} />{notFound.cta}
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};
export default NotFoundPage;
