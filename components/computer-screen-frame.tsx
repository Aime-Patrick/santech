import Image from "next/image";
import { LazyVideo } from "@/components/lazy-video";

export type ComputerScreenFrameProps = {
  kind: "image" | "video";
  src: string;
  alt: string;
  label?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
  compact?: boolean;
};

/** A compact desktop monitor used to present product screenshots and system views. */
export function ComputerScreenFrame({ kind, src, alt, label = "SAN TECH / SYSTEM VIEW", fit = "cover", priority = false, compact = false }: ComputerScreenFrameProps) {
  return (
    <div className={`mx-auto w-full max-w-[680px] px-2 sm:px-4 ${compact ? "pb-3" : "pb-5"}`}>
      <div className="rounded-[1.15rem] bg-[#13243b] p-1.5 shadow-[0_24px_55px_rgba(10,31,68,0.18)] sm:rounded-[1.35rem] sm:p-2">
        <div className="overflow-hidden rounded-[0.8rem] bg-[#eef3f7] sm:rounded-[1rem]">
          <div className="flex h-8 items-center gap-3 border-b border-[#d7e0e8] bg-[#f8fafc] px-3 sm:h-9 sm:px-4">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="size-2 rounded-full bg-[#f07d72]" />
              <span className="size-2 rounded-full bg-[#f2c45d]" />
              <span className="size-2 rounded-full bg-[#56c596]" />
            </div>
            <span className="min-w-0 flex-1 truncate text-[9px] font-black uppercase tracking-[0.16em] text-[#8291a4]">{label}</span>
            <span className="hidden text-[9px] font-bold uppercase tracking-[0.12em] text-[#00a3e0] sm:block">Kigali / Rwanda</span>
          </div>

          <div className={`relative overflow-hidden bg-[#dce8f2] ${compact ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
            {kind === "video" ? (
              <LazyVideo src={src} className={`size-full ${fit === "contain" ? "object-contain" : "object-cover"}`} autoPlay muted loop playsInline aria-label={alt} />
            ) : (
              <Image src={src} alt={alt} fill priority={priority} loading={priority ? "eager" : "lazy"} sizes="(max-width: 1024px) 100vw, 680px" className={fit === "contain" ? "object-contain" : "object-cover"} />
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a1f44]/25 to-transparent" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className={`mx-auto w-[28%] rounded-b-lg bg-gradient-to-b from-[#6f8092] to-[#b7c4cf] shadow-[0_8px_12px_rgba(10,31,68,0.12)] ${compact ? "h-2.5" : "h-3 sm:h-4"}`} aria-hidden="true" />
      <div className="mx-auto h-1.5 w-[54%] rounded-full bg-[#8798a8] shadow-[0_4px_8px_rgba(10,31,68,0.18)]" aria-hidden="true" />
    </div>
  );
}
