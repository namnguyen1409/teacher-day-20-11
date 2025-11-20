import SlidesContainer from "./components/slides/SlidesContainer";
import PlayButton from "./components/ui/PlayButton";
import { useAudioPlayer } from "./core/audio/useAudioPlayer";
import { useSlidesController } from "./core/slides/useSlidesController";
import { useAudioSyncSlides } from "./core/slides/useAudioSyncSlides";

export default function App() {
  const { sound, ready, initAndPlay } = useAudioPlayer("/song_2.mp3");
  const { index, setIndex } = useSlidesController(sound);


  useAudioSyncSlides(sound, (i) => {
    setIndex(i);
  });

  if (!sound) return <PlayButton onClick={initAndPlay} />;
  if (!ready) return <div className="text-white">Loading audio...</div>;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <SlidesContainer index={index} />
    </div>
  );
}
