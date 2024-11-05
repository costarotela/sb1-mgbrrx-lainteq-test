import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create particle
    const createParticle = (x: number, y: number, isMouseParticle = false): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = isMouseParticle ? Math.random() * 2 + 2 : Math.random() * 1 + 0.5;
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: isMouseParticle ? Math.random() * 3 + 2 : Math.random() * 2 + 1,
        color: `rgba(251, 191, 36, ${isMouseParticle ? 0.8 : 0.4})`,
        life: 0,
        maxLife: isMouseParticle ? 40 : 120
      };
    };

    // Update particle
    const updateParticle = (particle: Particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;

      // Add some wavey motion
      particle.x += Math.sin(particle.life * 0.05) * 0.2;

      // Fade out based on life
      const opacity = Math.max(0, 1 - particle.life / particle.maxLife);
      particle.color = `rgba(251, 191, 36, ${opacity * 0.4})`;

      return particle.life < particle.maxLife;
    };

    // Draw particle
    const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      // Add glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(251, 191, 36, 0.5)';
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };

      // Create particles on mouse move
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push(
          createParticle(
            mousePosition.current.x + (Math.random() - 0.5) * 20,
            mousePosition.current.y + (Math.random() - 0.5) * 20,
            true
          )
        );
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrame: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create new particles randomly
      if (Math.random() < 0.1) {
        particlesRef.current.push(
          createParticle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        const isAlive = updateParticle(particle);
        if (isAlive) {
          drawParticle(ctx, particle);
        }
        return isAlive;
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8,
        background: 'transparent'
      }}
    />
  );
};

export default ParticleBackground;