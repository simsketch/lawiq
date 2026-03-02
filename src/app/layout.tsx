import type { Metadata } from "next";
import { Cormorant, Figtree } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LawIQ — Know What You're Owed",
  description: "Your employer may owe you more. LawIQ calculates your entitlements and writes a professional demand letter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${cormorant.variable} ${figtree.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
