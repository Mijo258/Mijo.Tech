"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Menu } from "lucide-react";
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

/** Shown when the top-left profile photo is pressed. */
const MIJO_GREETING =
  "Hi, I'm Mohamed, You can call me Mijo, Feel free to read more about me below!.";

/** The roles under the hero name — each shows in amber-gold, then cycles. */
const ROLES = [
  "Full-stack Developer",
  "AI implementation Engineer",
  "Advanced Prompt Engineer",
] as const;

/** The About intro, revealed one character at a time by <Typewriter/>. */
const ABOUT_TEXT =
  "Hi, I'm Mohamed Almajzoub. I am a Full-stack Developer and AI Implementation Engineer. I build secure, scalable web applications and engineer self-correcting AI agents that solve complex problems—without hallucination.";

/** A single row in the Experience / Education timeline. */
type TimelineEntry = {
  id: string;
  role: string;
  place: string;
  /** Optional; omitted rows render without a date pill. */
  period?: string;
  /** Optional, multi-line bullet summary. */
  note?: string;
};

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
  const [greetingOpen, setGreetingOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuCloseRef = useRef<HTMLButtonElement>(null);

  // Close the drawer with Escape, and lock page scroll while it is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  // Move focus into the drawer when it opens.
  useEffect(() => {
    if (menuOpen) menuCloseRef.current?.focus();
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
        {/* The calc padding clears the phone notch / landscape corners once
            viewport-fit covers the whole screen. */}
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 pb-3 pl-[calc(env(safe-area-inset-left,0px)+1rem)] pr-[calc(env(safe-area-inset-right,0px)+1rem)] pt-[calc(env(safe-area-inset-top,0px)+0.75rem)]">
          {/* Profile photo — minimized to a small circle, top-left of the nav. */}
          <button
            type="button"
            onClick={() => {
              setGreetingOpen((open) => !open);
              setMenuOpen(false);
            }}
            aria-expanded={greetingOpen}
            aria-controls="mijo-greeting"
            aria-label="Hi, I'm Mijo — read more below"
            className={`relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-all duration-200 ${
              greetingOpen
                ? "border-[#FFB300]/70 shadow-[0_0_0_1px_rgba(255,179,0,0.30),0_0_18px_rgba(255,179,0,0.25)]"
                : "border-white/25 hover:border-[#FFB300]/60"
            }`}
          >
            <img
              src="/Mijo%20Cover.jpg"
              alt="Mohamed Almajzoub"
              width={80}
              height={80}
              className="size-full rounded-full object-cover"
            />
          </button>

          {/* Section links — a pill row on md+ screens; below md the drawer
              takes over, so this row stays hidden there. */}
          <nav
            aria-label="Sections"
            className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-1.5 gap-y-1.5 md:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setGreetingOpen(false)}
                className="rounded-full border border-transparent px-3 py-1.5 font-[family-name:var(--font-lexend)] text-[13px] font-medium text-neutral-300 transition-colors duration-200 hover:border-[#FFB300]/50 hover:bg-[#FFB300]/15 hover:text-[#FFB300]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Menu button — mobile only. */}
          <button
            type="button"
            onClick={() => {
              setGreetingOpen(false);
              setMenuOpen((open) => !open);
            }}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="ml-auto flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[#FFB300] transition-colors duration-200 hover:border-[#FFB300]/50 hover:bg-[#FFB300]/15 md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Greeting, revealed when the profile photo is pressed. Lives in the
            header so the fixed bar simply grows a little and nothing overlaps. */}
        {greetingOpen ? (
          <div
            id="mijo-greeting"
            className="mx-auto w-full max-w-6xl px-4 pb-3"
          >
            <div className="relative flex items-center gap-3 rounded-2xl border border-[#FFB300]/25 bg-black/70 px-4 py-3 backdrop-blur-md">
              <p className="font-[family-name:var(--font-lexend)] text-[14px] leading-relaxed text-neutral-100">
                {MIJO_GREETING}
              </p>
              <button
                type="button"
                onClick={() => setGreetingOpen(false)}
                aria-label="Dismiss message"
                className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors duration-200 hover:bg-white/10 hover:text-[#FFB300]"
              >
                ✕
              </button>
            </div>
          </div>
        ) : null}
      </header>

      {/* Mobile drawer — slides in from the right below md and is inert (out of
          the tab order and pointer events) whenever it is closed. The backdrop
          sits under the header (z-40 < z-50) so the menu button stays
          reachable, and the panel slides in beneath the header. */}
      <div className={`fixed inset-0 z-40 md:hidden`} inert={!menuOpen}>
        <div
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          id="mobile-menu"
          className={`glass-panel absolute right-0 top-0 flex h-dvh w-72 max-w-[80vw] flex-col overflow-y-auto pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 pb-2 pt-[calc(env(safe-area-inset-top,0px)+4.5rem)]">
            <span className="font-[family-name:var(--font-lexend)] text-sm font-semibold uppercase tracking-[0.2em] text-[#FFB300]">
              Menu
            </span>
            <button
              ref={menuCloseRef}
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-neutral-300 transition-colors duration-200 hover:border-[#FFB300]/50 hover:text-[#FFB300]"
            >
              ✕
            </button>
          </div>
          <nav aria-label="Sections" className="flex flex-col gap-1 px-4">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border border-transparent px-4 py-3 font-[family-name:var(--font-lexend)] text-[15px] font-medium text-neutral-200 transition-colors duration-200 hover:border-[#FFB300]/40 hover:bg-[#FFB300]/10 hover:text-[#FFB300]"
              >
                <span className="mr-3 inline-block w-5 text-right text-[#FFB300]/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </>
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
            script wordmark, with the surname in golden amber. The size is a
            fluid clamp so the name scales with the viewport and never
            overflows a narrow phone. */}
        <h1
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
          className="text-[clamp(2.6rem,8.5vw,7rem)] leading-[1.02] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.6)]"
        >
          Hi, I&apos;m Mohamed
          <span className="block text-gold-shine">Almajzoub</span>
        </h1>

        <HeroRoles />

        <p className="mt-4 max-w-xl font-[family-name:var(--font-lexend)] text-[15px] leading-relaxed text-white/80 [text-shadow:0_1px_12px_rgba(0,0,0,0.8)] md:text-base">
          Build Software solutions that fits every vision.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero role cycler — the titles under the name                             */
/* -------------------------------------------------------------------------- */

function HeroRoles() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div aria-live="polite" className="mt-4 min-h-[2.6rem]">
      <p
        key={ROLES[index]}
        style={{ fontFamily: "'Times New Roman', Times, serif" }}
        className="animate-role-rise text-[clamp(1.4rem,4.5vw,3rem)] font-bold leading-tight [text-shadow:0_1px_14px_rgba(0,0,0,0.6)]"
      >
        {/* Same polished-gold fill as the "Almajzoub" surname. */}
        <span className="text-gold-shine">{ROLES[index]}</span>
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Typewriter — reveals the About intro progressively when it scrolls in    */
/* -------------------------------------------------------------------------- */

/** True when the visitor prefers reduced motion, which skips the typing. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

function Typewriter({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const done = count >= text.length;

  // Reveal everything at once for reduced-motion users; otherwise wait until
  // the paragraph scrolls into view before starting to type.
  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduced, text]);

  // Type one character at a time once started.
  useEffect(() => {
    if (!started || reduced || done) return;
    const id = window.setTimeout(() => setCount((c) => c + 1), 20);
    return () => window.clearTimeout(id);
  }, [started, reduced, done, count]);

  return (
    <p ref={ref} aria-label={text} className={className}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {started && !done ? (
        <span
          aria-hidden="true"
          className="animate-caret ml-0.5 inline-block w-[2px] bg-[#FFB300]"
          style={{ height: "0.95em", transform: "translateY(0.12em)" }}
        />
      ) : null}
    </p>
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

/** Muted pill used for placeholder facts and skill chips. With an `href` it
    becomes a link — used for certificates, which open in a new tab. */
function Chip({ children, href }: { children: ReactNode; href?: string }) {
  const classes =
    "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-[family-name:var(--font-lexend)] text-[13.5px] text-neutral-300 transition-all duration-300 hover:border-[#FFB300]/70 hover:bg-[#FFB300]/[0.07] hover:text-[#FFB300] hover:shadow-[0_0_0_1px_rgba(255,179,0,0.25),0_0_18px_rgba(255,179,0,0.16)]";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return <span className={classes}>{children}</span>;
}

/* -------------------------------------------------------------------------- */
/*  Section 01 — Who is Mohamed                                               */
/* -------------------------------------------------------------------------- */

function AboutSection() {
  return (
    <Section id="about" step="01 · Who is Mohamed" title="Who is Mohamed">
      <Typewriter
        text={ABOUT_TEXT}
        className="max-w-2xl font-[family-name:var(--font-lexend)] text-[15px] leading-relaxed text-neutral-300 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)] md:text-base"
      />
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
      {/* A tidy 1/2/3 column grid — one card on phones, two on tablets, three
          on large desktops. Each card centers itself with mx-auto inside its
          full-width track. */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3">
        {[
          projects.noor,
          projects["habit-tracker"],
          projects["atbara-trade"],
        ].map((project) => (
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
    {
      title: "Weather Advisor",
      note: "Live weather, minus the guesswork. Weather Advisor pulls current conditions from the WeatherAPI and turns the raw feed into a clean, readable forecast — a quick glance beats refreshing three different apps. The advisor layer — plain-language summaries and alerts — is the part being built next.",
    },
    {
      title: "Prompt Arena",
      note: "Prompt Arena turns prompt engineering into a game you actually want to win. Each round drops a challenge — make the model adopt a persona, obey a strict output format, or crack a riddle without being told how — and your prompt is scored by an independent judge model against a hidden rubric. Climb from Apprentice to Prompt Architect through daily challenges and weekly tournaments, then study the winning prompts to see exactly what separated good from great. The judge engine — rubric design and anti-gaming checks — is what's under construction now.",
    },
    {
      title: "Haggle",
      note: "Haggle is a negotiation sandbox disguised as a game. An AI merchant with a hidden walk-away price, a mood, and a patience meter barters back with you — you pick your opening offer, read their tone, and time your concessions. Too greedy and the deal dies; too soft and you overpay. Every session logs your performance and coaches you on the counter you should have made, turning a five-minute barter into a real lesson in negotiation. The merchant psychology model and the deal-scoring logic are being built right now.",
    },
  ];
  return (
    <Section
      id="in-progress"
      step="03 · In Progress"
      title="In Progress / Unfinished"
      intro="Projects being built right now — interactive first, shippable next."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="glass-panel group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-[#FFB300]/60 hover:shadow-[0_0_0_1px_rgba(255,179,0,0.22),0_0_26px_rgba(255,179,0,0.16)]"
          >
            {/* Interior amber light rising from the card's background on hover. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 50% 12%, rgba(255,179,0,0.20), rgba(255,179,0,0.07) 48%, transparent 72%)",
              }}
            />
            <div className="relative">
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
    {
      label: "Languages & Frameworks",
      items: [
        "Python",
        "Django",
        "Django REST Framework",
        "SQL",
        "MySQL",
        "RESTful APIs",
      ],
    },
    {
      label: "AI & Automation",
      items: [
        "Agentic Workflow Design",
        "Prompt Engineering",
        "Hallucination Mitigation",
        "JSON Task Structuring",
        "Workflow Automation",
        "Multimodal Vision",
      ],
    },
    {
      label: "Tools & Deployment",
      items: [
        "Git",
        "GitHub",
        "GitHub Actions",
        "Postman",
        "PythonAnywhere",
        "Unit Testing",
        "Web Scraping",
      ],
    },
    {
      label: "Core Practices",
      items: [
        "SDLC",
        "OOP",
        "SOLID Principles",
        "Data Structures & Algorithms",
        "Software Design Patterns",
        "SaaS Architecture",
        "Agile Methodologies",
      ],
    },
    {
      label: "Languages",
      items: ["Arabic — Native", "English — Fluent"],
    },
  ];
  return (
    <Section
      id="skills"
      step="04 · Skills"
      title="Skills"
      intro="The stack behind the builds — backend engineering, applied AI, and the practices that keep them production-ready."
    >
      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.label}>
            <h3 className="font-[family-name:var(--font-lexend)] text-sm font-medium uppercase tracking-wider text-[#FFB300]/90">
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

function TimelineEntryList({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative space-y-9 border-l border-white/10 pl-8">
      {entries.map((entry) => (
        <li key={entry.id} className="relative">
          {/* The timeline marker — a glossy gold bead with a bright specular
              highlight and a warm halo, so each entry reads as a glowing
              point on the line. */}
          <span
            aria-hidden
            className="absolute -left-[2.35rem] top-1.5 size-3 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff6d8_0%,#ffd35c_45%,#ffb300_70%,#7a4e00_100%)] shadow-[0_0_6px_1px_rgba(255,179,0,0.75),0_0_18px_4px_rgba(255,179,0,0.35)]"
          />
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-[family-name:var(--font-lexend)] text-lg font-medium text-neutral-100">
              {entry.role}
            </h3>
            {entry.period ? (
              <span className="font-[family-name:var(--font-lexend)] text-sm text-neutral-500">
                {entry.period}
              </span>
            ) : null}
          </div>
          <p className="mt-1 font-[family-name:var(--font-lexend)] text-sm text-[#FFB300]">
            {entry.place}
          </p>
          {entry.note ? (
            <p className="mt-2 whitespace-pre-line font-[family-name:var(--font-lexend)] text-[14.5px] leading-relaxed text-neutral-400">
              {entry.note}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function ExperienceSection() {
  const experience: TimelineEntry[] = [
    {
      id: "exp-promptbase",
      role: "Commercial AI Logic Architect",
      place: "PromptBase · Remote",
      period: "Mar 2026 – Present",
      note: "• Ranked in the global top 8,000 prompt engineers (PromptBase #7,935) for technical prompt architecture and diagnostic-tool development.\n• Engineered a Self-Correcting Diagnostic Suite that automates debugging for backend developers.\n• Designed the “Wait-and-Request” agentic protocol — models must validate system context before generating code, cutting runtime errors.\n• Applied multimodal-vision AI to catch UI crashes and map them to backend database repairs.",
    },
    {
      id: "exp-frontend",
      role: "Front-end Developer",
      place: "Self-paced career · Independent",
      note: "• A self-paced, project-driven front-end track: products taken from concept to polished release while building in public.\n• Sibha — a React-based digital Tasbih and Quran experience with a glassmorphism UI, a stateful live counter, light/dark themes, and a REST-backed verse reader and audio player.\n• Momentum — a Next.js + TypeScript habit tracker with a custom scheduling engine (streak logic, missed-day backfill) persisted in Zustand, animated with Framer Motion, crossfading palettes driven by real-time daily status, and shareable PNG progress cards.\n• Comfortable owning the UI layer of full-stack apps — responsive layouts, motion, accessibility, and performance included.",
    },
    {
      id: "exp-marketplace",
      role: "Backend Developer",
      place: "P2P Exchange Platform · Independent project",
      note: "• Built a full-stack marketplace with Python and Django, centered on secure transaction logic.\n• Architected MySQL database schemas and token-based authentication for secure user access.\n• Automated backend event handling with Django Signals and custom middleware.\n• Used AI-assisted rapid prototyping for the front end while keeping 100% backend data integrity.",
    },
    {
      id: "exp-weather",
      role: "Automated Data & Weather API Tool",
      place: "Python automation project",
      note: "• Designed a Python data scraper and integration tool that pulls real-time environmental datasets from WeatherAPI.\n• Automated the extraction, parsing, and console visualization of JSON-formatted external data.",
    },
    {
      id: "exp-ecommerce",
      role: "E-Commerce API",
      place: "Backend architecture project",
      note: "• Built a production-ready e-commerce API focused on backend server architecture and database management.\n• Validated every endpoint in Postman to confirm robust token authentication and data security.",
    },
  ];

  const education: TimelineEntry[] = [
    {
      id: "edu-bsc",
      role: "B.Sc. in Communication & Electronics Engineering",
      place: "Alexandria University · Egypt",
      period: "2022 – 2027 (expected)",
      note: "A computer-systems engineering degree taken with a software-first focus — backend development, database management, and applied AI are where the curriculum meets the work I ship.",
    },
  ];

  /** Certification chips; each one links to its certificate folder. */
  const certifications: { label: string; href: string }[] = [
    {
      label: "ALX · Backend Web Development (Django REST Framework) — 2025",
      href: "https://drive.google.com/drive/folders/1_LeXOiQy0SPfjzB4DLtIJ3A6c8FMjNuk",
    },
    {
      label: "IBM · AI Developer Professional Certificate — 4/10 modules (in progress)",
      href: "https://drive.google.com/drive/folders/165bBgyOWSYabGTdv6nAWScIK5rUV53Sm",
    },
    {
      label: "Software Engineering Essentials",
      href: "https://drive.google.com/drive/folders/1_NbGkdaiEUuZzc9YHMwQ4lwwa9D9USTR",
    },
    {
      label: "Google Claude · Gen AI Beyond the Chatbot",
      href: "https://drive.google.com/drive/folders/1Zvlx2GiR8MbH14358QOJ81FIqLosj2wG",
    },
  ];

  return (
    <Section
      id="experience"
      step="05 · Experience & Education"
      title="Experience & Education"
      intro="Where I've worked, the systems I've built, and the training behind them."
    >
      <h3 className="mb-6 font-[family-name:var(--font-lexend)] text-[13px] font-medium uppercase tracking-[0.2em] text-neutral-400">
        Experience
      </h3>
      <TimelineEntryList entries={experience} />

      <h3 className="mb-6 mt-14 font-[family-name:var(--font-lexend)] text-[13px] font-medium uppercase tracking-[0.2em] text-neutral-400">
        Education
      </h3>
      <TimelineEntryList entries={education} />

      <h3 className="mb-4 mt-14 font-[family-name:var(--font-lexend)] text-[13px] font-medium uppercase tracking-[0.2em] text-neutral-400">
        Certifications
      </h3>
      <div className="flex max-w-3xl flex-wrap gap-2.5">
        {certifications.map((cert) => (
          <Chip key={cert.href} href={cert.href}>
            {cert.label}
          </Chip>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 06 — Contact                                                       */
/* -------------------------------------------------------------------------- */

function ContactSection() {
  const rows = [
    {
      label: "Email",
      value: "mijogiddo@gmail.com",
      href: "mailto:mijogiddo@gmail.com",
    },
    {
      label: "Phone",
      value: "+20 155 339 5997",
      href: "tel:+20155335997",
    },
    { label: "Location", value: "Alexandria, Egypt" },
    {
      label: "GitHub",
      value: "github.com/Mijo258",
      href: "https://github.com/Mijo258",
      external: true,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/mohamedalmajzoub-osman-56b057284",
      href: "https://www.linkedin.com/in/mohamedalmajzoub-osman-56b057284",
      external: true,
    },
  ];
  return (
    <Section
      id="contact"
      step="06 · Contact"
      title="Contact"
      intro="Happy to talk projects, roles, or ideas — reach out through any of these."
    >
      <dl className="glass-panel max-w-xl divide-y divide-white/10 rounded-2xl">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <dt className="font-[family-name:var(--font-lexend)] text-sm font-medium uppercase tracking-wider text-neutral-500">
              {row.label}
            </dt>
            <dd className="font-[family-name:var(--font-lexend)] text-[15px] text-neutral-200">
              {"href" in row && row.href ? (
                <a
                  href={row.href}
                  {...("external" in row && row.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-neutral-200 underline-offset-4 transition-colors duration-200 hover:text-[#FFB300] hover:underline"
                >
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
