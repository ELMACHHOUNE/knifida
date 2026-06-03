import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedTitle({
  title,
  containerClass,
  animateOnScroll = true,
}: {
  title: string;
  containerClass?: string;
  animateOnScroll?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (animateOnScroll) {
        const titleAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "100 bottom",
            end: "center bottom",
            toggleActions: "play none none reverse",
          },
        });

        titleAnimation.to(
          ".animated-word",
          {
            opacity: 1,
            transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
            ease: "power2.inOut",
            stagger: 0.02,
          },
          0
        );
      } else {
        gsap.set(".animated-word", {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [animateOnScroll]);

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-4 sm:px-6 md:px-10 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word text-white special-font font-display font-black"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
