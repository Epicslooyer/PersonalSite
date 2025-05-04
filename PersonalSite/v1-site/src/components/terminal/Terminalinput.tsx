"use client"
import { useTheme } from "next-themes";
import React, { useRef, useEffect } from "react";

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

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (value.trim()) onSubmit(value);
      }}
      className="flex items-center mt-2"
    >
      <span className={promptColour}>$</span>
      <input
        ref={inputRef}
        className={`bg-transparent outline-none ${inputColour}  flex-1 ml-2`}
        value={value}
        onChange={e => setValue(e.target.value)}
        autoFocus
        spellCheck={false}
        autoComplete="off"
      />
    </form>
  );
}