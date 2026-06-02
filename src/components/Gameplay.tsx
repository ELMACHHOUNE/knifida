import { useRef, useState, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ZapIcon, ShieldCheckIcon, StarIcon, BoltIcon, ChevronRightIcon } from "@animateicons/react/lucide";
import AutoAnimatedIcon from "./AutoAnimatedIcon";

gsap.registerPlugin(ScrollTrigger);

export default function Gameplay() {
  const section = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const gameScreen = useRef<HTMLDivElement>(null);
  const camelRun = useRef<HTMLDivElement>(null);
  const coin1 = useRef<HTMLDivElement>(null);
  const coin2 = useRef<HTMLDivElement>(null);
  const coin3 = useRef<HTMLDivElement>(null);
  const ground1 = useRef<HTMLDivElement>(null);
  const ground2 = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);

  const [transformStyle, setTransformStyle] = useState("");

  const stars = useMemo(
    () =>
      Array.from({ length: 30 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 60}%`,
        opacity: 0.2 + Math.random() * 0.8,
      })),
    [],
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gameScreen.current) return;
    const { left, top, width, height } = gameScreen.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 3;
    const tiltY = (relativeX - 0.5) * -3;
    setTransformStyle(`perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`);
  };

  const handleMouseLeave = () => setTransformStyle("");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        pin: panel.current,
        pinSpacing: true,
      },
    });

    tl.to(camelRun.current, { x: 250, ease: "none" }, 0)
      .to(coin1.current, { y: -120, opacity: 0, ease: "none" }, 0)
      .to(coin2.current, { y: -100, opacity: 0, ease: "none" }, 0.1)
      .to(coin3.current, { y: -110, opacity: 0, ease: "none" }, 0.2)
      .to(ground1.current, { xPercent: -80, ease: "none" }, 0)
      .to(ground2.current, { xPercent: -100, ease: "none" }, 0)
      .to(heading.current, { y: -30, opacity: 0.3, ease: "none" }, 0)
      .to(scoreRef.current, { scale: 1.1, ease: "none" }, 0);

    return () => tl.kill();
  }, { scope: section });

  return (
    <section ref={section} className="relative h-[300vh]">
      <div
        ref={panel}
        className="sticky top-0 h-screen w-full bg-gradient-to-b from-[#1a0a2e] via-[#2d1b0e] to-black flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#AD8B58/8_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DEC087]/20 to-transparent" />

        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center">
          <h2 ref={heading} className="text-4xl md:text-6xl font-black text-white mb-8 font-display tracking-tight">
            Gameplay <span className="text-[#DEC087]">Preview</span>
          </h2>

          <div ref={scoreRef} className="mb-6 inline-flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2 text-sm">
            <AutoAnimatedIcon icon={BoltIcon} size={14} color="#DEC087" duration={0.6} />
            <span className="text-gray-400 font-body">Score: <span className="text-white font-bold">12,450</span></span>
          </div>

          {/* Game screen with 3D tilt */}
          <div
            ref={gameScreen}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
            className="relative w-full aspect-[16/9] bg-black/60 rounded-2xl border border-white/[0.06] overflow-hidden backdrop-blur-sm shadow-2xl transition-transform duration-200 ease-out"
          >
            <div className="absolute top-3 left-3 z-10 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <div className="w-2 h-2 rounded-full bg-green-500/60" />
            </div>

            <div className="absolute inset-0 opacity-15">
              {stars.map((s, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full"
                  style={{ left: s.left, top: s.top, opacity: s.opacity }}
                />
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#AD8B58]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#AD8B58]/20 to-transparent blur-sm" />

            <div ref={camelRun} className="absolute bottom-6 left-4 will-change-transform drop-shadow-lg z-[5]">
              <img src="/icon.png" alt="Camel" className="h-12 md:h-16 w-auto object-contain" />
            </div>

            <div ref={coin1} className="absolute top-4 right-[30%] text-xl md:text-2xl will-change-transform z-[5]">🪙</div>
            <div ref={coin2} className="absolute top-[35%] right-[50%] text-lg md:text-xl will-change-transform z-[5]">🪙</div>
            <div ref={coin3} className="absolute top-[18%] right-[12%] text-xl md:text-2xl will-change-transform z-[5]">🪙</div>

            <div ref={ground1} className="absolute bottom-2 left-0 w-[200%] h-3 bg-gradient-to-r from-transparent via-[#AD8B58]/20 to-transparent blur-sm will-change-transform" />
            <div ref={ground2} className="absolute bottom-0 left-0 w-[200%] h-1.5 bg-gradient-to-r from-transparent via-[#DEC087]/15 to-transparent blur-xs will-change-transform" />
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-400 font-body">
            {[
              { icon: ZapIcon, label: "Speed" },
              { icon: ShieldCheckIcon, label: "Shield" },
              { icon: StarIcon, label: "Magnet" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-2">
                <AutoAnimatedIcon icon={Icon} size={14} color="#DEC087" duration={0.6} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-hsla relative flex w-fit mx-auto cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black/50 px-5 py-2 text-xs uppercase text-white/40 font-display tracking-wider">
            <ChevronRightIcon size={14} color="#ffffff66" />
            <p>watch trailer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
