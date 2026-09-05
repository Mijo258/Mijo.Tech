import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

// UI face for the site — clean, geometric sans that stays legible for section
// text and the top navigation.
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
    <html lang="en" className="bg-black">
      <body className={`${lexend.variable} min-h-svh bg-black text-neutral-50 antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
