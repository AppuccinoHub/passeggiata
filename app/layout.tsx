import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { Header } from "@/components/header";
import { ProgressProvider } from "@/components/progress";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: {
    default: "Passeggiata",
    template: "%s · Passeggiata",
  },
  description:
    "A lesson map of twelve Italian walks through Lecce and Turin. Who gets ciao, who gets buonasera, and when a correct sentence sounds cold.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <ProgressProvider>
          <Header />
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}
