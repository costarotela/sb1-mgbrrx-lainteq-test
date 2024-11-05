import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedGridImage from '../components/AnimatedGridImage';

const labSections = {
  'quality-control': {
    title: 'Laboratorio de control de calidad',
    mainImage: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3',
    description: 'Nuestro Laboratorio de Control de Calidad de última generación garantiza que cada producto cumpla con los más altos estándares de calidad y rendimiento. Utilizando equipos de prueba avanzados y protocolos rigurosos, monitoreamos y verificamos continuamente las especificaciones del producto durante todo el proceso de fabricación..',
    features: [
      'Equipos de pruebas reológicas avanzadas',
      'Sistemas de análisis térmico',
      'Instalaciones para pruebas de adherencia',
      'Cámaras de simulación ambiental',
      'Equipos de prueba de durabilidad'
    ],
    capabilities: [
      'Monitoreo de calidad en tiempo real',
      'Pruebas y certificación por lotes',
      'Validación de rendimiento',
      'Pruebas de estabilidad',
      'Verificación de cumplimiento'
    ]
  },
  'research-development': {
    title: 'Investigación y Desarrollo',
    mainImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3',
    description:  'Nuestras instalaciones de LAinteq son el corazón de la innovación en AsphaltTech Solutions. Aquí, nuestro equipo de científicos e ingenieros expertos trabaja incansablemente para desarrollar nuevas formulaciones y mejorar los productos existentes, asegurando que nos mantengamos a la vanguardia de la tecnología de adhesivos.',
    features: [
     'Laboratorio de investigación avanzada de polímeros',
      'Instalaciones de ciencia de materiales',
      'Centro de desarrollo de prototipos',
      'Cámara de pruebas medioambientales',
      'Equipos de análisis químicos'
    ],
    capabilities: [
      'Desarrollo de nuevos productos',
      'Optimización de fórmulas',
      'Diseño de solución personalizada',
      'Estudios de impacto ambiental',
      'Investigación sobre mejora del rendimiento'
    ]
  },
  'production-facility': {
    title: 'Production Facility',
    mainImage: 'https://images.unsplash.com/photo-1581093806997-124204d9fa9d?ixlib=rb-4.0.3',
    description: 'Our modern production facility combines automation with precision to manufacture high-quality adhesives and paints. With strict quality control measures and efficient processes, we ensure consistent product quality and timely delivery.',
    features: [
      'Automated mixing systems',
      'Temperature-controlled reactors',
      'Advanced filtration systems',
      'Precision filling equipment',
      'Quality control checkpoints'
    ],
    capabilities: [
      'Large-scale production',
      'Custom batch processing',
      'Just-in-time manufacturing',
      'Environmental monitoring',
      'Quality assurance at every step'
    ]
  },
  'testing-laboratory': {
    title: 'Laboratorio de pruebas',
    mainImage: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3',
    description: 'Nuestro completo laboratorio de pruebas está equipado con la última tecnología para evaluar el rendimiento del producto en diversas condiciones. Simulamos escenarios del mundo real para garantizar que nuestros productos cumplan y superen los estándares de la industria.',
    features: [
      'Pruebas de resistencia a la intemperie',
      'Análisis de tensiones mecánicas',
      'Pruebas de resistencia química',
      'Equipos de simulación de envejecimiento',
      'Herramientas de medición del desempeño'
    ],
    capabilities: [
      'Pruebas de intemperismo acelerado',
      'Pruebas de resistencia y durabilidad',
      'Análisis de compatibilidad química',
      'Rendimiento en condiciones extremas',
      'Evaluación de estabilidad a largo plazo'
    ]
  },
  'quality-assurance': {
    title: 'Quality Assurance',
    mainImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Our Quality Assurance department ensures that every product leaving our facility meets our strict quality standards. Through comprehensive testing and documentation, we maintain consistent product excellence.',
    features: [
      'Documentation control system',
      'Process validation equipment',
      'Statistical analysis tools',
      'Compliance monitoring systems',
      'Calibration facilities'
    ],
    capabilities: [
      'Quality management system maintenance',
      'Process optimization',
      'Regulatory compliance verification',
      'Product certification',
      'Continuous improvement programs'
    ]
  }
};

const LabSection: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const section = sectionId ? labSections[sectionId as keyof typeof labSections] : null;
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!section) {
    return <div>Section not found</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-t-lg overflow-hidden">
        {isImageLoaded && (
          <AnimatedGridImage
            imageUrl={section.mainImage}
            cols={15}
            rows={10}
          />
        )}
        <img
          src={section.mainImage}
          alt={section.title}
          className="w-full h-full object-cover opacity-0"
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-0 left-0 p-8">
            <Link to="/" className="flex items-center text-yellow-400 hover:text-yellow-300 mb-4">
              <ArrowLeft size={20} className="mr-2" />
              Volver al Inicio
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">{section.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg mb-12">
            <p className="text-gray-700 text-lg leading-relaxed">{section.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Características</h2>
              <ul className="space-y-3">
                {section.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-yellow-500 mr-3"></span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Capacidades</h2>
              <ul className="space-y-3">
                {section.capabilities.map((capability, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-yellow-500 mr-3"></span>
                    <span className="text-gray-700">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabSection;