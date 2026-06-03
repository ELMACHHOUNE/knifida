import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRightIcon } from "@animateicons/react/lucide";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const section = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });

      tl.fromTo(
        content.current,
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1 },
      );

      return () => tl.kill();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className="relative min-h-screen bg-gradient-to-b from-black via-[#0d0804] to-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#AD8B58]/20 to-transparent" />

      {/* Marquee strip */}
      <div className="w-full py-4 border-y border-white/[0.03] overflow-hidden bg-white/[0.02]">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-lg md:text-xl text-white/10 font-display uppercase tracking-[0.2em] mx-6">
            ✦ Coming Soon ✦ Coming Soon ✦ Coming Soon ✦
          </span>
          <span className="text-lg md:text-xl text-white/10 font-display uppercase tracking-[0.2em] mx-6">
            ✦ Coming Soon ✦ Coming Soon ✦ Coming Soon ✦
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-[#AD8B58]/10 rounded-full blur-[150px] pointer-events-none" />

        <div ref={content} className="relative z-10 text-center max-w-xl">
          <img
            src="/logo.svg"
            alt="KNIFIDA"
            className="w-[200px] sm:w-[260px] md:w-[480px] lg:w-[680px] h-auto mx-auto mb-6 opacity-60 drop-shadow-2xl"
          />

          <AnimatedTitle
            title="Ready t<b>o</b> Run?"
            containerClass="!text-white !text-[clamp(2.5rem,8vw,5rem)] text-center !px-0"
          />

          <p className="text-base md:text-lg text-gray-400 mb-10 font-light max-w-sm mx-auto font-body">
            Coming soon to iOS and Android. Join the desert run.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)] font-display tracking-wider uppercase text-sm">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                App Store
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>

            <button className="group relative px-8 py-4 bg-[#AD8B58] text-white font-bold rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_-5px_#AD8B58] font-display tracking-wider uppercase text-sm">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 2v20l16-10L4 2zm2 3.14L16.15 12 6 18.86V5.14z" />
                </svg>
                Google Play
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#DEC087] to-[#AD8B58] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>

          <div className="mt-12 border-hsla relative flex w-fit mx-auto cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black/50 px-5 py-2 text-xs uppercase text-white/40 font-display tracking-wider">
            <ChevronRightIcon size={14} color="#ffffff66" />
            <p>notify me</p>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-white/[0.03] py-6 px-6">
        <p className="text-center text-[#AD8B58]/20 text-xs tracking-[0.2em] uppercase font-body">
          &copy; {new Date().getFullYear()} KNIFIDA. All rights reserved.
        </p>
      </div>
    </section>
  );
}
