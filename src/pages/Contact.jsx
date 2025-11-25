import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations/motions';
import { PhoneCall, Mail, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';

const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <SEO title="Contact RSV" description="Message Red Sea Valley for premium property tours and inquiries." />
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="space-y-4">
          <p className="text-xs uppercase text-gray-500">Contact</p>
          <h1 className="text-3xl font-semibold">Talk with RSV</h1>
          <p className="text-gray-600">We respond swiftly via WhatsApp, phone, or email.</p>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2"><PhoneCall className="text-turquoise" size={18} /> +20 123 456 789</div>
            <div className="flex items-center gap-2"><MessageCircle className="text-turquoise" size={18} /> WhatsApp 24/7</div>
            <div className="flex items-center gap-2"><Mail className="text-turquoise" size={18} /> hello@redseavalley.com</div>
          </div>
        </motion.div>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
