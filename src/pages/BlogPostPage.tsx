import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, ArrowLeft, Share2, ThumbsUp, ThumbsDown, 
  Copy, ChevronRight, Check, Linkedin, Twitter, Facebook, BookOpen 
} from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- YOUR UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BlogPostPage = () => {
  const { id } = useParams();
  // Find the exact post by ID
  const post = data.blog.posts.find(p => p.id === id);
  
  // Suggest 2 random other posts
  const relatedPosts = data.blog.posts
    .filter(p => p.id !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  // --- VOTING STATE ---
  const [likes, setLikes] = useState(42); 
  const [dislikes, setDislikes] = useState(2);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setUserVote(null); 
    setLikes(Math.floor(Math.random() * 200) + 50); // Random likes for demo
  }, [id]);

  const handleVote = (type: 'like' | 'dislike') => {
    if (userVote === type) {
      setUserVote(null); 
      if (type === 'like') setLikes(prev => prev - 1);
      else setDislikes(prev => prev - 1);
    } else {
      if (userVote === 'like') setLikes(prev => prev - 1);
      if (userVote === 'dislike') setDislikes(prev => prev - 1);
      setUserVote(type);
      if (type === 'like') setLikes(prev => prev + 1);
      else setDislikes(prev => prev + 1);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // --- 404 STATE ---
  if (!post) return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Article not found</h1>
        <p className="text-slate-500 mb-8">The blog post you are looking for doesn't exist.</p>
        <Link to="/blog">
          <Button variant="default" className="bg-slate-900 text-white">Back to Blog</Button>
        </Link>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <SEOHead title={`${post.title} - Blog`} description={post.excerpt} path={`/blog/${id}`} />

      {/* ==================== 1. HERO SECTION (Dark) ==================== */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-[#0f172a] text-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 px-4 max-w-4xl mx-auto text-center">
          <Link to="/blog">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10 mb-8 gap-2 rounded-full">
              <ArrowLeft size={16} /> Back to Blog
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Badge variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700 border-none px-4 py-1 text-sm uppercase tracking-wider">
              {post.category}
            </Badge>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 pt-6">
               <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-slate-700">
                    <AvatarImage src={`/avatars/${post.author.toLowerCase().replace(' ', '-')}.jpg`} />
                    <AvatarFallback className="bg-blue-600 text-white font-bold">
                      {post.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">{post.author}</div>
                    <div className="text-xs text-slate-400">Author</div>
                  </div>
               </div>
               <Separator orientation="vertical" className="h-8 bg-slate-700 hidden sm:block" />
               <div className="flex items-center gap-6 text-sm">
                 <span className="flex items-center gap-2"><Calendar size={16} className="text-blue-400" /> {post.date}</span>
                 <span className="flex items-center gap-2"><Clock size={16} className="text-blue-400" /> {post.readTime} read</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== 2. FEATURED IMAGE ==================== */}
      <section className="relative z-20 -mt-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white"
          >
            <AspectRatio ratio={21 / 9} className="bg-slate-100">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </motion.div>
        </div>
      </section>

      {/* ==================== 3. CONTENT & SIDEBAR ==================== */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_80px] gap-12">
          
          {/* Main Article Content */}
          <article className="prose prose-lg prose-slate max-w-none text-slate-600">
            
            {/* Excerpt Section */}
            <div className="bg-slate-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-10">
              <p className="text-xl text-slate-700 font-serif italic m-0 leading-relaxed">
                "{post.excerpt}"
              </p>
            </div>

            {/* --- DYNAMIC CONTENT FROM DATA.JSON --- */}
            {post.content ? (
              post.content.map((section: { heading: string; text: string }, index: number) => (
                <div key={index} className="mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 mt-8 flex items-center gap-3">
                    {/* Numbered Headers */}
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm font-bold">
                      {index + 1}
                    </span>
                    {section.heading}
                  </h2>
                  <p className="text-lg leading-relaxed text-slate-600">
                    {section.text}
                  </p>
                </div>
              ))
            ) : (
              // Fallback if no content exists
              <p className="text-center text-slate-400 italic">Full article content coming soon...</p>
            )}

            <div className="bg-blue-600 text-white p-8 rounded-2xl my-16 shadow-xl text-center md:text-left md:flex justify-between items-center gap-6">
              <div>
                <h4 className="font-bold text-xl mb-2 flex items-center gap-2 justify-center md:justify-start">
                  <BookOpen size={20} /> Need expert help?
                </h4>
                <p className="text-blue-100 mb-6 md:mb-0">We can help you implement these {post.category.toLowerCase()} strategies.</p>
              </div>
              <Link to="/contact">
                <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50 border-none font-bold whitespace-nowrap">
                  Book Consultation
                </Button>
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed">
              Innovation is a continuous process. By staying informed and adaptable, you position yourself for long-term success. We hope this deep dive into <strong>{post.title}</strong> has provided actionable insights for your next project.
            </p>
          </article>

          {/* Sticky Sidebar (Desktop) */}
          <div className="hidden lg:flex flex-col gap-6 sticky top-32 h-fit items-center">
            <TooltipProvider delayDuration={0}>
              <div className="flex flex-col items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleVote('like')}
                      className={`h-12 w-12 rounded-full border-2 transition-all duration-300 ${userVote === 'like' ? 'border-blue-500 bg-blue-50 text-blue-600 scale-110' : 'border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-500'}`}
                    >
                      <ThumbsUp size={20} className={userVote === 'like' ? 'fill-current' : ''} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Helpful</TooltipContent>
                </Tooltip>
                <span className="text-xs font-bold text-slate-400 tabular-nums">{likes}</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleVote('dislike')}
                      className={`h-12 w-12 rounded-full border-2 transition-all duration-300 ${userVote === 'dislike' ? 'border-red-500 bg-red-50 text-red-600 scale-110' : 'border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-500'}`}
                    >
                      <ThumbsDown size={20} className={userVote === 'dislike' ? 'fill-current' : ''} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Not Helpful</TooltipContent>
                </Tooltip>
              </div>

              <Separator className="w-8 bg-slate-200" />

              <div className="flex flex-col items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleShare} className="h-12 w-12 rounded-full border-2 border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900">
                      {isCopied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Copy Link</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>

        {/* Mobile Sticky Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 lg:hidden z-40 flex justify-around items-center shadow-lg">
           <Button variant="ghost" size="sm" onClick={() => handleVote('like')} className={userVote === 'like' ? 'text-blue-600 bg-blue-50' : 'text-slate-600'}>
              <ThumbsUp size={18} className={`mr-2 ${userVote === 'like' ? 'fill-current' : ''}`} /> {likes}
           </Button>
           <Separator orientation="vertical" className="h-6" />
           <Button variant="ghost" size="sm" onClick={() => handleVote('dislike')} className={userVote === 'dislike' ? 'text-red-600 bg-red-50' : 'text-slate-600'}>
              <ThumbsDown size={18} className={`mr-2 ${userVote === 'dislike' ? 'fill-current' : ''}`} />
           </Button>
           <Separator orientation="vertical" className="h-6" />
           <Button variant="ghost" size="sm" onClick={handleShare} className="text-slate-600">
              {isCopied ? <Check size={18} className="mr-2 text-green-600" /> : <Share2 size={18} className="mr-2" />} Share
           </Button>
        </div>
      </section>

      {/* ==================== 4. READ NEXT ==================== */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900">Read Next</h3>
            <Link to="/blog">
              <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">View all posts <ChevronRight size={16} /></Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((related, i) => (
              <Link key={i} to={`/blog/${related.id}`} className="group">
                <Card className="h-full border-none shadow-sm group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-2/5 relative h-48 md:h-auto">
                      <img 
                        src={related.image} 
                        alt={related.title} 
                        className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="w-full md:w-3/5 p-6 flex flex-col justify-center">
                      <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">{related.category}</div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{related.title}</h4>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4">{related.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-auto">
                        <span>{related.date}</span>
                        <span>•</span>
                        <span>{related.readTime} read</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default BlogPostPage;