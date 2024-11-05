import React from 'react';
import { Shield, Target, Lightbulb, Users, Clock, Leaf } from 'lucide-react';

const Company: React.FC = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8 text-yellow-500" />,
      title: "Confiabilidad",
      description: "Desarrollamos, formulamos y fabricamos productos de alta calidad con marca propia y proveemos a terceros con otras marcas comerciales."
    },
    {
      icon: <Target className="w-8 h-8 text-yellow-500" />,
      title: "Responsabilidad",
      description: "Trabajamos en cada área para cumplir con celeridad en cotizaciones, plazos de entrega y asesoramiento postventa."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: "Flexibilidad",
      description: "Satisfacemos las necesidades de nuestros clientes en todo el país y países limítrofes, adaptándonos a cada requerimiento."
    }
  ];

  const objectives = [
    {
      icon: <Users className="w-6 h-6 text-yellow-500" />,
      text: "Productos de alta calidad controlados según normas Nacionales e Internacionales"
    },
    {
      icon: <Shield className="w-6 h-6 text-yellow-500" />,
      text: "Excelente presentación en diseño, variedad de contenidos y packaging"
    },
    {
      icon: <Clock className="w-6 h-6 text-yellow-500" />,
      text: "Servicio al cliente con reducidos plazos de entrega y asesoramiento técnico"
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
      text: "Dinamismo para adaptarnos a un mercado en constante evolución"
    },
    {
      icon: <Target className="w-6 h-6 text-yellow-500" />,
      text: "Inversión continua en equipamiento y capacitación"
    },
    {
      icon: <Leaf className="w-6 h-6 text-yellow-500" />,
      text: "Compromiso con la conciencia ambiental y responsabilidad comercial"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3"
          alt="Lainteq Laboratory"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              Nuestra Empresa
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Más de 30 años de experiencia en el desarrollo y fabricación de soluciones químicas de alta calidad
            </p>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Nuestra Historia</h2>
            <p className="text-gray-300 leading-relaxed">
              Fundada en la ciudad de Santa Fe por el Ing. Qco. Jorge Luis Faya en la década del 90, 
              LAINTEQ S.R.L. ha evolucionado bajo el liderazgo de su actual titular y socio gerente, 
              el Ing. Qco. Osvaldo Enrique Faya, transformándose en una empresa líder en el sector químico industrial.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Nuestros Valores</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">{value.title}</h3>
              <p className="text-gray-300 text-center">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Objectives Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Objetivos Empresariales</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {objectives.map((objective, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 backdrop-blur-lg">
                <div className="flex-shrink-0">
                  {objective.icon}
                </div>
                <p className="text-gray-300">{objective.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img
            src="https://images.unsplash.com/photo-1605463236126-c6c3d8a6e2f8?ixlib=rb-4.0.3"
            alt="Laboratory"
            className="rounded-lg shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
          />
          <img
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3"
            alt="Quality Control"
            className="rounded-lg shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
          />
          <img
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3"
            alt="Research"
            className="rounded-lg shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Company;