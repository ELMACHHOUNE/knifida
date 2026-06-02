import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";
import {
  CompassIcon,
  MapPinnedIcon,
  ZapIcon,
} from "@animateicons/react/lucide";
import AutoAnimatedIcon from "./AutoAnimatedIcon";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { Icon: CompassIcon, value: "∞", label: "Endless" },
  { Icon: MapPinnedIcon, value: "3", label: "Worlds" },
  { Icon: ZapIcon, value: "5", label: "Power-ups" },
];

export default function About() {
  const section = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statItems = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(10% 20% 15% 20% round 1.5rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0.75rem)",
          duration: 1.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 1,
          },
        },
      );

      statItems.current.forEach((item, i) => {
        gsap.fromTo(
          item,
          { scale: 0.6, opacity: 0, rotate: -10 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      ScrollTrigger.refresh();
    },
    { scope: section },
  );

  return (
    <section ref={section} className="min-h-screen w-screen bg-black py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
            Welcome to KNIFIDA
          </p>
          <AnimatedTitle
            title="Disc<b>o</b>ver the endless<br />desert adv<b>e</b>nture"
            containerClass="!text-black text-center"
          />
          <p className="max-w-lg mx-auto text-gray-400 font-body text-base md:text-lg mt-6">
            An endless runner through the golden deserts of Morocco. Guide your
            camel across shifting dunes, dodge ancient ruins, collect coins, and
            survive the scorching sun.
          </p>
        </div>

        {/* Contained image with clip reveal */}
        <div
          ref={imageRef}
          className="relative w-full max-w-5xl mx-auto h-[50vh] md:h-[70vh] rounded-xl overflow-hidden"
          style={{ clipPath: "inset(10% 20% 15% 20% round 1.5rem)" }}
        >
          <img
            src="/icon.png"
            alt="Knifida gameplay"
            className="size-full "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-24 grid grid-cols-3 gap-6 md:gap-12 max-w-lg mx-auto"
        >
          {stats.map(({ Icon, value, label }, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) statItems.current[i] = el;
              }}
              className="text-center group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:border-[#DEC087]/30 group-hover:bg-white/[0.06] transition-all duration-500">
                <AutoAnimatedIcon icon={Icon} size={24} color="#DEC087" duration={0.6} />
              </div>
              <div className="text-3xl md:text-4xl font-black text-[#DEC087] font-display">
                {value}
              </div>
              <div className="text-xs md:text-sm text-gray-500 mt-1 uppercase tracking-[0.2em] font-body">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
