import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Lainteq Laboratorio Indistrial</h3>
            <p className="text-gray-400">Adhesivos, Pinturas y muultiples soluciones para la industria del PVC</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-yellow-400">Inicio</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-yellow-400">Productos</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-yellow-400">Empresa</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-yellow-400">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contactenos</h4>
            <p className="text-gray-400">Rep. de Siria 6955 – S3004GLE </p>
            <p className="text-gray-400">(Santa Fe – Argentina)</p>
            <p className="text-gray-400">Telefono: +54 (0342) 652 6440</p>
            <p className="text-gray-400">Email: info@lainteq.com.ar</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 SetubalAI Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;