import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Building, Globe } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Here you would typically handle the form submission
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black relative">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3"
          alt="Contact us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-white mb-4">Contactenos</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Estamos aquí para ayudarte. Nuestro equipo de expertos está listo para responder todas tus consultas.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Office Location */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Building className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Oficina Central</h3>
                  <p className="text-gray-400">Santa Fe, Argentina</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="h-5 w-5 text-yellow-500" />
                  <span>Dir: rep. de Siria | S3004GLE</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Globe className="h-5 w-5 text-yellow-500" />
                  <span>Santa Fe - Argentina</span>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Phone className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Contacto Directo</h3>
                  <p className="text-gray-400">Estamos disponibles para ti</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="h-5 w-5 text-yellow-500" />
                  <span>+54 (0342) 652 6440</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="h-5 w-5 text-yellow-500" />
                  <span>info@lainteq.com.ar</span>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Horarios de Atención</h3>
                  <p className="text-gray-400">Horario comercial</p>
                </div>
              </div>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between items-center">
                  <span>Lunes - Viernes</span>
                  <span>9:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sábados</span>
                  <span>9:00 - 13:00</span>
                </div>
                <div className="flex justify-between items-center text-yellow-500">
                  <span>Domingos</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 relative">
              <h2 className="text-2xl font-bold text-white mb-6">Envíenos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="juan@ejemplo.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    rows={6}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  <Send className={`h-5 w-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}</span>
                </button>
              </form>

              {/* Loading Overlay */}
              {isSubmitting && (
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-yellow-500 border-t-transparent"></div>
                    <span className="text-gray-900 font-medium">Enviando mensaje...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Nuestra Ubicación</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.8373334366873!2d-60.70720882428369!3d-31.649499074219444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b5a9f29b34799f%3A0x4d0c7d3a0f44c4d4!2sRep%C3%BAblica%20de%20Siria%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1709901234567!5m2!1ses!2sar"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;