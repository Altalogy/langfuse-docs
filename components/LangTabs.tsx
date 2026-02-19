"use client";
import React, { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
const KEY = "synced-tabs:language";
const normalize = (s: string) => s.trim().toLowerCase();

type Store = {
  getSnapshot: () => string | null;
  subscribe: (cb: () => void) => () => void;
  set: (label: string) => void;
};

const storeEntry: { value: string | null; subs: Set<() => void> } = {
  value: null,
  subs: new Set(),
};

const store: Store = {
  getSnapshot: () => storeEntry.value,
  subscribe: (cb) => {
    storeEntry.subs.add(cb);
    return () => storeEntry.subs.delete(cb);
  },
  set: (label: string) => {
    if (storeEntry.value === label) return;
    storeEntry.value = label;
    storeEntry.subs.forEach((cb) => cb());
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(KEY, label);
      } catch {}
    }
  },
};

if (typeof window !== "undefined") {
  try {
    const saved = window.localStorage.getItem(KEY);
    if (saved != null) storeEntry.value = saved;
  } catch {}
  window.addEventListener("storage", (e: StorageEvent) => {
    if (e.key !== KEY) return;
    const next = e.newValue == null ? null : e.newValue;
    if (storeEntry.value !== next) {
      storeEntry.value = next;
      storeEntry.subs.forEach((cb) => cb());
    }
  });
}

export function LangTabs(props: {
  items: any[];
  children: React.ReactNode;
  defaultIndex?: number;
  onChange?: (next: number) => void;
}) {
  const { items, children, defaultIndex = 0, onChange } = props;
  const storedLabel = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  );

  const labels: string[] = useMemo(() => {
    return items.map((it, idx) => {
      if (typeof it === "string") return it;
      if (
        it &&
        typeof it === "object" &&
        "label" in it &&
        typeof (it as any).label === "string"
      )
        return (it as any).label as string;
      return String(idx);
    });
  }, [items]);

  const initialLabel = useMemo(
    () => labels[defaultIndex] ?? labels[0] ?? "0",
    [labels, defaultIndex]
  );

  // Determine the default value based on stored label
  const resolvedDefault = useMemo(() => {
    if (storedLabel != null) {
      const idx = labels.findIndex(
        (l) => normalize(l) === normalize(storedLabel)
      );
      if (idx !== -1) return labels[idx];
    }
    return initialLabel;
  }, [storedLabel, labels, initialLabel]);

  // Sync stored label on initial mount
  useEffect(() => {
    if (storedLabel == null && initialLabel) store.set(initialLabel);
  }, [storedLabel, initialLabel]);

  return (
    <Tabs
      items={labels}
      defaultIndex={defaultIndex}
      defaultValue={resolvedDefault}
    >
      {children}
    </Tabs>
  );
}
