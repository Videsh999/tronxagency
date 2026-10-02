import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TRONX — Digital Solutions for Growing Businesses",
  description:
    "TRONX builds websites, business software, automation, smart customer experiences and digital growth solutions around the way your business works.",
  openGraph: {
    title: "TRONX — Digital Solutions for Growing Businesses",
    description:
      "Digital tools, experiences, software and growth systems built around your business.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

