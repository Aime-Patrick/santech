# SAN TECH Public Website

The public SAN TECH website is the first phase of the SAN TECH integrated digital platform.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn-compatible UI components
- GSAP with `@gsap/react` for coordinated hero transitions
- Motion for React for interaction and menu animations

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run start
```

The public website is intentionally separate from the future SAN HUB and CMS systems. Content is currently represented by typed data in `lib/site-data.ts` so it can later be replaced with API/CMS data without changing the page structure.
