"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/components/progress";
import type { Gender } from "@/lib/curriculum";

const options: { id: Gender; label: string }[] = [
  { id: "f", label: "Femminile" },
  { id: "m", label: "Maschile" },
];

export function Header() {
  const pathname = usePathname();
  const home = pathname === "/";
  const { gender, setGender } = useProgress();

  return (
    <header className="border-b border-border/80">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-5 py-3.5">
        {home ? (
          <p className="font-serif text-sm italic text-muted-foreground">
            Dodici passeggiate
          </p>
        ) : (
          <Link
            href="/"
            className="font-serif text-lg italic underline decoration-border underline-offset-4 hover:decoration-primary"
          >
            Passeggiata
          </Link>
        )}
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Accordo grammaticale per le frasi che dici"
        >
          <span className="hidden text-sm text-muted-foreground sm:inline">
            Io dico
          </span>
          <div className="flex rounded-full border border-border bg-card p-0.5">
            {options.map((option) => {
              const selected = gender === option.id;
              return (
                <Button
                  key={option.id}
                  type="button"
                  size="sm"
                  variant={selected ? "default" : "ghost"}
                  aria-pressed={selected}
                  className="h-8 rounded-full px-3"
                  onClick={() => setGender(option.id)}
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
