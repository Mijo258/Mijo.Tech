/**
 * Project definitions for the Projects dropdown in the sidebar.
 *
 * The text lives here so writing each project's story (the next step) is just
 * editing these strings. The card layout gives the front and back plenty of
 * scrollable text area for longer write-ups.
 */

export type ProjectId = "noor" | "habit-tracker";

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
};
