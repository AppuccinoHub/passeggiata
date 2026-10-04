"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/components/progress";
import {
  contrasts,
  nightLabel,
  strolls,
  threshold,
  tonightOf,
  towns,
  walkedThrough,
  type TownId,
} from "@/lib/curriculum";
import { strollScene } from "@/lib/scenes";

export function LessonMap() {
  const { finished, reset } = useProgress();
  const walked = walkedThrough(finished);
  const tonight = tonightOf(finished);
  const [armed, setArmed] = useState(false);

  return (
    <main>
      <div className="h-2 bg-gradient-to-r from-[#c46a3a] via-[#6e4a58] to-[#243044]" />
      <section className="mx-auto max-w-2xl px-5 py-5">
        <h1 className="font-serif text-3xl italic">How to walk</h1>
        <ol className="mt-3 grid gap-2 text-base leading-snug">
          <li>1. Tap Entra on the photo.</li>
          <li>2. Tap Ascolta and hear the Italian.</li>
          <li>3. Tap the sentence you would say.</li>
          <li>4. Put the words back in order.</li>
        </ol>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Femminile means you are speaking as a woman. Maschile means as a man.
        </p>
      </section>
      {tonight ? (
        <Link href={`/s/${tonight.slug}`} className="group relative block h-[28svh] overflow-hidden bg-black text-white">
          <img
            src={strollScene[tonight.slug].src}
            alt={strollScene[tonight.slug].alt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />
          <span className="relative flex h-[28svh] flex-col justify-end px-5 pb-5">
            <span className="mx-auto w-full max-w-2xl">
              <span className="block font-serif text-lg italic text-white/80">Passeggiata</span>
              <span className="mt-2 block text-sm uppercase tracking-[0.16em] text-white/70">
                Stasera · {tonight.time}
              </span>
              <span className="mt-2 block font-serif text-4xl leading-none italic sm:text-5xl">
                {tonight.title}
              </span>
              <span className="mt-3 block max-w-md text-lg text-white/90">{tonight.place}</span>
              <span className="mt-4 inline-flex h-11 items-center rounded-lg bg-white px-5 text-sm font-medium text-[#241c16]">
                Entra · Start
              </span>
            </span>
          </span>
        </Link>
      ) : (
        <section className="relative min-h-[62svh] overflow-hidden bg-black text-white">
          <img
            src={strollScene["il-ritorno"].src}
            alt={strollScene["il-ritorno"].alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/25" />
          <div className="relative flex min-h-[62svh] flex-col justify-end px-5 pb-8">
            <div className="mx-auto w-full max-w-2xl">
              <p className="font-serif text-lg italic text-white/80">Passeggiata</p>
              <h1 className="mt-2 font-serif text-5xl italic">Lecce e Torino, camminate.</h1>
              <p className="mt-3 max-w-md text-lg text-white/90">
                Le strade ci sono ancora, se una frase va rifatta.
              </p>
            </div>
          </div>
        </section>
      )}

      <TownPath town="lecce" walked={walked} tonightSlug={tonight?.slug ?? null} />

      <section className="border-y border-[#243044]/20 bg-[#243044] text-[#e7eef3]">
        <div className="mx-auto max-w-2xl px-5 py-8">
          <p className="font-serif text-lg italic text-[#c9d6e2]">
            {threshold.kicker}
          </p>
          <p className="mt-2 text-lg leading-relaxed">{threshold.text}</p>
        </div>
      </section>

      <div className="bg-[#e4ebf0] text-[#1c2430]">
        <TownPath
          town="turin"
          walked={walked}
          tonightSlug={tonight?.slug ?? null}
          inverted
        />
      </div>

      <section className="mx-auto max-w-2xl px-5 py-12">
        <h2 className="font-serif text-3xl italic">Come cambiano le sere</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Le passeggiate sono la prova. Questo è solo il filo.
        </p>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {contrasts.map((row) => (
            <div key={row.label} className="grid gap-3 py-5 sm:grid-cols-[7rem_1fr]">
              <dt className="font-serif text-lg italic">{row.label}</dt>
              <dd className="grid gap-3">
                <p className="text-sm leading-relaxed">
                  <span className="text-[#8c3d1e]">Lecce. </span>
                  {row.lecce}
                </p>
                <p className="text-sm leading-relaxed">
                  <span className="text-[#3e5166]">Torino. </span>
                  {row.turin}
                </p>
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {armed ? (
            <>
              <Button type="button" variant="destructive" onClick={() => {
                reset();
                setArmed(false);
              }}>
                Cancella le sere camminate
              </Button>
              <Button type="button" variant="ghost" onClick={() => setArmed(false)}>
                Tienile
              </Button>
            </>
          ) : (
            <Button type="button" variant="outline" onClick={() => setArmed(true)}>
              Ricomincia le sere
            </Button>
          )}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          I posti sono veri: Sant&apos;Oronzo, Santa Croce, via Po, Piazza
          Vittorio Veneto, Porta Nuova. Le persone no. Il percorso resta in
          questo browser.
        </p>
      </section>
    </main>
  );
}

function TownPath({
  town,
  walked,
  tonightSlug,
  inverted = false,
}: {
  town: TownId;
  walked: string[];
  tonightSlug: string | null;
  inverted?: boolean;
}) {
  const info = towns[town];
  const nights = strolls.filter((stroll) => stroll.town === town);
  const mute = inverted ? "text-[#4e5c6b]" : "text-muted-foreground";

  return (
    <section className="mx-auto max-w-2xl px-5 py-10">
      <p className={`font-serif text-lg italic ${mute}`}>
        {info.region}. {info.kicker}
      </p>
      <h2 className="mt-1 font-serif text-4xl italic">{info.name}</h2>
      <ol className="mt-6 grid gap-4">
        {nights.map((stroll) => {
          const state = walked.includes(stroll.slug)
            ? "walked"
            : tonightSlug === stroll.slug
              ? "tonight"
              : "ahead";
          const status =
            state === "tonight" ? "Adesso" : state === "walked" ? "Fatta" : "Poi";
          const scene = strollScene[stroll.slug];
          return (
            <li key={stroll.slug}>
              <Link
                href={`/s/${stroll.slug}`}
                className="group relative block overflow-hidden rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <img
                  src={scene.src}
                  alt={scene.alt}
                  className="h-36 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-44"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <span className="flex items-baseline justify-between gap-3 text-sm text-white/80">
                    <span>
                      {nightLabel(stroll.number)} · {stroll.time}
                    </span>
                    <span className="font-serif italic">{status}</span>
                  </span>
                  <span className="mt-1 block font-serif text-3xl italic leading-tight">
                    {stroll.title}
                  </span>
                  <span className="mt-1 block text-sm text-white/85">{stroll.place}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
      <p className={`mt-6 max-w-xl text-sm leading-relaxed ${mute}`}>{info.blurb}</p>
    </section>
  );
}
