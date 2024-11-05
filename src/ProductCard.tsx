import React from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-xl hover:scale-105"
      onClick={onClick}
    >
      <div className="flex items-center justify-center mb-4 text-yellow-500">
        {product.icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <button className="mt-4 bg-yellow-500 text-gray-900 px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition-colors">
        Learn More
      </button>
    </div>
  );
};

export default ProductCard;