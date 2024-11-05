import React, { useState, useMemo } from 'react';
import { Search, Package2, Filter, ArrowRight, Beaker, Droplet, Paintbrush } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import productos from '../productos.json';

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  url_img_1: string;
  detalle_txt?: string;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'adhesivos':
      return <Droplet className="h-6 w-6" />;
    case 'pinturas':
      return <Paintbrush className="h-6 w-6" />;
    default:
      return <Beaker className="h-6 w-6" />;
  }
};

const ProductGrid: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(productos.Productos.map(p => p.categoria));
    return ['Todas', ...Array.from(cats)];
  }, []);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return productos.Productos.filter(product => {
      const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory === 'Todas' || product.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Group products by category
  const groupedProducts = useMemo(() => {
    const groups: { [key: string]: Producto[] } = {};
    filteredProducts.forEach(product => {
      const category = product.categoria;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(product);
    });
    return groups;
  }, [filteredProducts]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              className="pl-10 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-8">
          {Object.entries(groupedProducts).map(([category, products]) => (
            <div key={category} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  {getCategoryIcon(category)}
                  <span className="ml-2">{category}</span>
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="group relative h-[400px] perspective-1000"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                        hoveredProduct === product.id ? 'rotate-y-180' : ''
                      }`}>
                        {/* Front of card */}
                        <div className="absolute inset-0 w-full h-full backface-hidden">
                          <div className="h-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                              {product.url_img_1 !== "xx" ? (
                                <img
                                  src={product.url_img_1}
                                  alt={product.nombre}
                                  className="w-full h-64 object-contain object-center"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-64">
                                  <Package2 size={40} className="text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="p-6">
                              <h3 className="text-lg font-semibold text-gray-900 text-center mb-4 line-clamp-2">
                                {product.nombre}
                              </h3>
                              <div className="flex justify-center">
                                <span className="inline-flex items-center text-sm text-yellow-600">
                                  Ver detalles
                                  <ArrowRight size={16} className="ml-1" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Back of card */}
                        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                          <div className="h-full bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 flex flex-col justify-between text-gray-900">
                            <div>
                              <div className="flex items-center mb-4">
                                {getCategoryIcon(category)}
                                <h3 className="ml-2 text-lg font-semibold">{product.nombre}</h3>
                              </div>
                              <p className="text-sm line-clamp-6">
                                {product.detalle_txt || 'Descripción no disponible'}
                              </p>
                            </div>
                            <button
                              onClick={() => navigate(`/product/${product.id}`)}
                              className="mt-4 w-full bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center"
                            >
                              Ver Producto
                              <ArrowRight size={16} className="ml-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;