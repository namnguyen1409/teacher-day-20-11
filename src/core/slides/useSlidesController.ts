import { useState, useEffect, useRef, useCallback } from "react";
import { lyrics } from "../../data/lyrics";

export function useSlidesController(sound: any) {
  const [index, setIndex] = useState(0);
  const max = lyrics.length - 1;

  const lockRef = useRef(false);

  const goTo = useCallback(
    (i: number) => {
      if (!sound) return;

      const clamped = Math.max(0, Math.min(i, max));
      setIndex(clamped);

      sound.seek(lyrics[clamped].time);

      lockRef.current = true;
      setTimeout(() => (lockRef.current = false), 1500);
    },
    [sound]
  );

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    let handle = (e: WheelEvent) => {
      if (lockRef.current) return;

      lockRef.current = true;

      if (e.deltaY > 0) next();
      else prev();

      setTimeout(() => (lockRef.current = false), 1000);
    };

    window.addEventListener("wheel", handle);
    return () => window.removeEventListener("wheel", handle);
  }, [index]);

  return { index, setIndex, next, prev, goTo };
}
