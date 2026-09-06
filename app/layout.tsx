import type { Metadata } from "next";
import "./globals.css";

// The whole site now renders in Times New Roman (set globally in globals.css),
// so no webfont is loaded here anymore.

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
      <body className="min-h-svh bg-black text-neutral-50 antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
