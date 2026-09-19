import type { Metadata } from "next";
import { AppShell } from "@/components/axiom/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "AXIOM — Plan · Study · Progress",
  description: "A desktop-first academic operating system for university students.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><AppShell>{children}</AppShell></body>
    </html>
  );
}
