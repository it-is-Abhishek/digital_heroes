import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Heroes",
  description:
    "Subscription-based golf platform with charity contributions, score tracking, and draw management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <div className="page-shell">
          <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col">
            <div className="flex items-center justify-between px-6 py-5 text-sm text-[var(--color-muted)] sm:px-10">
              <Link href="/" className="font-semibold text-[var(--color-ink)]">
                Digital Heroes
              </Link>
              <div className="flex items-center gap-5">
                <Link href="/charities">Charities</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/admin">Admin</Link>
              </div>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
