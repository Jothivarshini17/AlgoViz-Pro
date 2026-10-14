import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "AlgoViz Pro | Interactive DSA Learning Platform",
  description: "Master data structures and algorithms through interactive visualizations, coding practice, quizzes, and personalized progress tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="font-sans bg-black text-white antialiased selection:bg-indigo-500/30">
        <div className="relative min-h-screen overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
