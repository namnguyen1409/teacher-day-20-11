import { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import { TEXT_EFFECTS, type TextEffect } from "../../core/gsap/textAnimations";

interface LyricSlideProps {
  data: any;
  innerRef: any;
  active: boolean;
}

export default function LyricSlide({
  data,
  innerRef,
  active,
}: LyricSlideProps) {
  const textRef = useRef<HTMLHeadingElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<HTMLDivElement>(null);

  const effect: TextEffect =
    TEXT_EFFECTS[Math.floor(Math.random() * TEXT_EFFECTS.length)];

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const drift = gsap.to(el, {
      x: "+=15",
      y: "+=10",
      duration: 8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const zoom = gsap.to(el, {
      scale: 1.03,
      duration: 12,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const shake = gsap.to(el, {
      x: "+=1",
      y: "-=1",
      duration: 0.15,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      drift.kill();
      zoom.kill();
      shake.kill();
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    if (!flowerRef.current) return;

    gsap.fromTo(
      flowerRef.current.children,
      {
        opacity: 0,
        y: 40,
        scale: 0.6,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.6,
        ease: "power3.out",
        stagger: 0.15,
      }
    );
  }, [active]);

  useEffect(() => {
    if (!active) return;
    if (!petalsRef.current) return;

    const petals = petalsRef.current;

    const createPetal = () => {
      const p = document.createElement("div");
      p.className =
        "petal absolute w-4 h-4 bg-pink-300 rounded-full opacity-80";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = "-20px";

      petals.appendChild(p);

      gsap.to(p, {
        y: innerRef.current?.offsetHeight || 800,
        x: "+=" + (Math.random() * 100 - 50),
        rotate: Math.random() * 180,
        duration: 6 + Math.random() * 4,
        ease: "sine.inOut",
        onComplete: () => p.remove(),
      });
    };

    const interval = setInterval(createPetal, 350);

    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const el = textRef.current;
    if (!el) return;

    el.innerHTML = data.text;

    const split = new SplitType(el, { types: "words,chars", tagName: "span" });

    const words = el.querySelectorAll(".word");
    const chars = el.querySelectorAll(".char");

    const total = (data.end ?? data.time + 3) - data.time;
    const animDur = total * 0.35;
    const staggerDur = total * 0.45;

    const tl = gsap.timeline();

    console.log("Applying text effect:", effect);

    switch (effect) {
      case "words-slide-up":
        tl.from(words, {
          opacity: 0,
          yPercent: 100,
          duration: animDur,
          ease: "back.out(1.8)",
          stagger: { amount: staggerDur },
        });
        break;
      case "words-rotate-in":
        gsap.set(words, { transformPerspective: 1000 });
        tl.from(words, {
          rotationX: -90,
          opacity: 0,
          duration: animDur,
          ease: "power2.out",
          stagger: { amount: staggerDur },
        });
        break;
      case "words-slide-from-right":
        tl.from(words, {
          opacity: 0,
          x: "1em",
          duration: animDur,
          ease: "power2.out",
          stagger: { amount: staggerDur },
        });
        break;
      case "letters-slide-up":
        tl.from(chars, {
          yPercent: 120,
          opacity: 0,
          duration: animDur,
          ease: "power1.out",
          stagger: { amount: staggerDur },
        });
        break;
      case "letters-slide-down":
        tl.from(chars, {
          yPercent: -120,
          opacity: 0,
          duration: animDur,
          ease: "power1.out",
          stagger: { amount: staggerDur },
        });
        break;
    }

    return () => {
      tl.kill();
      split.revert();
    };
  }, [active]);

  return (
    <div
      ref={innerRef}
      className="absolute inset-0 flex flex-col items-center justify-end will-change-transform"
      style={{
        backgroundImage: `url(${data.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "brightness(0.7)",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="w-[80%] h-[55%] rounded-xl shadow-2xl flex items-center justify-center z-20 backdrop-blur-sm">
        {data.isCard ? (
            <>
               <h1 className="absolute top-36 text-4xl font-extrabold text-yellow-300 text-shadow-lg/30 drop-shadow-amber-950 text-center px-6">
                    CHÀO MỪNG NGÀY NHÀ GIÁO VIỆT NAM 20-11
               </h1>
                <h1
                    ref={textRef}
                    className={`text-3xl font-bold text-pink-300 text-shadow-lg/30 drop-shadow-amber-950 text-center px-6 transition-opacity duration-300`}
                >
                    {data.text}
                </h1>
            </>
        ) : (
          <h1
            ref={textRef}
            className={`text-5xl font-bold text-pink-300 text-shadow-lg/30 drop-shadow-amber-950 text-center px-6 transition-opacity duration-300`}
          >
            {data.text}
          </h1>
        )}
      </div>
      <div
        ref={flowerRef}
        className="w-full flex justify-center gap-3 mt-6 z-20 pb-4 h-[200px]"
      ></div>
    </div>
  );
}
