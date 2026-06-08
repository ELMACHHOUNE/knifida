import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoStory() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const glowLeft = useRef<HTMLDivElement>(null);
  const glowRight = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badge = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  useGSAP(
    () => {
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

      tl.fromTo(
        frame.current,
        { scale: 0.85, opacity: 0.6 },
        { scale: 1, opacity: 1, ease: "power2.out" },
        0,
      )
        .fromTo(
          glowLeft.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, ease: "power2.out" },
          0.1,
        )
        .fromTo(
          glowRight.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, ease: "power2.out" },
          0.1,
        )
        .fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.out" },
          0.2,
        )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.out" },
          0.3,
        )
        .fromTo(
          badge.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, ease: "back.out(2)" },
          0.35,
        )
        .to(frame.current, { scale: 0.92, ease: "none" }, 0.5)
        .to(glowLeft.current, { x: -20, opacity: 0.6, ease: "none" }, 0)
        .to(glowRight.current, { x: 20, opacity: 0.6, ease: "none" }, 0)
        .to(titleRef.current, { y: -15, opacity: 0.3, ease: "none" }, 0)
        .to(subtitleRef.current, { y: -10, opacity: 0.2, ease: "none" }, 0);

      ScrollTrigger.refresh();

      return () => tl.kill();
    },
    { scope: section },
  );

  return (
    <section ref={section} className="relative h-[350vh]">
      <div
        ref={pin}
        className="sticky top-0 h-screen w-full bg-black overflow-hidden"
      >
        {/* Radial glow at center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#AD8B58/8_0%,transparent_60%)] pointer-events-none" />

        {/* Side light beams */}
        <div
          ref={glowLeft}
          className="absolute top-1/2 -translate-y-1/2 left-0 w-32 md:w-48 h-64 md:h-96 bg-linear-to-r from-knifida-secondary/8 to-transparent blur-3xl pointer-events-none"
        />
        <div
          ref={glowRight}
          className="absolute top-1/2 -translate-y-1/2 right-0 w-32 md:w-48 h-64 md:h-96 bg-linear-to-l from-knifida-secondary/8 to-transparent blur-3xl pointer-events-none"
        />

        {/* Top / bottom gradient edges */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black via-black/60 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black via-black/60 to-transparent pointer-events-none z-10" />

        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6">
          {/* Video container */}
          <div
            ref={frame}
            className="relative w-full max-w-sm md:max-w-md mx-auto aspect-9/16 rounded-2xl overflow-hidden shadow-2xl shadow-knifida-primary/15 border border-white/6"
          >
            <video
              ref={video}
              src="/video/story.mp4"
              autoPlay
              muted={muted}
              loop
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-knifida-secondary/30 to-transparent" />

            {/* Sound toggle */}
            <button
              onClick={() => {
                if (!video.current) return;
                video.current.muted = !muted;
                setMuted(!muted);
              }}
              className="absolute bottom-3 right-3 z-30 w-8 h-8 rounded-full bg-black/50 border border-white/8 flex items-center justify-center backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle sound"
            >
              {muted ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-3.5 h-3.5 text-white/70"
                >
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-3.5 h-3.5 text-white/70"
                >
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M19.07 4.93a10 10 0 010 14.14" />
                  <path d="M15.54 8.46a5 5 0 010 7.07" />
                </svg>
              )}
            </button>
          </div>

          {/* Title */}
          <div className="mt-6 md:mt-8 text-center">
            <h2
              ref={titleRef}
              className="font-display text-2xl md:text-4xl font-bold text-white tracking-[0.08em]"
            >
              The Story
            </h2>
            <p
              ref={subtitleRef}
              className="mt-2 font-body text-sm md:text-base text-gray-400 max-w-lg mx-auto leading-relaxed"
            >
              A minute through the dunes — watch the journey unfold.
            </p>
          </div>

          {/* Duration badge */}
          <div
            ref={badge}
            className="mt-4 flex items-center gap-2 rounded-full bg-white/4 border border-white/6 px-4 py-1.5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-knifida-secondary animate-pulse" />
            <span className="font-body text-xs text-gray-500 tracking-[0.15em] uppercase">
              1:00 story
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
