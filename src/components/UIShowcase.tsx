import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    refKey: "back",
    label: "Status",
    speed: 0.15,
    icons: [
      { src: "/ui/game-over.png", name: "Game Over" },
      { src: "/ui/progress-bar.png", name: "Progress" },
      { src: "/ui/Langue.png", name: "Language" },
    ],
  },
  {
    refKey: "mid1",
    label: "Game Stats",
    speed: 0.3,
    icons: [
      { src: "/ui/heart.png", name: "Lives" },
      { src: "/ui/star.png", name: "Score" },
      { src: "/ui/clock.png", name: "Timer" },
      { src: "/ui/fr.png", name: "French" },
      { src: "/ui/en.png", name: "English" },
      { src: "/ui/ar.png", name: "Arabic" },
    ],
  },
  {
    refKey: "mid2",
    label: "Actions",
    speed: 0.45,
    icons: [
      { src: "/ui/play-button.png", name: "Play" },
      { src: "/ui/pause-button.png", name: "Pause" },
      { src: "/ui/next.png", name: "Next" },
      { src: "/ui/previos.png", name: "Previous" },
      { src: "/ui/valid-button.png", name: "Confirm" },
      { src: "/ui/x-button.png", name: "Cancel" },
    ],
  },
  {
    refKey: "front",
    label: "Settings",
    speed: 0.6,
    icons: [
      { src: "/ui/options-button.png", name: "Options" },
      { src: "/ui/settings-button.png", name: "Settings" },
      { src: "/ui/mute-button.png", name: "Mute" },
      { src: "/ui/sound-button.png", name: "Sound" },
    ],
  },
];

export default function UIShowcase() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const back = useRef<HTMLDivElement>(null);
  const mid1 = useRef<HTMLDivElement>(null);
  const mid2 = useRef<HTMLDivElement>(null);
  const front = useRef<HTMLDivElement>(null);

  const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
    back, mid1, mid2, front,
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top top",
        end: "+=300%",
        scrub: 1.2,
        pin: pin.current,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(heading.current, { y: -40, opacity: 0.3, ease: "none" }, 0);

    layers.forEach(({ refKey, speed }) => {
      const el = refMap[refKey].current;
      if (!el) return;
      tl.to(el, { y: () => -window.innerHeight * speed, ease: "none" }, 0);
    });

    ScrollTrigger.refresh();

    return () => tl.kill();
  }, { scope: section });

  return (
    <section ref={section} className="relative h-[400vh]">
      <div
        ref={pin}
        className="sticky top-0 h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#AD8B58/6_0%,_transparent_65%)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DEC087]/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DEC087]/10 to-transparent" />

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
          <h2
            ref={heading}
            className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 sm:mb-8 md:mb-16 font-display tracking-tight text-center"
          >
            Game <span className="text-[#DEC087]">Interface</span>
          </h2>

          <div className="relative w-full max-w-5xl mx-auto h-[55vh] sm:h-[60vh] md:h-[65vh]">
            {layers.map(({ refKey, icons }) => (
              <div
                key={refKey}
                ref={refMap[refKey]}
                className="absolute inset-0 flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 will-change-transform px-2 sm:px-0"
              >
                {icons.map(({ src, name }) => (
                  <div
                    key={name}
                    className="group relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center p-2 sm:p-3 md:p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:border-[#DEC087]/30 hover:shadow-lg hover:shadow-[#AD8B58]/10 cursor-default"
                  >
                    <img
                      src={src}
                      alt={name}
                      className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] md:text-xs text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-body">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="relative z-10 mt-8 md:mt-12 text-xs md:text-sm text-gray-500 font-body tracking-[0.15em] uppercase">
            UI elements &middot; Mobile interface
          </p>
        </div>
      </div>
    </section>
  );
}
