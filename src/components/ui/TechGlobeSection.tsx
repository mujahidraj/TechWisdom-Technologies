/* eslint-disable prefer-const */
import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Database, Cloud, Layout as LayoutIcon, Code, Globe, Palette, 
  FileCode, Zap, Server, Terminal, Smartphone, Layers, Rocket, GitBranch, 
  PenTool as LucidePenTool, PenTool as PenToolIcon, FileText, Film, 
  Megaphone, BarChart, Search, Target, Share2, Bot, Network, Workflow, Link as LinkIcon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// --- EXACT TECH STACK DATA (UNTOUCHED) ---
const techStack = {
  frontend: {
    label: "Frontend & UI", icon: LayoutIcon, tools: [
      { name: "React", desc: "Interactive UIs", icon: Code },
      { name: "Next.js", desc: "Production Framework", icon: Globe },
      { name: "Tailwind CSS", desc: "Rapid Styling", icon: Palette },
      { name: "TypeScript", desc: "Type Safety", icon: FileCode },
      { name: "Framer Motion", desc: "Animations", icon: Zap },
    ]
  },
  backend: {
    label: "Backend & API", icon: Server, tools: [
      { name: "Node.js", desc: "Runtime Environment", icon: Terminal },
      { name: "Nest.js", desc: "Backend Framework", icon: Code },
      { name: "PostgreSQL", desc: "Relational DB", icon: Database },
      { name: "MongoDB", desc: "Flexible DB", icon: Globe },
      { name: "GraphQL", desc: "API Query", icon: Network },
    ]
  },
  mobile: {
    label: "Mobile Apps", icon: Smartphone, tools: [
      { name: "React Native", desc: "Cross-Platform", icon: Code },
      { name: "Flutter", desc: "Native Performance", icon: Layers },
      { name: "Kotlin", desc: "Android Native", icon: Rocket },
      { name: "Swift", desc: "iOS Native", icon: Smartphone },
    ]
  },
  automation: {
    label: "AI & Automation", icon: Bot, tools: [
      { name: "OpenAI", desc: "LLM Integration", icon: Bot },
      { name: "n8n", desc: "Workflow Automation", icon: Workflow },
      { name: "Make", desc: "Visual Automation", icon: Layers },
      { name: "Python", desc: "AI & Scripting", icon: Code },
      { name: "TensorFlow", desc: "Machine Learning", icon: Network },
    ]
  },
  blockchain: {
    label: "Web3 & Blockchain", icon: LinkIcon, tools: [
      { name: "Ethereum", desc: "Smart Contracts", icon: Layers },
      { name: "Solidity", desc: "Contract Logic", icon: Code },
      { name: "Web3.js", desc: "dApp Integration", icon: Globe },
      { name: "Hardhat", desc: "Dev Environment", icon: Terminal },
    ]
  },
  devops: {
    label: "DevOps & Cloud", icon: Cloud, tools: [
      { name: "AWS", desc: "Cloud Infrastructure", icon: Cloud },
      { name: "Docker", desc: "Containerization", icon: Layers },
      { name: "Kubernetes", desc: "Orchestration", icon: GitBranch },
      { name: "Vercel", desc: "Edge Deployment", icon: Globe },
      { name: "GitHub Actions", desc: "CI/CD Pipelines", icon: Terminal },
    ]
  },
  marketing: {
    label: "Digital Marketing", icon: Megaphone, tools: [
      { name: "Google Analytics", desc: "Data & Insights", icon: BarChart },
      { name: "SEO", desc: "Search Optimization", icon: Search },
      { name: "Google Ads", desc: "PPC Campaigns", icon: Target },
      { name: "Meta Ads", desc: "Social Advertising", icon: Share2 },
    ]
  },
  design: {
    label: "Graphics & Design", icon: LucidePenTool, tools: [
      { name: "Figma", desc: "UI/UX Design", icon: PenToolIcon },
      { name: "Adobe Photoshop", desc: "Image Editing", icon: FileText },
      { name: "Adobe Illustrator", desc: "Vector Graphics", icon: PenToolIcon },
      { name: "Canva", desc: "Rapid Design", icon: Palette },
      { name: "Capcut", desc: "Motion Graphics", icon: Film },
    ]
  }
};

