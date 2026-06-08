import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenis } from "../lenis";

gsap.registerPlugin(ScrollTrigger);

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;
    audio.muted = true;

    const removeListeners = () => {
      lenis.off("scroll", start);
      window.removeEventListener("wheel", start);
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("mousedown", start);
      window.removeEventListener("keydown", start);
      document.removeEventListener("click", start);
      document.removeEventListener("touchstart", start);
    };

    const start = async () => {
      if (!audio.paused) {
        audio.muted = false;
        setPlaying(true);
        removeListeners();
        return;
      }

      audio.muted = false;
      try {
        await audio.play();
        setPlaying(true);
        removeListeners();
      } catch {
        audio.muted = true;
        try {
          await audio.play();
          audio.muted = false;
          setPlaying(true);
          removeListeners();
        } catch {
          // Keep listeners attached so the next trusted interaction can retry.
        }
      }
    };

    audio
      .play()
      .then(() => {
        setPlaying(true);
      })
      .catch(() => {});

    lenis.on("scroll", start);
    window.addEventListener("wheel", start, { once: true, passive: true });
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("mousedown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    document.addEventListener("click", start, { once: true });
    document.addEventListener("touchstart", start, { once: true });

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      removeListeners();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
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

    return () => tl.kill();
  });

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.muted = false;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/sound.wav" loop preload="auto" />

      <div className="fixed bottom-4 left-4 z-9998 group">
        <button
          onClick={toggle}
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/8 flex items-center justify-center transition-all duration-500 hover:bg-black/80 hover:border-knifida-secondary/30 hover:shadow-lg hover:shadow-knifida-primary/20 cursor-pointer"
        >
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
              <text className="fill-knifida-secondary/40 text-[8px] font-display tracking-[0.3em] uppercase">
                <textPath
                  href="#music-text-path"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  knifida • knifida • knifida • knifida • knifida • knifida •
                </textPath>
              </text>
            </svg>
          </div>

          <span className="relative z-10 text-white/60 group-hover:text-white transition-colors duration-300">
            {playing ? (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </span>

          {playing && (
            <span className="absolute inset-0 rounded-full animate-ping bg-knifida-secondary/10 pointer-events-none" />
          )}
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] text-gray-500 font-body tracking-[0.15em]">
            {playing ? "now playing" : "scroll to play"}
          </span>
        </div>
      </div>
    </>
  );
}
