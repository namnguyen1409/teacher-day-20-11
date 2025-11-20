import { useRef, useState, useCallback } from "react";
import { Howl } from "howler";

export function useAudioPlayer(src: string) {
  const soundRef = useRef<Howl | null>(null);
  const [ready, setReady] = useState(false);

  const initAndPlay = useCallback(() => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: [src],
        html5: true,
        onload: () => setReady(true),
      });
    }

    soundRef.current.play();
  }, []);

  const seek = (t: number) => soundRef.current?.seek(t);
  const getCurrent = () => (soundRef.current?.seek() as number) || 0;

  return {
    sound: soundRef.current,
    ready,
    initAndPlay,
    seek,
    getCurrent,
  };
}
