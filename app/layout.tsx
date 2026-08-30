import type { Metadata } from "next";
import { Alex_Brush, Lexend } from "next/font/google";
import Frame760 from "@/components/ui/sidebar-component";
import "./globals.css";

// Calligraphy face for the Mijo.tech wordmark — flowing, ink-style script with
// connected letters. Loaded through next/font so it is self-hosted, preloaded
// and swaps in without layout shift.
const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alex-brush",
  display: "swap",
});

// UI face for the sidebar navigation — clean, geometric sans that pairs with
// the script wordmark and keeps menu labels legible at small sizes.
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mijo.tech",
  description: "Innovate, build and integrate. You imagine and we make it real.",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-black">
      <body className={`${alexBrush.variable} ${lexend.variable} h-full bg-black antialiased`}>
        <div className="flex h-svh w-full overflow-hidden">
          <Frame760 />
          <main className="h-svh min-w-0 flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
