"use client";

import { StoryTimeline, type StoryTimelineItem } from "./ui/story-timeline";

export type JourneyMilestone = StoryTimelineItem;

export const JOURNEY_MILESTONES: readonly JourneyMilestone[] = [
  { id: "2018-idea", year: "2018", title: "Idea", description: "Founders identify problems with manual visitor management.", image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(5).jpg", imageAlt: "SAN TECH team at a technology and innovation event" },
  { id: "2019-inception-validation", year: "2019", title: "Inception & validation", description: "SAN TECH founded, the E-Visitors prototype and IP journey begins, and the product is recognized through NIRDA Innovate for Industry.", image: "/images/summit.jpg", imageAlt: "SAN TECH team at a technology event" },
  { id: "2020-testing", year: "2020", title: "Testing", description: "Prototype moves toward real users and institutional applications.", image: "/images/Testing.JPG", imageAlt: "SAN TECH E-Visitors testing environment" },
  { id: "2021-resilience", year: "2021", title: "Institutionalization", description: "Technology supports institutional resilience and digital processes.", image: "/images/fieldwork.jpg", imageAlt: "Technology being used in a community setting" },
  { id: "2022-ecosystem", year: "2022", title: "Ecosystem", description: "Recognition and emergence of SAN HUB.", image: "/images/graduates.jpg", imageAlt: "SAN HUB graduates celebrating together" },
  { id: "2023-market", year: "2023", title: "Market validation", description: "SAN HUB officially launched; E-Visitors adopted by National Bank of Rwanda (BNR).", image: "/images/team.jpg", imageAlt: "SAN TECH team members in Kigali" },
  { id: "2024-partnerships", year: "2024", title: "Partnerships", description: "International partnerships and innovators from multiple countries.", image: "/images/summit.jpg", imageAlt: "Technology partners gathered in Rwanda" },
  { id: "2025-scaling", year: "2025", title: "Scaling", description: "SAN HUB expands; international and continental ambitions grow.", image: "/images/graduates.jpg", imageAlt: "Learners and innovators at a SAN HUB program" },
  { id: "2026-vision", year: "2026", title: "Best Exhibitor & African Tech Vision", description: "SAN TECH recognized as Best Exhibitor in ICT & Innovation at Expo 2026, hosting Tech Forward Live to expand its African technology, skills, and innovation ecosystem.", image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(172).jpg", imageAlt: "SAN TECH leadership and partners holding the Best Exhibitor in ICT & Innovation award on stage at Expo 2026 and Tech Forward Live" },
];

export function JourneyPanel() {
  return <StoryTimeline items={JOURNEY_MILESTONES} ariaLabel="SAN TECH journey timeline" />;
}
