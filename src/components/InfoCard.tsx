import React, { useState, useEffect, useRef } from 'react';
import { FileText } from 'lucide-react';

const InfoCard: React.FC = () => {
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lines = text.split('\n\n');

  // Load the text file
  useEffect(() => {
    fetch('/src/detalle_informativo.txt')
      .then(response => response.text())
      .then(content => setText(content));
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!lines[currentLineIndex]) return;

    let currentText = '';
    let charIndex = 0;
    const line = lines[currentLineIndex];

    const typeInterval = setInterval(() => {
      if (charIndex < line.length) {
        currentText += line[charIndex];
        setDisplayText(currentText);
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentLineIndex((prev) => (prev + 1) % lines.length);
        }, 3000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentLineIndex, lines]);

  // Auto-scroll effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollHeight = container.scrollHeight;
    const duration = 130000;
    let startTime: number | null = null;
    let animationFrame: number;

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = (progress % duration) / duration;
      const position = scrollHeight * percentage;
      
      container.scrollTop = position;

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [text]);

  return (
    <div className="relative bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm transform hover:scale-[1.02] transition-transform duration-300">
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-500/20 to-yellow-600/20 animate-pulse"></div>
      
      {/* Content container */}
      <div className="relative p-8 bg-gray-900/80 m-[2px] rounded-xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <FileText className="text-yellow-400 mr-3 h-6 w-6" />
          <h3 className="text-2xl font-bold text-white">Información Técnica</h3>
        </div>

        {/* Scrolling content with typewriter effect */}
        <div 
          ref={containerRef}
          className="h-[400px] overflow-hidden mask-linear-gradient"
        >
          <div className="space-y-6">
            {lines.map((line, index) => (
              <div 
                key={index}
                className={`transition-opacity duration-1000 ${
                  index === currentLineIndex ? 'opacity-100' : 'opacity-40'
                }`}
              >
                {index === currentLineIndex ? (
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {displayText}
                    <span className="animate-pulse ml-1">|</span>
                  </p>
                ) : (
                  <p className="text-gray-300 leading-relaxed text-lg">{line}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default InfoCard;