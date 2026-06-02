import { useRef, useState } from "react";
import AnimatedTitle from "./AnimatedTitle";
import {
  StarIcon,
  BlocksIcon,
  SwordsIcon,
  ShieldCheckIcon,
} from "@animateicons/react/lucide";
import AutoAnimatedIcon from "./AutoAnimatedIcon";

function BentoTilt({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!itemRef.current) return;
    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 6;
    const tiltY = (relativeX - 0.5) * -6;
    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`,
    );
  };

  const handleMouseLeave = () => setTransformStyle("");

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
}

const chars = [
  {
    Icon: StarIcon,
    name: "Camel",
    desc: "Your loyal desert companion. Fast, sturdy, and endlessly running.",
    color: "#DEC087",
  },
  {
    Icon: BlocksIcon,
    name: "Ancient Ruins",
    desc: "Collapsed pillars and temple walls blocking your path.",
    color: "#AD8B58",
  },
  {
    Icon: SwordsIcon,
    name: "Desert Threats",
    desc: "Scorpions and sandstorms. Dodge or be swept away.",
    color: "#e85d04",
  },
  {
    Icon: ShieldCheckIcon,
    name: "Desert Treasure",
    desc: "Hidden gems and golden artifacts across the dunes.",
    color: "#ffd60a",
  },
];

export default function Characters() {
  return (
    <section className="min-h-screen bg-black py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
            Inhabitants of the Desert
          </p>
          <AnimatedTitle
            title="Characters &<br /> Obst<b>a</b>cles"
            containerClass="!text-black text-center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {chars.map(({ Icon, name, desc, color }, i) => (
            <BentoTilt
              key={i}
              className="border-hsla relative overflow-hidden rounded-2xl transition-transform duration-300 ease-out"
            >
              <div className="relative size-full bg-white/[0.02] p-6 md:p-8 flex items-start gap-5">
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15` }}
                >
                  <AutoAnimatedIcon icon={Icon} size={28} color={color} duration={0.6} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg md:text-xl font-bold text-white font-display tracking-tight">
                      {name}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed font-body">
                    {desc}
                  </p>
                </div>
              </div>
            </BentoTilt>
          ))}
        </div>
      </div>
    </section>
  );
}
