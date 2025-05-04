"use client"
import { useCallback, useState } from "react";

export interface entry {
    type: "input" | "output";
    value: string;
}

export type terminalmode = "normal" | "insert" | "command";

export function useUtilityTerminal(pages: Record<string, string>) {

    const [entry, setEntry] = useState<entry[]>([
        {type: "output", value: pages["help"] || "Type in 'help' for a list of commands."}
    ]);
    const [input, setInput] = useState("");
    const [currentPage, setCurrentPage] = useState<string>("home.md");
    const [mode, setMode] = useState<terminalmode>("normal");
    
    const handleCommand = useCallback((command: string) => {
        setEntry(prev => [...prev, { type: "input", value: command }]);
        const trimmedCommand = command.trim().replace(/^:/, "");

        if(pages[trimmedCommand] !== undefined) {

            setEntry(prev => [...prev, { type: "output", value: pages[trimmedCommand] }]);
            setCurrentPage(`${trimmedCommand}.md`)
        } else if (trimmedCommand === "clear") {
            setEntry([]);
        } else {
            setEntry(prev => [...prev, { type: "output", value: `Command not found: ${trimmedCommand}` }]);
        }
        setInput("");
        setMode("normal");
    }, [pages]);

    const changeMode = useCallback((newmode: terminalmode) => {
        setMode(newmode);
        if (newmode !== 'command'){
            setInput('');
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