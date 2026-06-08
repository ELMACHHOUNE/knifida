import { useState, useRef } from "react";
import {
  GamepadIcon,
  GlobeIcon,
  SparklesIcon,
  MousePointerClickIcon,
  ChevronRightIcon,
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
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;
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

const features = [
  {
    Icon: GamepadIcon,
    title: <>ENDLESS RUNNER</>,
    desc: "Run as Knifida, the champion camel of Allaz.",
  },
  {
    Icon: GlobeIcon,
    title: <>MOROCCAN DESERT</>,
    desc: "Journey through the landscapes of Moroccan Desert.",
  },
  {
    Icon: SparklesIcon,
    title: <>TIME COLLECTION</>,
    desc: "Collect clocks to extend your run. Gather bronze, silver, and gold time bonuses to stay in the race longer.",
  },
  {
    Icon: MousePointerClickIcon,
    title: <>MOBILE CONTROLS</>,
    desc: "Simple swipe controls. Move between lanes, avoid obstacles, and guide Knifida across the desert with ease.",
  },
];

export default function Features() {
  const [mode, setMode] = useState<"game" | "film">("game");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const scrollStartY = useRef(0);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    const delta = e.deltaY;
    const atTop = el.scrollTop === 0;
    const atBottom =
      Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 1;

    // If the inner element can scroll in the wheel direction, consume it
    if (!(atTop && delta < 0) && !(atBottom && delta > 0)) {
      e.preventDefault();
      e.stopPropagation();
      el.scrollTop += delta;
    }
    // otherwise allow the page to scroll
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    dragStartY.current = e.clientY;
    scrollStartY.current = el.scrollTop;
    (el as HTMLDivElement).style.cursor = "grabbing";
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const dy = dragStartY.current - e.clientY;
    el.scrollTop = scrollStartY.current + dy;
    e.preventDefault();
  };

  const stopDrag = () => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = false;
    (el as HTMLDivElement).style.cursor = "grab";
  };
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-body text-sm uppercase tracking-[0.2em] text-gray-500">
            Discover the World of Allaz
          </p>
          <p className="max-w-md font-body text-base text-gray-400 mt-2">
            Immerse yourself in the rich tradition of camel racing, where every
            training session, race, and victory reflects the heritage of the
            desert.
          </p>
          {/* Mode selector: Game or Film */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setMode("game")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                mode === "game"
                  ? "bg-[#DEC087] text-black"
                  : "bg-black/30 text-white/60 border border-white/[0.04]"
              }`}
            >
              Game
            </button>
            <button
              onClick={() => setMode("film")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                mode === "film"
                  ? "bg-[#DEC087] text-black"
                  : "bg-black/30 text-white/60 border border-white/[0.04]"
              }`}
            >
              Film
            </button>
          </div>
        </div>

        {/* Main bento card */}
        <BentoTilt className="border-hsla relative mb-7 w-full rounded-md h-auto">
          <div
            ref={scrollRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            className="relative size-full bg-gradient-to-br from-[#1a0a2e] via-[#2d1b0e] to-black flex items-center justify-center cursor-grab"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#AD8B58/8_0%,_transparent_70%)]" />
            <div className="relative z-10 text-center px-6">
              <AutoAnimatedIcon
                icon={GamepadIcon}
                size={64}
                color="#DEC087"
                duration={1}
              />

              {mode === "game" ? (
                <div className="text-left max-w-3xl mx-auto px-4">
                  <h1 className="bento-title special-font text-[#DEC087] mt-6">
                    Knifida
                  </h1>
                  <div className="mt-3 text-sm text-gray-400 grid gap-2">
                    <div className="flex gap-4">
                      <div className="font-medium text-white/90">Genre:</div>
                      <div className="text-white/60">Endless Runner</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-medium text-white/90">Platform:</div>
                      <div className="text-white/60">Android, iOS</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-medium text-white/90">Mode:</div>
                      <div className="text-white/60">Single-player</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-medium text-white/90">
                        Art Style:
                      </div>
                      <div className="text-white/60">Low-Poly 3D</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-medium text-white/90">Based on:</div>
                      <div className="text-white/60">
                        Rijal Allaz (Men of Allaz)
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl text-white mt-6 font-display">
                    Overview
                  </h2>
                  <p className="text-gray-400 text-sm mt-2">
                    <em>Knifida</em> is a mobile endless runner game inspired by
                    the Moroccan documentary <em>Rijal Allaz (Men of Allaz)</em>
                    . Players control Knifida, the champion camel, guiding her
                    across southern Morocco's deserts in a fast-paced survival
                    adventure.
                  </p>

                  <h3 className="text-white mt-4 font-medium">Gameplay</h3>
                  <p className="text-gray-400 text-sm mt-2">
                    Swipe between three lanes to avoid obstacles, collect
                    time-extending collectibles, and chase high scores. The game
                    emphasizes simple mobile controls, time-collection
                    mechanics, and score-based progression.
                  </p>

                  <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 md:p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                    <div className="relative mx-auto overflow-hidden rounded-xl bg-black aspect-[9/16] max-h-[70vh] w-full max-w-[420px]">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none" />
                      <video
                        className="h-full w-full object-contain"
                        src="/video/camel-video.mp4"
                        controls
                        playsInline
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                          Gameplay Reel
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                          Camel running footage from the desert sequence.
                        </p>
                      </div>
                      <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#DEC087]">
                        <span className="h-px w-10 bg-[#DEC087]/40" />
                        Featured
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm text-gray-400">
                    <div>
                      <h4 className="text-white font-medium">Features</h4>
                      <ul className="list-disc ml-5 mt-2">
                        <li>Endless desert runner gameplay</li>
                        <li>Three-lane movement system</li>
                        <li>Time collection mechanics</li>
                        <li>Score-based progression</li>
                        <li>Mobile touch controls</li>
                        <li>Inspired by Moroccan culture and camel racing</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">
                        Obstacles & Collectibles
                      </h4>
                      <ul className="list-disc ml-5 mt-2">
                        <li>Rocks, hay stacks, wooden boxes, cactus</li>
                        <li>Bronze Clock: +2 seconds</li>
                        <li>Silver Clock: +5 seconds</li>
                        <li>Gold Clock: +10 seconds</li>
                      </ul>
                    </div>
                  </div>

                  <h4 className="text-white mt-4 font-medium">
                    Development Team
                  </h4>
                  <div className="text-gray-400 text-sm mt-2">
                    <p className="font-medium text-white/90">Game Designers</p>
                    <p>Salma Mahdar, Ayoub Katani</p>
                    <p className="font-medium text-white/90 mt-2">3D Artist</p>
                    <p>Ayoub Moussaouy</p>
                    <p className="font-medium text-white/90 mt-2">
                      Programmers
                    </p>
                    <p>Anas Daghma, Mohammed</p>
                    <p className="font-medium text-white/90 mt-2">
                      UI & Full-Stack Developer
                    </p>
                    <p>Mohamed EL MACHHOUNE</p>
                    <p className="font-medium text-white/90 mt-2">
                      Music & Sound
                    </p>
                    <p>
                      Composers: Fatima Ezzahra — Sound Designer: Nouhaila Maadi
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-left max-w-3xl mx-auto px-4">
                  <h1 className="bento-title special-font text-[#DEC087] mt-6">
                    Rijal Allaz (Men of Allaz)
                  </h1>
                  {/* Embedded trailer */}
                  <div className="mt-4">
                    <div className="relative w-full overflow-hidden rounded-md bg-black pb-[56.25%]">
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src="https://www.youtube.com/embed/XQWzaVRkzGc?si=pn9tX4H5l9rNYYAy"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-400 grid gap-2">
                    <div className="flex gap-4">
                      <div className="font-medium text-white/90">
                        English Title:
                      </div>
                      <div className="text-white/60">Men of Allaz</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-medium text-white/90">Genre:</div>
                      <div className="text-white/60">Documentary Film</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-medium text-white/90">Country:</div>
                      <div className="text-white/60">Morocco</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-medium text-white/90">Runtime:</div>
                      <div className="text-white/60">11 minutes 16 seconds</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-medium text-white/90">Year:</div>
                      <div className="text-white/60">2025</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-medium text-white/90">Festival:</div>
                      <div className="text-white/60">Film Festival 2026</div>
                    </div>
                  </div>

                  <h2 className="text-xl text-white mt-6 font-display">
                    Synopsis
                  </h2>
                  <p className="text-gray-400 text-sm mt-2">
                    <em>Rijal Allaz</em> (<em>Men of Allaz</em>) is a
                    documentary that follows Lahmad and his team as they care
                    for and train a herd of camels in preparation for
                    traditional camel racing, known as <em>Allaz</em>. The film
                    documents daily routines of feeding, grooming, training, and
                    protecting the camels before culminating in an exciting race
                    where Knifida C120 emerges victorious.
                  </p>

                  <h3 className="text-white mt-4 font-medium">Cast</h3>
                  <ul className="list-disc ml-5 mt-2 text-gray-400 text-sm">
                    <li>Lahmad Bouasria</li>
                    <li>Mohamed Mouloud</li>
                    <li>Mohamed Fadel</li>
                  </ul>

                  <h3 className="text-white mt-4 font-medium">Crew</h3>
                  <p className="text-gray-400 text-sm mt-2">
                    <span className="font-medium text-white/90">
                      Directors:
                    </span>{" "}
                    Khalid Hammou, Yassir Ait Daoud
                  </p>

                  <h3 className="text-white mt-4 font-medium">
                    Director Biography
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    Khalid Hammou is a filmmaker from Tan-Tan, southern Morocco.
                    Passionate about cinema from an early age, he trained
                    through self-directed learning, studied editing and visual
                    effects at ISMC in Ouarzazate, pursued Audiovisual and
                    Multimedia studies at Ibn Tofail University in Kenitra, and
                    is completing a Master's in Multimedia Engineering and
                    Digital Creativity. He has extensive professional experience
                    collaborating with companies and independent creators.
                  </p>

                  <h3 className="text-white mt-4 font-medium">Themes</h3>
                  <ul className="list-disc ml-5 mt-2 text-gray-400 text-sm">
                    <li>Camel Racing (Allaz)</li>
                    <li>Desert Culture and Traditions</li>
                    <li>Animal Care and Training</li>
                    <li>Community Heritage</li>
                    <li>Rural Moroccan Life</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </BentoTilt>

        {/* Feature cards grid */}
        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          {features.map(({ Icon, title, desc }, i) => (
            <BentoTilt
              key={i}
              className={`bento-tilt_1 row-span-1 ${
                i === 1 ? "md:col-span-1" : ""
              } ${i === 2 ? "md:col-span-1" : ""}`}
            >
              <div className="relative size-full bg-gradient-to-br from-[#0d0804] to-black flex flex-col items-center justify-center p-8 text-center">
                <AutoAnimatedIcon
                  icon={Icon}
                  size={40}
                  color="#DEC087"
                  duration={0.8}
                />
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
                m<b>o</b>re c<b>o</b>ming
                <br />s<b>o</b>on.
              </h1>
              <ChevronRightIcon
                size={48}
                color="#DEC087"
                className="mt-4 opacity-50"
              />
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
