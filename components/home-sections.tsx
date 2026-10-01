"use client";

import Link from "next/link";
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Network, 
  GraduationCap, 
  Lightbulb, 
  Briefcase, 
  Users, 
  Calendar, 
  FileText, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Award,
  Globe2,
  Building2,
  Lock,
  ScanLine,
  UserCheck,
  CreditCard,
  MapPin,
  TrendingUp
} from "lucide-react";
import { useState } from "react";
import { 
  dynamicStats, 
  whatWeDo, 
  products, 
  clientLogos, 
  sectors, 
  techPulseItems, 
  sanHubCourses, 
  timelineEvents 
} from "@/lib/site-data";

const capabilityIcons: Record<string, React.ElementType> = {
  "01": Code2,
  "02": Cpu,
  "03": Network,
  "04": ShieldCheck,
  "05": TrendingUp,
  "06": Layers,
  "07": GraduationCap,
  "08": Lightbulb,
  "09": Network,
  "10": Briefcase,
};

export function SANTechAtAGlance() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 sm:py-20 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-[0.24em] text-[#333292]">
            SAN TECH AT A GLANCE
          </span>
          <h2 className="font-exo mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Measurable Impact Across Africa
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Real data reflecting our commitment to technology manufacturing, institutional systems, and youth talent development.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {dynamicStats.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 text-center transition-all duration-300 hover:border-[#333292]/40 hover:bg-white hover:shadow-lg"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-[#333292] transition-colors" />
              <p className="font-exo text-3xl sm:text-4xl font-black text-[#333292] tracking-tight">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-bold text-slate-600 tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhatWeDoSection() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-50 py-20 sm:py-24 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.24em] text-[#333292]">
              WHAT WE DO · 10 CORE CAPABILITIES
            </span>
            <h2 className="font-exo mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              End-to-End Technology & Systems
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              From enterprise software engineering to local hardware integration and capacity building.
            </p>
          </div>
          <Link
            href="/innovation-lab"
            className="inline-flex items-center gap-2 rounded-xl bg-[#333292] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-md hover:bg-[#252472] transition-colors"
          >
            <span>Explore All Capabilities</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* 10 Capability Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {whatWeDo.map((item) => {
            const Icon = capabilityIcons[item.number] || Code2;
            return (
              <div
                key={item.number}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-300 hover:border-[#333292] hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#333292]/70 font-mono">
                      #{item.number}
                    </span>
                    <div className="grid size-10 place-items-center rounded-xl bg-[#333292]/10 text-[#333292] transition-colors group-hover:bg-[#333292] group-hover:text-white">
                      <Icon className="size-5" />
                    </div>
                  </div>
                  <h3 className="font-exo mt-5 text-base font-bold leading-snug text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#333292] group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FeaturedSolutionsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-20 sm:py-24 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-[0.24em] text-[#333292]">
            FEATURED SOLUTIONS · INNOVATION LAB
          </span>
          <h2 className="font-exo mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Market-Ready Products & Digital Platforms
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Proprietary products built by SAN TECH to solve real operational, financial, and educational challenges.
          </p>
        </div>

        {/* Products Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.slug}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/80 p-7 shadow-sm transition-all duration-300 hover:border-[#333292] hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#333292]/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#333292]">
                    {product.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {product.stats}
                  </span>
                </div>

                  <h3 className="font-exo mt-5 text-xl font-bold text-slate-900">
                  {product.title}
                </h3>
                <p className="mt-1 text-xs font-bold text-[#333292]">
                  {product.tagline}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Feature tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {product.features.map((feat) => (
                    <span
                      key={feat}
                      className="inline-flex items-center gap-1 rounded-md bg-white border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-700"
                    >
                      <CheckCircle2 className="size-3 text-[#00A3E0]" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                <Link
                  href={product.href}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#333292] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#252472] transition-colors"
                >
                  <span>Explore Product</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
                <Link
                  href="/connect"
                  className="text-xs font-bold text-slate-600 hover:text-[#333292] transition-colors"
                >
                  Request Demo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EVisitorsFlagshipSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#333292] to-[#0f172a] py-20 text-white sm:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          <div className="lg:col-span-7">
            <span className="rounded-full bg-cyan-400/20 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-widest text-cyan-300 border border-cyan-400/30">
              FLAGSHIP PRODUCT · E-VISITORS
            </span>
          <h2 className="font-exo mt-5 text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Smart Visitor, Access & Attendance Management Platform
            </h2>
            <p className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed">
              Replacing manual paper logbooks with automated ID/OCR scanning, biometric authentication, instant host notifications, and real-time building security intelligence.
            </p>

            {/* Feature Checklist */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Automated National ID & Passport OCR",
                "Instant QR & RFID Badge Issuance",
                "VIP Management & Host Alerts",
                "Blacklist & Security Watchlist Triggers",
                "Staff & Casual Worker Attendance",
                "Vehicle & Equipment Gate Tracking",
                "Role-Based Access Control (RBAC)",
                "Full Digital Audit Logs & Analytics",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 shrink-0 text-cyan-300" />
                  <span className="text-xs sm:text-sm font-medium text-white/90">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/e-visitors"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-[#333292] shadow-lg hover:bg-cyan-50 transition-colors"
              >
                <span>Discover Full Product Details</span>
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="/connect"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white hover:bg-white/20 transition-colors"
              >
                <span>Request Live Demo</span>
              </Link>
            </div>
          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-2xl">
              <h3 className="font-exo text-lg font-bold text-white">
                Trusted by 47+ Leading Institutions
              </h3>
              <p className="mt-1 text-xs text-white/70">
                Securing government ministries, district hospitals, corporate headquarters, and universities.
              </p>

              <div className="mt-5 space-y-2.5">
                {clientLogos.map((client) => (
                  <div
                    key={client.name}
                    className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3 border border-white/10"
                  >
                    <span className="text-xs font-bold text-white">{client.name}</span>
                    <span className="text-[10px] font-semibold text-cyan-300">{client.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export function SANHubSection() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-50 py-20 sm:py-24 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.24em] text-[#333292]">
              SAN HUB · DIGITAL ECOSYSTEM
            </span>
          <h2 className="font-exo mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Practical Training & Innovation Programs
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              Mini digital ecosystem inside SAN TECH connecting courses, beneficiaries, verified certifications, internships, and startup incubation.
            </p>
          </div>
          <Link
            href="/san-hub"
            className="inline-flex items-center gap-2 rounded-xl bg-[#333292] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-md hover:bg-[#252472] transition-colors"
          >
            <span>View All Courses</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sanHubCourses.map((course) => (
            <div
              key={course.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-300 hover:border-[#333292] hover:shadow-xl"
            >
              <div>
                <span className="rounded-md bg-[#333292]/10 px-2.5 py-1 text-[11px] font-extrabold text-[#333292]">
                  {course.category}
                </span>
                <h3 className="font-exo mt-4 text-lg font-bold leading-snug text-slate-900">
                  {course.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {course.description}
                </p>

                <div className="mt-5 space-y-1.5 text-xs text-slate-500 font-medium">
                  <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <strong className="text-slate-800">{course.duration}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mode:</span>
                    <strong className="text-slate-800">{course.mode}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href="/san-hub"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-[#333292] group-hover:bg-[#333292] group-hover:text-white transition-colors"
                >
                  <span>Register for Course</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechPulseSection() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filteredItems = activeTab === "All" 
    ? techPulseItems 
    : techPulseItems.filter((item) => item.type === activeTab);

  return (
    <section className="relative isolate overflow-hidden bg-white py-20 sm:py-24 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.24em] text-[#333292]">
              TECH PULSE · TRENDS & OPPORTUNITIES
            </span>
          <h2 className="font-exo mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Opportunities, News, Tenders & Events
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              Stay ahead with real-time opportunities, government and private tenders, press releases, and innovation summits.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1">
            {["All", "Opportunities", "News", "Tenders", "Events"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  activeTab === tab 
                    ? "bg-[#333292] text-white shadow-xs" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Pulse Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-xs transition-all duration-300 hover:border-[#333292] hover:bg-white hover:shadow-xl"
            >
              <div>
                <span className="rounded-md bg-[#333292]/10 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#333292]">
                  {item.badge}
                </span>
                <h3 className="font-exo mt-4 text-base font-bold leading-snug text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">{item.deadline}</span>
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#333292] hover:underline"
                >
                  <span>View</span>
                  <ChevronRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CallToActionSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-r from-[#1e1b4b] via-[#333292] to-[#252472] py-20 text-white sm:py-24">
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <span className="rounded-full bg-cyan-400/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-cyan-300 border border-cyan-400/30">
          BUILD WITH SAN TECH
        </span>
        <h2 className="font-exo mt-6 text-2xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Turn Your Ideas into Impact?
        </h2>
        <p className="mt-5 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Whether you need an enterprise software platform, smart IoT solutions, institutional visitor management, or specialized talent training—SAN TECH is ready.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/connect"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-xs font-extrabold uppercase tracking-wider text-[#333292] shadow-xl hover:bg-cyan-50 transition-colors"
          >
            <span>Request Demo</span>
            <ArrowUpRight className="size-4" />
          </Link>
          <Link
            href="/join-the-community"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-xs font-extrabold uppercase tracking-wider text-white hover:bg-white/20 transition-colors"
          >
            <span>Join the Community</span>
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
