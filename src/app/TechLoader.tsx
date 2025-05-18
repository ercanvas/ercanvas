"use client";
import { useEffect, useRef, useState } from "react";

export default function TechLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200); // 2.2s animasyon
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    // Circuit lines data
    const lines: { x: number; y: number; dx: number; dy: number; len: number; progress: number; speed: number }[] = [];
    const lineCount = Math.floor((w * h) / 12000);
    for (let i = 0; i < lineCount; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const angle = Math.random() * Math.PI * 2;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      const len = 80 + Math.random() * 120;
      const speed = 1.5 + Math.random() * 1.5;
      lines.push({ x, y, dx, dy, len, progress: 0, speed });
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
      for (const line of lines) {
        if (!ctx) continue;
        ctx.save();
        ctx.strokeStyle = "#00ff66";
        ctx.shadowColor = "#00ff66";
        ctx.shadowBlur = 8;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(
          line.x + line.dx * Math.min(line.progress, line.len),
          line.y + line.dy * Math.min(line.progress, line.len)
        );
        ctx.stroke();
        ctx.restore();
        // Draw circuit dots
        if (line.progress > 10) {
          if (!ctx) continue;
          ctx.save();
          ctx.beginPath();
          ctx.arc(
            line.x + line.dx * Math.min(line.progress, line.len),
            line.y + line.dy * Math.min(line.progress, line.len),
            4,
            0,
            2 * Math.PI
          );
          ctx.fillStyle = "#00ff66";
          ctx.shadowColor = "#00ff66";
          ctx.shadowBlur = 12;
          ctx.globalAlpha = 0.7;
          ctx.fill();
          ctx.restore();
        }
        // Animate
        if (line.progress < line.len) {
          line.progress += line.speed;
        } else {
          // Reset for looping effect
          line.x = Math.random() * w;
          line.y = Math.random() * h;
          const angle = Math.random() * Math.PI * 2;
          line.dx = Math.cos(angle);
          line.dy = Math.sin(angle);
          line.len = 80 + Math.random() * 120;
          line.progress = 0;
          line.speed = 1.5 + Math.random() * 1.5;
        }
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationId);
  }, [loading]);

  if (!loading) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" style={{ display: 'block' }} />
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Optionally, a logo or text can be added here */}
      </div>
    </div>
  );
}

// Tailwind animasyonları için globals.css'e ekleyin:
// .animate-spin-slow { animation: spin 2.5s linear infinite; }
// .animate-spin-reverse-slow { animation: spin-reverse 3.2s linear infinite; }
// @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
