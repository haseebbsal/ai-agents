import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import UiProvider from "@/providers/ui-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Agents",
  description: "Use Any AI Agent Tailored To Your Needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{background:"url('/endless-constellation.svg')"}}
      >
        <UiProvider>
          {children}
        </UiProvider>
      </body>
    </html>
  );
}
