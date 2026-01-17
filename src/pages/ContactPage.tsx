import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import Layout from '@/components/layout/Layout';
import data from '@/data.json';

const ContactPage = () => {
  const { contact, site } = data;
  const [formData, setFormData] = useState({ name: '', email: '', budget: '', service: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your message has been received (demo only).');
  };

  return (
    <Layout>
      <SEOHead title="Contact" description={contact.subheadline} path="/contact" />
      <section className="section-padding gradient-navy">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold text-white mb-6">{contact.headline}</motion.h1>
          <p className="text-xl text-white/70">{contact.subheadline}</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.form initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit} className="space-y-6">
              <input type="text" placeholder={contact.form.namePlaceholder} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pale-blue focus:border-strong-blue focus:ring-2 focus:ring-strong-blue/20 outline-none" required />
              <input type="email" placeholder={contact.form.emailPlaceholder} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pale-blue focus:border-strong-blue focus:ring-2 focus:ring-strong-blue/20 outline-none" required />
              <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pale-blue focus:border-strong-blue focus:ring-2 focus:ring-strong-blue/20 outline-none text-navy/70">
                <option value="">{contact.form.budgetLabel}</option>
                {contact.form.budgetOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pale-blue focus:border-strong-blue focus:ring-2 focus:ring-strong-blue/20 outline-none text-navy/70">
                <option value="">{contact.form.serviceLabel}</option>
                {contact.form.serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <textarea placeholder={contact.form.messagePlaceholder} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={5} className="w-full px-4 py-3 rounded-xl border border-pale-blue focus:border-strong-blue focus:ring-2 focus:ring-strong-blue/20 outline-none resize-none" required />
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-strong-blue to-soft-blue text-white rounded-xl font-semibold hover:opacity-90 transition-opacity">{contact.form.submitButton}</button>
            </motion.form>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="bento-card"><Mail className="w-8 h-8 text-strong-blue mb-3" /><h3 className="font-semibold text-navy">Email</h3><p className="text-navy/70">{site.email}</p></div>
              <div className="bento-card"><Phone className="w-8 h-8 text-strong-blue mb-3" /><h3 className="font-semibold text-navy">Phone</h3><p className="text-navy/70">{site.phone}</p></div>
              <div className="bento-card"><MapPin className="w-8 h-8 text-strong-blue mb-3" /><h3 className="font-semibold text-navy">Address</h3><p className="text-navy/70">{site.address}</p></div>
              <div className="aspect-video bg-pale-blue/30 rounded-2xl flex items-center justify-center text-navy/50">Map Placeholder</div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default ContactPage;
