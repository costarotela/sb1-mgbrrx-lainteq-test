import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Beaker, TestTube, Thermometer, Droplet, Scale, AlertTriangle, Info } from 'lucide-react';

interface TechnicalDetail {
  id: number;
  title: string;
  content: string[];
  icon: React.ReactNode;
}

const technicalDetails: { [key: string]: TechnicalDetail[] } = {
  "adhesivos-pvc": [
    {
      id: 1,
      title: "Descripción General",
      content: [
        "Los adhesivos para PVC son formulados bajo normas IRAM 13.385 y ASTM.",
        "Utilizan mezclas de disolventes especiales que aseguran la fusión del PVC.",
        "Contienen un alto contenido de polímeros que logran una adherencia perfecta entre las partes a unir."
      ],
      icon: <Info className="w-6 h-6 text-yellow-500" />
    },
    {
      id: 2,
      title: "Características Técnicas",
      content: [
        "Contenido de Polímero: Alto",
        "Viscosidad: Media-Alta",
        "Color: Disponible en varios tonos según el tipo",
        "Tiempo de secado inicial: 30 minutos",
        "Curado completo: 24 horas"
      ],
      icon: <Beaker className="w-6 h-6 text-yellow-500" />
    },
    {
      id: 3,
      title: "Aplicaciones",
      content: [
        "Conducciones sanitarias de grandes diámetros",
        "Fluidos bajo presión",
        "Canaletas y sistemas de desagüe",
        "Instalaciones de riego y piscinas",
        "Reparaciones y relleno de juntas imperfectas"
      ],
      icon: <TestTube className="w-6 h-6 text-yellow-500" />
    },
    {
      id: 4,
      title: "Condiciones de Uso",
      content: [
        "Temperatura de aplicación: 5°C a 35°C",
        "Humedad relativa máxima: 85%",
        "Temperatura de servicio: -20°C a 60°C",
        "Resistencia a la presión: Hasta 16 bar"
      ],
      icon: <Thermometer className="w-6 h-6 text-yellow-500" />
    },
    {
      id: 5,
      title: "Propiedades Físicas",
      content: [
        "Densidad: 0.95 ± 0.02 g/cm³",
        "Contenido de sólidos: > 20%",
        "Resistencia a la tracción: > 50 kg/cm²",
        "Resistencia química: Excelente"
      ],
      icon: <Scale className="w-6 h-6 text-yellow-500" />
    },
    {
      id: 6,
      title: "Modo de Empleo",
      content: [
        "1. Limpiar y desengrasar las superficies",
        "2. Lijar suavemente para eliminar el brillo",
        "3. Aplicar el adhesivo uniformemente",
        "4. Unir las piezas inmediatamente",
        "5. Mantener presión durante 30 segundos",
        "6. Esperar 24 horas para el curado completo"
      ],
      icon: <Droplet className="w-6 h-6 text-yellow-500" />
    },
    {
      id: 7,
      title: "Precauciones",
      content: [
        "Producto altamente inflamable",
        "Usar en áreas bien ventiladas",
        "Mantener alejado de fuentes de calor",
        "Usar equipo de protección personal",
        "No ingerir ni inhalar los vapores"
      ],
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />
    }
  ]
};

const TechnicalSheet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState(0);
  const details = technicalDetails[id || ""] || technicalDetails["adhesivos-pvc"];

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-r from-gray-900 to-gray-800 rounded-t-lg overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent"></div>
        </div>
        <div className="relative h-full flex flex-col justify-between p-6">
          <Link to="/products" className="flex items-center text-yellow-400 hover:text-yellow-300">
            <ArrowLeft size={20} className="mr-2" />
            Volver a Productos
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Ficha Técnica</h1>
            <p className="text-gray-300">Adhesivos para PVC</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {details.map((detail, index) => (
                <button
                  key={detail.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === index
                      ? 'bg-yellow-500 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {detail.icon}
                  <span className="ml-3 font-medium">{detail.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                {details[activeTab].icon}
                <span className="ml-2">{details[activeTab].title}</span>
              </h2>
              <div className="space-y-4">
                {details[activeTab].content.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-yellow-500 mr-3"></div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSheet;