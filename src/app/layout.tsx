import type { Metadata } from "next";
import { Space_Grotesk, Cutive_Mono } from "next/font/google";

import { StoreProvider } from "@/components/StoreProvider";

import "./globals.css";
import "./globalicon.css";

const SpaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const CutiveMono = Cutive_Mono({
  variable: "--font-cutive-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "React-Redux-Next-app",
  description: "All my beautiful jewels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${SpaceGrotesk.variable} ${CutiveMono.variable}`}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
