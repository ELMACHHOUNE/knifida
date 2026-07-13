import { useEffect, useState } from "react";
import { lenis } from "./lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import TeamSection from "./components/TeamSection";
import Gameplay from "./components/Gameplay";
import Characters from "./components/Characters";
import UIShowcase from "./components/UIShowcase";

import VideoStory from "./components/VideoStory";
import CTA from "./components/CTA";
import Loader from "./components/Loader";
import MusicPlayer from "./components/MusicPlayer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          lenis.scrollTo(value);
        }
        return window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      <MusicPlayer />
      <main className="bg-black text-white overflow-x-hidden">
        <Hero />
        <About />
        <Features />
        <TeamSection />
        <Gameplay />
        <Characters />
        <UIShowcase />
        <VideoStory />
        <CTA />
      </main>
    </>
  );
}
