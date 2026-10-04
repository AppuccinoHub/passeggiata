"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { useProgress } from "@/components/progress";
import {
  getStroll,
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
import { strollScene } from "@/lib/scenes";
import { speakItalian, voiceReady } from "@/lib/speak";

const frames = ["center 30%", "center 48%", "28% 60%", "72% 55%"];

export function WalkPlayer({ slug }: { slug: string }) {
  const stroll = getStroll(slug);
  const { gender, finished, finish } = useProgress();
  const [phase, setPhase] = useState<"walk" | "done">("walk");
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [showPoint, setShowPoint] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [phase, index]);

  if (!stroll) return null;

  const scene = strollScene[stroll.slug];
  const town = towns[stroll.town];
  const walked = walkedThrough(finished);
  const alreadyWalked = walked.includes(stroll.slug);
  const tonight = tonightOf(finished);
  const canStamp = tonight?.slug === stroll.slug;
  const previous = strolls[stroll.number - 2];
  const later = neighborStroll(slug, 1);
  const turin = stroll.town === "turin";
  const stop = stroll.stops[index];
  const frame = frames[index % frames.length];
  const zoom = phase === "walk" ? 1.08 + index * 0.06 : 1.04;
  const stage = "h-24";

  const shell = turin
    ? "town-turin bg-background text-foreground"
    : "bg-[#f6efe4] text-[#241c16]";
  const mute = turin ? "text-[#4e5c6b]" : "text-muted-foreground";

  function restart() {
    setPicked({});
    setIndex(0);
    setShowPoint(false);
    setPhase("walk");
  }

  function endStroll() {
    if (canStamp) finish(stroll!.slug);
    setPhase("done");
  }

  const offCount = stroll.stops.filter((item) => {
    const choice = picked[item.id];
    return choice === undefined || item.choices[choice]?.tone !== "fit";
  }).length;

  return (
    <main className={shell}>
      <div className={`relative overflow-hidden bg-black ${stage}`}>
        <img
          src={scene.src}
          alt={scene.alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out"
          style={{ objectPosition: frame, transform: `scale(${zoom})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/25" />
        <div className={`relative flex flex-col justify-end px-5 pb-3 text-white ${stage}`}>
          <div className="mx-auto w-full max-w-2xl">
            <p className="text-sm text-white/80">
              <Link href="/" className="underline decoration-white/40 underline-offset-4">
                La mappa
              </Link>
              <span>
                {" "}
                · {town.name} · {nightLabel(stroll.number)} · {stroll.time}
              </span>
            </p>
            <p className="text-sm uppercase tracking-[0.16em] text-white/70">
              {phase === "done"
                ? "Fine della passeggiata"
                : `Fermata ${index + 1} di ${stroll.stops.length}`}
            </p>
            <h1 className="mt-1 font-serif text-2xl italic leading-tight">
              {phase === "done" ? stroll.title : stop.short}
            </h1>
            {phase === "walk" ? (
              <p className="mt-2 text-white/85">
                {stop.place} · {stop.who}
              </p>
            ) : null}
            <div className="mt-5 flex gap-1.5" aria-hidden>
              {stroll.stops.map((item, stopIndex) => (
                <span
                  key={item.id}
                  className={`h-1 flex-1 rounded-full ${
                    phase === "done" || stopIndex < index
                      ? "bg-white"
                      : stopIndex === index && phase === "walk"
                        ? "bg-white/80"
                        : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-2xl px-5 py-4 pb-16">
        {phase === "walk" ? (
          <WalkStop
            key={stop.id}
            index={index}
            total={stroll.stops.length}
            stop={stop}
            gender={gender}
            pickedIndex={picked[stop.id]}
            mute={mute}
            showPoint={showPoint}
            onTogglePoint={() => setShowPoint((value) => !value)}
            onPick={(choiceIndex) => {
              const id = stop.id;
              setPicked((prev) =>
                prev[id] === undefined ? { ...prev, [id]: choiceIndex } : prev,
              );
            }}
            onNext={() => {
              setShowPoint(false);
              if (index === stroll.stops.length - 1) endStroll();
              else setIndex((value) => value + 1);
            }}
          />
        ) : null}

        {phase === "done" ? (
          <section>
            <h2 className="font-serif text-3xl italic">
              {canStamp || alreadyWalked ? "Passeggiata fatta." : "Provata."}
            </h2>
            <p className="mt-3 leading-relaxed">
              {offCount === 0
                ? "You kept the right distance. Tap Ancora to walk it again, or La mappa to go back."
                : "A few replies were the wrong distance. Tap Ancora and listen again."}
            </p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {offCount === 0
                ? "Hai tenuto la distanza."
                : "La strada è ancora lì."}
            </p>
            {!canStamp && !alreadyWalked && previous ? (
              <p className="mt-3 leading-relaxed">
                Questo giro non accende la sera dopo. Si ricomincia da {previous.title}.
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" variant="outline" className="h-11" onClick={restart}>
                Ancora
              </Button>
              <Link
                href="/"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-4")}
              >
                La mappa
              </Link>
            </div>
            {later && (alreadyWalked || canStamp) ? (
              <Link
                href={`/s/${later.slug}`}
                className="mt-8 block overflow-hidden rounded-2xl"
              >
                <span className="relative block h-52 sm:h-64">
                  <img
                    src={strollScene[later.slug].src}
                    alt={strollScene[later.slug].alt}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10" />
                  <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <span className="block text-sm text-white/80">Avanti</span>
                    <span className="mt-1 block font-serif text-3xl italic">
                      {later.title}
                    </span>
                    <span className="mt-1 block text-sm text-white/85">{later.place}</span>
                  </span>
                </span>
              </Link>
            ) : null}
          </section>
        ) : null}
      </article>
    </main>
  );
}

function WalkStop({
  index,
  total,
  stop,
  gender,
  pickedIndex,
  mute,
  showPoint,
  onTogglePoint,
  onPick,
  onNext,
}: {
  index: number;
  total: number;
  stop: NonNullable<ReturnType<typeof getStroll>>["stops"][number];
  gender: "f" | "m";
  pickedIndex: number | undefined;
  mute: string;
  showPoint: boolean;
  onTogglePoint: () => void;
  onPick: (index: number) => void;
  onNext: () => void;
}) {
  const [beat, setBeat] = useState<"listen" | "choose" | "practice">("listen");
  const revealed = pickedIndex !== undefined;
  const heard = stop.heard ? say(stop.heard, gender) : "";
  const fit = stop.choices.find((choice) => choice.tone === "fit");
  const fitLine = fit ? say(fit.text, gender) : heard;
  const remembered = stop.mode === "answer" ? fitLine : heard || fitLine;
  const practiceLine =
    remembered.split(/\s+/).length > 14 && heard ? heard : remembered;
  const spoken = heard || practiceLine;
  const picked = pickedIndex === undefined ? undefined : stop.choices[pickedIndex];

  return (
    <section aria-live="polite">
      <ol className="grid grid-cols-3 gap-2 text-center text-sm">
        {(
          [
            ["listen", "1. Listen"],
            ["choose", "2. Choose"],
            ["practice", "3. Practice"],
          ] as const
        ).map(([id, label]) => (
          <li
            key={id}
            className={`rounded-full px-2 py-1 ${
              beat === id ? "bg-[#241c16] text-white" : "bg-black/5 text-muted-foreground"
            }`}
          >
            {label}
          </li>
        ))}
      </ol>

      {beat === "listen" ? (
        <div className="mt-4">
          <p className="text-base leading-snug">
            Tap Ascolta. Hear the Italian. Then tap I heard it.
          </p>
          <p className="mt-3 leading-relaxed">{stop.scene}</p>
          <figure className="mt-4">
            {stop.heardFrom ? (
              <figcaption className={`text-sm ${mute}`}>{stop.heardFrom}</figcaption>
            ) : null}
            <blockquote lang="it" className="mt-1 font-serif text-2xl leading-snug italic">
              {spoken}
            </blockquote>
            {stop.gloss ? (
              <p className={`mt-2 text-sm leading-relaxed ${mute}`}>Meaning: {stop.gloss}</p>
            ) : null}
          </figure>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" className="h-12 px-5" onClick={() => speakItalian(spoken)}>
              Ascolta
            </Button>
            <Button type="button" variant="outline" className="h-12 px-5" onClick={() => setBeat("choose")}>
              I heard it
            </Button>
          </div>
          {!voiceReady() ? (
            <p className={`mt-3 text-sm ${mute}`}>
              This phone has no speaker for the app. Read the line out loud.
            </p>
          ) : null}
        </div>
      ) : null}

      {beat === "choose" ? (
        <div className="mt-4">
          <p className="text-base leading-snug">Tap the sentence you would say.</p>
          <p className="mt-3 font-medium">{stop.prompt}</p>
          <ul className="mt-3 grid gap-2">
            {stop.choices.map((choice, choiceIndex) => (
              <li key={choice.tone + say(choice.text, gender)}>
                <ChoiceButton
                  choice={choice}
                  gender={gender}
                  selected={pickedIndex === choiceIndex}
                  revealed={revealed}
                  onPick={() => onPick(choiceIndex)}
                  onHear={() => speakItalian(say(choice.text, gender))}
                />
              </li>
            ))}
          </ul>
          {revealed && picked ? (
            <div className="mt-4">
              <p className="font-serif text-lg italic">{toneLabel[picked.tone]}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{picked.feedback}</p>
              {picked.tone !== "fit" ? (
                <p className="mt-3 leading-relaxed">
                  The fitting line: <span lang="it" className="font-serif italic">{fitLine}</span>
                </p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button type="button" variant="outline" className="h-12 px-5" onClick={() => speakItalian(practiceLine)}>
                  Ascolta
                </Button>
                <Button type="button" className="h-12 px-5" onClick={() => setBeat("practice")}>
                  Practice the words
                </Button>
              </div>
            </div>
          ) : null}
          <button
            type="button"
            className={`mt-4 text-sm underline decoration-current/30 underline-offset-4 ${mute}`}
            onClick={onTogglePoint}
          >
            {showPoint ? "Hide why" : "Why this distance?"}
          </button>
          {showPoint ? <p className={`mt-2 text-sm leading-relaxed ${mute}`}>{stop.teach}</p> : null}
        </div>
      ) : null}

      {beat === "practice" ? (
        <div className="mt-4">
          <p className="text-base leading-snug">
            Tap the words in order. When the line is right, you will hear it.
          </p>
          <PracticeLine line={practiceLine} onNext={onNext} last={index === total - 1} />
        </div>
      ) : null}
    </section>
  );
}

function PracticeLine({
  line,
  onNext,
  last,
}: {
  line: string;
  onNext: () => void;
  last: boolean;
}) {
  const [pool, setPool] = useState(() => shuffleWords(line));
  const [built, setBuilt] = useState<{ id: number; word: string }[]>([]);
  const [missed, setMissed] = useState(false);
  const target = line.trim().replace(/\s+/g, " ");
  const attempt = built.map((chip) => chip.word).join(" ");
  const solved = attempt === target;

  function add(chip: { id: number; word: string }) {
    if (solved) return;
    const next = [...built, chip];
    const phrase = next.map((item) => item.word).join(" ");
    setBuilt(next);
    setPool((items) => items.filter((item) => item.id !== chip.id));
    if (phrase === target) speakItalian(target);
    else if (next.length === target.split(" ").length) setMissed(true);
  }

  function undo() {
    const lastChip = built[built.length - 1];
    if (!lastChip || solved) return;
    setBuilt((items) => items.slice(0, -1));
    setPool((items) => [...items, lastChip]);
    setMissed(false);
  }

  function reset() {
    setPool(shuffleWords(line));
    setBuilt([]);
    setMissed(false);
  }

  return (
    <div className="mt-4">
      <div className="min-h-16 rounded-xl border border-dashed border-border bg-card/60 px-3 py-3">
        {built.length === 0 ? (
          <p className="text-sm text-muted-foreground">The line builds here.</p>
        ) : (
          <p lang="it" className="font-serif text-xl italic leading-snug">
            {attempt}
          </p>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {pool.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className="rounded-full border border-border bg-white px-3 py-2 text-base"
            onClick={() => add(chip)}
          >
            {chip.word}
          </button>
        ))}
      </div>
      {missed && !solved ? (
        <p className="mt-3 text-sm">Not that order. Take the last word back, or start again.</p>
      ) : null}
      {solved ? (
        <p className="mt-3 font-serif text-lg italic">Così. That is the line.</p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" variant="outline" className="h-11" onClick={() => speakItalian(line)}>
          Ascolta
        </Button>
        <Button type="button" variant="outline" className="h-11" onClick={undo} disabled={built.length === 0 || solved}>
          Back
        </Button>
        <Button type="button" variant="outline" className="h-11" onClick={reset}>
          Again
        </Button>
        {solved ? (
          <Button type="button" className="h-11 px-4" onClick={onNext}>
            {last ? "Finish" : "Next stop"}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function shuffleWords(line: string) {
  const words = line.trim().split(/\s+/).filter(Boolean);
  const chips = words.map((word, id) => ({ id, word }));
  for (let i = chips.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = chips[i];
    chips[i] = chips[j];
    chips[j] = swap;
  }
  if (chips.map((chip) => chip.word).join(" ") === words.join(" ") && chips.length > 1) {
    const swap = chips[0];
    chips[0] = chips[1];
    chips[1] = swap;
  }
  return chips;
}

function ChoiceButton({
  choice,
  gender,
  selected,
  revealed,
  onPick,
  onHear,
}: {
  choice: Choice;
  gender: "f" | "m";
  selected: boolean;
  revealed: boolean;
  onPick: () => void;
  onHear: () => void;
}) {
  const text = say(choice.text, gender);

  return (
    <div
      className={`rounded-lg border bg-card/70 ${
        revealed ? `border-l-4 ${borderFor(choice.tone)}` : "border-border"
      } ${selected ? "bg-card" : ""}`}
    >
      <div className="flex items-stretch">
        <Button
          type="button"
          variant="outline"
          disabled={revealed}
          className="h-auto min-h-11 flex-1 items-start justify-start whitespace-normal rounded-r-none border-0 px-3 py-3 text-left text-base leading-relaxed disabled:opacity-100"
          style={{ height: "auto", whiteSpace: "normal" }}
          onClick={onPick}
        >
          <span lang="it" className="block w-full text-left font-serif" style={{ whiteSpace: "normal" }}>
            {text}
          </span>
        </Button>
        <button
          type="button"
          className="shrink-0 border-l border-border px-3 text-sm"
          aria-label="Ascolta questa frase"
          onClick={onHear}
        >
          Hear
        </button>
      </div>
    </div>
  );
}

function borderFor(tone: Tone): string {
  if (tone === "fit") return "border-l-[#8c3d1e]";
  if (tone === "cold") return "border-l-[#8a8378]";
  return "border-l-[#a33b3b]";
}
