import React, { useState } from 'react';
import { Package2 } from 'lucide-react';

interface Product {
  id: number;
  nombre: string;
  url_img_1?: string;
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  return (
    <div 
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer w-full"
      onClick={onClick}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 group-hover:from-transparent group-hover:to-black/20 transition-all duration-300 z-10"></div>
      
      {/* Image Container */}
      <div className="aspect-w-16 aspect-h-9 w-full bg-gray-50 relative">
        {product.url_img_1 && product.url_img_1 !== "xx" && !imageError ? (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-500 border-t-transparent"></div>
              </div>
            )}
            <img
              src={product.url_img_1}
              alt={product.nombre}
              className={`w-full h-64 object-contain object-center group-hover:scale-105 transition-transform duration-500 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          </>
        ) : (
          <div className="w-full h-64 flex items-center justify-center">
            <Package2 size={48} className="text-gray-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2 min-h-[3.5rem]">
          {product.nombre}
        </h3>
        
        {/* Button with hover effect */}
        <div className="relative inline-block">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-200"></div>
          <button className="relative px-6 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg leading-none font-semibold text-gray-900 transition-all duration-200 hover:shadow-[0_0_2rem_-0.5rem_#fbbf24] group-hover:scale-105">
            Leer Más
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;