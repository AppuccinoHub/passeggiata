"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/components/progress";
import {
  contrasts,
  moves,
  nightLabel,
  strolls,
  threshold,
  tonightOf,
  towns,
  walkedThrough,
  type Mode,
  type TownId,
} from "@/lib/curriculum";

const moveOrder: Mode[] = ["overhear", "answer", "notice"];

export function LessonMap() {
  const { finished, reset } = useProgress();
  const walked = walkedThrough(finished);
  const tonight = tonightOf(finished);
  const [armed, setArmed] = useState(false);

  return (
    <main>
      <div className="h-2 bg-gradient-to-r from-[#c46a3a] via-[#6e4a58] to-[#243044]" />
      <section className="mx-auto max-w-2xl px-5 pt-8 pb-2">
        <h1 className="font-serif text-5xl leading-none italic sm:text-6xl">
          Passeggiata
        </h1>
        <p className="mt-5 text-lg leading-relaxed">
          A lesson is one evening, on foot. You don&apos;t collect words. You
          arrive in a town and deal with the people already in the street: how
          long a greeting lasts, who is offered <Em>tu</Em>, and when a correct
          sentence makes the room go quiet.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Lecce first, where the stone holds the heat and warmth shows up as
          time, food, and <Em>ciao</Em> given early. Turin after, under the
          arcades, where courtesy is often a shorter sentence. The same{" "}
          <Em>buonasera</Em> works in both. Almost nothing else transfers
          without being resized. You can read ahead. The evening itself does
          not skip.
        </p>
        {tonight ? (
          <p className="mt-5 font-serif text-lg italic">
            Next is{" "}
            <Link
              href={`/s/${tonight.slug}`}
              className="underline decoration-border underline-offset-4 hover:decoration-primary"
            >
              {tonight.title}
            </Link>
            , {tonight.time}, {tonight.place}.
          </p>
        ) : (
          <p className="mt-5 font-serif text-lg italic">
            Both towns are walked. The map is still here if a sentence needs
            another size.
          </p>
        )}
      </section>

      <section className="mx-auto max-w-2xl px-5 py-8">
        <h2 className="font-serif text-2xl italic">Three moves</h2>
        <ul className="mt-4 grid gap-5 sm:grid-cols-3">
          {moveOrder.map((mode) => {
            const move = moves[mode];
            return (
              <li key={mode}>
                <p className="font-serif text-lg italic">{move.it}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="text-foreground">{move.en}.</span> {move.text}
                </p>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Cold means grammatical and socially off. Too close is the other
          mistake: warmth carried in from a room that hasn&apos;t offered it.
          You choose the line. You don&apos;t type it yet. The ear for distance
          comes before the mouth.
        </p>
      </section>

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
        <h2 className="font-serif text-3xl italic">How the evenings differ</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Read this after the map, or before it. The strolls are the proof. This
          is only the spine.
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
                  <span className="text-[#3e5166]">Turin. </span>
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
                Clear the walked evenings
              </Button>
              <Button type="button" variant="ghost" onClick={() => setArmed(false)}>
                Keep them
              </Button>
            </>
          ) : (
            <Button type="button" variant="outline" onClick={() => setArmed(true)}>
              Start the evenings over
            </Button>
          )}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          The places are real: Sant&apos;Oronzo, Santa Croce, via Po, Piazza
          Vittorio Veneto, Porta Nuova. The people are not. Progress stays in
          this browser.
        </p>
      </section>
    </main>
  );
}

function Em({ children }: { children: React.ReactNode }) {
  return (
    <em lang="it" className="font-serif">
      {children}
    </em>
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
  const line = inverted ? "border-[#c5d0da]" : "border-border";

  return (
    <section className="mx-auto max-w-2xl px-5 py-10">
      <p className={`font-serif text-lg italic ${mute}`}>
        {info.region}. {info.kicker}
      </p>
      <h2 className="mt-1 font-serif text-4xl italic">{info.name}</h2>
      <p className="mt-4 max-w-xl leading-relaxed">{info.blurb}</p>
      <ol className={`mt-6 border-t ${line}`}>
        {nights.map((stroll) => {
          const state = walked.includes(stroll.slug)
            ? "walked"
            : tonightSlug === stroll.slug
              ? "tonight"
              : "ahead";
          const status =
            state === "tonight" ? "Next" : state === "walked" ? "Walked" : "Ahead";
          return (
            <li key={stroll.slug} className={`border-b ${line}`}>
              <Link
                href={`/s/${stroll.slug}`}
                className={`block border-l-2 py-5 pl-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${
                  state === "tonight"
                    ? "border-l-[#c46a3a]"
                    : state === "walked"
                      ? inverted
                        ? "border-l-[#7d8fa3]"
                        : "border-l-[#c4a484]"
                      : "border-l-transparent"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-2xl leading-tight">
                    <span className={`mr-2 ${mute}`}>{nightLabel(stroll.number)}</span>
                    {stroll.title}
                  </h3>
                  <span
                    className={`shrink-0 font-serif text-sm italic ${
                      state === "ahead" ? mute : ""
                    }`}
                  >
                    {status}
                  </span>
                </div>
                <p className={`mt-1 text-sm ${mute}`}>
                  {stroll.time} · {stroll.place}
                </p>
                <p className="mt-2 text-sm leading-relaxed">{stroll.skill}</p>
                <p className={`mt-2 text-sm leading-relaxed ${mute}`}>
                  {stroll.stops.map((stop) => stop.short).join(" · ")}
                </p>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
