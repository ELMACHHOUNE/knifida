import { useState, useEffect } from "react";

const particles = Array.from({ length: 15 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 2}s`,
  duration: 3 + Math.random() * 4,
  opacity: 0.2 + Math.random() * 0.6,
}));

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const interval = 30;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
      {/* Particles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-[#DEC087] rounded-full"
            style={{
              left: p.left,
              top: p.top,
              animation: `float ${p.duration}s ease-in-out ${p.delay} infinite`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Logo with clip reveal */}
        <div className="relative w-[180px] md:w-[260px] h-auto">
          {/* Dimmed background logo */}
          <img
            src="/logo.svg"
            alt=""
            className="w-full h-auto opacity-10"
          />
          {/* Foreground logo revealed by progress */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
          >
            <img
              src="/logo.svg"
              alt="KNIFIDA"
              className="w-full h-auto drop-shadow-[0_0_12px_rgba(173,139,88,0.5)]"
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-[200px] md:w-[280px]">
          <div className="relative h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-[#DEC087] rounded-full transition-all duration-[30ms] ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-center font-display text-xs tracking-[0.3em] text-[#DEC087]">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
}
