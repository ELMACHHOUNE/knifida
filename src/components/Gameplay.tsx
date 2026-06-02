import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ZapIcon, ShieldCheckIcon, StarIcon, BoltIcon, ChevronRightIcon } from "@animateicons/react/lucide";
import AutoAnimatedIcon from "./AutoAnimatedIcon";

gsap.registerPlugin(ScrollTrigger);

const stars = Array.from({ length: 30 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 60}%`,
  opacity: 0.2 + Math.random() * 0.8,
}));

const scores = ["12,450", "13,250", "14,100", "15,800"];

export default function Gameplay() {
  const section = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const gameScreen = useRef<HTMLDivElement>(null);
  const camelRun = useRef<HTMLDivElement>(null);
  const coin1 = useRef<HTMLDivElement>(null);
  const coin2 = useRef<HTMLDivElement>(null);
  const coin3 = useRef<HTMLDivElement>(null);
  const popup1 = useRef<HTMLDivElement>(null);
  const popup2 = useRef<HTMLDivElement>(null);
  const popup3 = useRef<HTMLDivElement>(null);
  const ground1 = useRef<HTMLDivElement>(null);
  const ground2 = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const scoreLabel = useRef<HTMLSpanElement>(null);

  const [transformStyle, setTransformStyle] = useState("");

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
    gsap.to(ground1.current, {
      xPercent: -50,
      duration: 2.5,
      ease: "none",
      repeat: -1,
    });

    gsap.to(ground2.current, {
      xPercent: -50,
      duration: 3.5,
      ease: "none",
      repeat: -1,
    });

    const proxy = { collected: 0 };

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

    tl.to(camelRun.current, { x: 260, ease: "none" }, 0)
      .to(heading.current, { y: -30, opacity: 0.3, ease: "none" }, 0)
      .to(scoreRef.current, { scale: 1.1, ease: "none" }, 0)
      .to(coin1.current, { left: "12%", ease: "none" }, 0)
      .to(coin2.current, { left: "30%", ease: "none" }, 0)
      .to(coin3.current, { left: "48%", ease: "none" }, 0)
      .to(coin1.current, { opacity: 0, scale: 2, ease: "back.out(2)" }, 0.18)
      .to(coin2.current, { opacity: 0, scale: 2, ease: "back.out(2)" }, 0.36)
      .to(coin3.current, { opacity: 0, scale: 2, ease: "back.out(2)" }, 0.54)
      .to(popup1.current, { y: -40, opacity: 1, ease: "power2.out" }, 0.18)
      .to(popup1.current, { y: -80, opacity: 0, ease: "power2.out" }, 0.26)
      .to(popup2.current, { y: -40, opacity: 1, ease: "power2.out" }, 0.36)
      .to(popup2.current, { y: -80, opacity: 0, ease: "power2.out" }, 0.44)
      .to(popup3.current, { y: -40, opacity: 1, ease: "power2.out" }, 0.54)
      .to(popup3.current, { y: -80, opacity: 0, ease: "power2.out" }, 0.62)
      .to(proxy, { collected: 1, ease: "none" }, 0.18)
      .to(proxy, { collected: 2, ease: "none" }, 0.36)
      .to(proxy, { collected: 3, ease: "none" }, 0.54)
      .to({}, {
        onUpdate: () => {
          const idx = Math.min(Math.round(proxy.collected), scores.length - 1);
          if (scoreLabel.current) {
            scoreLabel.current.textContent = scores[idx];
          }
        },
      }, 0);

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
            <span className="text-gray-400 font-body">Score: <span ref={scoreLabel} className="text-white font-bold">12,450</span></span>
          </div>

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

            <div ref={camelRun} className="absolute bottom-5 left-3 will-change-transform z-[5]">
              <div className="animate-float drop-shadow-lg">
                <img src="/icon.png" alt="Camel" className="h-12 md:h-16 w-auto object-contain" />
              </div>
            </div>

            <div ref={coin1} className="absolute bottom-[22%] left-[45%] text-xl md:text-2xl will-change-transform z-[5] drop-shadow-[0_0_8px_rgba(218,165,32,0.5)]">🪙</div>
            <div ref={popup1} className="absolute bottom-[42%] left-[44%] text-base font-bold text-[#DEC087] will-change-transform z-[6] opacity-0 pointer-events-none drop-shadow-[0_0_6px_rgba(173,139,88,0.5)]">+800</div>

            <div ref={coin2} className="absolute bottom-[26%] left-[62%] text-xl md:text-2xl will-change-transform z-[5] drop-shadow-[0_0_8px_rgba(218,165,32,0.5)]">🪙</div>
            <div ref={popup2} className="absolute bottom-[46%] left-[61%] text-base font-bold text-[#DEC087] will-change-transform z-[6] opacity-0 pointer-events-none drop-shadow-[0_0_6px_rgba(173,139,88,0.5)]">+850</div>

            <div ref={coin3} className="absolute bottom-[19%] left-[80%] text-xl md:text-2xl will-change-transform z-[5] drop-shadow-[0_0_8px_rgba(218,165,32,0.5)]">🪙</div>
            <div ref={popup3} className="absolute bottom-[39%] left-[79%] text-base font-bold text-[#DEC087] will-change-transform z-[6] opacity-0 pointer-events-none drop-shadow-[0_0_6px_rgba(173,139,88,0.5)]">+1,700</div>

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
