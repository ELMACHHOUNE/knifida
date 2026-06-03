import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Storyboard() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const textSide = useRef<HTMLDivElement>(null);
  const imageSide = useRef<HTMLDivElement>(null);
  const imageWrapper = useRef<HTMLDivElement>(null);
  const divider = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

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

    tl.fromTo(textSide.current, { x: -80, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out" }, 0)
      .fromTo(imageSide.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out" }, 0)
      .fromTo(imageWrapper.current, { scale: 1.15 }, { scale: 1, ease: "power2.out" }, 0)
      .fromTo(divider.current, { scaleX: 0 }, { scaleX: 1, ease: "power3.inOut" }, 0.1)
      .fromTo(chapterRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, 0.12)
      .fromTo(headingRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, 0.18)
      .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, 0.25)
      .to(textSide.current, { x: 15, opacity: 0.4, ease: "none" }, 0.5)
      .to(imageSide.current, { y: -25, opacity: 0.6, ease: "none" }, 0.5)
      .to(headingRef.current, { y: -10, ease: "none" }, 0.5);

    ScrollTrigger.refresh();

    return () => tl.kill();
  }, { scope: section });

  return (
    <section ref={section} className="relative h-[350vh]">
      <div
        ref={pin}
        className="sticky top-0 h-screen w-full bg-black overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#AD8B58/6_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DEC087]/10 to-transparent" />

        <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-20">
          {/* Left: Text */}
          <div
            ref={textSide}
            className="w-full md:w-1/2 flex flex-col justify-center md:pr-8 lg:pr-16"
          >
            <p
              ref={chapterRef}
              className="font-body text-[10px] md:text-sm text-gray-500 tracking-[0.3em] uppercase mb-2 md:mb-3"
            >
              Chapter I
            </p>
            <h2
              ref={headingRef}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#DEC087] leading-[0.9] tracking-tight"
            >
              The Desert<br />Awakens
            </h2>
            <div
              ref={divider}
              className="w-10 md:w-14 h-[2px] bg-gradient-to-r from-[#DEC087]/40 to-transparent my-4 md:my-6 origin-left"
            />
            <p
              ref={descRef}
              className="font-body text-sm md:text-base text-gray-400 max-w-md leading-relaxed"
            >
              A lone camel races across endless dunes. Ancient ruins rise from
              the sand. Somewhere ahead lies an oasis — but the desert guards
              its secrets well.
            </p>
          </div>

          {/* Right: Image */}
          <div
            ref={imageSide}
            className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0"
          >
            <div
              ref={imageWrapper}
              className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-sm aspect-[226/354] rounded-2xl overflow-hidden shadow-2xl shadow-[#AD8B58]/15 border border-white/[0.06]"
            >
              <img
                src="/knifida-game.jpeg"
                alt="Game storyboard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-[#DEC087]/10 rounded-2xl pointer-events-none" />
              <div className="absolute top-2 left-2 right-2 h-px bg-gradient-to-r from-transparent via-[#DEC087]/20 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 h-px bg-gradient-to-r from-transparent via-[#DEC087]/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
