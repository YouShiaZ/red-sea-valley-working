import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, PhoneCall, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <div className="text-lg font-semibold text-turquoise">Red Sea Valley</div>
          <p className="text-sm text-gray-600 mt-3">
            Premium coastal properties across Hurghada, Sahl Hasheesh, El Gouna, and Soma Bay.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-3">Explore</div>
          <div className="space-y-2 text-sm text-gray-600">
            <Link to="/listings" className="block hover:text-turquoise">Listings</Link>
            <Link to="/about" className="block hover:text-turquoise">About RSV</Link>
            <Link to="/contact" className="block hover:text-turquoise">Contact</Link>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Contact</div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2"><PhoneCall size={16} /> +20 123 456 789</div>
            <div className="flex items-center gap-2"><Mail size={16} /> hello@redseavalley.com</div>
            <div className="flex items-center gap-2"><MessageCircle size={16} /> WhatsApp available 24/7</div>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Social</div>
          <div className="flex items-center gap-3 text-gray-500">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-turquoise"><Facebook /></a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-turquoise"><Instagram /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-turquoise"><Linkedin /></a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 pb-6">© {new Date().getFullYear()} Red Sea Valley. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
