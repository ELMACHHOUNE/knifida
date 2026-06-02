import { useState, useRef } from "react";
import { GamepadIcon, GlobeIcon, SparklesIcon, MousePointerClickIcon, ChevronRightIcon } from "@animateicons/react/lucide";
import AutoAnimatedIcon from "./AutoAnimatedIcon";

function BentoTilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;
    setTransformStyle(`perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`);
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

const features = [
  {
    Icon: GamepadIcon,
    title: <>endless r<b>u</b>nner</>,
    desc: "Infinite procedurally generated desert. Every run is a unique adventure across the dunes.",
  },
  {
    Icon: GlobeIcon,
    title: <>desert w<b>o</b>rld</>,
    desc: "Rich Moroccan-inspired environments with dynamic sand dunes and ancient ruins.",
  },
  {
    Icon: SparklesIcon,
    title: <>c<b>o</b>ins & p<b>o</b>wer-ups</>,
    desc: "Collect gold coins, speed boosts, and shields to push your limits further.",
  },
  {
    Icon: MousePointerClickIcon,
    title: <>m<b>o</b>bile c<b>o</b>ntr<b>o</b>ls</>,
    desc: "Swipe, tap, and tilt. Intuitive one-handed controls for seamless gameplay.",
  },
];

export default function Features() {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-body text-sm uppercase tracking-[0.2em] text-gray-500">
            Into the Desert Realm
          </p>
          <p className="max-w-md font-body text-base text-gray-400 mt-2">
            Immerse yourself in a rich and ever-expanding desert universe where
            every dune hides a new challenge.
          </p>
        </div>

        {/* Main bento card */}
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <div className="relative size-full bg-gradient-to-br from-[#1a0a2e] via-[#2d1b0e] to-black flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#AD8B58/8_0%,_transparent_70%)]" />
            <div className="relative z-10 text-center px-6">
              <AutoAnimatedIcon icon={GamepadIcon} size={64} color="#DEC087" duration={1} />
              <h1 className="bento-title special-font text-[#DEC087] mt-6">
                kn<b>i</b>fida
              </h1>
              <p className="mt-4 max-w-md mx-auto text-gray-400 font-body text-sm">
                A cross-platform endless runner, turning your desert adventures into an epic journey.
              </p>
              <div className="border-hsla relative flex w-fit mx-auto mt-6 cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black/50 px-5 py-2 text-xs uppercase text-white/40 font-display tracking-wider">
                <ChevronRightIcon size={14} color="#ffffff66" />
                <p className="relative z-20">coming soon</p>
              </div>
            </div>
          </div>
        </BentoTilt>

        {/* Feature cards grid */}
        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          {features.map(({ Icon, title, desc }, i) => (
            <BentoTilt
              key={i}
              className={`bento-tilt_1 row-span-1 ${
                i === 1 ? "ms-32 md:col-span-1 md:ms-0" : ""
              } ${i === 2 ? "me-14 md:col-span-1 md:me-0" : ""}`}
            >
              <div className="relative size-full bg-gradient-to-br from-[#0d0804] to-black flex flex-col items-center justify-center p-8 text-center">
                <AutoAnimatedIcon icon={Icon} size={40} color="#DEC087" duration={0.8} />
                <h1 className="bento-title special-font text-white mt-4 text-3xl md:text-4xl">
                  {title}
                </h1>
                <p className="mt-3 max-w-64 text-xs md:text-sm text-gray-400 font-body">
                  {desc}
                </p>
              </div>
            </BentoTilt>
          ))}

          {/* Empty bento card with gradient */}
          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-center items-center bg-gradient-to-br from-[#1a0a2e] to-[#0d0804] p-5 text-center">
              <h1 className="bento-title special-font max-w-64 text-[#DEC087]">
                m<b>o</b>re c<b>o</b>ming<br />s<b>o</b>on.
              </h1>
              <ChevronRightIcon size={48} color="#DEC087" className="mt-4 opacity-50" />
            </div>
          </BentoTilt>

          {/* Last bento card */}
          <BentoTilt className="bento-tilt_2">
            <div className="size-full bg-gradient-to-t from-[#AD8B58]/10 to-black flex items-center justify-center">
              <p className="text-gray-500 text-xs font-body uppercase tracking-[0.2em]">
                Stay tuned
              </p>
            </div>
          </BentoTilt>
        </div>
      </div>
    </section>
  );
}
