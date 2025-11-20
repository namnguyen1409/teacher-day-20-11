import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GlobalFallingPetals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createPetal = () => {
      const p = document.createElement("img");
      p.className =
        "absolute w-[32px] h-[32px] opacity-80 pointer-events-none";
      p.src = "/flower.png";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = "-20px";

      container.appendChild(p);

      gsap.to(p, {
        y: window.innerHeight + 50,
        x: "+=" + (Math.random() * 100 - 50),
        rotate: Math.random() * 180,
        duration: 6 + Math.random() * 4,
        ease: "sine.inOut",
        onComplete: () => p.remove(),
      });
    };

    const interval = setInterval(createPetal, 320);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-9999"
    />
  );
}
