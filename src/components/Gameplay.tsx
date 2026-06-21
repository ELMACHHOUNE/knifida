import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDownIcon } from "@animateicons/react/lucide";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What is Knifida?",
    a: "Knifida is a mobile endless runner game where you control Knifida C120, a champion camel racing through the Moroccan desert. Dodge obstacles, collect time bonuses, and survive as long as possible.",
  },
  {
    q: "Is the game free to play?",
    a: "Knifida will be available as a free-to-play title on both Android and iOS platforms, with optional in-game purchases.",
  },
  {
    q: "How do the controls work?",
    a: "Swipe left or right to move between three lanes, swipe up to jump, and swipe down to slide. The controls are designed for one-handed mobile play.",
  },
  {
    q: "What inspired the game?",
    a: "Knifida is inspired by the Moroccan documentary 'Rijal Allaz (Men of Allaz)', which follows Lahmad and his team as they train camels for traditional Allaz racing.",
  },
  {
    q: "When will the game be released?",
    a: "The game is currently in development and coming soon. Follow us on our social channels for the latest updates on the release date.",
  },
  {
    q: "What platforms will it be on?",
    a: "Knifida will launch on both Android and iOS devices, with the first release targeting mobile platforms.",
  },
  {
    q: "Can I contact the development team?",
    a: "Absolutely! You can reach out to any of the team members through their LinkedIn profiles listed in the 'Behind the Game' section above.",
  },
  {
    q: "Is there a story mode?",
    a: "The game features a score-based endless runner experience. The story is woven into the desert world and the documentary that inspired it, which you can explore in the Storyboard section.",
  },
];

export default function Gameplay() {
  const section = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  useGSAP(
    () => {
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
            end: "top 55%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const items = section.current?.querySelectorAll(".faq-item");
      if (items) {
        gsap.fromTo(
          items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 75%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      ScrollTrigger.refresh();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className="min-h-screen bg-black py-24 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#AD8B58/5_0%,_transparent_60%)] pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div ref={headingRef} className="text-center mb-14">
          <p className="font-body text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
            Got Questions?
          </p>
          <AnimatedTitle
            title="Freq<b>u</b>ently <br /> Asked"
            containerClass="!text-black text-center"
          />
        </div>

        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className="faq-item rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left"
              >
                <span className="text-sm md:text-base text-white font-medium font-display">
                  {q}
                </span>
                <ChevronDownIcon
                  size={16}
                  color="#DEC087"
                  className={`flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? "max-h-60" : "max-h-0"
                }`}
              >
                <p className="px-5 md:px-6 pb-4 md:pb-5 text-sm text-gray-400 font-body leading-relaxed">
                  {a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
