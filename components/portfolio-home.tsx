"use client";

import type { ReactNode } from "react";
import { OrbitalHeroSection } from "@/components/ui/orbital-hero-section";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/components/ui/projects-data";

/**
 * Personal portfolio home.
 *
 * The whole site used to sit inside an app-style sidebar shell (a UI-kit
 * demo). This page replaces that: a full-bleed orbital animation is pinned to
 * the viewport as a fixed background, so it stays in motion no matter how far
 * the page is scrolled. The hero opens with the name in a big serif, and a
 * set of buttons fixed across the top scroll to the stacked sections below —
 * About, Projects, In progress, Skills, Experience & Education, Contact.
 *
 * Placeholder copy is deliberately written inside brackets, so nothing about
 * the real person is invented — each section shell is meant to be filled in.
 */

/** One-line scrolling nav — mirrored into the sticky header below. */
const NAV_LINKS = [
  { href: "#about", label: "Who is Mohamed" },
  { href: "#projects", label: "Projects" },
  { href: "#in-progress", label: "In Progress" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience & Education" },
  { href: "#contact", label: "Contact" },
] as const;

export default function PortfolioHome() {
  return (
    <>
      <BackgroundCanvas />
      <TopNav />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <InProgressSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Full-page background — the orbital animation is fixed, so it stays in      */
/*  motion behind everything no matter how far down the page you scroll.       */
/* -------------------------------------------------------------------------- */

function BackgroundCanvas() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0">
      <OrbitalHeroSection
        focus={[0.72, 0.45]}
        scrim="none"
        glow={0.8}
        interactive={false}
      />
      {/* A soft veil keeps text readable while the animation still shows
          through. Tune bg-black/45 to trade clarity for vibrancy. */}
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Top navigation                                                            */
/* -------------------------------------------------------------------------- */

function TopNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <nav
        aria-label="Sections"
        className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-1.5 gap-y-1.5 px-4 py-3"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full px-3 py-1.5 font-[family-name:var(--font-lexend)] text-[13px] font-medium text-neutral-300 transition-colors duration-200 hover:bg-white/10 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero — the name sits over the shared animation                             */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-svh items-center px-6 sm:px-10 lg:px-20">
      <div className="max-w-4xl">
        {/* The requested treatment: Times New Roman, bigger than the old
            script wordmark, with the surname in golden amber. */}
        <h1
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
          className="text-5xl leading-[1.02] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.6)] sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem]"
        >
          Hi, I&apos;m Mohamed
          <span className="block text-gold-shine">Almajzoub</span>
        </h1>

        <p className="mt-6 max-w-xl font-[family-name:var(--font-lexend)] text-[15px] leading-relaxed text-white/75 [text-shadow:0_1px_12px_rgba(0,0,0,0.8)] md:mt-8 md:text-base">
          I design and build digital experiences that feel good to use.
          <span className="text-white/45"> [A real one-liner replaces this.]</span>
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shared section shell                                                      */
/* -------------------------------------------------------------------------- */

function Section({
  id,
  step,
  title,
  intro,
  children,
  wide = false,
}: {
  id: string;
  step: string;
  title: string;
  intro?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full scroll-mt-40 px-6 py-24 md:scroll-mt-28 md:py-32 ${
        wide ? "max-w-6xl" : "max-w-4xl"
      }`}
    >
      <p className="font-[family-name:var(--font-lexend)] text-[13px] font-medium uppercase tracking-[0.22em] text-[#FFB300] [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
        {step}
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-lexend)] text-3xl font-semibold text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] md:text-5xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 font-[family-name:var(--font-lexend)] text-[15px] leading-relaxed text-neutral-300 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)] md:text-base">
          {intro}
        </p>
      ) : null}
      <div className="mt-12">{children}</div>
    </section>
  );
}

/** Muted pill used for placeholder facts and skill chips. */
function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-[family-name:var(--font-lexend)] text-[13.5px] text-neutral-300">
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 01 — Who is Mohamed                                               */
/* -------------------------------------------------------------------------- */

function AboutSection() {
  const facts = [
    "[Location]",
    "[Current role / title]",
    "[What I focus on]",
    "[A fun fact]",
  ];
  return (
    <Section
      id="about"
      step="01 · Who is Mohamed"
      title="Who is Mohamed"
      intro="A short introduction — swap these placeholders for the real story."
    >
      <div className="space-y-5 font-[family-name:var(--font-lexend)] text-[15px] leading-relaxed text-neutral-300 md:text-base">
        <p>[Your story in a few sentences: who you are, what you care about, and how you got here.]</p>
        <p>[A second paragraph on what drives the work — the problems you like solving and why.]</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-2.5">
        {facts.map((fact) => (
          <Chip key={fact}>{fact}</Chip>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 02 — Projects (real flipping cards)                               */
/* -------------------------------------------------------------------------- */

function ProjectsSection() {
  return (
    <Section
      id="projects"
      step="02 · Projects"
      title="Projects"
      intro="Finished work, told as flipping cards — use the gold button on each card to turn it."
      wide
    >
      <div className="grid grid-cols-1 justify-items-center gap-12 lg:grid-cols-2">
        {[projects.noor, projects["habit-tracker"]].map((project) => (
          <div key={project.id} className="dark">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 03 — In progress / unfinished                                     */
/* -------------------------------------------------------------------------- */

function InProgressSection() {
  const items = [
    { title: "[Working title one]", note: "[What it will be, in a line.]" },
    { title: "[Working title two]", note: "[What it will be, in a line.]" },
    { title: "[Working title three]", note: "[What it will be, in a line.]" },
  ];
  return (
    <Section
      id="in-progress"
      step="03 · In Progress"
      title="In Progress / Unfinished"
      intro="Ideas on the bench — replace these cards as things get built."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <span className="inline-flex items-center rounded-full border border-[#FFB300]/30 bg-[#FFB300]/10 px-3 py-1 font-[family-name:var(--font-lexend)] text-[12px] font-medium text-[#FFB300]">
              In progress
            </span>
            <h3 className="mt-4 font-[family-name:var(--font-lexend)] text-lg font-medium text-neutral-100">
              {item.title}
            </h3>
            <p className="mt-2 font-[family-name:var(--font-lexend)] text-[14px] leading-relaxed text-neutral-400">
              {item.note}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 04 — Skills                                                        */
/* -------------------------------------------------------------------------- */

function SkillsSection() {
  const groups = [
    { label: "Frontend", items: ["[Framework / library]", "[Language]", "[Styling approach]"] },
    { label: "Backend & Data", items: ["[Runtime / language]", "[Database]", "[APIs]"] },
    { label: "Tools & Practices", items: ["[Version control]", "[Deployment]", "[Testing]"] },
  ];
  return (
    <Section
      id="skills"
      step="04 · Skills"
      title="Skills"
      intro="Grouped chips — rename each bracketed item with the real tool."
    >
      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.label}>
            <h3 className="font-[family-name:var(--font-lexend)] text-sm font-medium uppercase tracking-wider text-neutral-500">
              {group.label}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 05 — Experience & Education                                       */
/* -------------------------------------------------------------------------- */

function ExperienceSection() {
  const entries = [
    { id: "exp-1", role: "[Role / title]", place: "[Company · Location]", period: "[Start]–[End]", note: "[What you did and learned — replace.]" },
    { id: "exp-2", role: "[Role / title]", place: "[Company · Location]", period: "[Start]–[End]", note: "[What you did and learned — replace.]" },
    { id: "edu-1", role: "[Degree / course]", place: "[Institution]", period: "[Year]–[Year]", note: "[Highlight or honours — replace.]" },
  ];
  return (
    <Section
      id="experience"
      step="05 · Experience & Education"
      title="Experience & Education"
      intro="A simple timeline — edit each bracketed entry."
    >
      <ol className="relative space-y-10 border-l border-white/10 pl-8">
        {entries.map((entry) => (
          <li key={entry.id} className="relative">
            <span className="absolute -left-[2.35rem] top-1.5 size-3 rounded-full bg-[#FFB300]" />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-[family-name:var(--font-lexend)] text-lg font-medium text-neutral-100">
                {entry.role}
              </h3>
              <span className="font-[family-name:var(--font-lexend)] text-sm text-neutral-500">
                {entry.period}
              </span>
            </div>
            <p className="mt-1 font-[family-name:var(--font-lexend)] text-sm text-[#FFB300]">
              {entry.place}
            </p>
            <p className="mt-2 font-[family-name:var(--font-lexend)] text-[14.5px] leading-relaxed text-neutral-400">
              {entry.note}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 06 — Contact                                                       */
/* -------------------------------------------------------------------------- */

function ContactSection() {
  const rows = [
    { label: "Email", value: "[you@example.com]" },
    { label: "Location", value: "[City, Country]" },
    { label: "GitHub", value: "[github.com/your-handle]" },
    { label: "LinkedIn", value: "[linkedin.com/in/your-handle]" },
  ];
  return (
    <Section
      id="contact"
      step="06 · Contact"
      title="Contact"
      intro="Ways to reach me — paste in the real addresses, then make each row a link."
    >
      <dl className="max-w-xl divide-y divide-white/10 rounded-2xl border border-white/10">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <dt className="font-[family-name:var(--font-lexend)] text-sm font-medium uppercase tracking-wider text-neutral-500">
              {row.label}
            </dt>
            <dd className="font-[family-name:var(--font-lexend)] text-[15px] text-neutral-200">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
