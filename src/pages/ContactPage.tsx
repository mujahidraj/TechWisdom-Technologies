import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser'; // Import EmailJS

import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

// --- YOUR UI COMPONENTS ---
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner'; // Optional: Use a toast library if you have one, or stick to alert

const ContactPage = () => {
  const { contact, site } = data;
  
  // State for form data
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    budget: '', 
    service: '', 
    message: '' 
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- EMAILJS CONFIGURATION ---
    // Replace these strings with your actual IDs from the EmailJS dashboard
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Prepare the data object to match your EmailJS template variables
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
      
      // Success Feedback
      alert('Message sent successfully! We will get back to you soon.'); 
      setFormData({ name: '', email: '', budget: '', service: '', message: '' }); // Reset form
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
      
      {/* ==================== 1. HERO SECTION (No Overlap) ==================== */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#0f172a] text-white">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-md mb-2">
              Get in Touch
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              {contact.headline}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              {contact.subheadline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== 2. FORM & INFO SECTION ==================== */}
      <section className="py-24 bg-slate-50 relative z-20">
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
              <Card className="bg-white border-none shadow-md overflow-hidden h-full">
                <CardHeader className="bg-white border-b border-slate-100 pb-4">
                  <CardTitle className="text-lg font-bold text-slate-900">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Email Us</p>
                      <a href={`mailto:${site.email}`} className="text-slate-900 font-semibold hover:text-blue-600 transition-colors">
                        {site.email}
                      </a>
                    </div>
                  </div>
                  
                  <Separator />

                  {/* Phone */}
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Call Us</p>
                      <a href={`tel:${site.phone}`} className="text-slate-900 font-semibold hover:text-purple-600 transition-colors">
                        {site.phone}
                      </a>
                    </div>
                  </div>

                  <Separator />

                  {/* Address */}
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Visit Us</p>
                      <p className="text-slate-900 font-medium leading-relaxed">
                        {site.address}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Hours */}
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Business Hours</p>
                      <p className="text-slate-900 font-medium">Saturday: 9am - 6pm</p>
                      <p className="text-slate-900 font-medium">Sunday: 9am - 6pm</p>
                      <p className="text-slate-900 font-medium">Monday: 9am - 6pm</p>
                      <p className="text-slate-900 font-medium">Tuesday: 9am - 6pm</p>
                      <p className="text-slate-900 font-medium">Wednesday: 9am - 6pm</p>
                      <p className="text-slate-900 font-medium">Thursday: 9am - 3pm</p>
                      <p className="text-slate-900 font-medium">Friday: No Working Day</p>
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
              <Card className="bg-white border-none shadow-xl overflow-hidden h-full">
                <CardHeader className="px-8 pt-8 pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                      <MessageSquare size={24} />
                    </div>
                    <CardTitle className="text-2xl font-bold">Send us a Message</CardTitle>
                  </div>
                  <CardDescription className="text-base ml-11 text-slate-500">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          placeholder={contact.form.namePlaceholder} 
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          required
                          className="bg-slate-50 border-slate-200 focus:bg-white transition-colors h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder={contact.form.emailPlaceholder} 
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          required
                          className="bg-slate-50 border-slate-200 focus:bg-white transition-colors h-12"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="service">{contact.form.serviceLabel}</Label>
                        <Select onValueChange={(val) => setFormData({...formData, service: val})}>
                          <SelectTrigger className="bg-slate-50 border-slate-200 h-12">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {contact.form.serviceOptions.map((opt) => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">{contact.form.budgetLabel}</Label>
                        <Select onValueChange={(val) => setFormData({...formData, budget: val})}>
                          <SelectTrigger className="bg-slate-50 border-slate-200 h-12">
                            <SelectValue placeholder="Select your budget" />
                          </SelectTrigger>
                          <SelectContent>
                            {contact.form.budgetOptions.map((opt) => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Details</Label>
                      <Textarea 
                        id="message" 
                        placeholder={contact.form.messagePlaceholder} 
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        required
                        className="min-h-[150px] bg-slate-50 border-slate-200 focus:bg-white transition-colors resize-none text-base"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20"
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

      {/* ==================== 3. ALTERNATIVE CTA SECTION ==================== */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container text-center px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Not ready to start a project?</h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">
            You can check out our previous work to see what we're capable of, or read our blog for industry insights.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/work">
               <Button variant="outline" className="h-12 px-6 border-slate-300 hover:bg-slate-50 w-full sm:w-auto">
                 View Portfolio
               </Button>
             </Link>
             <Link to="/blog">
               <Button variant="ghost" className="h-12 px-6 text-blue-600 hover:text-blue-700 hover:bg-blue-50 w-full sm:w-auto">
                 Read Blog <ArrowRight size={16} className="ml-1" />
               </Button>
             </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default ContactPage;