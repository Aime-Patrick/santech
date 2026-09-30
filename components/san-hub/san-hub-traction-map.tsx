"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/maps/world.json";

const tractionCountries = [
  { name: "Rwanda", flag: "/flags/rwanda.svg", coordinates: [30.0619, -1.9441] as [number, number], label: "Primary hub" },
] as const;

export function SanHubTractionMap() {
  return (
    <div className="mt-0 grid gap-6 border-y border-slate-200 py-6 lg:grid-cols-[1.45fr_0.55fr] lg:items-center lg:gap-10">
      <div className="overflow-hidden bg-[#f7fafc]" aria-label="SAN HUB world participation map">
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 220, center: [8, 8] }}
          width={960}
          height={470}
          className="h-auto w-full"
        >
          <defs>
            <pattern id="rwanda-flag-pattern" patternUnits="userSpaceOnUse" width="24" height="16">
              <rect width="24" height="8" fill="#00a1de" />
              <rect y="8" width="24" height="4" fill="#f1c40f" />
              <rect y="12" width="24" height="4" fill="#20603d" />
              <circle cx="19.5" cy="4" r="1.65" fill="#f9d616" />
              <path d="M19.5 1.65v4.7M17.15 4h4.7M17.84 2.34l3.32 3.32M21.16 2.34l-3.32 3.32" stroke="#f9d616" strokeWidth="0.45" />
            </pattern>
          </defs>
          <Geographies geography={geoUrl}>
            {({ geographies }) => geographies.map((geo) => {
              const isRwanda = geo.properties?.name === "Rwanda";

              return <g key={geo.rsmKey}>
                <title>{geo.properties?.name ?? "Country"}</title>
                <Geography
                  geography={geo}
                  fill={isRwanda ? "url(#rwanda-flag-pattern)" : "#dce5ef"}
                  style={{ fill: isRwanda ? "url(#rwanda-flag-pattern)" : "#dce5ef" }}
                  stroke="#ffffff"
                  strokeWidth={0.55}
                  className="outline-none"
                />
              </g>;
            })}
          </Geographies>
        </ComposableMap>
      </div>

      <aside className="border-l border-slate-200 pl-5 lg:pl-8">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-secondary">Participation network</p>
        <p className="font-exo mt-4 text-5xl font-bold tracking-[-0.06em] text-[#0a1f44]">17+</p>
        <p className="mt-1 text-sm font-bold text-[#0a1f44]">countries reached</p>
        <p className="mt-4 text-sm leading-6 text-slate-600">SAN HUB connects learners, innovators, researchers, and partners from Rwanda and beyond.</p>
        <div className="mt-6 border-t border-slate-200 pt-4">
          {tractionCountries.map((country) => <div key={country.name} className="flex items-center gap-3 text-sm font-semibold text-[#0a1f44]"><img src={country.flag} alt={`${country.name} flag`} className="h-4 w-6 rounded-sm object-cover" /> {country.name} / {country.label}</div>)}
          <div className="mt-3 flex items-center gap-3 text-sm font-semibold text-[#0a1f44]"><span className="text-xl" aria-hidden="true">🌍</span> International participation</div>
        </div>
        <p className="mt-6 text-xs leading-5 text-slate-500">Country-level figures will be added as SAN HUB reporting data is confirmed.</p>
      </aside>
    </div>
  );
}
