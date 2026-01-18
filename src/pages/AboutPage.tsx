import { motion } from 'framer-motion';
import { Target, Compass, Flag, ImageIcon, ArrowDown, Calendar } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';
import logo from "../assets/techwisdom.png"

// --- UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const AboutPage = () => {
  const { about, team, timeline, gallery } = data;

  return (
    <Layout>
      <SEOHead title="About Us - Mission & Vision" description={about.mission.content} path="/about" />
      
      {/* ==================== 1. HERO SECTION (Dark) ==================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0f172a] text-white">
        {/* Ambient Background */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 text-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-sm">
              Our Story
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{data.site.name}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              We are dedicated to redefining the digital experience by merging technical excellence with human-centric strategy.
            </p>

            <div className="pt-8 flex justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8">
                View Our Work
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 bg-blue-600 hover:bg-blue-500 rounded-full px-8">
                Contact Us
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce"
          >
            <ArrowDown size={28} />
          </motion.div>
        </div>
      </section>

      {/* ==================== 2. CORE VALUES (Light) ==================== */}
      <section className="py-24 bg-slate-50 relative z-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Driven by Purpose</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Our core values define who we are and how we work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-blue-500">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Compass size={24} />
                  </div>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{about.mission.content}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-purple-500">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Target size={24} />
                  </div>
                  <CardTitle>{about.vision?.title || "Our Vision"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{about.vision?.content || "Defining the future of digital excellence."}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Goals */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-emerald-500">
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                    <Flag size={24} />
                  </div>
                  <CardTitle>Strategic Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {about.goals?.map((goal, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-emerald-500 font-bold">✓</span> {goal}
                      </li>
                    )) || <li>Add goals to data.json</li>}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Separator className="bg-slate-200" />

      {/* ==================== 3. HISTORY TIMELINE (Vertical Line Added) ==================== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center mb-20 text-center space-y-4">
            <Badge variant="secondary" className="px-4 py-1">Our Journey</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Defining Moments</h2>
            <p className="text-muted-foreground max-w-2xl">
              From our humble beginnings to industry leadership.
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            {/* --- CENTRAL VERTICAL LINE --- */}
            {/* Added w-0.5 and bg-slate-200 to make it visible */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 md:-translate-x-1/2"></div>

            <div className="space-y-16">
              {timeline.map((item, i) => {
                const isEven = i % 2 === 0;
                
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Content Side */}
                    <div className="flex-1 w-full pl-16 md:pl-0">
                      <Card className={`relative group border-l-4 ${isEven ? 'md:text-left border-l-blue-500' : 'md:text-right border-l-purple-500 md:border-l-0 md:border-r-4 md:border-r-purple-500'}`}>
                        <CardHeader className="pb-2">
                           <div className={`flex items-center gap-2 mb-1 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <Badge variant="secondary" className="font-mono text-base">{item.year}</Badge>
                           </div>
                           <CardTitle className="text-xl">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                        </CardContent>

                        {/* --- HORIZONTAL CONNECTOR LINE (Added) --- */}
                        {/* Connects the card to the central vertical line */}
                        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5 w-8 bg-slate-200 
                            ${isEven ? '-right-8' : '-left-8'}
                            group-hover:bg-blue-200 transition-colors
                        `}></div>
                      </Card>
                    </div>

                    {/* Center Pivot Point */}
                    <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 w-8 h-8 rounded-full bg-background border-4 border-slate-200 z-10 flex items-center justify-center shadow-sm">
                        <div className={`w-2.5 h-2.5 rounded-full ${isEven ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                    </div>

                    {/* Empty Side (Desktop) */}
                    <div className="flex-1 hidden md:block"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4. TEAM SECTION ==================== */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center mb-16 text-center space-y-2">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet the Team</h2>
             <p className="text-muted-foreground">The innovators behind the magic.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} 
              >
                <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="h-32 bg-gradient-to-r  from-blue-600 to-purple-600">
                    <img src={logo} className="h-28 mx-auto" alt="TechWisdom Technologies" />
                   
                  </div>
                  <CardContent className="pt-0 relative px-6 pb-6">
                    <div className="-mt-12 mb-4 flex justify-center">
                       <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback className="bg-slate-200 text-2xl font-bold text-slate-600">
                             {member.name.charAt(0)}
                          </AvatarFallback>
                       </Avatar>
                    </div>
                    
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <Badge variant="secondary" className="mb-2">{member.role}</Badge>
                      <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* ==================== 5. GALLERY SECTION ==================== */}
       <section className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
             <h2 className="text-3xl font-bold tracking-tighter">Life at {data.site.name}</h2>
             <Button variant="ghost" className="gap-2 text-muted-foreground">
                <ImageIcon size={18} /> View All
             </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery && gallery.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl overflow-hidden shadow-sm ${
                  (i === 0 || i === 3) ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <AspectRatio ratio={16 / 9} className="h-full">
                   <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => {e.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'}}
                   />
                </AspectRatio>
              </motion.div>
            ))}
            {!gallery && <div className="col-span-full text-center p-10 text-muted-foreground border border-dashed rounded-lg">No gallery images found in data.json</div>}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;