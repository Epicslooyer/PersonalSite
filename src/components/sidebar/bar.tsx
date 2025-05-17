"use client"
import React from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "../ui/theme-toggle"; // Re-add ThemeToggle import
import Node from "./node";
import type { FileSysNode } from "../terminal/terminal";

interface BarProps {
    tree: FileSysNode[];
    onFileClick: (command: string) => void;
    selectedFile?: string;
    isMobile?: boolean;
    isOpen?: boolean;
    onToggle?: () => void;
}

export default function SideBar({ tree, onFileClick, selectedFile, isMobile, isOpen, onToggle }: BarProps) {
    const { theme } = useTheme();
    const sidebarBg = theme === 'dark' ? 'bg-[#1e2029]' : 'bg-gray-100'; 
    const textColour = theme === 'dark' ? 'text-[#a9b1d6]' : 'text-gray-700';
    const titleColour = theme === 'dark' ? 'text-[#c0caf5]' : 'text-gray-500'; 
    const hoverBg = theme === 'dark' ? 'hover:bg-[#24283b]' : 'hover:bg-gray-200'; 
    const borderColour = theme === 'dark' ? 'border-[#3b4261]' : 'border-gray-300';

    const sidebarClasses = `
        ${isMobile ? 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out' : 'relative'}
        ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        ${isMobile ? 'w-64' : 'w-60'}
        h-screen
        ${sidebarBg}
        ${textColour}
        flex
        flex-col
        border-r
        ${borderColour}
    `;

    return (
        <>
            {isMobile && (
                <button
                    onClick={onToggle}
                    className={`fixed top-4 left-4 z-50 p-2 rounded-md ${sidebarBg} ${borderColour} border`}
                    title={isOpen ? "Close menu" : "Open menu"}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            )}
            <div className={sidebarClasses}>
                <div className="flex-1 overflow-y-auto px-1 pt-2">
                    <h2 className={`text-md uppercase font-semibold mb-2 px-1 ${titleColour}`}>Explorer</h2>
                    <ul className="space-y-1">
                        {tree.map((node, index) => (
                            <Node
                                key={node.name}
                                node={node}
                                onClick={onFileClick}
                                level={0} 
                                isLast={index === tree.length - 1}
                                hoverBg={hoverBg}
                                selectedFile={selectedFile}
                            />
                        ))}
                    </ul>
                </div>

                <div className="p-2 border-t flex justify-start items-center">
                    <ThemeToggle inSidebar={true} />
                </div>
            </div>
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={onToggle}
                />
            )}
        </>
    );
}