import { Heart, MapPin, Bed, Bath, Expand, Sparkles } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useModal } from '../context/ModalContext';
import { formatPrice, formatArea } from '../utils/format';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const badgeMap = {
  villa: 'Villa',
  apartment: 'Apartment',
  studio: 'Studio',
  shop: 'Shop'
};

const PropertyCard = ({ property }) => {
  const { toggleFavorite, favorites } = useFavorites();
  const { openModal } = useModal();
  const isFav = favorites.some((p) => p.id === property.id);
  const cover =
    property.images?.[0] ||
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80';

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition duration-200"
    >
      <div className="relative h-52">
        <img
          src={cover}
          alt={property.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-white/90 text-turquoise font-medium">
            {badgeMap[property.type] || property.type}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-turquoise text-white font-medium">
            {property.rent ? 'For Rent' : 'For Sale'}
          </span>
        </div>
        <button
          onClick={() => toggleFavorite(property)}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 ${isFav ? 'text-turquoise' : 'text-gray-600'}`}
          aria-label="Save property"
        >
          <Heart size={18} fill={isFav ? '#14B8A6' : 'transparent'} />
        </button>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-charcoal">{property.title}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin size={16} /> {property.location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-turquoise font-semibold">{formatPrice(property.price)}</div>
            <div className="text-xs text-gray-500">+ fees</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2"><Bed size={16} /> {property.bedrooms} bd</div>
          <div className="flex items-center gap-2"><Bath size={16} /> {property.bathrooms} ba</div>
          <div className="flex items-center gap-2"><Expand size={16} /> {formatArea(property.area)}</div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2"><Sparkles size={16} /> {property.finishing}</div>
          <div className="flex gap-2">
            <Link
              to={`/properties/${property.id}`}
              className="text-turquoise font-medium hover:underline"
            >
              Details
            </Link>
            <button
              onClick={() => openModal(property)}
              className="px-3 py-1 rounded-full bg-turquoise text-white text-xs"
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