// --- MAPPED GLOBE ICONS (UNTOUCHED) ---
const TECH_ICONS = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg",
  "https://cdn.simpleicons.org/openai/white",
  "https://cdn.simpleicons.org/n8n/FF6666",
  "https://cdn.simpleicons.org/make/white",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
  "https://cdn.simpleicons.org/ethereum/3C3C3D",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/solidity/solidity-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/web3js/web3js-original.svg",
  "https://cdn.simpleicons.org/googleanalytics/E37400",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/meta/meta-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg"
];

// --- ULTRA-LIGHTWEIGHT 3D GLOBE ENGINE (NOW WITH CONNECTIONS) ---
const TechGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]); // ADDED: Refs for SVG lines
  const requestRef = useRef<number>();
  
  const rotationParams = useRef({
    angleX: 0,
    angleY: 0,
    targetRx: 0.0025, 
    targetRy: 0.0025,
    currentRx: 0.0025,
    currentRy: 0.0025,
  });

  // Calculate points AND their closest connections
  const { points, connections } = useMemo(() => {
    const N = TECH_ICONS.length;
    const pts = TECH_ICONS.map((icon, i) => {
      const phi = Math.acos(-1 + (2 * i) / N);
      const theta = Math.sqrt(N * Math.PI) * phi;
      return {
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
        icon,
      };
    });

    // Determine nearest neighbors to draw connecting lines
    const edges: { source: number, target: number }[] = [];
    const seen = new Set();

    pts.forEach((p1, i) => {
      let distances: {index: number, dist: number}[] = [];
      pts.forEach((p2, j) => {
        if (i !== j) {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          distances.push({ index: j, dist: dx*dx + dy*dy + dz*dz });
        }
      });
      distances.sort((a, b) => a.dist - b.dist);
      // Connect each node to its 2 closest neighbors
      for (let k = 0; k < 2; k++) {
        const target = distances[k].index;
        const min = Math.min(i, target);
        const max = Math.max(i, target);
        const key = `${min}-${max}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push({ source: min, target: max });
        }
      }
    });

    return { points: pts, connections: edges };
  }, []);

  useEffect(() => {
    const radius = window.innerWidth < 768 ? 120 : 190; 
    
    const updatePosition = () => {
      const state = rotationParams.current;
      
      state.currentRx += (state.targetRx - state.currentRx) * 0.1;
      state.currentRy += (state.targetRy - state.currentRy) * 0.1;
      
      state.angleX += state.currentRx;
      state.angleY += state.currentRy;

      const sinX = Math.sin(state.angleX);
      const cosX = Math.cos(state.angleX);
      const sinY = Math.sin(state.angleY);
      const cosY = Math.cos(state.angleY);

      // Pre-calculate 2D projections for both icons and lines
      const projected = points.map((p) => {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        return { x: x1 * radius, y: y2 * radius, z: z2 };
      });

      // Update icon positions
      iconRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = projected[i];
        const scale = (p.z + 1.8) / 2.8; 
        const opacity = (p.z + 1.5) / 2.5; 
        const zIndex = Math.round(p.z * 100); 

        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${scale})`;
        el.style.opacity = Math.max(0.1, opacity).toString();
        el.style.zIndex = zIndex.toString();
        el.style.filter = p.z < -0.2 ? `blur(${Math.abs(p.z) * 2}px)` : 'blur(0px)';
      });

      // Update connecting lines
      lineRefs.current.forEach((line, i) => {
        if (!line) return;
        const edge = connections[i];
        const p1 = projected[edge.source];
        const p2 = projected[edge.target];

        line.setAttribute('x1', p1.x.toString());
        line.setAttribute('y1', p1.y.toString());
        line.setAttribute('x2', p2.x.toString());
        line.setAttribute('y2', p2.y.toString());

        // Fade out lines that rotate to the back of the globe
        const avgZ = (p1.z + p2.z) / 2;
        const opacity = (avgZ + 1.5) / 4; // Make lines slightly more transparent than icons
        line.style.opacity = Math.max(0.05, opacity).toString();
      });

      requestRef.current = requestAnimationFrame(updatePosition);
    };

    requestRef.current = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [points, connections]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    rotationParams.current.targetRy = x * 0.00004;
    rotationParams.current.targetRx = y * 0.00004;
  };

  const handleMouseLeave = () => {
    rotationParams.current.targetRx = 0.0025;
    rotationParams.current.targetRy = 0.0025;
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[500px] h-[300px] md:h-[450px] py-3 flex items-center justify-center cursor-grab active:cursor-grabbing mx-auto"
    >
      {/* SVG Container for the connection lines */}
      <svg className="absolute top-1/2 left-1/2 w-0 h-0 overflow-visible pointer-events-none z-0">
        {connections.map((_, i) => (
          <line 
            key={i} 
            ref={el => (lineRefs.current[i] = el)}
            stroke="rgba(59, 130, 246, 0.4)" // Futuristic blue glow color
            strokeWidth="1.5"
          />
        ))}
      </svg>

      {/* Existing Tech Icons */}
      {points.map((item, i) => (
        <div
          key={i}
          ref={(el) => (iconRefs.current[i] = el)}
          className="absolute left-1/2 top-1/2 -ml-5 -mt-5 md:-ml-6 md:-mt-6 transition-all duration-75 ease-out will-change-transform z-10"
        >
          <div className="relative group w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-slate-900/60 backdrop-blur-md rounded-full border border-white/10 hover:border-blue-400 hover:bg-slate-800 transition-all duration-300 hover:scale-125 hover:z-50 shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]">
            <img 
              src={item.icon} 
              alt="tech-icon" 
              className="w-5 h-5 md:w-6 md:h-6 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all duration-300"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// --- MAIN COMBINED SECTION (UNTOUCHED) ---
const TechStackSection = () => {
  return (
    <section className="py-16 md:py-24 bg-transparent overflow-hidden relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-12 gap-6 md:gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <Badge variant="outline" className="text-purple-400 border-purple-400/30 bg-purple-500/10 px-3 py-1 mb-4">
              Technical Excellence
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-3 md:mb-4 text-white">
              Our Technology Stack
            </h2>
            <p className="text-slate-400 text-base md:text-lg">
              We leverage the most advanced and reliable frameworks to ensure your product is future-proof, scalable, and secure.
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <Cpu className="w-12 h-12 text-slate-700 opacity-50 animate-pulse" />
            <Database className="w-12 h-12 text-slate-700 opacity-50" />
            <Cloud className="w-12 h-12 text-slate-700 opacity-50" />
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="w-full lg:col-span-5 flex items-center justify-center relative order-1 lg:order-2">
            <div className="absolute bottom-[10%] md:bottom-[15%] left-1/2 -translate-x-1/2 w-[60%] md:w-[70%] h-6 md:h-8 bg-blue-500/10 blur-[20px] md:blur-[30px] rounded-[100%] pointer-events-none" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full relative z-20 flex justify-center"
            >
              <TechGlobe />
            </motion.div>
          </div>

          <div className="w-full lg:col-span-7 order-2 lg:order-1">
            <Tabs defaultValue="frontend" className="w-full">
              
              <div className="w-full overflow-x-auto mb-6 pb-2 -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <TabsList className="flex flex-nowrap md:flex-wrap gap-2 bg-transparent border-none p-0 h-auto justify-start w-max md:w-full [&::-webkit-scrollbar]:hidden">
                  {Object.entries(techStack).map(([key, data]) => {
                    const Icon = data.icon;
                    return (
                      <TabsTrigger
                        key={key}
                        value={key}
                        className="rounded-full px-4 py-2 bg-slate-900/40 border border-white/5 text-slate-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-slate-800 transition-all duration-300 shadow-sm whitespace-nowrap text-xs md:text-sm shrink-0"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Icon className="w-3.5 h-3.5" />
                          <span className="font-medium tracking-wide">{data.label}</span>
                        </div>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              <AnimatePresence mode="wait">
                {Object.entries(techStack).map(([key, data]) => (
                  <TabsContent key={key} value={key} className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4"
                    >
                      {data.tools.map((tool, idx) => {
                        const ToolIcon = tool.icon;
                        return (
                          <Card 
                            key={idx} 
                            className="group bg-slate-900/40 border border-white/5 hover:border-blue-500/40 hover:bg-slate-800/60 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-1"
                          >
                            <CardContent className="p-3 md:p-4 flex flex-col items-center text-center gap-2">
                              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-950/50 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors border border-white/5 shadow-inner">
                                <ToolIcon className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" />
                              </div>
                              <div className="space-y-0.5">
                                <h4 className="font-semibold text-white text-xs md:text-sm line-clamp-1">{tool.name}</h4>
                                <p className="text-[9px] md:text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors duration-300 line-clamp-1">
                                  {tool.desc}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </Tabs>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechStackSection;