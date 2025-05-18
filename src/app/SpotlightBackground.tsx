"use client";
import { useEffect, useRef } from "react";

export default function SpotlightBackground({ nameRef, setSpotOnNameAction }: { nameRef: React.RefObject<HTMLHeadingElement>, setSpotOnNameAction: (v: boolean) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    // Responsive resize
    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", handleResize);

    // Spotlights
    const spotCount = 3;
    const spots = Array.from({ length: spotCount }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      dx: (Math.random() - 0.5) * 2.2,
      dy: (Math.random() - 0.5) * 2.2,
      r: 120 + Math.random() * 60,
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      // Daha şeffaf arka plan
      ctx.save();
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = "#18181b";
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
      // Spotlights (daha güçlü ve parlak)
      for (const spot of spots) {
        if (!ctx) continue;
        const grad = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.r);
        grad.addColorStop(0, "rgba(0,255,102,0.85)");
        grad.addColorStop(0.25, "rgba(0,255,102,0.45)");
        grad.addColorStop(0.5, "rgba(0,255,102,0.18)");
        grad.addColorStop(1, "rgba(0,255,102,0)");
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(spot.x, spot.y, spot.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.shadowColor = "#00ff66";
        ctx.shadowBlur = 60;
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
        // Hareket
        spot.x += spot.dx;
        spot.y += spot.dy;
        if (spot.x < spot.r || spot.x > w - spot.r) spot.dx *= -1;
        if (spot.y < spot.r || spot.y > h - spot.r) spot.dy *= -1;
      }
      // İsimle çarpışma kontrolü
      if (nameRef.current) {
        const rect = nameRef.current.getBoundingClientRect();
        const nameX = rect.left + rect.width / 2;
        const nameY = rect.top + rect.height / 2;
        let hit = false;
        for (const spot of spots) {
          const dist = Math.sqrt((nameX - spot.x) ** 2 + (nameY - spot.y) ** 2);
          if (dist < spot.r * 0.7) hit = true;
        }
        setSpotOnNameAction(hit);
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [nameRef, setSpotOnNameAction]);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-20 pointer-events-none" style={{ pointerEvents: 'none' }} />
  );
}
