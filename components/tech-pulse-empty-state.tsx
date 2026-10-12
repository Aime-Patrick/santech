import Link from "next/link";
import { ArrowUpRight, Newspaper, SearchX } from "lucide-react";

type TechPulseEmptyStateProps = {
  title: string;
  description: string;
  onClear?: () => void;
};

export function TechPulseEmptyState({ title, description, onClear }: TechPulseEmptyStateProps) {
  return (
    <div className="flex min-h-[270px] flex-col items-center justify-center border border-dashed border-slate-300 bg-[#f8fafc] px-6 py-12 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-[#e8f3f8] text-brand-secondary">
        {onClear ? <SearchX className="size-6" aria-hidden="true" /> : <Newspaper className="size-6" aria-hidden="true" />}
      </span>
      <h3 className="font-exo mt-5 text-xl font-bold tracking-[-0.03em] text-[#0a1f44]">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
      {onClear ? (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 inline-flex items-center gap-2 bg-[#0a1f44] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
        >
          Clear search
          <SearchX className="size-4" aria-hidden="true" />
        </button>
      ) : (
        <Link
          href="/tech-pulse"
          className="mt-5 inline-flex items-center gap-2 bg-[#0a1f44] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
        >
          Return to Tech Pulse
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
