"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

interface Spark {
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const sparks = useRef<Spark[]>([]);
  const animationFrameId = useRef<number>(0);
  const mousePosition = useRef({ x: 0, y: 0 });
  const frameCount = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const initParticles = () => {
      particles.current = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 12), 80);
      const colors = ["#FF4655", "#1F85DE", "#FFFFFF", "#FF465580", "#1F85DE80"];

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.3,
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: (Math.random() - 0.5) * 0.25,
          opacity: Math.random() * 0.4 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
        });
      }
    };

    const spawnSpark = () => {
      const colors = ["#FF4655", "#1F85DE", "#FFD700"];
      sparks.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        opacity: 1,
        life: 0,
        maxLife: 30 + Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const drawHexGrid = () => {
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 0.5;
      const hexSize = 40;
      const hexH = hexSize * Math.sqrt(3);

      for (let row = -1; row < canvas.height / hexH + 1; row++) {
        for (let col = -1; col < canvas.width / (hexSize * 1.5) + 1; col++) {
          const x = col * hexSize * 1.5;
          const y = row * hexH + (col % 2 === 0 ? 0 : hexH / 2);

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + hexSize * Math.cos(angle);
            const hy = y + hexSize * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount.current++;

      // Draw hex grid
      drawHexGrid();

      // Spawn sparks occasionally
      if (frameCount.current % 60 === 0 && sparks.current.length < 5) {
        spawnSpark();
      }

      // Update & draw particles
      particles.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulse += particle.pulseSpeed;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Mouse interaction
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          const angle = Math.atan2(dy, dx);
          const force = (120 - distance) / 2000;
          particle.speedX -= Math.cos(angle) * force;
          particle.speedY -= Math.sin(angle) * force;
        }

        // Pulsing opacity
        const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.15;

        // Draw with glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = Math.max(0, pulseOpacity);
        ctx.shadowBlur = 6;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw connections
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 90) {
            const opacity = (1 - distance / 90) * 0.08;
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.moveTo(particles.current[i].x, particles.current[i].y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & draw sparks
      sparks.current = sparks.current.filter((spark) => {
        spark.life++;
        spark.opacity = 1 - spark.life / spark.maxLife;

        if (spark.life >= spark.maxLife) return false;

        const progress = spark.life / spark.maxLife;
        const size = spark.size * (1 - progress * 0.5);

        ctx.globalAlpha = spark.opacity * 0.8;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, size, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = spark.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Outer ring
        ctx.globalAlpha = spark.opacity * 0.3;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, size * 3, 0, Math.PI * 2);
        ctx.strokeStyle = spark.color;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        return true;
      });

      ctx.globalAlpha = 1;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
}
