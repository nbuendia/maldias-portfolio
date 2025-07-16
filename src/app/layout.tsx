import type { Metadata } from "next";
import { Space_Grotesk} from "next/font/google";

import { StoreProvider } from "@/components/StoreProvider";

import "./globals.css";
import "./globalicon.css";

const SpaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
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
      <body className={SpaceGrotesk.variable}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
