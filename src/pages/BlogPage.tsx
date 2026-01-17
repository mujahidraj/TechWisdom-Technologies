import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Search, ArrowRight, User } from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- YOUR UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

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
      
      {/* ==================== 1. HERO SECTION (Short & Dark) ==================== */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-[#0f172a] text-white">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-md">
              Our Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Latest Insights & News
            </h1>
            <p className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed font-light">
              Expert articles on technology, design, and business growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== 2. SEARCH & GRID SECTION ==================== */}
      <section className="py-24 bg-slate-50 min-h-screen">
        <div className="container px-4 md:px-6">
          
          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto -mt-32 mb-20 z-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
              <div className="relative flex items-center bg-white rounded-lg shadow-xl">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <Input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="pl-12 h-14 border-none text-base focus-visible:ring-0 rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="pr-2">
                  <Button size="sm" className="bg-slate-900 text-white hover:bg-blue-600">Search</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, i) => (
                  <Link to={`/blog/${post.id}`}>
                  <motion.div 
                    key={post.id || i}
                    layout
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="group h-full flex flex-col overflow-hidden border-none shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white cursor-pointer">
                      
                      {/* Image */}
                      <CardHeader className="p-0">
                        <AspectRatio ratio={16 / 9} className="overflow-hidden bg-slate-100">
                          <img 
                            src={post.image || "/placeholder.svg"} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {e.currentTarget.src = `https://placehold.co/600x400/e2e8f0/1e293b?text=${post.category}`}}
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm shadow-sm border-0">
                              {post.category}
                            </Badge>
                          </div>
                        </AspectRatio>
                      </CardHeader>

                      {/* Content */}
                      <CardContent className="flex-1 p-6 pt-8">
                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-medium uppercase tracking-wider">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {post.date}
                          </span>
                          <Separator orientation="vertical" className="h-3 bg-slate-300" />
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {post.readTime}
                          </span>
                        </div>
                        
                        <CardTitle className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </CardTitle>
                        
                        <CardDescription className="line-clamp-3 text-base text-slate-600 leading-relaxed">
                          {post.excerpt}
                        </CardDescription>
                      </CardContent>

                      {/* Footer / Author */}
                      <CardFooter className="p-6 pt-0 border-t border-slate-50 mt-auto bg-slate-50/50">
                        <div className="flex items-center gap-3 w-full pt-4">
                          <Avatar className="w-8 h-8 border border-white shadow-sm">
                            <AvatarImage src={`/avatars/${post.author.toLowerCase().replace(' ', '-')}.jpg`} />
                            <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold">
                              {post.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-900">{post.author}</span>
                            <span className="text-[10px] text-slate-500">Author</span>
                          </div>
                          <div className="ml-auto">
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">No articles found</h3>
                  <p className="text-slate-500 mt-2">Try adjusting your search terms.</p>
                  <Button 
                    variant="link" 
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-blue-600"
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
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Decorative Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-[80px] pointer-events-none -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/30 rounded-full blur-[80px] pointer-events-none -ml-16 -mb-16" />
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Stay ahead of the curve.
              </h2>
              <p className="text-slate-300 text-lg max-w-xl mx-auto">
                Get the latest insights, tutorials, and trends delivered directly to your inbox. No spam, just value.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-8">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-white/10 border-white/10 text-white placeholder:text-slate-400 h-12 focus-visible:ring-offset-slate-900"
                />
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 h-12 px-8 font-semibold">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                Join 5,000+ subscribers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default BlogPage;