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
    "Dodici passeggiate serali, a Lecce e a Torino. Chi riceve il ciao, chi il buonasera, e quando una frase corretta suona fredda.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
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
