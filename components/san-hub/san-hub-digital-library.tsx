"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Bookmark, Maximize2, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type LibraryBook = {
  id: string;
  title: string;
  coverTitle: string;
  coverSubtitle: string;
  coverImage?: string;
  description: string;
  category: string;
  pages: string;
  accent: string;
  coverInk: string;
};

type SanHubDigitalLibraryProps = {
  /** Replace this with the published SAN BOOK reader URL when it is available. */
  src?: string;
};

const defaultLibrarySource = "/innovation-lab/product/san-book";

const libraryBooks: LibraryBook[] = [
  {
    id: "san-book",
    title: "SAN BOOK",
    coverTitle: "SAN BOOK",
    coverSubtitle: "Useful technology\nstronger systems",
    coverImage: undefined,
    description: "Digital learning, academic resources, and practical guides from the SAN ecosystem.",
    category: "Learning systems",
    pages: "01",
    accent: "#0a1f44",
    coverInk: "#e8fbff",
  },
  {
    id: "ai-playbook",
    title: "AI PLAYBOOK",
    coverTitle: "AI\nPLAYBOOK",
    coverSubtitle: "Build with intelligence",
    coverImage: undefined,
    description: "A practical introduction to building useful AI products and workflows.",
    category: "Artificial intelligence",
    pages: "02",
    accent: "#087ea4",
    coverInk: "#f2ffff",
  },
  {
    id: "field-notes",
    title: "FIELD NOTES",
    coverTitle: "FIELD\nNOTES",
    coverSubtitle: "Impact and innovation",
    coverImage: undefined,
    description: "Stories, methods, and lessons from projects making technology more useful.",
    category: "Impact and innovation",
    pages: "03",
    accent: "#355c4c",
    coverInk: "#fff7d7",
  },
  {
    id: "digital-africa",
    title: "DIGITAL AFRICA",
    coverTitle: "DIGITAL\nAFRICA",
    coverSubtitle: "People, systems, possibility",
    coverImage: undefined,
    description: "Perspectives on connected communities, digital skills, and the future of work.",
    category: "Community and access",
    pages: "04",
    accent: "#a65d35",
    coverInk: "#fff2d2",
  },
];

export function SanHubDigitalLibrary({ src = defaultLibrarySource }: SanHubDigitalLibraryProps) {
  const [activeBook, setActiveBook] = useState<LibraryBook | null>(null);

  return (
    <section id="san-hub-digital-library" className="san-hub-graphic-section scroll-mt-40 border-b border-[#0a1f44]/10 px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
      <div className="mx-auto max-w-[1500px]">
        {activeBook ? (
          <BookReader book={activeBook} src={src} onBack={() => setActiveBook(null)} />
        ) : (
          <BookShelf onOpen={setActiveBook} />
        )}
      </div>
    </section>
  );
}

