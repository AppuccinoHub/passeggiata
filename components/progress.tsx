"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { tonightOf, walkedThrough, type Gender } from "@/lib/curriculum";

const STORAGE_KEY = "passeggiata-v1";

type Store = {
  gender: Gender;
  finished: string[];
};

const serverStore: Store = { gender: "f", finished: [] };
let store: Store = serverStore;
let loaded = false;
const listeners = new Set<() => void>();

function readStore(): Store {
  if (loaded || typeof window === "undefined") return store;
  loaded = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return store;
    const parsed = JSON.parse(raw) as { gender?: Gender; finished?: unknown };
    const finished = Array.isArray(parsed.finished)
      ? parsed.finished.filter((item): item is string => typeof item === "string")
      : [];
    store = {
      gender: parsed.gender === "m" ? "m" : "f",
      finished,
    };
  } catch {
    // A broken store should not block the map.
  }
  return store;
}

function persist(next: Store) {
  store = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return readStore();
}

function getServerSnapshot() {
  return serverStore;
}

type ProgressValue = {
  gender: Gender;
  setGender: (gender: Gender) => void;
  finished: string[];
  finish: (slug: string) => void;
  reset: () => void;
};

const ProgressContext = createContext<ProgressValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<ProgressValue>(
    () => ({
      gender: snapshot.gender,
      finished: snapshot.finished,
      setGender: (gender) => persist({ ...readStore(), gender }),
      finish: (slug) => {
        const current = readStore();
        if (tonightOf(current.finished)?.slug !== slug) return;
        persist({
          ...current,
          finished: [...walkedThrough(current.finished), slug],
        });
      },
      reset: () => persist({ ...readStore(), finished: [] }),
    }),
    [snapshot],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return value;
}
