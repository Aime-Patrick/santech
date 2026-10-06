"use client";

import { useEffect, useRef } from "react";

// Sofaru Building exact coordinates
const SOFARU_CENTER: [number, number] = [-1.93917, 30.05971];

// Approximate building footprint polygons
const SOFARU_POLYGON: [number, number][] = [
  [-1.93895, 30.05940],
  [-1.93895, 30.06002],
  [-1.93940, 30.06002],
  [-1.93940, 30.05940],
];

function createPulsingIcon(L: typeof import("leaflet"), color: string) {
  return L.divIcon({
    className: "san-tech-marker",
    html: `
      <div style="position:relative;display:flex;align-items:center;justify-content:center;">
        <div style="
          width:18px;height:18px;
          background:${color};
          border:3px solid #fff;
          border-radius:50%;
          box-shadow:0 2px 8px ${color}80;
          position:relative;z-index:2;
        "></div>
        <div style="
          position:absolute;
          width:36px;height:36px;
          border-radius:50%;
          border:2px solid ${color};
          opacity:0.4;
          animation:san-ping 2s cubic-bezier(0,0,0.2,1) infinite;
        "></div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

function createAreaLabel(L: typeof import("leaflet"), text: string, bgColor: string) {
  return L.divIcon({
    className: "san-tech-area-label",
    html: `
      <div style="
        background:${bgColor};
        color:#fff;
        font-size:9px;
        font-weight:800;
        letter-spacing:0.08em;
        padding:3px 8px;
        border-radius:2px;
        text-transform:uppercase;
        white-space:nowrap;
        box-shadow:0 1px 4px rgba(0,0,0,0.15);
      ">${text}</div>
    `,
    iconSize: [200, 20],
    iconAnchor: [100, -8],
  });
}

function addLocation(
  L: typeof import("leaflet"),
  map: L.Map,
  center: [number, number],
  polygon: [number, number][],
  color: string,
  label: string,
  popupHtml: string,
  openPopup = false,
) {
  // Draw highlighted polygon
  const poly = L.polygon(polygon, {
    color,
    weight: 3,
    opacity: 0.9,
    fillColor: color,
    fillOpacity: 0.22,
    dashArray: "6, 4",
  }).addTo(map);

  // Pulsing circle
  L.circle(center, {
    radius: 30,
    color,
    weight: 2,
    opacity: 0.6,
    fillColor: color,
    fillOpacity: 0.12,
  }).addTo(map);

  // Marker
  const marker = L.marker(center, { icon: createPulsingIcon(L, color) }).addTo(map);
  const popup = marker.bindPopup(popupHtml, { closeButton: false, className: "san-tech-popup" });
  if (openPopup) popup.openPopup();

  // Area label
  const labelPos: [number, number] = [
    polygon[2][0],
    (polygon[0][1] + polygon[1][1]) / 2,
  ];
  L.marker(labelPos, {
    icon: createAreaLabel(L, label, color.replace(")", ",0.9)").replace("rgb", "rgba")),
    interactive: false,
  }).addTo(map);

  // Use direct bg color for the label
  const labelMarker = L.marker(labelPos, {
    icon: L.divIcon({
      className: "san-tech-area-label",
      html: `<div style="
        background:${color};opacity:0.92;
        color:#fff;font-size:9px;font-weight:800;
        letter-spacing:0.08em;padding:3px 8px;
        border-radius:2px;text-transform:uppercase;
        white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.15);
      ">${label}</div>`,
      iconSize: [200, 20],
      iconAnchor: [100, -8],
    }),
    interactive: false,
  }).addTo(map);

  return poly;
}

export function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;

      if (cancelled || !containerRef.current) return;

      // Create map
      const map = L.map(containerRef.current, {
        center: SOFARU_CENTER,
        zoom: 15,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });

      mapRef.current = map;

      // Tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // --- SAN TECH HQ (Sofaru Building) ---
      const sofaruPoly = addLocation(
        L, map,
        SOFARU_CENTER,
        SOFARU_POLYGON,
        "#f97316",  // Orange
        "Sofaru Building — SAN TECH HQ",
        `<div style="font-family:system-ui;text-align:center;padding:4px 2px;">
          <strong style="font-size:13px;color:#0a1f44;">SAN TECH HQ</strong><br/>
          <span style="font-size:11px;color:#64748b;line-height:1.4;">
            Sofaru Building, 3rd Floor<br/>
            Plot 48, KN 1 Road, Muhima<br/>
            Kigali, Rwanda
          </span>
        </div>`,
        true,
      );

      /*
      const minictPoly = addLocation(
        L, map,
        MINICT_CENTER,
        MINICT_POLYGON,
        "#2563eb",  // Blue
        "Ministry of ICT & Innovation",
        `<div style="font-family:system-ui;text-align:center;padding:4px 2px;">
          <strong style="font-size:13px;color:#0a1f44;">Ministry of ICT & Innovation</strong><br/>
          <span style="font-size:11px;color:#64748b;line-height:1.4;">
            4th Floor, RURA Building<br/>
            KN 39 St, Kigali, Rwanda
          </span><br/>
          <span style="font-size:10px;color:#f59e0b;line-height:1.2;">⭐ 4.8</span>
        </div>`,
      );
      */

      // Add ping animation style
      const style = document.createElement("style");
      style.textContent = `
        @keyframes san-ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        .san-tech-popup .leaflet-popup-content-wrapper {
          border-radius: 6px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }
        .san-tech-popup .leaflet-popup-tip {
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .san-tech-marker, .san-tech-area-label {
          background: none !important;
          border: none !important;
        }
      `;
      document.head.appendChild(style);

      map.fitBounds(sofaruPoly.getBounds().pad(0.3));
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[270px] w-full sm:h-[320px] lg:h-[350px]"
      style={{ zIndex: 0 }}
    />
  );
}
