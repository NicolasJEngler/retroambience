import React, { useEffect, useRef } from 'react';

const PARTICLE_TYPES = {
  rain: { color: '#a0d8ef', size: 2, speed: 15, count: 200 },
  dust: { color: '#d2b48c', size: 1, speed: 2, count: 100 },
  fireflies: { color: '#ffff00', size: 2, speed: 1, count: 50 },
  snow: { color: '#ffffff', size: 3, speed: 2, count: 150 },
  bubbles: { color: '#add8e6', size: 8, speed: 1, count: 40 },
  leaves: { color: '#228b22', size: 6, speed: 2, count: 70 }
};

function OverlayEffect({ type }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function createParticles() {
      const { color, size, speed, count } = PARTICLE_TYPES[type];
      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * size + size / 2,
          speed: Math.random() * speed + 1,
          color: color,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: Math.random() * 0.02 - 0.01,
          amplitude: Math.random() * 20 + 10,
        });
      }
    }

    function drawParticle(particle) {
      ctx.fillStyle = particle.color;
      
      switch(type) {
        case 'snow':
          drawSnowflake(particle);
          break;
        case 'bubbles':
          drawBubble(particle);
          break;
        case 'fireflies':
          drawFirefly(particle);
          break;
        case 'leaves':
          drawLeaf(particle);
          break;
        default:
          ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      }
    }

    function drawSnowflake(particle) {
      ctx.beginPath();
      for(let i = 0; i < 6; i++) {
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x + particle.size * Math.cos(Math.PI * 2 * i / 6), 
                   particle.y + particle.size * Math.sin(Math.PI * 2 * i / 6));
      }
      ctx.strokeStyle = particle.color;
      ctx.stroke();
    }

    function drawBubble(particle) {
      const pixelSize = Math.max(1, Math.floor(particle.size / 4));
      const centerX = Math.floor(particle.x / pixelSize) * pixelSize;
      const centerY = Math.floor(particle.y / pixelSize) * pixelSize;
      const radius = Math.floor(particle.size / 2 / pixelSize) * pixelSize;

      // Outer circle
      for (let y = -radius; y <= radius; y += pixelSize) {
        for (let x = -radius; x <= radius; x += pixelSize) {
          if (x*x + y*y <= radius*radius && x*x + y*y > (radius-pixelSize)*(radius-pixelSize)) {
            ctx.fillRect(centerX + x, centerY + y, pixelSize, pixelSize);
          }
        }
      }

      // Inner highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillRect(centerX - pixelSize, centerY - radius + pixelSize, pixelSize, pixelSize);
      ctx.fillRect(centerX, centerY - radius, pixelSize, pixelSize);
    }

    function drawFirefly(particle) {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 0, ${0.3 + Math.random() * 0.7})`;
      ctx.fill();
    }

    function drawLeaf(particle) {
      const pixelSize = Math.max(1, Math.floor(particle.size / 3));
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.angle);

      // Leaf shape
      ctx.fillRect(-pixelSize, -pixelSize, pixelSize, pixelSize);
      ctx.fillRect(0, -pixelSize, pixelSize, pixelSize);
      ctx.fillRect(-pixelSize, 0, pixelSize, pixelSize);
      ctx.fillRect(0, 0, pixelSize, pixelSize);
      ctx.fillRect(-pixelSize * 2, 0, pixelSize, pixelSize);
      ctx.fillRect(pixelSize, 0, pixelSize, pixelSize);

      // Stem
      ctx.fillRect(0, pixelSize, pixelSize, pixelSize);

      ctx.restore();
    }

    function updateParticle(particle) {
      switch(type) {
        case 'rain':
          particle.y += particle.speed;
          if (particle.y > canvas.height) {
            particle.y = -particle.size;
            particle.x = Math.random() * canvas.width;
          }
          break;
        case 'dust':
          particle.x += Math.sin(particle.angle) * 0.5;
          particle.y += particle.speed;
          particle.angle += 0.01;
          if (particle.y > canvas.height) {
            particle.y = -particle.size;
            particle.x = Math.random() * canvas.width;
          }
          break;
        case 'fireflies':
          particle.x += (Math.random() - 0.5) * 2;
          particle.y += (Math.random() - 0.5) * 2;
          if (particle.x < 0 || particle.x > canvas.width) particle.x = Math.random() * canvas.width;
          if (particle.y < 0 || particle.y > canvas.height) particle.y = Math.random() * canvas.height;
          break;
        case 'snow':
          particle.x += Math.sin(particle.angle) * 0.5;
          particle.y += particle.speed;
          particle.angle += 0.01;
          if (particle.y > canvas.height) {
            particle.y = -particle.size;
            particle.x = Math.random() * canvas.width;
          }
          break;
        case 'bubbles':
          particle.x += Math.sin(particle.angle) * particle.amplitude / 20;
          particle.y -= particle.speed;
          particle.angle += particle.angleSpeed;
          if (particle.y < -particle.size) {
            particle.y = canvas.height + particle.size;
            particle.x = Math.random() * canvas.width;
          }
          break;
        case 'leaves':
          particle.x += Math.sin(particle.angle) * particle.amplitude / 10;
          particle.y += particle.speed;
          particle.angle += particle.angleSpeed;
          if (particle.y > canvas.height) {
            particle.y = -particle.size;
            particle.x = Math.random() * canvas.width;
          }
          break;
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        drawParticle(particle);
        updateParticle(particle);
      });
      requestAnimationFrame(animate);
    }

    createParticles();
    animate();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animate);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [type]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

export default OverlayEffect;