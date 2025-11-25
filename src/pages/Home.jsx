import Hero from '../components/Hero';
import ExploreCards from '../components/ExploreCards';
import PropertyGrid from '../components/PropertyGrid';
import { useProperties } from '../hooks/useProperties';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations/motions';
import { ShieldCheck, Sparkles } from 'lucide-react';

const Home = () => {
  const { properties } = useProperties();
  const latest = properties.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-14">
      <Hero />
      <ExploreCards />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-gray-500">Latest</p>
            <h2 className="text-2xl font-semibold">Featured properties</h2>
          </div>
        </div>
        <PropertyGrid properties={latest} />
      </section>

      <section className="grid lg:grid-cols-[1.2fr_1fr] gap-6 items-center">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4"
        >
          <p className="text-xs uppercase text-gray-500">Why RSV</p>
          <h3 className="text-2xl font-semibold">Minimal, premium, coastal living</h3>
          <p className="text-gray-600">
            RSV curates boutique residences and commercial assets across the Red Sea coastline with meticulous due
            diligence, transparent advisory, and concierge-style tours.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="p-4 rounded-2xl bg-mist flex items-center gap-3">
              <ShieldCheck className="text-turquoise" />
              Verified titles & secure transactions
            </div>
            <div className="p-4 rounded-2xl bg-mist flex items-center gap-3">
              <Sparkles className="text-turquoise" />
              Design-first interiors & curated amenities
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl overflow-hidden shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80"
            alt="Red Sea"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
