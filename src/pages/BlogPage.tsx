import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Search, ArrowRight, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';

// --- INTERACTIVE BACKGROUND ---
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
    </div>
  );
};

const BlogPage = () => {
  const { blog } = data;
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on search query
  const filteredPosts = blog.posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <SEOHead title="Blog - Insights & News" description="Latest thoughts, tutorials, and insights from our team." path="/blog" />
      
      {/* --- BACKGROUND INJECTION --- */}
      <InteractiveBackground />

      <div className="relative z-10 text-slate-100">

        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="container relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-md bg-slate-900/30">
                Our Blog
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
                Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Insights</span> & News
              </h1>
              <p className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed font-light">
                Expert articles on technology, design, and business growth. Stay updated with the latest trends.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ==================== 2. SEARCH & GRID SECTION ==================== */}
        <section className="pb-24 bg-transparent min-h-screen">
          <div className="container px-4 md:px-6">
            
            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto -mt-8 mb-20 z-20">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl">
                  <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                  <Input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="pl-12 h-14 border-none text-base bg-transparent text-white placeholder:text-slate-500 focus-visible:ring-0 rounded-xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="pr-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white h-10 px-6 rounded-lg font-medium transition-colors">
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, i) => (
                    <Link to={`/blog/${post.id}`} key={post.id || i} className="group">
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }} 
                        transition={{ delay: i * 0.1 }}
                      >
                        <Card className="h-full flex flex-col overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-sm hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 hover:-translate-y-2">
                          
                          {/* Image */}
                          <CardHeader className="p-0 border-b border-white/5">
                            <AspectRatio ratio={16 / 10} className="overflow-hidden bg-slate-800 relative">
                              <img 
                                src={post.image || "/placeholder.svg"} 
                                alt={post.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                onError={(e) => {e.currentTarget.src = `https://placehold.co/600x400/1e293b/ffffff?text=${post.category}`}}
                              />
                              <div className="absolute top-4 left-4">
                                <Badge className="bg-slate-900/80 text-blue-300 border border-white/10 backdrop-blur-md shadow-lg hover:bg-slate-900">
                                  {post.category}
                                </Badge>
                              </div>
                            </AspectRatio>
                          </CardHeader>

                          {/* Content */}
                          <CardContent className="flex-1 p-6 pt-8">
                            <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 font-medium uppercase tracking-wider">
                              <span className="flex items-center gap-1.5">
                                <Calendar size={12} className="text-blue-500" /> {post.date}
                              </span>
                              <Separator orientation="vertical" className="h-3 bg-slate-700" />
                              <span className="flex items-center gap-1.5">
                                <Clock size={12} className="text-purple-500" /> {post.readTime}
                              </span>
                            </div>
                            
                            <CardTitle className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors leading-tight">
                              {post.title}
                            </CardTitle>
                            
                            <CardDescription className="line-clamp-3 text-sm text-slate-400 leading-relaxed">
                              {post.excerpt}
                            </CardDescription>
                          </CardContent>

                          {/* Footer / Author */}
                          <CardFooter className="p-6 pt-0 border-t border-white/5 mt-auto bg-slate-900/30">
                            <div className="flex items-center gap-3 w-full pt-4">
                              <Avatar className="w-8 h-8 border border-white/10 shadow-sm">
                                <AvatarImage src={`/avatars/${post.author.toLowerCase().replace(' ', '-')}.jpg`} />
                                <AvatarFallback className="bg-slate-800 text-blue-400 text-xs font-bold border border-white/10">
                                  {post.author.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">{post.author}</span>
                                <span className="text-[10px] text-slate-500">Author</span>
                              </div>
                              <div className="ml-auto">
                                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl bg-slate-900/20">
                    <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                      <Search className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">No articles found</h3>
                    <p className="text-slate-400 mt-2">Try adjusting your search terms.</p>
                    <Button 
                      variant="link" 
                      onClick={() => setSearchQuery('')}
                      className="mt-4 text-blue-400 hover:text-blue-300"
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ==================== 3. NEWSLETTER CTA ==================== */}
        <section className="py-24 bg-transparent border-t border-white/5">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto rounded-3xl  p-[1px] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent">
              <div className="bg-slate-900/90 backdrop-blur-xl rounded-[23px] p-8 md:p-16 text-center relative overflow-hidden">
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none -ml-16 -mb-16" />
                
                <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto border border-blue-500/20">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    Stay ahead of the curve.
                  </h2>
                  <p className="text-slate-400 text-lg max-w-xl mx-auto">
                    Get the latest insights, tutorials, and trends delivered directly to your inbox. No spam, just value.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-8">
                    <Input 
                      placeholder="Enter your email" 
                      className="bg-slate-950/50 border-white/10 text-white placeholder:text-slate-500 h-12 focus-visible:ring-blue-500 rounded-lg"
                    />
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-500 h-12 px-8 font-semibold rounded-lg shadow-lg shadow-blue-900/20">
                      Subscribe <Sparkles size={16} className="ml-2" />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-4">
                    Join 5,000+ subscribers. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default BlogPage;