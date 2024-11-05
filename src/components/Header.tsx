import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className={`bg-gray-800/95 backdrop-blur-sm py-2 text-sm transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}>
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <span className="text-gray-300">Dir: rep. de Siria | S3004GLE - Santa Fe - Argentina</span>
            </div>
            <div className="hidden md:flex items-center">
              <Phone size={16} className="mr-1" />
              <span className="text-gray-300">Tel: +54 (0342) 652 6440</span>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <Mail size={16} className="mr-1" />
            <span className="text-gray-300">email: info@lainteq.com.ar</span>
          </div>
        </div>
      </div>
      <div className={`bg-gray-900/95 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <AnimatedLogo />
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-white hover:text-yellow-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-white hover:text-yellow-400 transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/empresa" className="text-white hover:text-yellow-400 transition-colors">
                  Empresa
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-yellow-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-gray-900/95 backdrop-blur-sm transition-transform duration-300 transform ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden z-40`}>
        <div className="flex flex-col h-full pt-20 px-4">
          <nav className="flex-grow">
            <ul className="space-y-6 text-center">
              <li>
                <Link 
                  to="/" 
                  className="text-white text-xl hover:text-yellow-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-white text-xl hover:text-yellow-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link 
                  to="/empresa" 
                  className="text-white text-xl hover:text-yellow-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Empresa
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-white text-xl hover:text-yellow-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
          <div className="py-6 space-y-4 text-center">
            <div className="flex items-center justify-center text-gray-300">
              <Phone size={16} className="mr-2" />
              <span>+54 (0342) 652 6440</span>
            </div>
            <div className="flex items-center justify-center text-gray-300">
              <Mail size={16} className="mr-2" />
              <span>info@lainteq.com.ar</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;