"use client"
import { useTheme } from "next-themes";
import React, { useRef, useEffect } from "react";
import { COMMAND_NAMES } from "@/data/commands";

interface Props {
  value: string;
  setValue: (v: string) => void;
  onSubmit: (cmd: string) => void;
}

export default function TerminalInput({ value, setValue, onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    inputRef.current?.focus();
  }, []);

  if (!mounted) return null;

  const inputColour = theme === "dark" ? "text-green-500" : "text-green-800";
  const promptColour = theme === "dark" ? "text-gray-500" : "text-gray-600";

  const complete = () => {
    const raw = value.replace(/^:/, "").toLowerCase();
    if (!raw) return;
    const hits = COMMAND_NAMES.filter((c) => c.startsWith(raw));
    if (hits.length === 1) setValue(hits[0]);
    else if (hits.length > 1) {
      const first = hits[0];
      let i = raw.length;
      while (hits.every((h) => h[i] && h[i] === first[i])) i += 1;
      setValue(first.slice(0, i));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) onSubmit(value);
      }}
      className="flex items-center mt-2"
    >
      <span className={promptColour}>:</span>
      <input
        ref={inputRef}
        className={`bg-transparent outline-none ${inputColour} flex-1 ml-2`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            complete();
          }
        }}
        autoFocus
        spellCheck={false}
        autoComplete="off"
        aria-label="terminal command"
      />
    </form>
  );
}
