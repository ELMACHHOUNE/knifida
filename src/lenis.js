import Lenis from "lenis";

export const lenis = new Lenis({
  duration: 1.2,
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 1.5,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
