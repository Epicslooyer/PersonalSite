"use client"
import { useCallback, useState } from "react";
import React from "react";
import { COMMAND_ALIASES, COMMAND_NAMES } from "@/data/commands";

export interface entry {
    type: "input" | "output";
    value: string | React.ReactElement;
}

export type terminalmode = "normal" | "insert" | "command";

function resolveCommand(command: string): string {
    const trimmed = command.trim().replace(/^:/, "").toLowerCase();
    return COMMAND_ALIASES[trimmed] ?? trimmed;
}

export function useUtilityTerminal(pages: Record<string, string | React.ReactElement>) {
    const [entry, setEntry] = useState<entry[]>([
        { type: "output", value: pages["help"] || "Type :help for commands." }
    ]);
    const [input, setInput] = useState("");
    const [currentPage, setCurrentPage] = useState<string>("help.txt");
    const [mode, setMode] = useState<terminalmode>("normal");

    const handleCommand = useCallback((command: string) => {
        setEntry(prev => [...prev, { type: "input", value: command }]);
        const name = resolveCommand(command);

        if (name === "clear") {
            setEntry([]);
        } else if (name === "resume") {
            if (typeof window !== "undefined") {
                window.open("/resume.pdf", "_blank", "noopener,noreferrer");
            }
            setEntry(prev => [...prev, { type: "output", value: "Opening resume.pdf…" }]);
            setCurrentPage("resume.pdf");
        } else if (pages[name] !== undefined) {
            setEntry(prev => [...prev, { type: "output", value: pages[name] }]);
            setCurrentPage(name === "lab" ? "lab.tsx" : `${name}.md`);
        } else {
            const known = COMMAND_NAMES.join(", ");
            setEntry(prev => [...prev, { type: "output", value: `Command not found: ${name}. Try: ${known}` }]);
        }
        setInput("");
        setMode("normal");
    }, [pages]);

    const changeMode = useCallback((newmode: terminalmode) => {
        setMode(newmode);
        if (newmode !== "command") {
            setInput("");
        }
    }, []);

    return {
        entry,
        input,
        setInput,
        handleCommand,
        currentPage,
        mode,
        changeMode,
    };
}
