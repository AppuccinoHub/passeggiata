"use client";

import { useEffect, useState } from "react";
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
import { strollScene } from "@/lib/scenes";

const frames = ["center 30%", "center 48%", "28% 60%", "72% 55%"];

export function WalkPlayer({ slug }: { slug: string }) {
  const stroll = getStroll(slug);
  const { gender, finished, finish } = useProgress();
  const [phase, setPhase] = useState<"arrive" | "walk" | "done">("arrive");
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
  const earlier = neighborStroll(slug, -1);
  const later = neighborStroll(slug, 1);
  const turin = stroll.town === "turin";
  const stop = stroll.stops[index];
  const frame =
    phase === "arrive" ? "center 40%" : frames[index % frames.length];
  const zoom = phase === "walk" ? 1.08 + index * 0.06 : 1.04;
  const stage = phase === "arrive" ? "h-[32svh]" : "h-24";

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
            {phase === "arrive" ? (
              <>
                <h1 className="mt-2 max-w-xl font-serif text-4xl leading-none italic sm:text-5xl">
                  {stroll.title}
                </h1>
                <p className="mt-3 max-w-md text-lg leading-snug text-white/90">
                  {stroll.place}
                </p>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex h-11 items-center rounded-lg bg-white px-5 text-sm font-medium text-[#241c16]"
                    onClick={restart}
                  >
                    {alreadyWalked ? "Ancora" : "Entra"}
                  </button>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
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
        {phase === "arrive" ? (
          <>
            <p className="text-lg leading-relaxed">{stroll.skill}</p>
            <button
              type="button"
              className="mt-4 inline-flex h-12 items-center rounded-lg bg-[#241c16] px-5 text-sm font-medium text-white"
              onClick={restart}
            >
              {alreadyWalked ? "Ancora" : "Entra"}
            </button>
            <ol className="mt-6 grid gap-3">
              {stroll.stops.map((item, stopIndex) => (
                <li key={item.id} className="flex gap-3">
                  <span className={`w-5 shrink-0 font-serif italic ${mute}`}>
                    {stopIndex + 1}
                  </span>
                  <span>
                    <span className="font-serif text-xl italic">{item.short}</span>
                    <span className={`mt-0.5 block text-sm ${mute}`}>
                      {item.place}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            {!canStamp && !alreadyWalked && previous ? (
              <p className={`mt-5 text-sm leading-relaxed ${mute}`}>
                Puoi camminarla. Conta dopo{" "}
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
              <p className="mt-5 font-serif italic">Fatta.</p>
            ) : null}
            <NeighborLinks
              earlier={earlier?.slug}
              later={later?.slug}
              earlierTitle={earlier?.title}
              laterTitle={later?.title}
              mute={mute}
            />
          </>
        ) : null}

        {phase === "walk" ? (
          <WalkStop
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
                ? "Hai tenuto la distanza. È tutto il mestiere di questa sera."
                : offCount === 1
                  ? "Una fermata è uscita alla distanza sbagliata. La strada è ancora lì."
                  : `${offCount} fermate sono uscite alla distanza sbagliata. La strada è ancora lì.`}
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
          Prima: {earlierTitle}
        </Link>
      ) : (
        <span />
      )}
      {later ? (
        <Link href={`/s/${later}`} className="underline decoration-current/30 underline-offset-4">
          Dopo: {laterTitle}
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
  const revealed = pickedIndex !== undefined;
  const move = moves[stop.mode];

  return (
    <section aria-live="polite">
      <div className="flex items-baseline justify-between gap-3">
        <p className={`text-sm ${mute}`}>
          {move.it}
        </p>
        <button
          type="button"
          className={`text-sm underline decoration-current/30 underline-offset-4 ${mute}`}
          onClick={onTogglePoint}
        >
          {showPoint ? "Nascondi" : "Perché"}
        </button>
      </div>
      <p className="mt-3 leading-relaxed">{stop.scene}</p>
      {showPoint ? (
        <div className={`mt-3 space-y-2 text-sm leading-relaxed ${mute}`}>
          <p>{stop.teach}</p>
          {stop.gloss ? <p>{stop.gloss}</p> : null}
        </div>
      ) : null}
      {stop.heard ? (
        <figure className="mt-5">
          {stop.heardFrom ? (
            <figcaption className={`text-sm ${mute}`}>{stop.heardFrom}</figcaption>
          ) : null}
          <blockquote
            lang="it"
            className="mt-1 font-serif text-2xl leading-snug italic text-balance"
          >
            {say(stop.heard, gender)}
          </blockquote>
        </figure>
      ) : null}
      <p className="mt-4 font-medium">{stop.prompt}</p>
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
            {index === total - 1 ? "Fine" : "Avanti"}
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
        variant="outline"
        disabled={revealed}
        className="h-auto w-full min-h-11 items-start justify-start whitespace-normal px-3 py-3 text-left text-base leading-relaxed disabled:opacity-100"
        style={{ height: "auto", whiteSpace: "normal" }}
        onClick={onPick}
      >
        <span
          lang={english ? "en" : "it"}
          className={`block w-full text-left ${english ? "" : "font-serif"}`}
          style={{ whiteSpace: "normal" }}
        >
          {text}
        </span>
      </Button>
      {revealed ? (
        <div className="px-3 pb-3">
          <p className="font-serif text-sm italic">
            {toneLabel[choice.tone]}
            {selected ? " · la tua" : ""}
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
