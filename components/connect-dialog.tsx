"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ConnectRequestForm } from "@/components/connect-request-form";

type ConnectTopic = "talk" | "partnership";

export function ConnectDialog({
  initialTopic = "talk",
  className,
}: {
  initialTopic?: ConnectTopic;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ||
          "inline-flex h-10 items-center justify-center gap-2 bg-[#0a1f44] px-5 text-xs font-bold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
        }
      >
        Connect with us
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] grid overflow-y-auto bg-[#0a1f44]/55 p-4 backdrop-blur-sm sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="connect-dialog-title"
            className="relative m-auto w-full max-w-3xl"
          >
            <div className="sr-only" id="connect-dialog-title">Connect with SAN TECH</div>
            <button
              type="button"
              aria-label="Close connect dialog"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-white text-[#0a1f44] shadow-sm transition-colors hover:bg-brand-cyan hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
            <ConnectRequestForm initialTopic={initialTopic} />
          </div>
        </div>
      )}
    </>
  );
}

