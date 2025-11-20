import { useEffect, useRef } from "react";
import gsap from "gsap";
import LyricSlide from "./LyricSlide";
import { lyrics } from "../../data/lyrics";
import { inverseDirection, type Direction } from "../../core/gsap/transitions";

export default function SlidesContainer({ index }: { index: number }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = (el: HTMLDivElement | null, i: number) => {
    refs.current[i] = el;
  };

  useEffect(() => {
    refs.current.forEach((slide, i) => {
      if (!slide) return;

      if (i === 0) {
        gsap.set(slide, { x: "0%", y: "0%", opacity: 1, zIndex: 2 });
      } else {
        gsap.set(slide, { x: "100%", y: "0%", opacity: 0, zIndex: 0 });
      }
    });
  }, []);

useEffect(() => {
  const current = refs.current[index];
  const prev = refs.current[index - 1];
  if (!current) return;

  if (index === 0) {
    gsap.set(current, { x: "0%", y: "0%", opacity: 0, zIndex: 2 });

    gsap.to(current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    });
    return;
  }


  const directions: Direction[] = ["left", "right", "up", "down"];
  const enterDir = directions[index % directions.length];
  const exitDir = inverseDirection(enterDir);

  const tl = gsap.timeline();

  gsap.set(current, {
    x: enterDir === "left" ? "-100%" : enterDir === "right" ? "100%" : 0,
    y: enterDir === "up" ? "-100%" : enterDir === "down" ? "100%" : 0,
    zIndex: 2,
    opacity: 1,
  });

  if (prev) {
    gsap.set(prev, { zIndex: 1 });

    tl.to(
      prev,
      {
        x: exitDir === "left" ? "-100%" : exitDir === "right" ? "100%" : 0,
        y: exitDir === "up" ? "-100%" : exitDir === "down" ? "100%" : 0,
        duration: 2,
        ease: "power3.inOut",
      },
      0
    );
  }

  tl.to(
    current,
    {
      x: "0%",
      y: "0%",
      duration: 2,
      ease: "power3.inOut",
    },
    0
  );
}, [index]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {lyrics.map((s, i) => (
        <LyricSlide
          key={i}
          data={s}
          active={i === index}
          innerRef={(el: any) => setRef(el, i)}
        />
      ))}
    </div>
  );
}
