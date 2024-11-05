import React from 'react';
import ProductGrid from '../components/ProductGrid';

const Products: React.FC = () => {
  return (
    <div>
      <div className="relative mb-8">
        <img
          src="https://res.cloudinary.com/diqvcz1gd/image/upload/v1730585763/lainteq/productos/FONDO-PAGINA-PRODUCTOS/julia-koblitz-jpv1XVDRWn0-unsplash_mpmgv4.jpg"
          alt="Productos industriales"
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-lg">
          <div className="h-full flex flex-col justify-center px-8">
            <h1 className="text-4xl font-bold text-white mb-2">Nuestros Productos</h1>
            <p className="text-gray-200 max-w-xl">
              Descubra nuestra amplia gama de adhesivos y pinturas industriales de alta calidad
            </p>
          </div>
        </div>
      </div>
      <ProductGrid />
    </div>
  );
};

export default Products;