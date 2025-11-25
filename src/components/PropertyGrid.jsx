import PropertyCard from './PropertyCard';
import { motion } from 'framer-motion';
import { stagger } from '../animations/motions';

const PropertyGrid = ({ properties }) => (
  <motion.div
    variants={stagger}
    initial="initial"
    animate="animate"
    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    {properties.map((property) => (
      <motion.div key={property.id} variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }}>
        <PropertyCard property={property} />
      </motion.div>
    ))}
  </motion.div>
);

export default PropertyGrid;
