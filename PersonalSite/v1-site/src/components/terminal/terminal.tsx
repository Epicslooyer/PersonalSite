"use client"
import React, { useEffect, useState, useCallback } from "react";
import { useUtilityTerminal } from "./utilityterminal";
import TerminalOutput from "./Terminaloutput";
import TerminalInput from "./Terminalinput";
import { useTheme } from "next-themes";
import Bottom from "./bar/bottom";
import Top from "./bar/top";
import SideBar from "../sidebar/bar";
import BootSequence from "./utilities/boot";

interface TerminalProps {
  pages: Record<string, string>;
}

export interface FileSysNode {
    name: string;
    type: 'file' | 'folder';
    icon?: string;
    command?: string;
    children?: FileSysNode[];
}

const filesysTree: FileSysNode[] = [
    { name: "pages", type: 'folder', children: [ 
        { name: "home.md", command: "home", type: 'file' }, 
        { name: "about.md", command: "about", type: 'file' },
        { name: "projects.md", command: "projects", type: 'file' },
        { name: "contact.md", command: "contact", type: 'file' },
    ]},
    {
        name: "config", type: 'folder', children: [ 
            { name: "help.txt", command: "help", type: 'file' },
        ]
    },
];

export default function Terminal({ pages }: TerminalProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [showBoot, setShowBoot] = useState(true);
    const [debugInfo, setDebugInfo] = useState<string>('');
    const { entry, input, setInput, handleCommand, currentPage, mode, changeMode } = useUtilityTerminal(pages);
    const terminalBg = theme === "dark" ? "bg-black" : "bg-white";
    const terminalText = theme === "dark" ? "text-gray-300" : "text-gray-800";    
    const containerRef = React.useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hasBootedBefore = localStorage.getItem('bootComplete') === 'true';
            if (hasBootedBefore) {
                setShowBoot(false);
            }
        }
    }, []);
    
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const debugMsg = `Key: ${event.key}, Mode: ${mode}, ShowBoot: ${showBoot}`;
        console.log(debugMsg);
        setDebugInfo(debugMsg);
        
        if (showBoot) return;
        
        const target = event.target as HTMLElement;
        const isInputField = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
        
        if (!isInputField) {
            if (mode === "normal") {
                if (event.key === 'i') {
                    event.preventDefault();
                    changeMode("insert");
                } else if (event.key === ':') {
                    event.preventDefault();
                    changeMode("command");
                } 
            }
        }
        
        if (event.key === 'Escape') {
            event.preventDefault();
            changeMode("normal");
        }
    }, [mode, changeMode, showBoot, setDebugInfo]);
    
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        
        if (containerRef.current && !showBoot) {
            containerRef.current.focus();
        }

        setMounted(true);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown, showBoot]);

    const handleSelection = (command: string) => {
        handleCommand(command);
        changeMode("normal");
    };    
    
    if (!mounted) return null;

    return (
        <div className={`w-full h-screen flex flex-row ${terminalBg}`}>
            <SideBar tree={filesysTree} onFileClick={handleSelection} />

            <div
                ref={containerRef}
                tabIndex={0} 
                className={`flex-1 ${terminalText} font-mono flex flex-col outline-none`}
            >
                <Top currentpage={showBoot ? "boot.log" : currentPage} />

                {showBoot ? (
                    <div className="flex-1 overflow-y-auto">
                        <BootSequence onComplete={() => {
                            if (typeof window !== 'undefined') {
                                localStorage.setItem('bootComplete', 'true');
                            }
                            setShowBoot(false);
                            
                            setTimeout(() => {
                                if (containerRef.current) {
                                    containerRef.current.focus();
                                }
                            }, 100);
                        }} />
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto p-4">
                            <TerminalOutput entries={entry} /> 
                        </div>

                        {mode === 'command' ? (
                            <div className="p-2 border-t border-gray-700"> 
                                <TerminalInput value={input} setValue={setInput} onSubmit={handleCommand} />
                            </div>
                        ) : (
                            <Bottom mode={mode} /> 
                        )}
                    </>
                )}
            </div>
            
            {process.env.NODE_ENV !== 'production' && (
                <div className="fixed bottom-0 left-0 bg-red-800 text-white text-xs p-1 opacity-70 z-50">
                    {debugInfo}
                </div>
            )}
        </div>
    );
}