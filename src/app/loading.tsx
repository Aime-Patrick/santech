export default function Loading() {
  return (
    <main className="grid min-h-svh place-items-center bg-[#edf3fb] px-6 text-center text-[#0a1f44]">
      <div role="status" aria-live="polite">
        <span className="mx-auto grid size-12 place-items-center rounded-full border-4 border-[#cfe0f2] border-t-brand-secondary animate-spin" />
        <p className="mt-4 text-sm font-bold">Loading SAN TECH</p>
      </div>
    </main>
  );
}

