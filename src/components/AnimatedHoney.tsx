'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedHoney() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Ultra-realistic honey drop with macro details
    class MacroHoneyDrop {
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      opacity: number;
      viscosity: number;
      stretch: number;
      wobble: number;
      wobbleSpeed: number;
      surfaceTension: number;
      detailLevel: number;
      color: string;
      highlight: string;
      shadow: string;
      core: string;
      rim: string;
      suspended: boolean;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.3 - 100;
        this.size = Math.random() * 20 + 15;
        this.speed = Math.random() * 0.8 + 0.2;
        this.angle = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.3 + 0.7;
        this.viscosity = Math.random() * 0.2 + 0.8;
        this.stretch = Math.random() * 0.3 + 0.9;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.03 + 0.01;
        this.surfaceTension = Math.random() * 0.1 + 0.9;
        this.detailLevel = Math.random() * 0.3 + 0.7;
        this.suspended = Math.random() > 0.7; // Some drops are suspended
        
        // Ultra-realistic honey colors with macro detail
        const baseHue = Math.random() * 10 + 30;
        const baseSat = Math.random() * 15 + 75;
        const baseLight = Math.random() * 10 + 50;
        
        this.color = `hsl(${baseHue}, ${baseSat}%, ${baseLight}%)`;
        this.highlight = `hsl(${baseHue}, ${baseSat}%, ${baseLight + 20}%)`;
        this.shadow = `hsl(${baseHue}, ${baseSat}%, ${baseLight - 15}%)`;
        this.core = `hsl(${baseHue}, ${baseSat + 10}%, ${baseLight - 5}%)`;
        this.rim = `hsl(${baseHue}, ${baseSat - 5}%, ${baseLight + 10}%)`;
      }

      update() {
        if (!this.suspended) {
          this.y += this.speed * this.viscosity;
          this.speed *= 0.9995; // Very slow deceleration for honey
        }
        
        this.x += Math.sin(this.angle) * 0.2;
        this.angle += 0.005;
        this.wobble += this.wobbleSpeed;
        this.opacity -= 0.0005;

        // Surface tension effect
        this.stretch *= this.surfaceTension;

        if (this.y > canvas.height + 50) {
          this.y = -50;
          this.opacity = Math.random() * 0.3 + 0.7;
          this.speed = Math.random() * 0.8 + 0.2;
          this.suspended = Math.random() > 0.7;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        const wobbleX = Math.sin(this.wobble) * 1.5;
        const wobbleY = Math.cos(this.wobble) * 0.8;
        
        // Main honey drop body with ultra-realistic gradients
        const mainGradient = ctx.createRadialGradient(
          this.x + wobbleX - this.size * 0.4, 
          this.y + wobbleY - this.size * 0.6, 
          0,
          this.x + wobbleX, 
          this.y + wobbleY, 
          this.size
        );
        mainGradient.addColorStop(0, this.highlight);
        mainGradient.addColorStop(0.2, this.rim);
        mainGradient.addColorStop(0.4, this.color);
        mainGradient.addColorStop(0.7, this.core);
        mainGradient.addColorStop(1, this.shadow);
        
        ctx.fillStyle = mainGradient;
        
        // Draw main drop shape
        ctx.beginPath();
        ctx.ellipse(
          this.x + wobbleX, 
          this.y + wobbleY, 
          this.size, 
          this.size * this.stretch, 
          0, 0, Math.PI * 2
        );
        ctx.fill();
        
        // Ultra-realistic highlight with multiple layers
        const highlightGradient = ctx.createRadialGradient(
          this.x + wobbleX - this.size * 0.5, 
          this.y + wobbleY - this.size * 0.7, 
          0,
          this.x + wobbleX - this.size * 0.5, 
          this.y + wobbleY - this.size * 0.7, 
          this.size * 0.8
        );
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        highlightGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.3)');
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = highlightGradient;
        ctx.beginPath();
        ctx.ellipse(
          this.x + wobbleX - this.size * 0.5, 
          this.y + wobbleY - this.size * 0.7, 
          this.size * 0.5, 
          this.size * 1.2, 
          0, 0, Math.PI * 2
        );
        ctx.fill();
        
        // Secondary highlight for depth
        const secondaryHighlight = ctx.createRadialGradient(
          this.x + wobbleX - this.size * 0.3, 
          this.y + wobbleY - this.size * 0.4, 
          0,
          this.x + wobbleX - this.size * 0.3, 
          this.y + wobbleY - this.size * 0.4, 
          this.size * 0.4
        );
        secondaryHighlight.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        secondaryHighlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = secondaryHighlight;
        ctx.beginPath();
        ctx.ellipse(
          this.x + wobbleX - this.size * 0.3, 
          this.y + wobbleY - this.size * 0.4, 
          this.size * 0.3, 
          this.size * 0.8, 
          0, 0, Math.PI * 2
        );
        ctx.fill();
        
        // Ultra-realistic drop shadow with blur effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.beginPath();
        ctx.ellipse(
          this.x + wobbleX + 3, 
          this.y + wobbleY + 3, 
          this.size * 0.9, 
          this.size * this.stretch * 0.9, 
          0, 0, Math.PI * 2
        );
        ctx.fill();
        
        // Macro detail: Surface texture and bubbles
        if (this.detailLevel > 0.8) {
          // Add tiny surface bubbles
          for (let i = 0; i < 3; i++) {
            const bubbleX = this.x + wobbleX + (Math.random() - 0.5) * this.size * 0.8;
            const bubbleY = this.y + wobbleY + (Math.random() - 0.5) * this.size * 0.8;
            const bubbleSize = Math.random() * 2 + 1;
            
            const bubbleGradient = ctx.createRadialGradient(
              bubbleX - bubbleSize * 0.3, bubbleY - bubbleSize * 0.3, 0,
              bubbleX, bubbleY, bubbleSize
            );
            bubbleGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
            bubbleGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = bubbleGradient;
            ctx.beginPath();
            ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        ctx.restore();
      }
    }

    // Cinematic golden shimmer particles
    class CinematicParticle {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      life: number;
      sparkle: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 6 + 2;
        this.speed = Math.random() * 1.2 + 0.2;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.life = Math.random() * 200 + 150;
        this.sparkle = Math.random() * Math.PI * 2;
        this.color = ['#FFD700', '#FFA500', '#FF8C00', '#FFB347'][Math.floor(Math.random() * 4)];
      }

      update() {
        this.y -= this.speed;
        this.opacity -= 0.003;
        this.life--;
        this.sparkle += 0.15;

        if (this.y < -10 || this.life <= 0) {
          this.y = canvas.height + 10;
          this.opacity = Math.random() * 0.8 + 0.2;
          this.life = Math.random() * 200 + 150;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity * (0.6 + 0.4 * Math.sin(this.sparkle));
        
        // Cinematic golden shimmer with multiple layers
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0, this.x, this.y, this.size
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.3, '#FFD700');
        gradient.addColorStop(0.7, '#FFA500');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add sparkle effect
        if (Math.sin(this.sparkle) > 0.8) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }
    }

    // Create honey drops and particles
    const honeyDrops: MacroHoneyDrop[] = [];
    const particles: CinematicParticle[] = [];

    for (let i = 0; i < 8; i++) {
      honeyDrops.push(new MacroHoneyDrop());
    }

    for (let i = 0; i < 20; i++) {
      particles.push(new CinematicParticle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles (cinematic shimmer effect)
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw honey drops
      honeyDrops.forEach(drop => {
        drop.update();
        drop.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
