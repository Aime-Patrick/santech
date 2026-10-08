"use client";

import { useUiCopy } from "@/lib/use-ui-copy";

export function ConnectLabels() {
  const t = useUiCopy();
  return {
    contactDetails: t.contactDetails,
    turningIdeasIntoImpact: t.turningIdeasIntoImpact,
    liveStream: t.liveStream,
    listenLive: t.listenLive,
    getDirections: t.getDirections,
    phone: t.phone,
    whatsapp: t.whatsapp,
    email: t.email,
    alternativeEmail: t.alternativeEmail,
  };
}

// Individual label components for use inside the server page
export function ContactDetailsLabel() {
  const t = useUiCopy();
  return <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary lg:text-[11px]">{t.contactDetails}</p>;
}

export function TurningIdeasLabel() {
  const t = useUiCopy();
  return <p id="contact-details-title" className="mt-1 text-xs leading-5 text-slate-600 lg:text-sm lg:leading-6">{t.turningIdeasIntoImpact}</p>;
}

export function LiveStreamLabel() {
  const t = useUiCopy();
  return <span className="block text-[9px] font-black uppercase tracking-[0.14em] text-slate-400 lg:text-[10px]">{t.liveStream}</span>;
}

export function ListenLiveLabel() {
  const t = useUiCopy();
  return <span>{t.listenLive}</span>;
}

export function GetDirectionsLabel() {
  const t = useUiCopy();
  return <span>{t.getDirections}</span>;
}
