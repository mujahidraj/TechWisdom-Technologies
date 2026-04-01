import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight, Clock, Sparkles, CalendarDays, Clock3, BellRing, Globe2, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser'; 

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';

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

const ContactPage = () => {
  const { contact, site } = data;
  const location = useLocation();
  const walkthroughSlots = [
    { id: 'slot-1', label: '10:00 AM - 10:45 AM', start: '10:00' },
    { id: 'slot-2', label: '11:30 AM - 12:15 PM', start: '11:30' },
    { id: 'slot-3', label: '2:00 PM - 2:45 PM', start: '14:00' },
    { id: 'slot-4', label: '4:00 PM - 4:45 PM', start: '16:00' },
    { id: 'slot-5', label: '8:00 PM - 8:45 PM', start: '20:00' },
  ];
  const reminderOptions = [
    { id: '15m', label: '15 minutes before' },
    { id: '1h', label: '1 hour before' },
    { id: '24h', label: '24 hours before' },
  ];
  
  // State for form data
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    budget: '', 
    service: '', 
    message: '' 
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [walkthroughDate, setWalkthroughDate] = useState<Date | undefined>(undefined);
  const [walkthroughSlotId, setWalkthroughSlotId] = useState('');
  const [walkthroughName, setWalkthroughName] = useState('');
  const [walkthroughEmail, setWalkthroughEmail] = useState('');
  const [walkthroughCompany, setWalkthroughCompany] = useState('');
  const [walkthroughReminder, setWalkthroughReminder] = useState('24h');
  const [walkthroughReminderChannel, setWalkthroughReminderChannel] = useState('Email');
  const [userTimezone, setUserTimezone] = useState('Asia/Dhaka');
  const [bookingError, setBookingError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<{
    name: string;
    email: string;
    company: string;
    date: Date;
    slotLabel: string;
    slotStart: string;
    timezone: string;
    reminder: string;
    reminderChannel: string;
  } | null>(null);

  useEffect(() => {
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (detectedTimezone) {
      setUserTimezone(detectedTimezone);
    }
  }, []);

  useEffect(() => {
    if (location.hash === '#live-walkthrough') {
      setTimeout(() => {
        const section = document.getElementById('live-walkthrough');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    }
  }, [location.hash]);

  useEffect(() => {
    const state = location.state as
      | {
          estimatorPrefill?: {
            source?: string;
            projectType?: string;
            timeline?: string;
            scope?: string[];
            estimateTotal?: number;
            milestones?: {
              kickoff?: number;
              midpoint?: number;
              launch?: number;
            };
          };
        }
      | null;

    const prefill = state?.estimatorPrefill;

    if (!prefill || (prefill.source !== 'demo-projects-estimator' && prefill.source !== 'home-estimator')) {
      return;
    }

    const formatBDT = (amount: number) =>
      new Intl.NumberFormat('en-BD', {
        style: 'currency',
        currency: 'BDT',
        maximumFractionDigits: 0,
      })
        .format(amount)
        .replace('BDT', '৳')
        .trim();

    const pickBudgetBucket = (amount: number | undefined) => {
      if (!amount) return '';
      if (amount < 5000) return 'Under BDT5,000';
      if (amount < 15000) return 'BDT5,000 - BDT15,000';
      if (amount < 25000) return 'BDT15,000 - BDT25,000';
      if (amount < 40000) return 'BDT25,000 - BDT40,000';
      if (amount < 50000) return 'BDT40,000 - BDT50,000';
      return 'BDT50,000+';
    };

    const service = prefill.projectType?.toLowerCase().includes('commerce') ? 'E-Commerce' : 'Web Development';
    const budget = pickBudgetBucket(prefill.estimateTotal);
    const scopeText = prefill.scope?.length ? prefill.scope.join(', ') : 'Not selected';

    const sourceLabel = prefill.source === 'home-estimator' ? 'Home Page' : 'Demo Projects';

    const messageLines = [
      `Estimator Request (Auto-filled from ${sourceLabel}):`,
      `Project Type: ${prefill.projectType ?? 'N/A'}`,
      `Timeline: ${prefill.timeline ?? 'N/A'}`,
      `Feature Scope: ${scopeText}`,
      `Estimated Total: ${prefill.estimateTotal ? formatBDT(prefill.estimateTotal) : 'N/A'}`,
      '',
      'Please contact me with a detailed proposal, timeline breakdown, and technical implementation plan.',
    ];

    const hasMilestones = Boolean(
      prefill.milestones?.kickoff || prefill.milestones?.midpoint || prefill.milestones?.launch,
    );

    if (hasMilestones) {
      messageLines.splice(
        5,
        0,
        'Preferred Payment Milestones:',
        `- Kickoff: ${prefill.milestones?.kickoff ? formatBDT(prefill.milestones.kickoff) : 'N/A'}`,
        `- Midpoint: ${prefill.milestones?.midpoint ? formatBDT(prefill.milestones.midpoint) : 'N/A'}`,
        `- Launch: ${prefill.milestones?.launch ? formatBDT(prefill.milestones.launch) : 'N/A'}`,
        '',
      );
    }

    const message = messageLines.join('\n');

    setFormData((previous) => ({
      ...previous,
      service,
      budget,
      message,
    }));
  }, [location.state]);

  const formatDateReadable = (date: Date) => {
    return date.toLocaleDateString('en-BD', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const buildICSContent = () => {
    if (!confirmedBooking) {
      return '';
    }

    const start = new Date(confirmedBooking.date);
    const [hour, minute] = confirmedBooking.slotStart.split(':').map(Number);
    start.setHours(hour, minute, 0, 0);
    const end = new Date(start.getTime() + 45 * 60 * 1000);

    const toICSDate = (date: Date) => {
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
    };

    const triggerMap: Record<string, string> = {
      '15m': '-PT15M',
      '1h': '-PT1H',
      '24h': '-PT24H',
    };

    const alarmTrigger = triggerMap[confirmedBooking.reminder] || '-PT24H';
    const uid = `techwisdom-walkthrough-${start.getTime()}@techwisdom.local`;

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TechWisdom//Live Walkthrough//EN',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${toICSDate(new Date())}`,
      `DTSTART:${toICSDate(start)}`,
      `DTEND:${toICSDate(end)}`,
      'SUMMARY:TechWisdom Live Demo Walkthrough',
      `DESCRIPTION:Live walkthrough session for ${confirmedBooking.name} (${confirmedBooking.company || 'N/A'})\\nTimezone: ${confirmedBooking.timezone}`,
      'LOCATION:Google Meet (shared after confirmation)',
      'BEGIN:VALARM',
      `TRIGGER:${alarmTrigger}`,
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder - TechWisdom walkthrough starts soon',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
  };

  const downloadInvite = () => {
    const ics = buildICSContent();
    if (!ics) {
      return;
    }
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'techwisdom-live-walkthrough.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const handleBookWalkthrough = (event: React.FormEvent) => {
    event.preventDefault();
    setBookingError('');

    if (!walkthroughDate || !walkthroughSlotId || !walkthroughName.trim() || !walkthroughEmail.trim()) {
      setBookingError('Please select date and time, and complete your name and email.');
      return;
    }

    const selectedSlot = walkthroughSlots.find((slot) => slot.id === walkthroughSlotId);
    if (!selectedSlot) {
      setBookingError('Please choose a valid walkthrough slot.');
      return;
    }

    setConfirmedBooking({
      name: walkthroughName.trim(),
      email: walkthroughEmail.trim(),
      company: walkthroughCompany.trim(),
      date: walkthroughDate,
      slotLabel: selectedSlot.label,
      slotStart: selectedSlot.start,
      timezone: userTimezone,
      reminder: walkthroughReminder,
      reminderChannel: walkthroughReminderChannel,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      to_name: 'Mujahid Raj',
      from_name: formData.name,
      from_email: formData.email,
      service_type: formData.service,
      budget_range: formData.budget,
      message: formData.message,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      alert('Message sent successfully! We will get back to you soon.'); 
      setFormData({ name: '', email: '', budget: '', service: '', message: '' }); 
    } catch (error) {
      console.error('Email Error:', error);
      alert('Failed to send message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEOHead title="Contact Us - Let's Talk" description={contact.subheadline} path="/contact" />
      
      {/* --- BACKGROUND INJECTION --- */}
      <InteractiveBackground />

      <div className="relative z-10 text-slate-100">

        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="relative py-24 md:py-32 overflow-hidden min-h-[50vh] flex items-center justify-center">
          <div className="container relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-md bg-slate-900/30">
                Get in Touch
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
                {contact.headline}
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                {contact.subheadline}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ==================== 2. FORM & INFO SECTION ==================== */}
        <section className="py-24 bg-transparent relative z-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* --- LEFT: Contact Info Cards --- */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6 lg:col-span-1"
              >
                {/* Info Card */}
                <Card className="bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-xl overflow-hidden h-full">
                  <CardHeader className="bg-slate-900/50 border-b border-white/5 pb-4">
                    <CardTitle className="text-lg font-bold text-white">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Email */}
                    <div className="flex items-start gap-4 group">
                      <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-400 mb-1">Email Us</p>
                        <a href={`mailto:${site.email}`} className="text-white font-semibold hover:text-blue-400 transition-colors break-all">
                          {site.email}
                        </a>
                      </div>
                    </div>
                    
                    <Separator className="bg-white/10" />

                    {/* Phone */}
                    <div className="flex items-start gap-4 group">
                      <div className="p-3 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg group-hover:bg-purple-500 group-hover:text-white transition-colors">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-400 mb-1">Call Us</p>
                        <a href={`tel:${site.phone}`} className="text-white font-semibold hover:text-purple-400 transition-colors">
                          {site.phone}
                        </a>
                      </div>
                    </div>

                    <Separator className="bg-white/10" />

                    {/* Address */}
                    <div className="flex items-start gap-4 group">
                      <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-400 mb-1">Visit Us</p>
                        <p className="text-white font-medium leading-relaxed text-sm">
                          {site.address}
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-white/10" />

                    {/* Hours */}
                    <div className="flex items-start gap-4 group">
                      <div className="p-3 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-400 mb-1">Business Hours</p>
                        <div className="space-y-1 text-sm text-slate-300">
                          <p>Saturday: 9am - 6pm</p>
                          <p>Sunday: 9am - 6pm</p>
                          <p>Monday: 9am - 6pm</p>
                          <p>Tuesday: 9am - 6pm</p>
                          <p>Wednesday: 9am - 6pm</p>
                          <p>Thursday: 9am - 3pm</p>
                          <p className="text-slate-500">Friday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* --- RIGHT: Contact Form --- */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2"
              >
                <Card className="bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden h-full">
                  <CardHeader className="px-8 pt-8 pb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                        <MessageSquare size={24} />
                      </div>
                      <CardTitle className="text-2xl font-bold text-white">Send us a Message</CardTitle>
                    </div>
                    <CardDescription className="text-base ml-11 text-slate-400">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                          <Input 
                            id="name" 
                            placeholder={contact.form.namePlaceholder} 
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            required
                            className="bg-slate-950/50 border-white/10 text-white placeholder:text-slate-600 focus:ring-blue-500 focus:border-blue-500 transition-colors h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder={contact.form.emailPlaceholder} 
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            required
                            className="bg-slate-950/50 border-white/10 text-white placeholder:text-slate-600 focus:ring-blue-500 focus:border-blue-500 transition-colors h-12"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="service" className="text-slate-300">{contact.form.serviceLabel}</Label>
                          <Select value={formData.service} onValueChange={(val) => setFormData({...formData, service: val})}>
                            <SelectTrigger className="bg-slate-950/50 border-white/10 text-white h-12">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-white/10 text-white">
                              {contact.form.serviceOptions.map((opt) => (
                                <SelectItem key={opt} value={opt} className="focus:bg-slate-800 focus:text-white cursor-pointer">{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget" className="text-slate-300">{contact.form.budgetLabel}</Label>
                          <Select value={formData.budget} onValueChange={(val) => setFormData({...formData, budget: val})}>
                            <SelectTrigger className="bg-slate-950/50 border-white/10 text-white h-12">
                              <SelectValue placeholder="Select your budget" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-white/10 text-white">
                              {contact.form.budgetOptions.map((opt) => (
                                <SelectItem key={opt} value={opt} className="focus:bg-slate-800 focus:text-white cursor-pointer">{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-slate-300">Project Details</Label>
                        <Textarea 
                          id="message" 
                          placeholder={contact.form.messagePlaceholder} 
                          value={formData.message}
                          onChange={e => setFormData({...formData, message: e.target.value})}
                          required
                          className="min-h-[150px] bg-slate-950/50 border-white/10 text-white placeholder:text-slate-600 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-base"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : (
                          <span className="flex items-center gap-2">
                            {contact.form.submitButton} <Send size={18} />
                          </span>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ==================== 3. LIVE WALKTHROUGH BOOKING ==================== */}
        <section id="live-walkthrough" className="py-20 bg-transparent border-t border-white/10 relative z-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="mb-8 text-center">
              <Badge variant="outline" className="mb-4 border-blue-500/30 bg-blue-500/10 text-blue-400">Live Session</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Book a Live Walkthrough</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">Pick your preferred date/time with timezone detection and reminder preferences.</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-md overflow-hidden">
              <div className="px-6 md:px-8 py-6 border-b border-white/10 bg-slate-950/40 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-slate-300">Session format: 45-minute Google Meet walkthrough</p>
                <div className="inline-flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 border border-white/10 rounded-full px-3 py-1.5">
                  <Globe2 size={14} className="text-blue-300" /> Timezone: {userTimezone}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-2 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-white/10">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <CalendarDays size={18} className="text-blue-300" /> Pick a date
                  </h4>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                    <Calendar
                      mode="single"
                      selected={walkthroughDate}
                      onSelect={setWalkthroughDate}
                      disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
                      className="text-slate-100"
                    />
                  </div>

                  <h4 className="text-white font-semibold mt-6 mb-3 flex items-center gap-2">
                    <Clock3 size={18} className="text-blue-300" /> Available slots
                  </h4>
                  <div className="space-y-2">
                    {walkthroughSlots.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setWalkthroughSlotId(slot.id)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-colors ${
                          walkthroughSlotId === slot.id
                            ? 'border-blue-500 bg-blue-500/15 text-white'
                            : 'border-white/10 bg-slate-900/40 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-3 p-6 md:p-8">
                  {!confirmedBooking ? (
                    <form onSubmit={handleBookWalkthrough} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-300 mb-2">Your name</label>
                          <input
                            value={walkthroughName}
                            onChange={(event) => setWalkthroughName(event.target.value)}
                            type="text"
                            placeholder="Mujahid Raj"
                            className="w-full h-11 px-3 rounded-xl border border-white/10 bg-slate-950/40 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-300 mb-2">Email</label>
                          <input
                            value={walkthroughEmail}
                            onChange={(event) => setWalkthroughEmail(event.target.value)}
                            type="email"
                            placeholder="you@company.com"
                            className="w-full h-11 px-3 rounded-xl border border-white/10 bg-slate-950/40 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Company (optional)</label>
                        <input
                          value={walkthroughCompany}
                          onChange={(event) => setWalkthroughCompany(event.target.value)}
                          type="text"
                          placeholder="TechWisdom"
                          className="w-full h-11 px-3 rounded-xl border border-white/10 bg-slate-950/40 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-300 mb-2">Reminder time</label>
                          <div className="space-y-2">
                            {reminderOptions.map((option) => (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => setWalkthroughReminder(option.id)}
                                className={`w-full px-3 py-2.5 rounded-xl border text-sm text-left transition-colors ${
                                  walkthroughReminder === option.id
                                    ? 'border-blue-500 bg-blue-500/15 text-white'
                                    : 'border-white/10 bg-slate-900/40 text-slate-300 hover:border-white/20'
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-slate-300 mb-2">Reminder channel</label>
                          <div className="space-y-2">
                            {['Email', 'WhatsApp', 'SMS'].map((channel) => (
                              <button
                                key={channel}
                                type="button"
                                onClick={() => setWalkthroughReminderChannel(channel)}
                                className={`w-full px-3 py-2.5 rounded-xl border text-sm text-left transition-colors ${
                                  walkthroughReminderChannel === channel
                                    ? 'border-blue-500 bg-blue-500/15 text-white'
                                    : 'border-white/10 bg-slate-900/40 text-slate-300 hover:border-white/20'
                                }`}
                              >
                                {channel}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {bookingError && (
                        <p className="text-sm text-rose-300 bg-rose-500/10 border border-rose-500/30 px-3 py-2 rounded-lg">
                          {bookingError}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors"
                      >
                        Confirm Walkthrough Booking
                      </button>
                    </form>
                  ) : (
                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 md:p-6">
                      <div className="flex items-center gap-2 mb-3 text-emerald-300">
                        <CheckCircle2 size={20} />
                        <p className="font-bold text-lg">Session Confirmed</p>
                      </div>
                      <div className="space-y-2 text-sm text-slate-200">
                        <p><strong>Name:</strong> {confirmedBooking.name}</p>
                        <p><strong>Email:</strong> {confirmedBooking.email}</p>
                        <p><strong>Date:</strong> {formatDateReadable(confirmedBooking.date)}</p>
                        <p><strong>Time:</strong> {confirmedBooking.slotLabel}</p>
                        <p><strong>Timezone:</strong> {confirmedBooking.timezone}</p>
                        <p><strong>Reminder:</strong> {reminderOptions.find((r) => r.id === confirmedBooking.reminder)?.label || '24 hours before'} via {confirmedBooking.reminderChannel}</p>
                      </div>

                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={downloadInvite}
                          className="h-11 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-colors"
                        >
                          Download Calendar Invite
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmedBooking(null);
                            setBookingError('');
                          }}
                          className="h-11 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
                        >
                          Book Another Slot
                        </button>
                      </div>

                      <div className="mt-4 inline-flex items-center gap-2 text-xs text-slate-300 bg-slate-900/60 border border-white/10 rounded-full px-3 py-1.5">
                        <BellRing size={14} className="text-blue-300" /> Reminder settings saved for planning.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 3. FULL WIDTH MAP SECTION ==================== */}
        <section className="w-full h-[500px] border-t border-white/10 relative z-10 overflow-hidden">
          {/* Map with Dark Mode Filter */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7299.801090513912!2d90.41885220760057!3d23.822135370841533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c711d13bbec7%3A0xc47f7c3e8e2263f2!2sAmerican%20International%20University%20-%20Bangladesh%20(AIUB)!5e0!3m2!1sen!2sbd!4v1769725882857!5m2!1sen!2sbd"
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(100%) invert(90%) hue-rotate(180deg) brightness(80%) contrast(1.2)' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full opacity-70 hover:opacity-100 transition-opacity duration-700"
            title="AIUB Campus Map"
          ></iframe>
          
          {/* Overlay to blend map edges */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(2,6,23,1)]" />
        </section>

        {/* ==================== 4. ALTERNATIVE CTA SECTION ==================== */}
        <section className="py-20 bg-transparent border-t border-white/10">
          <div className="container text-center px-4">
            <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-6">
               <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Not ready to start a project?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              You can check out our previous work to see what we're capable of, or read our blog for industry insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link to="/work">
                 <Button variant="outline" className="h-12 px-6 border-white/10 text-black hover:text-white hover:bg-white/10 w-full sm:w-auto">
                   View Portfolio
                 </Button>
               </Link>
               <Link to="/blog">
                 <Button variant="ghost" className="h-12 px-6 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 w-full sm:w-auto">
                   Read Blog <ArrowRight size={16} className="ml-1" />
                 </Button>
               </Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default ContactPage;