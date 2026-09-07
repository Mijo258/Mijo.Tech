import type { Metadata, Viewport } from "next";
import "./globals.css";

// The whole site now renders in Times New Roman (set globally in globals.css),
// so no webfont is loaded here anymore.

export const metadata: Metadata = {
  title: "Mijo.tech",
  description: "Innovate, build and integrate. You imagine and we make it real.",
  themeColor: "#000000",
  icons: { icon: "/icon.svg" },
};

// viewportFit: "cover" lets the page draw into the notch and rounded corners
// on phones; the pt-safe / pb-safe utilities in globals.css then pad content
// past them, so the header and footer never collide with the device chrome.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
