"use client";

import { StoryTimeline, type StoryTimelineItem } from "./ui/story-timeline";

export type JourneyMilestone = StoryTimelineItem;

export const JOURNEY_MILESTONES: readonly JourneyMilestone[] = [
  { id: "2018-idea", year: "2018", title: "Idea", description: "Founders identify problems with manual visitor management." },
  { id: "2019-inception-validation", year: "2019", title: "Inception & validation", description: "SAN TECH founded, the E-Visitors prototype and IP journey begins, and the product is recognized through NIRDA Innovate for Industry." },
  { id: "2020-testing", year: "2020", title: "Testing", description: "Prototype moves toward real users and institutional applications." },
  { id: "2021-resilience", year: "2021", title: "Institutionalization", description: "Technology supports institutional resilience and digital processes." },
  { id: "2022-ecosystem", year: "2022", title: "Ecosystem", description: "Recognition and emergence of SAN HUB." },
  { id: "2023-market", year: "2023", title: "Market validation", description: "SAN HUB officially launched; E-Visitors adopted by National Bank of Rwanda (BNR)." },
  { id: "2024-partnerships", year: "2024", title: "Partnerships", description: "International partnerships and innovators from multiple countries." },
  { id: "2025-scaling", year: "2025", title: "Scaling", description: "SAN HUB expands; international and continental ambitions grow." },
  { id: "2026-vision", year: "2026", title: "African tech vision", description: "SAN TECH expands its technology, training, innovation, and systems-integration ecosystem." },
];

export function JourneyPanel() {
  return <StoryTimeline items={JOURNEY_MILESTONES} ariaLabel="SAN TECH journey timeline" />;
}
