"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Moon, Sun, Terminal } from "lucide-react";

interface ThemeToggleProps {
    inSidebar?: boolean;
}

export function ThemeToggle({ inSidebar = false }: ThemeToggleProps) {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const [position, setPosition] = useState({ x: 20, y: 20 });
    const [isDragging, setIsDragging] = useState(false);
    const dragOffsetRef = useRef({ x: 0, y: 0 });    useEffect(() => {
        setMounted(true);
        
        if (!inSidebar && typeof window !== 'undefined') {
            const updatePosition = () => {
                setPosition({ 
                    x: window.innerWidth - 300, 
                    y: 20 
                });
            };
            
            updatePosition();
            
            window.addEventListener('resize', updatePosition);
            
            return () => {
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [inSidebar]);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530); 
        
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setPosition({
                    x: e.clientX - dragOffsetRef.current.x,
                    y: e.clientY - dragOffsetRef.current.y
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, mounted]);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        
        const toggleRect = e.currentTarget.getBoundingClientRect();
        dragOffsetRef.current = {
            x: e.clientX - toggleRect.left,
            y: e.clientY - toggleRect.top
        };
        
        setIsDragging(true);
    };

    if (!mounted) {
        return null; 
    }

    const isDark = resolvedTheme === "dark";
    const buttonBaseClasses = "p-2 font-mono flex items-center gap-2 border rounded shadow-md hover:opacity-90 transition-opacity";
    const buttonClassNames = inSidebar 
        ? `${buttonBaseClasses} w-full`
        : `${buttonBaseClasses} fixed cursor-move`;

    const themeStyles = {
        backgroundColor: isDark ? '#282c34' : '#f0f0f0',
        color: isDark ? '#4ade80' : '#374151',
        borderColor: isDark ? '#4c5772' : '#d1d5db',
    };
    
    const positionStyles = !inSidebar ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 50,
        touchAction: 'none'
    } : {};

    return (
        <button
            className={buttonClassNames}
            style={{
                ...themeStyles,
                ...positionStyles
            }}
            onClick={(e: React.MouseEvent) => {
                if (inSidebar || !isDragging) {
                    setTheme(isDark ? "light" : "dark");
                }
            }}
            onMouseDown={!inSidebar ? handleMouseDown : undefined}
        >
            <Terminal size={14} className="inline-block" />
            <span className="text-sm">
                :{isDark ? 'set background=light' : 'set background=dark'}
                <span className="inline-block w-2 h-4 ml-1" 
                      style={{ background: showCursor ? 'currentColor' : 'transparent' }}>
                    &nbsp;
                </span>
            </span>
            {isDark ? <Moon size={14} /> : <Sun size={14} />}
        </button>
    );
}
