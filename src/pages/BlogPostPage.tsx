import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, ArrowLeft, Share2, ThumbsUp, ThumbsDown, 
  Copy, ChevronRight, Check, BookOpen 
} from 'lucide-react';

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

const BlogPostPage = () => {
  const { id } = useParams();
  const post = data.blog.posts.find(p => p.id === id);
  
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
    setLikes(Math.floor(Math.random() * 200) + 50); 
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
      <InteractiveBackground />
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative z-10 text-white">
        <h1 className="text-4xl font-bold mb-4">Article not found</h1>
        <p className="text-slate-400 mb-8">The blog post you are looking for doesn't exist.</p>
        <Link to="/blog">
          <Button className="bg-blue-600 hover:bg-blue-500 text-white">Back to Blog</Button>
        </Link>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <SEOHead title={`${post.title} - Blog`} description={post.excerpt} path={`/blog/${id}`} />

      {/* --- BACKGROUND INJECTION --- */}
      <InteractiveBackground />

      <div className="relative z-10 text-slate-100">

        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="container relative z-10 px-4 max-w-4xl mx-auto text-center">
            <Link to="/blog">
              <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5 mb-8 gap-2 rounded-full">
                <ArrowLeft size={16} /> Back to Blog
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 px-4 py-1 text-sm uppercase tracking-wider backdrop-blur-md">
                {post.category}
              </Badge>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 pt-6">
                 <div className="flex items-center gap-3">
                   <Avatar className="h-12 w-12 border-2 border-slate-800">
                     <AvatarImage src={`/avatars/${post.author.toLowerCase().replace(' ', '-')}.jpg`} />
                     <AvatarFallback className="bg-blue-600 text-white font-bold">
                       {post.author.charAt(0)}
                     </AvatarFallback>
                   </Avatar>
                   <div className="text-left">
                     <div className="text-sm font-semibold text-white">{post.author}</div>
                     <div className="text-xs text-slate-500">Author</div>
                   </div>
                 </div>
                 <Separator orientation="vertical" className="h-8 bg-slate-800 hidden sm:block" />
                 <div className="flex items-center gap-6 text-sm">
                   <span className="flex items-center gap-2"><Calendar size={16} className="text-blue-500" /> {post.date}</span>
                   <span className="flex items-center gap-2"><Clock size={16} className="text-purple-500" /> {post.readTime} read</span>
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
              className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-white/10 bg-slate-800/50 backdrop-blur-sm"
            >
              <AspectRatio ratio={21 / 9} className="bg-slate-900">
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
        <section className="py-20">
          <div className="container max-w-4xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_80px] gap-12">
            
            {/* Main Article Content */}
            <article className="prose prose-lg prose-invert prose-slate max-w-none text-slate-400">
              
              {/* Excerpt Section */}
              <div className="bg-slate-900/50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-10 backdrop-blur-sm border-t border-r border-b border-white/5">
                <p className="text-xl text-slate-300 font-serif italic m-0 leading-relaxed">
                  "{post.excerpt}"
                </p>
              </div>

              {/* --- DYNAMIC CONTENT --- */}
              {post.content ? (
                post.content.map((section: { heading: string; text: string }, index: number) => (
                  <div key={index} className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 mt-8 flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-blue-400 text-sm font-bold border border-white/10">
                        {index + 1}
                      </span>
                      {section.heading}
                    </h2>
                    <p className="text-lg leading-relaxed text-slate-400">
                      {section.text}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-500 italic">Full article content coming soon...</p>
              )}

              <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/20 text-white p-8 rounded-2xl my-16 shadow-lg backdrop-blur-md text-center md:text-left md:flex justify-between items-center gap-6">
                <div>
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2 justify-center md:justify-start text-blue-200">
                    <BookOpen size={20} /> Need expert help?
                  </h4>
                  <p className="text-slate-300 mb-6 md:mb-0">We can help you implement these {post.category.toLowerCase()} strategies.</p>
                </div>
                <Link to="/contact">
                  <Button variant="secondary" size="lg" className="bg-blue-600 hover:bg-blue-500 text-white border-none font-bold whitespace-nowrap shadow-lg shadow-blue-900/50">
                    Book Consultation
                  </Button>
                </Link>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">Conclusion</h2>
              <p className="text-lg leading-relaxed">
                Innovation is a continuous process. By staying informed and adaptable, you position yourself for long-term success. We hope this deep dive into <strong className="text-blue-300">{post.title}</strong> has provided actionable insights for your next project.
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
                        className={`h-12 w-12 rounded-full border-2 transition-all duration-300 backdrop-blur-md ${userVote === 'like' ? 'border-blue-500 bg-blue-500/20 text-blue-400 scale-110' : 'border-white/10 bg-slate-900/50 text-slate-400 hover:border-blue-500/50 hover:text-blue-400'}`}
                      >
                        <ThumbsUp size={20} className={userVote === 'like' ? 'fill-current' : ''} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-slate-800 text-white border-slate-700">Helpful</TooltipContent>
                  </Tooltip>
                  <span className="text-xs font-bold text-slate-500 tabular-nums">{likes}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleVote('dislike')}
                        className={`h-12 w-12 rounded-full border-2 transition-all duration-300 backdrop-blur-md ${userVote === 'dislike' ? 'border-red-500 bg-red-500/20 text-red-400 scale-110' : 'border-white/10 bg-slate-900/50 text-slate-400 hover:border-red-500/50 hover:text-red-400'}`}
                      >
                        <ThumbsDown size={20} className={userVote === 'dislike' ? 'fill-current' : ''} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-slate-800 text-white border-slate-700">Not Helpful</TooltipContent>
                  </Tooltip>
                </div>

                <Separator className="w-8 bg-white/10" />

                <div className="flex flex-col items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={handleShare} className="h-12 w-12 rounded-full border-2 border-white/10 bg-slate-900/50 text-slate-400 hover:border-white/30 hover:text-white backdrop-blur-md">
                        {isCopied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-slate-800 text-white border-slate-700">Copy Link</TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          </div>

          {/* Mobile Sticky Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-t border-white/10 p-4 lg:hidden z-40 flex justify-around items-center shadow-2xl">
             <Button variant="ghost" size="sm" onClick={() => handleVote('like')} className={userVote === 'like' ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400'}>
               <ThumbsUp size={18} className={`mr-2 ${userVote === 'like' ? 'fill-current' : ''}`} /> {likes}
             </Button>
             <Separator orientation="vertical" className="h-6 bg-white/10" />
             <Button variant="ghost" size="sm" onClick={() => handleVote('dislike')} className={userVote === 'dislike' ? 'text-red-400 bg-red-500/10' : 'text-slate-400'}>
               <ThumbsDown size={18} className={`mr-2 ${userVote === 'dislike' ? 'fill-current' : ''}`} />
             </Button>
             <Separator orientation="vertical" className="h-6 bg-white/10" />
             <Button variant="ghost" size="sm" onClick={handleShare} className="text-slate-400">
               {isCopied ? <Check size={18} className="mr-2 text-green-400" /> : <Share2 size={18} className="mr-2" />} Share
             </Button>
          </div>
        </section>

        {/* ==================== 4. READ NEXT ==================== */}
        <section className="py-24 bg-transparent border-t border-white/5">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-2xl font-bold text-white">Read Next</h3>
              <Link to="/blog">
                <Button variant="ghost" className="text-blue-400 hover:text-white hover:bg-white/5">View all posts <ChevronRight size={16} /></Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((related, i) => (
                <Link key={i} to={`/blog/${related.id}`} className="group">
                  <Card className="h-full border border-white/10 shadow-lg bg-slate-900/40 backdrop-blur-sm hover:border-blue-500/30 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 overflow-hidden">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="w-full md:w-2/5 relative h-48 md:h-auto overflow-hidden">
                        <img 
                          src={related.image} 
                          alt={related.title} 
                          className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                        />
                      </div>
                      <CardContent className="w-full md:w-3/5 p-6 flex flex-col justify-center">
                        <div className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-wide">{related.category}</div>
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">{related.title}</h4>
                        <p className="text-slate-400 text-sm line-clamp-2 mb-4">{related.excerpt}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-auto">
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

      </div>
    </Layout>
  );
};

export default BlogPostPage;