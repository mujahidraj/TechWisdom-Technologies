import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

const BlogPage = () => {
  const { blog } = data;
  return (
    <Layout>
      <SEOHead title="Blog" description="Insights and articles from our team" path="/blog" />
      <section className="section-padding gradient-navy">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold text-white mb-6">Insights</motion.h1>
          <p className="text-xl text-white/70">Latest thoughts from our team</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blog.posts.map((post, i) => (
              <motion.article key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bento-card group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-strong-blue/20 to-soft-blue/20 rounded-xl mb-4" />
                <span className="inline-block px-3 py-1 bg-pale-blue/30 rounded-full text-sm text-strong-blue font-medium mb-3">{post.category}</span>
                <h3 className="text-xl font-semibold text-navy group-hover:text-strong-blue transition-colors mb-2">{post.title}</h3>
                <p className="text-navy/60 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-navy/50">
                  <span className="flex items-center gap-1"><Calendar size={14} />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} />{post.readTime}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default BlogPage;
