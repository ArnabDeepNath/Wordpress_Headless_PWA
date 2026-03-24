import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Basak Library — World-Class Book Inventory",
  description:
    "Discover, organize, and curate your entire book collection in one breathtakingly beautiful place. Powered by precision. Designed for readers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-black text-[#f5f5f7] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
