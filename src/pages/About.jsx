import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '../animations/motions';
import { MapPin, Compass, Anchor } from 'lucide-react';
import SEO from '../components/SEO';

const pillars = [
  {
    title: 'Coastal focus',
    copy: 'We focus exclusively on Red Sea destinations to bring depth of market intelligence.',
    icon: Anchor
  },
  {
    title: 'Minimal, premium aesthetic',
    copy: 'Homes and shops curated for clean lines, natural light, and high-spec finishes.',
    icon: Compass
  },
  {
    title: 'Advisory-first',
    copy: 'We guide you end-to-end: sourcing, viewings, negotiations, and handover.',
    icon: MapPin
  }
];

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <SEO title="About RSV" description="Red Sea Valley crafts premium real estate experiences across the Red Sea." />
      <motion.div variants={fadeInUp} initial="initial" animate="animate" className="max-w-3xl space-y-4">
        <p className="text-xs uppercase text-gray-500">About</p>
        <h1 className="text-3xl font-semibold">Red Sea Valley (RSV)</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          RSV is a design-led real estate boutique showcasing premium properties across Hurghada, Sahl Hasheesh, El
          Gouna, and Soma Bay. We combine modern aesthetics with data-backed advisory.
        </p>
      </motion.div>

      <motion.div variants={stagger} initial="initial" animate="animate" className="grid md:grid-cols-3 gap-4">
        {pillars.map(({ title, copy, icon: Icon }) => (
          <motion.div
            key={title}
            variants={fadeInUp}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2"
          >
            <div className="w-10 h-10 rounded-full bg-mist flex items-center justify-center text-turquoise"><Icon /></div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{copy}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        <motion.img
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80"
          alt="Coastal"
          className="rounded-3xl shadow-lg"
          loading="lazy"
        />
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
          <h3 className="text-xl font-semibold">Areas we serve</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Hurghada – Marina, Promenade, compounds</li>
            <li>Sahl Hasheesh – beachfront villas & penthouses</li>
            <li>El Gouna – lagoons, golf-side, marina districts</li>
            <li>Soma Bay – golf & kite-surf heaven residences</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
