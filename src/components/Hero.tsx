import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sky from "../assets/sky.svg";
import mountains from "../assets/mountains.svg";
import dunes from "../assets/dunes.svg";
import particles from "../assets/particles.svg";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLImageElement>(null);
  const mountainsRef = useRef<HTMLImageElement>(null);
  const dunesRef = useRef<HTMLImageElement>(null);
  const particlesRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=250%",
          scrub: 1.5,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(skyRef.current, { y: 80, ease: "none" }, 0)
        .to(mountainsRef.current, { y: 200, ease: "none" }, 0)
        .to(dunesRef.current, { y: 320, ease: "none" }, 0)
        .to(particlesRef.current, { y: 150, opacity: 0, ease: "none" }, 0)
        .to(contentRef.current, { y: -150, opacity: 0, ease: "none" }, 0)
        .to(
          ringRef.current,
          { scale: 1.5, opacity: 0, rotate: 180, ease: "none" },
          0,
        )
        .to(logoRef.current, { scale: 0.8, opacity: 0, ease: "none" }, 0);

      ScrollTrigger.refresh();

      return () => tl.kill();
    },
    { scope: container },
  );

  return (
    <section ref={container} className="relative">
      <div ref={pinRef} className="h-screen w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e]/60 via-transparent to-black/80 z-10 pointer-events-none" />

        <img
          ref={skyRef}
          src={sky}
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
        <img
          ref={mountainsRef}
          src={mountains}
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
        <img
          ref={dunesRef}
          src={dunes}
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
        <img
          ref={particlesRef}
          src={particles}
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform pointer-events-none"
        />
        <div
          ref={ringRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] border border-[#DEC087]/10 rounded-full animate-spin-slow z-[6] pointer-events-none"
        >
          {["top", "bottom", "left", "right"].map((pos) => (
            <div
              key={pos}
              className={`absolute ${
                pos === "top" || pos === "bottom"
                  ? `left-1/2 -translate-x-1/2 ${pos === "top" ? "top-0" : "bottom-0"}`
                  : `top-1/2 -translate-y-1/2 ${pos === "left" ? "left-0" : "right-0"}`
              } w-2 h-2 bg-[#DEC087]/30 rounded-full`}
            />
          ))}
        </div>

        <div
          ref={contentRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
        >
          <img
            ref={logoRef}
            src="/logo.svg"
            alt="KNIFIDA"
            className="w-[180px] sm:w-[260px] md:w-[480px] lg:w-245 h-auto drop-shadow-2xl mb-6"
          />

          <AnimatedTitle
            title="Run the desert.<br />Survive the d<b>u</b>nes."
            containerClass="!text-[clamp(1.5rem,5vw,3.5rem)] !text-[#DEC087] !font-light !normal-case !tracking-[0.15em] !gap-0 !px-0 !leading-tight"
            animateOnScroll={false}
          />

          <div ref={ctaRef} className="mt-10 pointer-events-auto">
            <button className="group relative px-10 py-4 bg-[#AD8B58] text-white font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_-5px_#AD8B58] font-display tracking-wider uppercase text-sm">
              <span className="relative z-10">Coming Soon</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#DEC087] to-[#AD8B58] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
