/**
 * Project definitions for the Projects dropdown in the sidebar.
 *
 * The text lives here so writing each project's story (the next step) is just
 * editing these strings. The card layout gives the front and back plenty of
 * scrollable text area for longer write-ups.
 */

export type ProjectId = "noor" | "habit-tracker" | "atbara-trade";

export interface ProjectData {
  id: ProjectId;
  title: string;
  tagline: string;
  imageSrc: string;
  imageAlt: string;
  frontText: string;
  backText: string;
  buttonText: string;
  /** Optional heading for the back face of the card; falls back to "About <title>". */
  backTitle?: string;
  /** Optional link opened by the card's back-face button. */
  link?: string;
  /** Optional technology list, rendered as chips on the back face. */
  tech?: string[];
}

export const projects: Record<ProjectId, ProjectData> = {
  noor: {
    id: "noor",
    title: "Sibha",
    tagline: "A quiet place for dhikr and recitation.",
    imageSrc: "/Noor_Project.jpg",
    imageAlt: "Noor project preview",
    frontText:
      "In a world of constant notifications and digital noise, finding a moment of spiritual focus can feel impossible.\n\nSibha was engineered to solve this. It is not just another utility app; it is a beautifully crafted, ad-free sanctuary designed specifically for your daily Dhikr and Quranic recitation.\n\nBy blending modern web architecture with minimalist, distraction-free design, Sibha brings the serenity of a physical misbaha directly to your screen. Discover how technology can actually protect your peace, rather than disrupt it.",
    backText:
      "Sibha was built from the ground up to provide a seamless, premium spiritual experience.\n\nAt its core is a Dynamic Digital Tasbeeh—a highly interactive, glowing counter that persists your state locally, allowing you to track your progress and add custom Dhikr for individual sessions without ever losing your count.\n\nBeyond the counter, Sibha features a fully integrated Quran Reader & Audio Player. Powered by a robust RESTful API, you can read the Noble Quran in beautiful Uthmani script or listen to verse-by-verse recitations without ever leaving the app.\n\nWrapped in a flawless Light/Dark mode UI featuring glassmorphism and subtle geometric patterns, Sibha proves that functional software can also be beautiful.\n\nExperience the intersection of modern engineering and spiritual design.",
    buttonText: "View project",
    link: "https://sibha.vercel.app/",
  },
  "habit-tracker": {
    id: "habit-tracker",
    title: "Momentum",
    tagline: "Build momentum, one day at a time",
    imageSrc: "/image_2026-09-01_18-07-43.jpg",
    imageAlt: "Habit Tracker project cover",
    frontText:
      "Consistency isn't built through rigid discipline; it is built through visual reward.\n\nMost habit trackers feel like sterile spreadsheets or punishing checklists. This application was engineered to be different—a living, breathing dashboard that reacts to your progress in real-time.\n\nBy combining complex scheduling algorithms with a dynamic, neon-lit interface, it transforms daily routines into a highly visual, satisfying streak. Discover a tool where your calendar doesn't just track your days—it celebrates them.",
    backTitle: "Under the Hood",
    backText:
      "This Habit Tracker is a masterclass in front-end state management and dynamic UI architecture.\n\nAt its core is a Custom Scheduling Engine capable of calculating complex repeating intervals, backfilling missed days, and maintaining flawless streak logic—all persisted securely in the browser using Zustand.\n\nThe UI features a Living Background that smoothly crossfades its color palette (Green, Amber, Red) based on your real-time daily completion status. Users can dive into glassy, \"page-on-page\" detail sheets to view 12-week heatmaps, generate shareable PNG progress cards, and export their entire database as JSON.\n\nBuilt with Next.js, TypeScript, Tailwind CSS, and Framer Motion, it delivers a premium, app-like experience directly in the browser.",
    buttonText: "View project",
    link: "https://habittracker-six-sand.vercel.app/",
  },
  "atbara-trade": {
    id: "atbara-trade",
    title: "Atbara Trade",
    tagline: "Where offers and wishes land on the same board.",
    imageSrc: "/Atbara%20Trade.jpg",
    imageAlt: "Atbara Trade storefront preview",
    frontText:
      "Most marketplaces only let people sell. Atbara Trade lets both sides post — sellers list what they have, buyers publish what they're hunting for — so an offer and a wish finally land on the same board.\n\nListings carry a live status (available, reserved, sold) so nobody chases a ghost. A single click on Buy This starts a trade, and every profile carries a display name and direct contact details, so deals finish between two people — not in a dead-end form.\n\nThe storefront is sky-blue and glass-clean, with real search and boards that refresh as items move. It looks like a proper shop, built for a small town with a big appetite.\n\nFlip me over — the engineering is the part I'm proudest of.",
    backTitle: "Under the Hood",
    backText:
      "Backend: a Django 5.2 REST API with token authentication via Simple JWT, running on MySQL — the same code locally and on PythonAnywhere. Every credential is read from the environment with python-decouple, so no password ever lives in the source code.\n\nThe interesting part happened mid-build. I gave listings a status field that moves from available to reserved to sold, then designed a whole PurchaseRequest model so buyers could post what they wanted. Because new users get a profile created automatically by a Django signal, I wrote a one-line backfill so older accounts were migrated too — no lost data, no broken pages.\n\nThe API serves paginated, filterable product feeds wired to a debounced search box, plus a custom initiate-trade action on each listing.\n\nFrontend: hand-written HTML, CSS, and JavaScript — no framework. The glassy cards use backdrop-filter with a fallback for older browsers, the animated sky is pure CSS gradients, and the whole design runs on CSS custom properties, media queries, and prefers-reduced-motion.\n\nUI and API ship from the same Django app, so the site is one origin — fast, simple, and versioned in Git from first commit to live release.",
    tech: [
      "Django",
      "Django REST Framework",
      "Simple JWT",
      "MySQL",
      "Vanilla JS",
      "CSS Glassmorphism",
      "Python-decouple",
      "Git / GitHub",
      "PythonAnywhere",
    ],
    buttonText: "View project",
    link: "https://mohamedalmajzoub.pythonanywhere.com/",
  },
};
