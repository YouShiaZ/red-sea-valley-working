import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations/motions';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    title: 'Seafront Villas with Private Pools',
    description: 'Ultra-modern villas carved for seaside living in Sahl Hasheesh.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'
  },
  {
    title: 'Lagoon Living in El Gouna',
    description: 'Glass-clad apartments with sweeping lagoon views and club access.',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80'
  },
  {
    title: 'Soma Bay Penthouses',
    description: 'Sunrise terraces, curated interiors, and premium golf-side living.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'
  }
];

const Hero = () => {
  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        className="rounded-3xl overflow-hidden shadow-lg"
      >
        {heroSlides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-[520px]">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-6xl mx-auto px-6">
                  <motion.div
                    initial={fadeInUp.initial}
                    animate={fadeInUp.animate}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="text-white max-w-xl space-y-5"
                  >
                    <p className="uppercase tracking-[0.3em] text-xs text-white/70">Red Sea Valley</p>
                    <h1 className="text-3xl md:text-4xl font-semibold leading-tight">{slide.title}</h1>
                    <p className="text-lg text-white/80">{slide.description}</p>
                    <div className="flex gap-3">
                      <Link
                        to="/listings"
                        className="bg-white text-charcoal px-5 py-3 rounded-full font-semibold shadow-soft"
                      >
                        Browse Listings
                      </Link>
                      <Link
                        to="/contact"
                        className="px-5 py-3 rounded-full border border-white/70 text-white/90"
                      >
                        Talk to an advisor
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
