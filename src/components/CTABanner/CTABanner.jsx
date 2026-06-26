import React, { useEffect, useRef } from 'react';
import './CTABanner.css';

// 3D Shape geometry vertices and edges
const cubeVertices = [
  {x: -1, y: -1, z: -1}, {x: 1, y: -1, z: -1}, {x: 1, y: 1, z: -1}, {x: -1, y: 1, z: -1},
  {x: -1, y: -1, z: 1},  {x: 1, y: -1, z: 1},  {x: 1, y: 1, z: 1},  {x: -1, y: 1, z: 1}
];
const cubeEdges = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7]
];

const octVertices = [
  {x: 0, y: -1.414, z: 0},
  {x: 0, y: 1.414, z: 0},
  {x: -1, y: 0, z: -1}, {x: 1, y: 0, z: -1},
  {x: 1, y: 0, z: 1},   {x: -1, y: 0, z: 1}
];
const octEdges = [
  [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [1, 3], [1, 4], [1, 5],
  [2, 3], [3, 4], [4, 5], [5, 2]
];

// Helper functions for 3D rotation matrix transformations
const rotateX = (v, a) => {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: v.x, y: v.y * c - v.z * s, z: v.y * s + v.z * c };
};
const rotateY = (v, a) => {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: v.x * c + v.z * s, y: v.y, z: -v.x * s + v.z * c };
};
const rotateZ = (v, a) => {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c, z: v.z };
};

export default function CTABanner() {
  const canvasRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for signing up!');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let shapes = [];
    const shapeCount = 7;

    const resizeCanvas = () => {
      const rect = canvas.parentNode.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize floating 3D shapes
    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * canvas.width - canvas.width / 2, // Horizontal coordinate relative to center
        y: (Math.random() - 0.5) * canvas.height * 0.7,      // Vertical offset from center
        z: Math.random() * 300 - 100,                        // Depth range: -100 to 200
        size: Math.random() * 15 + 18,                       // Size: 18 to 33
        speedX: Math.random() * 0.22 + 0.12,                 // Slow drift from left to right
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        rotSpeedX: (Math.random() - 0.5) * 0.007,
        rotSpeedY: (Math.random() - 0.5) * 0.007,
        rotSpeedZ: (Math.random() - 0.5) * 0.007,
        type: Math.random() > 0.5 ? 'cube' : 'octahedron'
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach(shape => {
        // Increment rotations
        shape.rotX += shape.rotSpeedX;
        shape.rotY += shape.rotSpeedY;
        shape.rotZ += shape.rotSpeedZ;

        // Move from left to right
        shape.x += shape.speedX;

        // Wrap around boundaries
        if (shape.x > canvas.width / 2 + 100) {
          shape.x = -canvas.width / 2 - 100;
          shape.y = (Math.random() - 0.5) * canvas.height * 0.7;
          shape.z = Math.random() * 300 - 100;
          shape.size = Math.random() * 15 + 18;
          shape.speedX = Math.random() * 0.22 + 0.12;
        }

        const verts = shape.type === 'cube' ? cubeVertices : octVertices;
        const edges = shape.type === 'cube' ? cubeEdges : octEdges;

        // Rotate and offset vertices in 3D space
        const rotated = verts.map(v => {
          let p = { x: v.x * shape.size, y: v.y * shape.size, z: v.z * shape.size };
          p = rotateX(p, shape.rotX);
          p = rotateY(p, shape.rotY);
          p = rotateZ(p, shape.rotZ);
          return {
            x: p.x + shape.x,
            y: p.y + shape.y,
            z: p.z + shape.z
          };
        });

        // Project vertices onto 2D perspective plane
        const fov = 360;
        const projected = rotated.map(v => {
          const scale = fov / (fov + v.z);
          return {
            x: v.x * scale + canvas.width / 2,
            y: v.y * scale + canvas.height / 2,
            scale: scale
          };
        });

        const scaleCenter = fov / (fov + shape.z);
        const projCenterX = shape.x * scaleCenter + canvas.width / 2;
        const projCenterY = shape.y * scaleCenter + canvas.height / 2;

        // 1. Draw glowing background halo for each shape
        const glowRad = shape.size * 2.2 * scaleCenter;
        if (glowRad > 0) {
          const glowGrad = ctx.createRadialGradient(projCenterX, projCenterY, 0, projCenterX, projCenterY, glowRad);
          glowGrad.addColorStop(0, `rgba(255, 200, 1, ${0.09 * scaleCenter})`);
          glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(projCenterX, projCenterY, glowRad, 0, Math.PI * 2);
          ctx.fill();
        }

        // 2. Draw wireframe edges
        ctx.lineWidth = 1.0 * scaleCenter;
        ctx.strokeStyle = `rgba(255, 200, 1, ${0.35 * scaleCenter})`;
        
        edges.forEach(edge => {
          const p1 = projected[edge[0]];
          const p2 = projected[edge[1]];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section id="cta-banner" aria-label="Call to Action" className="cta-banner-section reveal">
      <canvas ref={canvasRef} className="cta-canvas" aria-hidden="true" />
      <div className="cta-banner-content">
        <h2 className="cta-headline">Ready to automate?</h2>
        <p className="cta-sub">
          Deploy your first industrial-grade data pipeline in under 5 minutes. No credit card required for the baseline tier.
        </p>
        
        <form className="cta-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Enter your work email" 
            className="cta-input" 
            required 
            aria-label="Work email address"
          />
          <button type="submit" className="cta-submit-btn">PROVISION INSTANCE</button>
        </form>
      </div>
    </section>
  );
}
