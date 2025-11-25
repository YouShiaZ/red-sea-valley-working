import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations/motions';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm text-center space-y-4"
    >
      <div className="text-5xl font-bold text-turquoise">404</div>
      <p className="text-gray-600">This page floated off into the Red Sea.</p>
      <Link to="/" className="px-4 py-2 rounded-full bg-turquoise text-white">Back home</Link>
    </motion.div>
  </div>
);

export default NotFound;
