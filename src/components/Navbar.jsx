import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import logo from '../assets/logo.svg';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/listings', label: 'Listings' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-xl font-semibold tracking-tight">
          <img src={logo} alt="RSV Logo" className="w-12 h-12" />
          <div className="leading-tight">
            <div className="text-xs uppercase text-gray-500">Red Sea Valley</div>
            <div className="text-lg text-turquoise">RSV</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-turquoise ${isActive ? 'text-turquoise' : 'text-gray-600'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href="https://wa.me/20123456789"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-turquoise text-white shadow-soft hover:-translate-y-0.5 transition"
          >
            <PhoneCall size={18} />
            <span>WhatsApp</span>
          </a>
        </nav>
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-t border-gray-100"
        >
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg ${isActive ? 'bg-turquoise/10 text-turquoise' : 'text-gray-700'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href="https://wa.me/20123456789"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-turquoise text-white"
            >
              <PhoneCall size={18} /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
