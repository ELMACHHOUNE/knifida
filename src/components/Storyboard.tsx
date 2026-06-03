import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Storyboard() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barTop = useRef<HTMLDivElement>(null);
  const barBottom = useRef<HTMLDivElement>(null);
  const sprockets = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top top",
        end: "+=250%",
        scrub: 1.5,
        pin: pin.current,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(barTop.current, { scaleY: 1, ease: "power3.inOut" }, 0)
      .to(barBottom.current, { scaleY: 1, ease: "power3.inOut" }, 0)
      .to(frame.current, { clipPath: "inset(0%)", ease: "power3.inOut" }, 0.15)
      .to(textRef.current, { y: 0, opacity: 1, ease: "power2.out" }, 0.4)
      .to(sprockets.current, { opacity: 1, ease: "none" }, 0)
      .to(frame.current, { scale: 1.05, ease: "none" }, 0)
      .to(textRef.current, { y: -20, opacity: 0.4, ease: "none" }, 0);

    ScrollTrigger.refresh();

    return () => tl.kill();
  }, { scope: section });

  return (
    <section ref={section} className="relative h-[350vh]">
      <div
        ref={pin}
        className="sticky top-0 h-screen w-full bg-black overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#AD8B58/5_0%,_transparent_60%)] pointer-events-none" />

        <div
          ref={barTop}
          className="absolute top-0 left-0 right-0 z-20 bg-black origin-top scale-y-0"
          style={{ height: "clamp(40px, 8vh, 80px)" }}
        />
        <div
          ref={barBottom}
          className="absolute bottom-0 left-0 right-0 z-20 bg-black origin-bottom scale-y-0"
          style={{ height: "clamp(40px, 8vh, 80px)" }}
        />

        {/* Sprocket holes decoration */}
        <div
          ref={sprockets}
          className="absolute inset-y-0 left-4 md:left-8 z-10 flex flex-col justify-around py-20 opacity-0"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-3 md:w-3 md:h-4 rounded-sm border border-[#AD8B58]/20"
            />
          ))}
        </div>
        <div
          className="absolute inset-y-0 right-4 md:right-8 z-10 flex flex-col justify-around py-20 opacity-0 animate-[fadeIn_1s_ease_0.5s_forwards]"
          style={{ opacity: 0 }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-3 md:w-3 md:h-4 rounded-sm border border-[#AD8B58]/20"
            />
          ))}
        </div>

        {/* Vertical film edge lines */}
        <div className="absolute top-0 bottom-0 left-6 md:left-12 w-px bg-gradient-to-b from-transparent via-[#DEC087]/10 to-transparent z-10" />
        <div className="absolute top-0 bottom-0 right-6 md:right-12 w-px bg-gradient-to-b from-transparent via-[#DEC087]/10 to-transparent z-10" />

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
          {/* Image frame */}
          <div
            ref={frame}
            className="relative w-full max-w-sm mx-auto aspect-[226/354] rounded-lg overflow-hidden shadow-2xl shadow-[#AD8B58]/10"
            style={{ clipPath: "inset(10%)" }}
          >
            <div ref={image} className="w-full h-full">
              <img
                src="/knifida-game.jpeg"
                alt="Game storyboard"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Frame border decoration */}
            <div className="absolute inset-0 border border-[#DEC087]/10 rounded-lg pointer-events-none" />
            <div className="absolute top-2 left-2 right-2 h-px bg-gradient-to-r from-transparent via-[#DEC087]/20 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 h-px bg-gradient-to-r from-transparent via-[#DEC087]/20 to-transparent" />
          </div>

          {/* Caption */}
          <div
            ref={textRef}
            className="mt-8 text-center translate-y-8 opacity-0"
          >
            <p className="font-body text-xs md:text-sm text-gray-500 tracking-[0.25em] uppercase mb-2">
              Chapter I
            </p>
            <h3 className="font-display text-xl md:text-2xl font-bold text-[#DEC087] tracking-[0.05em]">
              The Desert Awakens
            </h3>
            <p className="mt-3 font-body text-sm md:text-base text-gray-400 max-w-md mx-auto leading-relaxed">
              A lone camel races across endless dunes. Ancient ruins rise from
              the sand. Somewhere ahead lies an oasis — but the desert guards
              its secrets well.
            </p>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
