import { useEffect } from 'react';
import PropertyFilters from '../components/PropertyFilters';
import PropertyGrid from '../components/PropertyGrid';
import { useProperties } from '../hooks/useProperties';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Listings = () => {
  const { filters, setFilters, properties, resetFilters } = useProperties();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <SEO title="Listings | Red Sea Valley" description="Browse premium villas, apartments, studios, and retail across the Red Sea." />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-gray-500">Listings</p>
          <h1 className="text-3xl font-semibold">Find your next space</h1>
        </div>
      </div>

      <PropertyFilters onChange={setFilters} onReset={resetFilters} values={filters} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {properties.length ? (
          <PropertyGrid properties={properties} />
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 text-gray-500">No properties found.</div>
        )}
      </motion.div>
    </div>
  );
};

export default Listings;
