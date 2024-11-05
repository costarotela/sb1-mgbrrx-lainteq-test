import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

interface AnimatedGridImageProps {
  imageUrl: string;
  cols?: number;
  rows?: number;
}

const AnimatedGridImage: React.FC<AnimatedGridImageProps> = ({ 
  imageUrl, 
  cols = 15, 
  rows = 10 
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    // Clear existing grid items
    gridRef.current.innerHTML = '';

    // Calculate cell dimensions based on container size
    const containerWidth = gridRef.current.clientWidth;
    const containerHeight = gridRef.current.clientHeight;
    const cellWidth = containerWidth / cols;
    const cellHeight = containerHeight / rows;

    // Create grid items
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cell = document.createElement('div');
        cell.className = 'grid-item';
        
        // Calculate background position to show correct portion of image
        const bgPosX = -x * cellWidth;
        const bgPosY = -y * cellHeight;
        
        Object.assign(cell.style, {
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: `${containerWidth}px ${containerHeight}px`,
          backgroundPosition: `${bgPosX}px ${bgPosY}px`,
          width: '100%',
          height: '100%'
        });

        gridRef.current.appendChild(cell);
      }
    }

    // Animate grid
    const animation = anime({
      targets: '.grid-item',
      scale: [
        { value: 0.1, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 }
      ],
      opacity: [
        { value: 0, duration: 0 },
        { value: 1, duration: 800 }
      ],
      delay: anime.stagger(50, { 
        grid: [cols, rows], 
        from: 'center',
        axis: 'x'
      }),
      complete: function(anim) {
        // Trigger a subtle continuous animation
        anime({
          targets: '.grid-item',
          translateZ: [
            { value: 10, duration: 1000, delay: anime.stagger(100, { grid: [cols, rows], from: 'center' }) },
            { value: 0, duration: 1000 }
          ],
          scale: [
            { value: 1.1, duration: 1000, delay: anime.stagger(100, { grid: [cols, rows], from: 'center' }) },
            { value: 1, duration: 1000 }
          ],
          easing: 'easeInOutSine',
          loop: true
        });
      }
    });

    return () => {
      animation.pause();
    };
  }, [imageUrl, cols, rows]);

  return (
    <div 
      ref={gridRef} 
      className="grid-container"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: '2px',
        backgroundColor: '#000',
        padding: '2px',
        borderRadius: '10px',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        perspective: '1000px'
      }}
    />
  );
};

export default AnimatedGridImage;