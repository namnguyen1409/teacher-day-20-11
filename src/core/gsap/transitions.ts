import { gsap } from "gsap";

export type Direction = "left" | "right" | "up" | "down";

export const slideEnter = (el: HTMLElement, direction: Direction) => {
  const from: any = { opacity: 0 };
  const to: any = {
    opacity: 1,
    duration: 1,
    ease: "power3.out",
  };

  switch (direction) {
    case "left":
      from.x = "-100%";
      to.x = "0%";
      break;
    case "right":
      from.x = "100%";
      to.x = "0%";
      break;
    case "up":
      from.y = "-100%";
      to.y = "0%";
      break;
    case "down":
      from.y = "100%";
      to.y = "0%";
      break;
  }

  gsap.fromTo(el, from, to);
};

export const slideExit = (el: HTMLElement, direction: Direction) => {
  const to: any = {
    opacity: 0,
    duration: 0.9,
    ease: "power3.in",
  };

  switch (direction) {
    case "left":
      to.x = "100%"; 
      break;
    case "right":
      to.x = "-100%";
      break;
    case "up":
      to.y = "100%";
      break;
    case "down":
      to.y = "-100%";
      break;
  }

  gsap.to(el, to);
};

export const inverseDirection = (d: Direction): Direction => {
  switch (d) {
    case "left": return "right";
    case "right": return "left";
    case "up": return "down";
    case "down": return "up";
  }
};
export const slideDirections: Direction[] = ["left", "right", "up", "down"];
