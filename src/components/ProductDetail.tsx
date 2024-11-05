import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Star, Package2, Download, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import QuoteForm from './QuoteForm';

interface ProductDetailProps {
  product: {
    id: number;
    nombre: string;
    detalle_txt: string;
    categoria: string;
    formato: string;
    presentacion: string;
    caracteristicas?: string;
    color?: string;
    viscosidad?: string;
    contenido_polimiero?: string;
    url_img_1: string;
    url_img_2: string;
    url_img_3: string;
    url_img_4: string;
    url_img_5: string;
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(product.url_img_1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);

  // Filter out invalid image URLs (marked as "xx" or failed to load)
  const validImages = [
    product.url_img_1,
    product.url_img_2,
    product.url_img_3,
    product.url_img_4,
    product.url_img_5,
  ].filter(url => url !== "xx" && !imageError[url]);

  const handleImageError = (url: string) => {
    setImageError(prev => ({ ...prev, [url]: true }));
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev === 0 ? validImages.length - 1 : prev - 1;
      setMainImage(validImages[newIndex]);
      setIsLoading(true);
      return newIndex;
    });
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev === validImages.length - 1 ? 0 : prev + 1;
      setMainImage(validImages[newIndex]);
      setIsLoading(true);
      return newIndex;
    });
  };

  const downloadTechnicalSheet = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Ficha Técnica', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text(product.nombre, 105, 35, { align: 'center' });
    
    doc.setFontSize(12);
    let yPosition = 50;
    
    doc.text('Descripción:', 20, yPosition);
    const descriptionLines = doc.splitTextToSize(product.detalle_txt, 170);
    doc.text(descriptionLines, 20, yPosition + 7);
    yPosition += 10 + (descriptionLines.length * 7);
    
    doc.text('Especificaciones:', 20, yPosition);
    yPosition += 7;
    doc.text(`Formato: ${product.formato}`, 25, yPosition);
    yPosition += 7;
    doc.text(`Presentación: ${product.presentacion}`, 25, yPosition);
    yPosition += 7;
    
    if (product.color) {
      doc.text(`Color: ${product.color}`, 25, yPosition);
      yPosition += 7;
    }
    
    if (product.viscosidad) {
      doc.text(`Viscosidad: ${product.viscosidad}`, 25, yPosition);
      yPosition += 7;
    }
    
    if (product.contenido_polimiero && product.contenido_polimiero !== "xx") {
      doc.text(`Contenido de Polímero: ${product.contenido_polimiero}`, 25, yPosition);
    }
    
    doc.save(`ficha-tecnica-${product.nombre.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <Link to="/products" className="flex items-center text-yellow-500 hover:text-yellow-600">
          <ArrowLeft size={20} className="mr-2" />
          Volver a Productos
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        <div className="space-y-4">
          <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
              </div>
            )}
            {mainImage !== "xx" && !imageError[mainImage] ? (
              <img
                src={mainImage}
                alt={product.nombre}
                className={`w-full h-full object-contain transition-opacity duration-300 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={handleImageLoad}
                onError={() => handleImageError(mainImage)}
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Package2 size={64} className="text-gray-400" />
              </div>
            )}
            
            {validImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                  <ArrowRight size={20} />
                </button>
              </>
            )}
          </div>

          {validImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {validImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMainImage(img);
                    setCurrentImageIndex(index);
                    setIsLoading(true);
                  }}
                  className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                    mainImage === img ? 'ring-2 ring-yellow-500' : 'hover:opacity-75'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.nombre} - Vista ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(img)}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.nombre}</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">{product.categoria}</span>
                <Star className="text-yellow-500" size={16} />
              </div>
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold mb-2">Descripción</h2>
              <p className="text-gray-700 whitespace-pre-line">{product.detalle_txt}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Especificaciones</h2>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-600">Formato:</dt>
                    <dd>{product.formato}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-600">Presentación:</dt>
                    <dd>{product.presentacion}</dd>
                  </div>
                  {product.color && (
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-600">Color:</dt>
                      <dd>{product.color}</dd>
                    </div>
                  )}
                  {product.viscosidad && (
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-600">Viscosidad:</dt>
                      <dd>{product.viscosidad}</dd>
                    </div>
                  )}
                  {product.contenido_polimiero && product.contenido_polimiero !== "xx" && (
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-600">Contenido de Polímero:</dt>
                      <dd>{product.contenido_polimiero}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {product.caracteristicas && product.caracteristicas !== "xx" && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Características</h2>
                  <p className="text-gray-700 whitespace-pre-line">{product.caracteristicas}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <button 
              onClick={() => setShowQuoteForm(true)}
              className="flex-1 bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Solicitar Cotización
            </button>
            <div className="flex-1 grid grid-cols-2 gap-2">
              <button 
                onClick={downloadTechnicalSheet}
                className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <Download size={20} className="mr-2" />
                PDF
              </button>
              <button 
                onClick={() => navigate(`/ficha-tecnica/${product.id}`)}
                className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <FileText size={20} className="mr-2" />
                Ver Ficha
              </button>
            </div>
          </div>
        </div>
      </div>

      {showQuoteForm && (
        <QuoteForm 
          productName={product.nombre} 
          onClose={() => setShowQuoteForm(false)} 
        />
      )}
    </div>
  );
};

export default ProductDetail;