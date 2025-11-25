import { Building2, Landmark, Store, MapPin } from 'lucide-react';
import { HomeModernIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '../animations/motions';

const typeCards = [
  { label: 'Villas', type: 'villa', icon: HomeModernIcon },
  { label: 'Apartments', type: 'apartment', icon: Building2 },
  { label: 'Studios', type: 'studio', icon: Landmark },
  { label: 'Shops', type: 'shop', icon: Store }
];

const areas = [
  { label: 'Hurghada', icon: MapPin },
  { label: 'Sahl Hasheesh', icon: MapPin },
  { label: 'El Gouna', icon: MapPin },
  { label: 'Soma Bay', icon: MapPin }
];

const ExploreCards = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase text-gray-500">By Type</p>
            <h3 className="text-xl font-semibold">Tailored for every lifestyle</h3>
          </div>
        </div>
        <motion.div variants={stagger} initial="initial" animate="animate" className="grid sm:grid-cols-2 gap-4">
          {typeCards.map(({ label, type, icon: Icon }) => (
            <motion.div
              key={type}
              variants={fadeInUp}
              className="p-4 rounded-2xl border border-gray-100 bg-mist hover:-translate-y-1 transition shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-turquoise">
                  <Icon className="w-5 h-5" size={20} />
                </div>
                <div>
                  <div className="font-semibold">{label}</div>
                  <p className="text-xs text-gray-500">Curated premium inventory</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase text-gray-500">By Area</p>
            <h3 className="text-xl font-semibold">Explore the coastline</h3>
          </div>
        </div>
        <motion.div variants={stagger} initial="initial" animate="animate" className="grid sm:grid-cols-2 gap-4">
          {areas.map(({ label, icon: Icon }) => (
            <motion.div
              key={label}
              variants={fadeInUp}
              className="p-4 rounded-2xl border border-gray-100 bg-mist hover:-translate-y-1 transition shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-turquoise">
                  <Icon className="w-5 h-5" size={20} />
                </div>
                <div>
                  <div className="font-semibold">{label}</div>
                  <p className="text-xs text-gray-500">Neighborhood insights + maps</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ExploreCards;
