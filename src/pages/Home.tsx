import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import ProductCard from '../components/ProductCard';
import TextLightning from '../components/TextLightning';
import InfoCard from '../components/InfoCard';
import productos from '../productos.json';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const carouselImages = [
  {
    url: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3',
    title: 'Laboratorio de pruebas',
    id: 'testing-laboratory'
  },
  {
    url: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3',
    title: 'Laboratorio de control de calidad',
    id: 'quality-control'
  },
  {
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3',
    title: 'Investigación y desarrollo',
    id: 'research-development'
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [autoHoverIndex, setAutoHoverIndex] = useState(0);

  // Get 3 random products for featured section
  const featuredProducts = useMemo(() => {
    const allProducts = [...productos.Productos];
    const featured = [];
    for (let i = 0; i < 3 && allProducts.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * allProducts.length);
      const product = allProducts.splice(randomIndex, 1)[0];
      featured.push({
        id: product.id,
        nombre: product.nombre,
        url_img_1: product.url_img_1,
        detalle_txt: product.detalle_txt
      });
    }
    return featured;
  }, []);

  // Auto hover effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoHoverIndex((prev) => (prev + 1) % featuredProducts.length);
      setHoveredProduct(featuredProducts[autoHoverIndex]?.id || null);
    }, 3000);

    return () => clearInterval(interval);
  }, [featuredProducts, autoHoverIndex]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Lightning Text Effect - Mobile Responsive */}
            <div className="mb-8 md:mb-12">
              <TextLightning text="Innovación & Tecnológica" />
              <TextLightning text="Aplicada en Adhesivos" />
              <TextLightning text="y Pinturas para PVC" />
            </div>

            {/* Enhanced 3D Carousel - Mobile Responsive */}
            <div className="max-w-7xl mx-auto mb-8 md:mb-16 px-2">
              <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 1.5 },
                  768: { slidesPerView: 2 }
                }}
                coverflowEffect={{
                  rotate: 20,
                  stretch: 0,
                  depth: 350,
                  modifier: 1,
                  slideShadows: false
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }}
                speed={1000}
                pagination={{
                  clickable: true,
                  dynamicBullets: true
                }}
                modules={[EffectCoverflow, Autoplay, Pagination]}
                className="mySwiper !pb-16"
              >
                {carouselImages.map((image, index) => (
                  <SwiperSlide key={index} className="w-full md:w-[500px] h-[300px] md:h-[400px]">
                    <div 
                      className="holographic w-full h-full cursor-pointer group"
                      onClick={() => navigate(`/lab-section/${image.id}`)}
                    >
                      <div className="relative w-full h-full rounded-2xl overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                              {image.title}
                            </h3>
                            <div className="h-1 w-12 bg-yellow-400 rounded transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* CTA Button - Mobile Responsive */}
            <button 
              onClick={() => navigate('/products')}
              className="relative inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-gray-900 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg overflow-hidden group"
            >
              <span className="absolute w-full h-full bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                Explore nuestros productos
                <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </section>

        {/* Featured Products Section - Mobile Responsive */}
        <section className="relative py-12 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="neon-text text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
              Productos destacados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="transform transition-all duration-500 hover:scale-105"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className={`relative bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-500 ${
                    hoveredProduct === product.id ? 'scale-105' : ''
                  }`}>
                    <div className="aspect-w-16 aspect-h-9">
                      {product.url_img_1 && product.url_img_1 !== "xx" ? (
                        <img
                          src={product.url_img_1}
                          alt={product.nombre}
                          className="w-full h-64 object-contain transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-64">
                          <Package2 size={48} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.nombre}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{product.detalle_txt}</p>
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="w-full bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                      >
                        Ver más
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Information Section - Mobile Responsive */}
        <section className="w-full py-12 md:py-20 px-4 bg-gradient-to-r from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="neon-text text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
              Información Técnica
            </h2>
            <div className="w-full max-w-4xl mx-auto">
              <InfoCard />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;