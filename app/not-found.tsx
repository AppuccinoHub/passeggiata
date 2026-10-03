import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-serif text-4xl italic">Questa passeggiata non c&apos;è.</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Dodici passeggiate, Lecce e poi Torino. Questo indirizzo non è una di loro.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-6 h-11 px-4")}>
        La mappa
      </Link>
    </main>
  );
}
