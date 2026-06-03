import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    };

    tryPlay();

    const interact = () => {
      tryPlay();
      document.removeEventListener("click", interact);
      document.removeEventListener("scroll", interact);
      document.removeEventListener("touchstart", interact);
    };
    document.addEventListener("click", interact, { once: true });
    document.addEventListener("touchstart", interact, { once: true });

    return () => {
      document.removeEventListener("click", interact);
      document.removeEventListener("scroll", interact);
      document.removeEventListener("touchstart", interact);
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.to(circleRef.current, { rotate: 360, ease: "none" }, 0);

    ScrollTrigger.refresh();
    return () => tl.kill();
  });

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/sound.mp3" loop preload="auto" />

      <div className="fixed bottom-4 left-4 z-[9998] group">
        <button
          onClick={toggle}
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.08] flex items-center justify-center transition-all duration-500 hover:bg-black/80 hover:border-[#DEC087]/30 hover:shadow-lg hover:shadow-[#AD8B58]/20 cursor-pointer"
          aria-label={playing ? "Pause music" : "Play music"}
        >
          {/* Circular knifida text */}
          <div
            ref={circleRef}
            className="absolute inset-0 w-full h-full will-change-transform pointer-events-none"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                id="music-text-path"
                d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                fill="none"
              />
              <text className="fill-[#DEC087]/40 text-[8px] font-display tracking-[0.3em] uppercase">
                <textPath href="#music-text-path" startOffset="50%" textAnchor="middle">
                  knifida • knifida • knifida • knifida • knifida • knifida •
                </textPath>
              </text>
            </svg>
          </div>

          {/* Center icon */}
          <span className="relative z-10 text-white/60 group-hover:text-white transition-colors duration-300">
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </span>

          {/* Pulse ring when playing */}
          {playing && (
            <span className="absolute inset-0 rounded-full animate-ping bg-[#DEC087]/10 pointer-events-none" />
          )}
        </button>

        {/* Label */}
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] text-gray-500 font-body tracking-[0.15em]">
            {playing ? "now playing" : "tap to play"}
          </span>
        </div>
      </div>
    </>
  );
}
