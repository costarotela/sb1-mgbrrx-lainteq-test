import React, { useEffect, useRef } from 'react';

interface Props {
  text: string;
}

const TextLightning: React.FC<Props> = ({ text }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lightnings = useRef<any[]>([]);
  const frame = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const textElement = textRef.current;
    if (!canvas || !textElement) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const rect = textElement.getBoundingClientRect();
      canvas.width = rect.width + 200;
      canvas.height = rect.height + 200;
      canvas.style.top = `${rect.top - 100}px`;
      canvas.style.left = `${rect.left - 100}px`;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create realistic lightning path
    const createLightningPath = (x: number, y: number, angle: number, branches: number, detail: number = 0.5) => {
      const points: { x: number; y: number }[] = [];
      const length = Math.random() * 30 + 20;
      const steps = Math.floor(length * detail);
      const angleVariation = 0.5;
      
      let currentX = x;
      let currentY = y;
      let currentAngle = angle;

      for (let i = 0; i < steps; i++) {
        points.push({ x: currentX, y: currentY });
        
        const stepLength = length / steps;
        currentAngle += (Math.random() - 0.5) * angleVariation;
        
        currentX += Math.cos(currentAngle) * stepLength;
        currentY += Math.sin(currentAngle) * stepLength;
      }

      points.push({ x: currentX, y: currentY });

      return {
        points,
        branches: branches > 0 ? Array(Math.floor(Math.random() * 2) + 1)
          .fill(null)
          .map(() => {
            const branchPoint = Math.floor(Math.random() * (points.length - 1));
            const branchAngle = currentAngle + (Math.random() - 0.5) * Math.PI * 0.5;
            return createLightningPath(
              points[branchPoint].x,
              points[branchPoint].y,
              branchAngle,
              branches - 1,
              detail * 0.8
            );
          }) : [],
        life: 1,
        maxLife: Math.random() * 5 + 3
      };
    };

    // Draw realistic lightning
    const drawLightningPath = (path: any, alpha: number) => {
      ctx.beginPath();
      ctx.moveTo(path.points[0].x, path.points[0].y);
      
      for (let i = 1; i < path.points.length; i++) {
        ctx.lineTo(path.points[i].x, path.points[i].y);
      }

      // Core lightning (bright white)
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner glow (yellow)
      ctx.beginPath();
      ctx.moveTo(path.points[0].x, path.points[0].y);
      for (let i = 1; i < path.points.length; i++) {
        ctx.lineTo(path.points[i].x, path.points[i].y);
      }
      ctx.strokeStyle = `rgba(251, 191, 36, ${alpha * 0.8})`;
      ctx.lineWidth = 4;
      ctx.stroke();

      // Outer glow (blue tint)
      ctx.beginPath();
      ctx.moveTo(path.points[0].x, path.points[0].y);
      for (let i = 1; i < path.points.length; i++) {
        ctx.lineTo(path.points[i].x, path.points[i].y);
      }
      ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.4})`;
      ctx.lineWidth = 6;
      ctx.stroke();

      // Draw branches
      path.branches.forEach((branch: any) => {
        drawLightningPath(branch, alpha * 0.7);
      });
    };

    // Create flash effect
    const createFlash = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame.current++;

      // Create new lightning
      if (frame.current % 15 === 0 && Math.random() > 0.7) {
        const rect = textElement.getBoundingClientRect();
        const startX = Math.random() * rect.width + 50;
        const startY = -50;
        const angle = Math.PI / 2 + (Math.random() - 0.5) * 0.5;
        
        lightnings.current.push(createLightningPath(startX, startY, angle, 2));
        createFlash();
      }

      // Update and draw lightnings
      lightnings.current = lightnings.current.filter(bolt => {
        bolt.life += 0.2;
        const alpha = Math.max(0, 1 - bolt.life / bolt.maxLife);
        
        if (alpha > 0) {
          drawLightningPath(bolt, alpha);
          return true;
        }
        return false;
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none"
        style={{ zIndex: 1 }}
      />
      <h1 
        ref={textRef}
        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 relative z-0"
        style={{ 
          textShadow: `
            0 0 10px rgba(251, 191, 36, 0.5),
            0 0 20px rgba(251, 191, 36, 0.3),
            0 0 30px rgba(59, 130, 246, 0.3)
          `
        }}
      >
        {text}
      </h1>
    </div>
  );
};

export default TextLightning;