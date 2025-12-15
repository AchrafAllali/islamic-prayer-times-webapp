import React, { useEffect, useRef } from 'react';

function IslamicAnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Définir la taille du canvas
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Couleurs islamiques
    const colors = [
      'rgba(16, 185, 129, 0.3)',  // Emerald
      'rgba(20, 184, 166, 0.3)',  // Teal
      'rgba(34, 197, 94, 0.2)',   // Green
      'rgba(59, 130, 246, 0.2)',  // Blue
    ];

    // Étoiles à 8 branches (étoile islamique)
    const stars = [];
    const numStars = 15;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    // Motifs géométriques flottants
    const geometricShapes = [];
    const numShapes = 8;

    for (let i = 0; i < numShapes; i++) {
      geometricShapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 60 + 40,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.1,
        floatSpeed: Math.random() * 0.5 + 0.2,
      });
    }

    // Fonction pour dessiner une étoile à 8 branches
    const drawStar = (x, y, size, rotation, color, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2;

      const outerRadius = size;
      const innerRadius = size * 0.4;
      const spikes = 8;
      const step = Math.PI / spikes;

      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = i * step - Math.PI / 2;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    // Fonction pour dessiner un motif géométrique (hexagone avec motif)
    const drawGeometricShape = (x, y, size, rotation, color, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;

      const sides = 6;
      const angleStep = (Math.PI * 2) / sides;

      // Dessiner l'hexagone extérieur
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.stroke();

      // Dessiner le motif intérieur
      ctx.beginPath();
      const innerSize = size * 0.6;
      for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const px = Math.cos(angle) * innerSize;
        const py = Math.sin(angle) * innerSize;
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    };

    // Fonction pour dessiner des motifs circulaires
    const drawCircularPattern = (x, y, size, rotation, color, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;

      // Cercles concentriques
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, size * (i * 0.3), 0, Math.PI * 2);
        ctx.stroke();
      }

      // Lignes radiales
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
        ctx.stroke();
      }

      ctx.restore();
    };

    // Fonction d'animation
    const animate = () => {
      // Effacer le canvas avec un overlay semi-transparent pour l'effet de traînée
      ctx.fillStyle = 'rgba(6, 78, 59, 0.05)'; // Fond teal foncé
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animer et dessiner les étoiles
      stars.forEach((star) => {
        star.rotation += star.rotationSpeed;
        drawStar(star.x, star.y, star.size, star.rotation, star.color, star.opacity);
      });

      // Animer et dessiner les formes géométriques
      geometricShapes.forEach((shape, index) => {
        shape.rotation += shape.rotationSpeed;
        shape.y += Math.sin(Date.now() * 0.001 + index) * shape.floatSpeed;

        // Réinitialiser la position si elle sort de l'écran
        if (shape.y > canvas.height + 100) {
          shape.y = -100;
        }

        if (index % 2 === 0) {
          drawGeometricShape(shape.x, shape.y, shape.size, shape.rotation, shape.color, shape.opacity);
        } else {
          drawCircularPattern(shape.x, shape.y, shape.size, shape.rotation, shape.color, shape.opacity);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
      }}
    />
  );
}

export default IslamicAnimatedBackground;


