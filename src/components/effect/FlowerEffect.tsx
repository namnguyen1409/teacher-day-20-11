import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function FlowerEffect() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <Particles
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 10 },
            shape: {
              type: "image",
              image: {
                src: "/flower.png",
                width: 32,
                height: 32,
              },
            },
            opacity: { value: 0.9 },
            size: { value: 12 },
            move: {
              enable: true,
              speed: 1.2,
              direction: "bottom",
              outModes: "out",
            },
          },
        }}
      />
    </div>
  );
}
