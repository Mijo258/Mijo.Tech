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
    title: "Habit Tracker",
    tagline: "Build better routines, one day at a time",
    imageSrc: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    imageAlt: "A planner and pen laid out on a desk",
    frontText:
      "Habit Tracker is the project placeholder. This is the introduction that appears on the front of the card — the first few lines that tell a visitor what Habit Tracker is, at a glance.\n\nWrite the real story here in the next step. There is plenty of room: the text area scrolls, so long paragraphs are fine.",
    backText:
      "This is the detailed back-of-card write-up for Habit Tracker.\n\nUse this space for the full project story: what Habit Tracker does, why it exists, how it was built, the people behind it, and what comes next.\n\nThe card flips on hover, so the front gives the pitch and the back gives the depth.",
    buttonText: "View project",
  },
};
