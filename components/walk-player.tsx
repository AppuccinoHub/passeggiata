"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { useProgress } from "@/components/progress";
import {
  getStroll,
  moves,
  neighborStroll,
  nightLabel,
  say,
  strolls,
  toneLabel,
  tonightOf,
  towns,
  walkedThrough,
  type Choice,
  type Tone,
} from "@/lib/curriculum";

export function WalkPlayer({ slug }: { slug: string }) {
  const stroll = getStroll(slug);
  const { gender, finished, finish } = useProgress();
  const [phase, setPhase] = useState<"map" | "walk" | "done">("map");
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [showMap, setShowMap] = useState(false);

  if (!stroll) return null;

  const town = towns[stroll.town];
  const walked = walkedThrough(finished);
  const alreadyWalked = walked.includes(stroll.slug);
  const tonight = tonightOf(finished);
  const canStamp = tonight?.slug === stroll.slug;
  const previous = strolls[stroll.number - 2];
  const earlier = neighborStroll(slug, -1);
  const later = neighborStroll(slug, 1);
  const turin = stroll.town === "turin";

  const shell = turin
    ? "town-turin bg-background text-foreground"
    : "bg-[#f6efe4] text-[#241c16]";
  const mute = turin ? "text-[#4e5c6b]" : "text-muted-foreground";
  const rule = turin ? "border-[#c5d0da]" : "border-border";

  function restart() {
    setPicked({});
    setIndex(0);
    setPhase("walk");
    setShowMap(false);
  }

  function endStroll() {
    if (canStamp) finish(stroll!.slug);
    setPhase("done");
  }

  const offCount = stroll.stops.filter((stop) => {
    const choice = picked[stop.id];
    return choice === undefined || stop.choices[choice]?.tone !== "fit";
  }).length;

  return (
    <main className={shell}>
      <article className="mx-auto max-w-2xl px-5 py-8 pb-16">
        <p className={`text-sm ${mute}`}>
          <Link href="/" className="underline decoration-current/30 underline-offset-4">
            The map
          </Link>
          <span> · {town.name} · Walk {nightLabel(stroll.number)} · {stroll.time}</span>
        </p>
        <h1 className="mt-3 font-serif text-4xl italic leading-tight sm:text-5xl">
          {stroll.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed">{stroll.skill}</p>
        <p className={`mt-2 leading-relaxed ${mute}`}>{stroll.promise}</p>
        <p className={`mt-2 text-sm ${mute}`}>{stroll.place}</p>

        {!canStamp && !alreadyWalked && previous ? (
          <p className="mt-5 border-l-2 border-l-[#c46a3a] pl-4 text-sm leading-relaxed">
            You can read and rehearse this evening. It counts on the map when
            you finish{" "}
            <Link
              href={`/s/${previous.slug}`}
              className="underline decoration-current/40 underline-offset-4"
            >
              {previous.title}
            </Link>
            .
          </p>
        ) : null}
        {alreadyWalked ? (
          <p className="mt-5 font-serif italic">Walked.</p>
        ) : null}

        {phase === "map" ? (
          <>
            <ol className={`mt-8 divide-y ${rule} border-y ${rule}`}>
              {stroll.stops.map((stop, stopIndex) => (
                <li key={stop.id} className="py-5">
                  <p className={`text-sm ${mute}`}>
                    {stopIndex + 1} · {moves[stop.mode].it} · {moves[stop.mode].en}
                  </p>
                  <h2 className="mt-1 font-serif text-2xl italic">{stop.short}</h2>
                  <p className={`mt-1 text-sm ${mute}`}>
                    {stop.place} · {stop.who}
                  </p>
                  <p className="mt-3 leading-relaxed">{stop.scene}</p>
                  {stop.heard ? (
                    <figure className="mt-4">
                      {stop.heardFrom ? (
                        <figcaption className={`text-sm ${mute}`}>
                          {stop.heardFrom}
                        </figcaption>
                      ) : null}
                      <blockquote
                        lang="it"
                        className="mt-1 font-serif text-2xl leading-snug italic"
                      >
                        {say(stop.heard, gender)}
                      </blockquote>
                      {stop.gloss ? (
                        <p className={`mt-2 text-sm leading-relaxed ${mute}`}>
                          {stop.gloss}
                        </p>
                      ) : null}
                    </figure>
                  ) : null}
                  <p className="mt-3 text-sm leading-relaxed">{stop.teach}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" size="lg" className="h-11 px-4" onClick={restart}>
                {alreadyWalked ? "Walk it again" : "Walk this evening"}
              </Button>
            </div>
            <NeighborLinks earlier={earlier?.slug} later={later?.slug} earlierTitle={earlier?.title} laterTitle={later?.title} mute={mute} />
          </>
        ) : null}

        {phase === "walk" ? (
          <WalkStop
            strollSlug={stroll.slug}
            index={index}
            total={stroll.stops.length}
            stop={stroll.stops[index]}
            gender={gender}
            pickedIndex={picked[stroll.stops[index].id]}
            mute={mute}
            showMap={showMap}
            onToggleMap={() => setShowMap((value) => !value)}
            onPick={(choiceIndex) => {
              const id = stroll.stops[index].id;
              setPicked((prev) =>
                prev[id] === undefined ? { ...prev, [id]: choiceIndex } : prev,
              );
            }}
            onNext={() => {
              if (index === stroll.stops.length - 1) endStroll();
              else setIndex((value) => value + 1);
            }}
          />
        ) : null}

        {phase === "done" ? (
          <section className="mt-8">
            <h2 className="font-serif text-3xl italic">
              {canStamp || alreadyWalked ? "The stroll is walked." : "Rehearsed."}
            </h2>
            <p className="mt-3 leading-relaxed">
              {offCount === 0
                ? "You kept the distance. That is the whole skill of this evening."
                : offCount === 1
                  ? "One stop came out at the wrong distance. The street is still there."
                  : `${offCount} stops came out at the wrong distance. The street is still there.`}
            </p>
            {!canStamp && !alreadyWalked && previous ? (
              <p className="mt-3 leading-relaxed">
                This pass doesn&apos;t light the next night. The evening still
                starts at {previous.title}.
              </p>
            ) : null}
            <ol className="mt-6 space-y-3">
              {stroll.stops.map((stop) => {
                const choice = stop.choices[picked[stop.id] ?? -1];
                return (
                  <li key={stop.id} className="text-sm leading-relaxed">
                    <span className="font-serif italic">{stop.short}. </span>
                    {choice ? toneLabel[choice.tone] : "Not answered."}{" "}
                    <span className={mute}>{stop.teach}</span>
                  </li>
                );
              })}
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" variant="outline" className="h-11" onClick={restart}>
                Walk it again
              </Button>
              {later && (alreadyWalked || canStamp) ? (
                <Link
                  href={`/s/${later.slug}`}
                  className={cn(buttonVariants({ size: "lg" }), "h-11 px-4")}
                >
                  {later.title}
                </Link>
              ) : null}
              <Link
                href="/"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-4")}
              >
                Back to the map
              </Link>
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}

function NeighborLinks({
  earlier,
  later,
  earlierTitle,
  laterTitle,
  mute,
}: {
  earlier?: string;
  later?: string;
  earlierTitle?: string;
  laterTitle?: string;
  mute: string;
}) {
  if (!earlier && !later) return null;
  return (
    <nav className={`mt-8 flex flex-wrap justify-between gap-3 text-sm ${mute}`}>
      {earlier ? (
        <Link href={`/s/${earlier}`} className="underline decoration-current/30 underline-offset-4">
          Earlier: {earlierTitle}
        </Link>
      ) : (
        <span />
      )}
      {later ? (
        <Link href={`/s/${later}`} className="underline decoration-current/30 underline-offset-4">
          Later: {laterTitle}
        </Link>
      ) : null}
    </nav>
  );
}

function WalkStop({
  index,
  total,
  stop,
  gender,
  pickedIndex,
  mute,
  showMap,
  onToggleMap,
  onPick,
  onNext,
}: {
  strollSlug: string;
  index: number;
  total: number;
  stop: NonNullable<ReturnType<typeof getStroll>>["stops"][number];
  gender: "f" | "m";
  pickedIndex: number | undefined;
  mute: string;
  showMap: boolean;
  onToggleMap: () => void;
  onPick: (index: number) => void;
  onNext: () => void;
}) {
  const revealed = pickedIndex !== undefined;
  const move = moves[stop.mode];

  return (
    <section className="mt-8" aria-live="polite">
      <div className="flex items-baseline justify-between gap-3">
        <p className={`text-sm ${mute}`}>
          Stop {index + 1} of {total} · {move.it} · {move.en}
        </p>
        <button
          type="button"
          className={`text-sm underline decoration-current/30 underline-offset-4 ${mute}`}
          onClick={onToggleMap}
        >
          {showMap ? "Hide the point" : "The point of this stop"}
        </button>
      </div>
      {showMap ? (
        <p className={`mt-2 text-sm leading-relaxed ${mute}`}>{stop.teach}</p>
      ) : null}
      <h2 className="mt-3 font-serif text-3xl italic">{stop.short}</h2>
      <p className={`mt-1 text-sm ${mute}`}>
        {stop.place} · {stop.who}
      </p>
      <p className="mt-4 leading-relaxed">{stop.scene}</p>
      {stop.heard ? (
        <figure className="mt-5">
          {stop.heardFrom ? (
            <figcaption className={`text-sm ${mute}`}>{stop.heardFrom}</figcaption>
          ) : null}
          <blockquote lang="it" className="mt-1 font-serif text-2xl leading-snug italic text-balance">
            {say(stop.heard, gender)}
          </blockquote>
          {stop.gloss ? (
            <p className={`mt-2 text-sm leading-relaxed ${mute}`}>{stop.gloss}</p>
          ) : null}
        </figure>
      ) : null}
      <p className="mt-6 font-medium">{stop.prompt}</p>
      <ul className="mt-3 grid gap-2">
        {stop.choices.map((choice, choiceIndex) => (
          <li key={choice.tone + say(choice.text, gender)}>
            <ChoiceButton
              choice={choice}
              gender={gender}
              english={
                stop.mode !== "answer" ||
                say(choice.text, gender).startsWith("You ")
              }
              selected={pickedIndex === choiceIndex}
              revealed={revealed}
              onPick={() => onPick(choiceIndex)}
            />
          </li>
        ))}
      </ul>
      {revealed ? (
        <div className="mt-5">
          <Button type="button" size="lg" className="h-11 px-4" onClick={onNext}>
            {index === total - 1 ? "End the stroll" : "Next stop"}
          </Button>
        </div>
      ) : null}
    </section>
  );
}

function ChoiceButton({
  choice,
  gender,
  selected,
  revealed,
  onPick,
  english,
}: {
  choice: Choice;
  gender: "f" | "m";
  selected: boolean;
  revealed: boolean;
  onPick: () => void;
  english: boolean;
}) {
  const text = say(choice.text, gender);

  return (
    <div
      className={`rounded-lg border bg-card/70 ${
        revealed ? `border-l-4 ${borderFor(choice.tone)}` : "border-border"
      } ${selected ? "bg-card" : ""}`}
    >
      <Button
        type="button"
        variant="ghost"
        disabled={revealed}
        className="h-auto w-full items-start justify-start whitespace-normal px-3 py-3 text-left text-base leading-relaxed disabled:opacity-100"
        onClick={onPick}
      >
        <span lang={english ? "en" : "it"} className={english ? "" : "font-serif"}>
          {text}
        </span>
      </Button>
      {revealed ? (
        <div className="px-3 pb-3">
          <p className="font-serif text-sm italic">
            {toneLabel[choice.tone]}
            {selected ? " · yours" : ""}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {choice.feedback}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function borderFor(tone: Tone): string {
  if (tone === "fit") return "border-l-[#8c3d1e]";
  if (tone === "cold") return "border-l-[#8a8378]";
  return "border-l-[#a33b3b]";
}
