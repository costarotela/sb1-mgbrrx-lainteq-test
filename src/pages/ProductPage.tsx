import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import productos from '../productos.json';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = productos.Productos.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Producto no encontrado</h2>
          <p className="text-gray-600 mt-2">El producto que buscas no existe o ha sido removido.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductPage;