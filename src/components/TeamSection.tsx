import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Salma MAHDAR",
    role: "Game Designer",
    image: "/profiles/mahdar-salma.png",
    accent: "#DEC087",
  },
  {
    name: "Ayoub KATANI",
    role: "Game Designer",
    image: "/profiles/ayoub-katani.png",
    accent: "#B89467",
  },
  {
    name: "Ayoub MOUSSAOUY",
    role: "3D Artist",
    image: "/profiles/ayoub-moussaouy.png",
    accent: "#8F6B43",
  },
  {
    name: "Anas DAGHMA",
    role: "Game Programmer",
    image: "/profiles/anas-daghma.png",
    accent: "#D7A96B",
  },
  {
    name: "Mohammed Amine EL RHALLOUCH",
    role: "Game Programmer",
    image: "/profiles/mohammed-amine-el-rhallouch.png",
    accent: "#C98E4F",
  },
  {
    name: "Mohamed EL MACHHOUNE",
    role: "UI designer & Full-Stack Web Developer",
    image: "/profiles/mohamed-elmachhoune.png",
    accent: "#AD8B58",
  },
  {
    name: "Fatima Ezzahra OUFFATA",
    role: "Music Composer",
    image: "/profiles/fatima-ezzahra-ouffata.png",
    accent: "#E1B86E",
  },
  {
    name: "Nouhaila MAADI",
    role: "Sound Designer",
    image: "/profiles/nouhaila-maadi.png",
    accent: "#D39A55",
  },
];

const institutionalItems = [
  {
    title: "Ibn Tofail University",
    subtitle: "Academic partner",
    image: "/profiles/university.png",
    type: "logo" as const,
  },
  {
    title: "Houria KELKOUL",
    subtitle:
      "Vice Dean | Head of the Center of Excellence – Ibn Tofail University",
    image: "/profiles/houria-kelkoul.jpg",
    type: "person" as const,
  },
  {
    title: "Othmane EL BADLAOUI",
    subtitle: "Professor of the Department – Ibn Tofail University",
    image: "/profiles/othmane-el-badlaoui.png",
    type: "person" as const,
  },
  {
    title: "Center of Excellence",
    subtitle: "Research and innovation hub",
    image: "/profiles/centre.png",
    type: "logo" as const,
  },
];

function TeamCard({
  name,
  role,
  image,
  accent,
  cardRef,
}: {
  name: string;
  role: string;
  image?: string;
  accent: string;
  cardRef: (node: HTMLDivElement | null) => void;
}) {
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const relativeX = (e.clientX - bounds.left) / bounds.width;
    const relativeY = (e.clientY - bounds.top) / bounds.height;
    const tiltX = (relativeY - 0.5) * 8;
    const tiltY = (relativeX - 0.5) * -8;

    setTransformStyle(
      `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`,
    );
  };

  const handleMouseLeave = () => setTransformStyle("");

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
      className="group relative overflow-hidden rounded-3xl border-hsla bg-white/3 backdrop-blur-sm transition-transform duration-300 ease-out"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(222,192,135,0.16),transparent_58%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-5 md:p-6">
        <div className="relative overflow-hidden rounded-[1.25rem] border border-white/8 bg-black/40">
          {image ? (
            <img
              src={image}
              alt={name}
              className="aspect-4/5 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              className="aspect-4/5 w-full flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(222,192,135,0.22),rgba(0,0,0,0.92))]"
              aria-label={`${name} portrait placeholder`}
            >
              <div
                className="h-24 w-24 rounded-[1.75rem] border flex items-center justify-center text-2xl font-black text-white shadow-[0_0_50px_rgba(222,192,135,0.15)]"
                style={{
                  borderColor: `${accent}55`,
                  backgroundColor: `${accent}14`,
                }}
              >
                {name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />
          <div
            className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/85 backdrop-blur-sm"
            style={{
              borderColor: `${accent}40`,
              backgroundColor: `${accent}14`,
            }}
          >
            Team
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-xs uppercase tracking-[0.25em] text-white/50 font-body">
              Role
            </div>
            <div className="text-sm md:text-base font-medium text-white">
              {role}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-white font-display tracking-tight">
              {name}
            </h3>
            <p className="mt-1 text-sm text-gray-400 font-body">
              Core development team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstitutionalCard({
  title,
  subtitle,
  image,
  type,
}: {
  title: string;
  subtitle: string;
  image: string;
  type: "logo" | "person";
}) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-black/8 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-1">
      {type === "logo" ? (
        <div className="flex min-h-60 items-center justify-center bg-white p-8 md:p-10">
          <img
            src={image}
            alt={title}
            className="h-full max-h-37.5 w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="bg-[linear-gradient(180deg,#f7f2e9_0%,#ffffff_55%,#f4efe6_100%)] p-5 md:p-6">
          <div className="overflow-hidden rounded-3xl bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
            <img
              src={image}
              alt={title}
              className="aspect-4/5 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      )}

      <div className="border-t border-black/8 px-5 py-5 md:px-6 md:py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-knifida-primary">
          Institutional Support
        </p>
        <h3 className="mt-2 text-xl md:text-2xl font-black tracking-tight text-black font-display">
          {title}
        </h3>
        <p className="mt-2 text-sm md:text-base leading-relaxed text-black/65 font-body">
          {subtitle}
        </p>
      </div>
    </article>
  );
}

export default function TeamSection() {
  const section = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const institutionalHeadingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const institutionalRefs = useRef<(HTMLElement | null)[]>([]);

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

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            delay: index * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: "top 55%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.fromTo(
        institutionalHeadingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: institutionalHeadingRef.current,
            start: "top 82%",
            end: "top 55%",
            toggleActions: "play none none reverse",
          },
        },
      );

      institutionalRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 36, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            delay: index * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: "top 55%",
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
    <section
      ref={section}
      className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#050505_0%,#0a0602_45%,#000_100%)] py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(222,192,135,0.12),transparent_42%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-knifida-secondary/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-knifida-secondary/10 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div ref={headingRef} className="text-center mb-14 md:mb-16">
          <p className="font-body text-sm uppercase tracking-[0.28em] text-gray-500 mb-4">
            Development Team
          </p>
          <AnimatedTitle
            title="The People <br /> Behind the Run"
            containerClass="text-center"
          />
          <p className="max-w-2xl mx-auto mt-5 text-sm md:text-base text-gray-400 font-body leading-relaxed">
            The core team shaping KNIFIDA, from the visual identity to the game
            experience and interface.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6 max-w-7xl mx-auto">
          {teamMembers.map(({ name, role, image, accent }, index) => (
            <TeamCard
              key={name}
              name={name}
              role={role}
              image={image}
              accent={accent}
              cardRef={(node) => {
                cardRefs.current[index] = node;
              }}
            />
          ))}
        </div>

        <div className="mt-20 md:mt-24">
          <div
            ref={institutionalHeadingRef}
            className="text-center mb-10 md:mb-12"
          >
            <p className="font-body text-sm uppercase tracking-[0.28em] text-gray-500 mb-4">
              Institutional Partners
            </p>
            <AnimatedTitle
              title="University <br /> and Centre"
              containerClass="text-center"
            />
            <p className="max-w-2xl mx-auto mt-5 text-sm md:text-base text-gray-400 font-body leading-relaxed">
              The academic and institutional support behind the project,
              alongside the leadership of the Center of Excellence at Ibn Tofail
              University.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6 max-w-7xl mx-auto">
            {institutionalItems.map(
              ({ title, subtitle, image, type }, index) => (
                <div
                  key={title}
                  ref={(node) => {
                    institutionalRefs.current[index] = node;
                  }}
                  className={index === 2 ? "md:col-span-2 xl:col-span-1" : ""}
                >
                  <InstitutionalCard
                    title={title}
                    subtitle={subtitle}
                    image={image}
                    type={type}
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
