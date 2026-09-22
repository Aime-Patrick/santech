import type { ComponentType } from "react";

declare module "@/components/InfiniteSpiral" {
  type InfiniteSpiralItem =
    | string
    | {
        src: string;
        alt?: string;
        href?: string;
        target?: string;
        label?: string;
        id?: string;
      };

  type InfiniteSpiralProps = {
    items?: InfiniteSpiralItem[];
    speed?: number;
    direction?: "up" | "down";
    animationMode?: "auto" | "scroll" | "drag" | "all";
    radius?: number;
    cardWidth?: number;
    cardHeight?: number;
    verticalSpacing?: number;
    perspective?: number;
    cardsPerTurn?: number;
    rotation?: number;
    cardTilt?: number;
    cardRadius?: number;
    centerScale?: number;
    edgeFade?: number;
    edgeBlur?: number;
    pauseOnHover?: boolean;
    imageFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
    grayscale?: number;
    className?: string;
  };

  const InfiniteSpiral: ComponentType<InfiniteSpiralProps>;
  export default InfiniteSpiral;
}