function BookShelf({ onOpen }: { onOpen: (book: LibraryBook) => void }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [autoPlay, setAutoPlay] = useState(true);

  const moveRail = useCallback((direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail || rail.scrollWidth <= rail.clientWidth) return;

    const distance = Math.max(rail.clientWidth * 0.78, 250);
    const maximumScroll = rail.scrollWidth - rail.clientWidth;
    const nextPosition = rail.scrollLeft + distance * direction;
    const target = direction === 1 && nextPosition >= maximumScroll - 8
      ? 0
      : direction === -1 && nextPosition <= 8
        ? maximumScroll
        : Math.max(0, Math.min(nextPosition, maximumScroll));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    rail.scrollTo({ left: target, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = window.setInterval(() => moveRail(1), 4800);
    return () => window.clearInterval(timer);
  }, [autoPlay, moveRail]);

  return (
    <>
      <div className="mb-9 flex flex-col justify-between gap-5 border-b border-[#0a1f44]/15 pb-7 sm:flex-row sm:items-end">
        <div>
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-[#0a1f44]">
            <BookOpen className="size-4 text-brand-cyan" aria-hidden="true" />
            SAN BOOK / Digital library
          </p>
          <h1 className="font-exo mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-[-0.05em] text-[#0a1f44] sm:text-4xl lg:text-5xl">
            Choose a book and start reading.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Browse the SAN HUB collection, then open one title in the reading room.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="mr-2 text-xs font-black uppercase tracking-[0.18em] text-[#0a1f44]/55">{libraryBooks.length} titles</span>
          <button type="button" onClick={() => moveRail(-1)} aria-label="Previous books" className="inline-flex size-9 items-center justify-center border border-[#0a1f44]/20 text-[#0a1f44] transition-colors hover:border-brand-cyan hover:text-brand-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan">
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => moveRail(1)} aria-label="Next books" className="inline-flex size-9 items-center justify-center border border-[#0a1f44]/20 text-[#0a1f44] transition-colors hover:border-brand-cyan hover:text-brand-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan">
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setAutoPlay((playing) => !playing)} aria-pressed={autoPlay} aria-label={autoPlay ? "Pause automatic book scrolling" : "Play automatic book scrolling"} className="inline-flex size-9 items-center justify-center border border-[#0a1f44]/20 text-[#0a1f44] transition-colors hover:border-brand-cyan hover:text-brand-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan">
            {autoPlay ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className="px-5 py-9 sm:px-8 lg:px-12 lg:py-12">
        <div ref={railRef} className="grid auto-cols-[minmax(220px,1fr)] grid-flow-col gap-x-8 overflow-x-auto overscroll-x-contain pb-5 snap-x snap-mandatory focus-visible:outline-none sm:auto-cols-[minmax(260px,1fr)] lg:auto-cols-[minmax(280px,1fr)]" tabIndex={0} aria-label="SAN HUB book collection">
          {libraryBooks.map((book) => <div key={book.id} className="min-w-0 snap-start"><BookCover book={book} onOpen={onOpen} /></div>)}
        </div>
      </div>
    </>
  );
}

function BookCover({ book, onOpen }: { book: LibraryBook; onOpen: (book: LibraryBook) => void }) {
  return (
    <button type="button" onClick={() => onOpen(book)} className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-4">
      <span className="relative mx-auto block w-[min(100%,180px)] [perspective:1000px] sm:mx-0">
        <span
          className="relative block aspect-[0.7] overflow-hidden border border-black/20 shadow-[10px_14px_16px_rgba(10,31,68,0.2)] transition duration-300 ease-out group-hover:-translate-y-2 group-hover:rotate-[-1.5deg]"
          style={{
            backgroundColor: book.accent,
            backgroundImage: book.coverImage ? `linear-gradient(rgba(7, 21, 45, 0.08), rgba(7, 21, 45, 0.08)), url(${book.coverImage})` : `linear-gradient(135deg, ${book.accent}, ${book.accent}cc 58%, #07152d)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <span className="absolute inset-y-0 left-0 w-3 border-r border-black/20 bg-black/15 shadow-[inset_-3px_0_4px_rgba(255,255,255,0.12)]" aria-hidden="true" />
          {!book.coverImage && (
            <>
              <span className="absolute inset-x-5 top-5 text-center text-[8px] font-black uppercase tracking-[0.22em]" style={{ color: book.coverInk }}>SAN HUB / {book.pages}</span>
              <span className="absolute inset-x-6 top-[38%] whitespace-pre-line text-center text-xl font-black uppercase leading-[0.95] tracking-[-0.04em]" style={{ color: book.coverInk }}>{book.coverTitle}</span>
              <span className="absolute inset-x-8 bottom-12 whitespace-pre-line text-center text-[9px] font-medium uppercase leading-4 tracking-[0.12em]" style={{ color: book.coverInk }}>{book.coverSubtitle}</span>
            </>
          )}
        </span>
      </span>
      <span className="mt-5 block text-lg font-bold leading-tight tracking-[-0.03em] text-[#0a1f44]">{book.title}</span>
      <span className="mt-1 block text-sm leading-6 text-slate-600">{book.description}</span>
      <span className="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#0a1f44] transition-colors group-hover:text-brand-cyan">
        Open book
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
      </span>
    </button>
  );
}

function BookReader({ book, src, onBack }: { book: LibraryBook; src: string; onBack: () => void }) {
  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 border-b border-[#0a1f44]/15 pb-7 sm:flex-row sm:items-end">
        <div>
          <button type="button" onClick={onBack} className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-[#0a1f44] hover:text-brand-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to library
          </button>
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-[#0a1f44]">
            <BookOpen className="size-4 text-brand-cyan" aria-hidden="true" />
            Reading room / {book.category}
          </p>
          <h1 className="font-exo mt-4 text-3xl font-bold leading-tight tracking-[-0.05em] text-[#0a1f44] sm:text-4xl lg:text-5xl">{book.title}</h1>
        </div>
        <a href={src} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#0a1f44] underline-offset-4 hover:text-brand-cyan hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2">
          Open in new tab
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>

      <div className="grid overflow-hidden border border-[#0a1f44]/20 bg-[#0a1f44] shadow-[0_18px_45px_rgba(10,31,68,0.16)] lg:grid-cols-[minmax(220px,0.28fr)_minmax(0,1fr)]">
        <aside className="relative flex min-h-[240px] flex-col justify-between overflow-hidden bg-[#0a1f44] p-7 text-white sm:p-9 lg:min-h-[580px] lg:p-10">
          <div className="absolute inset-y-0 right-0 w-px bg-white/20" aria-hidden="true" />
          <div>
            <div className="mb-12 flex items-center justify-between text-white/70">
              <span className="text-[10px] font-black uppercase tracking-[0.24em]">SAN HUB</span>
              <Bookmark className="size-5 text-brand-cyan" aria-hidden="true" />
            </div>
            <p className="max-w-[12ch] text-2xl font-bold leading-tight tracking-[-0.04em] sm:text-3xl">{book.title}</p>
          </div>
          <div className="mt-10">
            <div className="mb-4 h-px w-12 bg-brand-cyan" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">Volume {book.pages}</p>
            <p className="mt-2 text-sm leading-6 text-white/75">{book.description}</p>
          </div>
        </aside>

        <div className="min-w-0 bg-[#fdfcf8] p-3 sm:p-5 lg:p-7">
          <div className="flex items-center justify-between border-b border-[#0a1f44]/15 px-2 pb-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#0a1f44]/60 sm:px-4">
            <span>Reading room</span>
            <span className="inline-flex items-center gap-2"><Maximize2 className="size-3.5" aria-hidden="true" /> SAN BOOK</span>
          </div>
          <div className="mt-3 overflow-hidden border border-[#0a1f44]/15 bg-white shadow-[0_8px_24px_rgba(10,31,68,0.08)]">
            <iframe title={`${book.title} digital book`} src={src} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="h-[500px] w-full border-0 sm:h-[560px] lg:h-[640px]" />
          </div>
        </div>
      </div>
    </>
  );
}
