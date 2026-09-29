import type { ReactNode } from "react";

type CircuitBackgroundProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "main";
};

export function CircuitBackground({ children, className = "", as: Element = "div" }: CircuitBackgroundProps) {
  return (
    <Element className={`circuit-background ${className}`}>
      <div className="circuit-background__pieces" aria-hidden="true">
        <span className="circuit-background__piece circuit-background__piece--top" />
        <span className="circuit-background__piece circuit-background__piece--bottom" />
        <span className="circuit-background__piece circuit-background__piece--left" />
        <span className="circuit-background__piece circuit-background__piece--right" />
      </div>
      <div className="relative z-10">{children}</div>
    </Element>
  );
}
