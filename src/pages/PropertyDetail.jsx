import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { fetchProperty } from '../api/propertyApi';
import { formatArea, formatPrice } from '../utils/format';
import { Bed, Bath, Expand, Sparkles, MapPin, Heart } from 'lucide-react';
import MapPreview from '../components/MapPreview';
import { useFavorites } from '../context/FavoritesContext';
import { useModal } from '../context/ModalContext';
import SEO from '../components/SEO';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState('');
  const [thumbs, setThumbs] = useState(null);
  const { toggleFavorite, favorites } = useFavorites();
  const { openModal } = useModal();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProperty(id);
        setProperty(data);
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        setError('Property not found');
      }
    };
    load();
  }, [id]);

  if (error) return <div className="max-w-5xl mx-auto px-4 py-10 text-red-500">{error}</div>;
  if (!property) return <div className="max-w-5xl mx-auto px-4 py-10">Loading...</div>;

  const isFav = favorites.some((p) => p.id === property.id);
  const images =
    property.images?.length && property.images[0]
      ? property.images
      : ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <SEO title={`${property.title} | RSV`} description={property.description?.slice(0, 140)} />
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-3 shadow-sm border border-gray-100">
            <Swiper
              modules={[Navigation, Thumbs]}
              navigation
              loop
              thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
              className="rounded-2xl overflow-hidden"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img src={img} alt={property.title} className="w-full h-[420px] object-cover" loading="lazy" />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbs}
              modules={[Thumbs]}
              slidesPerView={4}
              spaceBetween={10}
              watchSlidesProgress
              className="mt-3"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`${property.title} ${idx + 1}`}
                    className="w-full h-20 object-cover rounded-xl border border-gray-100"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase text-gray-500">{property.type}</p>
                <h1 className="text-3xl font-semibold">{property.title}</h1>
                <div className="text-gray-500 flex items-center gap-2"><MapPin size={18} /> {property.location}</div>
              </div>
              <div className="text-right">
                <div className="text-turquoise font-semibold text-xl">{formatPrice(property.price)}</div>
                <div className="text-xs text-gray-500">{property.rent ? 'For Rent' : 'For Sale'}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
              <div className="p-3 rounded-2xl bg-mist flex items-center gap-2"><Bed size={16} /> {property.bedrooms} Bedrooms</div>
              <div className="p-3 rounded-2xl bg-mist flex items-center gap-2"><Bath size={16} /> {property.bathrooms} Bathrooms</div>
              <div className="p-3 rounded-2xl bg-mist flex items-center gap-2"><Expand size={16} /> {formatArea(property.area)}</div>
              <div className="p-3 rounded-2xl bg-mist flex items-center gap-2"><Sparkles size={16} /> {property.finishing}</div>
            </div>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => openModal(property)}
                className="px-4 py-2 rounded-full bg-turquoise text-white shadow-soft"
              >
                I'm Interested
              </button>
              <button
                onClick={() => toggleFavorite(property)}
                className="px-4 py-2 rounded-full border border-gray-200 flex items-center gap-2"
              >
                <Heart size={16} /> {isFav ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">Details</h3>
            <dl className="grid grid-cols-2 gap-3 text-sm text-gray-600">
              <div><dt className="text-xs text-gray-500">Furnished</dt><dd>{property.furnished ? 'Yes' : 'No'}</dd></div>
              <div><dt className="text-xs text-gray-500">Floor</dt><dd>{property.floor}</dd></div>
              <div><dt className="text-xs text-gray-500">Status</dt><dd className="capitalize">{property.status}</dd></div>
              <div><dt className="text-xs text-gray-500">Finishing</dt><dd>{property.finishing}</dd></div>
            </dl>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">Location</h3>
            <MapPreview lat={property.coordinates?.lat} lng={property.coordinates?.lng} label={property.title} />
          </div>
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold">Contact Owner</h3>
            <div className="text-sm text-gray-600">
              Email:{' '}
              <a className="text-turquoise" href={`mailto:${property.ownerContact?.email}`}>
                {property.ownerContact?.email}
              </a>
            </div>
            <div className="text-sm text-gray-600">
              WhatsApp:{' '}
              <a
                className="text-turquoise"
                href={`https://wa.me/${property.ownerContact?.whatsapp?.replace(/[^\\d]/g, '')}?text=I%20am%20interested%20in%20${property.title}`}
              >
                {property.ownerContact?.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
