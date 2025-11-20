import { useEffect } from "react";
import { lyrics } from "../../data/lyrics";

export function useAudioSyncSlides(sound: any, setIndex: (i: number) => void) {
  useEffect(() => {
    if (!sound) return;

    const interval = setInterval(() => {
      const currentTime = sound.seek() as number;

      const idx = lyrics.findIndex((l, i) => {
        const nextTime = lyrics[i + 1]?.time ?? 99999;
        return currentTime >= l.time && currentTime < nextTime;
      });

      if (idx !== -1) {
        setIndex(idx);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [sound, setIndex]);
}
