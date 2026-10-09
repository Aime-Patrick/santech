"use client";

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";

type LazyVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  /** Load immediately for an above-the-fold video; otherwise wait until near the viewport. */
  eager?: boolean;
  /** How far before entering the viewport the video should begin loading. */
  rootMargin?: string;
};

/**
 * Defers the network request for videos that are below the fold while preserving
 * native autoplay, controls, poster, and accessibility behavior.
 */
export function LazyVideo({
  src,
  eager = false,
  rootMargin = "300px 0px",
  preload,
  autoPlay,
  ...props
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(eager);

  useEffect(() => {
    if (shouldLoad || !videoRef.current) return;

    const video = videoRef.current;
    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [rootMargin, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || !autoPlay || !videoRef.current) return;
    void videoRef.current.play().catch(() => {
      // Autoplay can still be blocked by the browser; native controls remain available.
    });
  }, [autoPlay, shouldLoad]);

  return (
    <video
      ref={videoRef}
      {...props}
      src={shouldLoad ? src : undefined}
      autoPlay={autoPlay && shouldLoad}
      preload={shouldLoad ? preload ?? "metadata" : "none"}
    />
  );
}
