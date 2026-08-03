import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recall",
  description:
    "A simple note-taking app built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="flex items-center justify-between p-4 border-b">
          <div>logo</div>
          <div className="flex gap-4">
            <button>
              <Link href="/auth/signin">Sign In</Link>
            </button>
            <button>
              <Link href="/dashboard">Dashboard</Link>
            </button>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
