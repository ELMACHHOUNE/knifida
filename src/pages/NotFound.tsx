import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompassIcon } from "@animateicons/react/lucide";
import AutoAnimatedIcon from "../components/AutoAnimatedIcon";
import Loader from "../components/Loader";

const particles = Array.from({ length: 20 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 2}s`,
  duration: 3 + Math.random() * 4,
  opacity: 0.2 + Math.random() * 0.6,
}));

export default function NotFound() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  if (loading) return <Loader onFinish={() => setLoading(false)} />;

  return (
    <section className="relative min-h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#AD8B58/6_0%,_transparent_65%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DEC087]/20 to-transparent" />

      {/* Floating sand particles */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#DEC087] rounded-full"
            style={{
              left: p.left,
              top: p.top,
              animation: `float ${p.duration}s ease-in-out ${p.delay} infinite`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* Logo */}
        <img
          src="/logo.svg"
          alt="KNIFIDA"
          className="w-[180px] md:w-[260px] h-auto mx-auto mb-8 opacity-30 drop-shadow-2xl"
        />

        {/* 404 number */}
        <h1 className="font-display text-[5rem] sm:text-[8rem] md:text-[14rem] font-black leading-none text-[#AD8B58]/30 select-none">
          404
        </h1>

        {/* Divider line */}
        <div className="w-16 h-[2px] bg-[#DEC087]/40 mx-auto my-6" />

        {/* Tagline */}
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[#DEC087] uppercase tracking-[0.1em] mb-3">
          Lost in the Dunes
        </h2>
        <p className="font-body text-sm md:text-base text-gray-400 leading-relaxed mb-10">
          This path doesn't exist in the desert. The sands have shifted and swallowed
          the trail. Head back to known territory.
        </p>

        {/* Back home button */}
        <button
          onClick={() => navigate("/")}
          className="group relative inline-flex items-center gap-3 cursor-pointer overflow-hidden rounded-full bg-[#AD8B58] px-8 py-3.5 text-white font-display tracking-wider uppercase text-sm transition-all duration-300 hover:bg-[#AD8B58]/90 hover:shadow-lg hover:shadow-[#AD8B58]/20"
        >
          <AutoAnimatedIcon icon={CompassIcon} size={16} color="#fff" duration={0.8} />
          <span className="relative inline-flex overflow-hidden font-display text-xs uppercase">
            <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
              back home
            </div>
            <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
              back home
            </div>
          </span>
        </button>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#AD8B58]/5 to-transparent pointer-events-none" />
    </section>
  );
}
