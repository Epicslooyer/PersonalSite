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
    // Only need position state if not in sidebar
    const [position, setPosition] = useState({ x: 20, y: 20 });
    const [isDragging, setIsDragging] = useState(false);
    const dragOffsetRef = useRef({ x: 0, y: 0 });    useEffect(() => {
        setMounted(true);
        
        // Only setup draggable positioning if not in sidebar
        if (!inSidebar && typeof window !== 'undefined') {
            // Set initial position to top right with some padding
            const updatePosition = () => {
                setPosition({ 
                    x: window.innerWidth - 300, 
                    y: 20 
                });
            };
            
            // Set initial position
            updatePosition();
            
            // Update position on window resize
            window.addEventListener('resize', updatePosition);
            
            // Cleanup
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

    // Add drag handlers
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

        // Add event listeners when dragging starts
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

    // Handle mouse down to start dragging
    const handleMouseDown = (e: React.MouseEvent) => {
        // Prevent button click when starting drag
        e.preventDefault();
        
        // Calculate offset from the top-left corner of the toggle
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
      // Determine classes and styles based on whether it's in the sidebar or floating
    const buttonBaseClasses = "p-2 font-mono flex items-center gap-2 border rounded shadow-md hover:opacity-90 transition-opacity";
    const buttonClassNames = inSidebar 
        ? `${buttonBaseClasses} w-full`
        : `${buttonBaseClasses} fixed cursor-move`;

    // Get theme-specific styles
    const themeStyles = {
        backgroundColor: isDark ? '#282c34' : '#f0f0f0',
        color: isDark ? '#4ade80' : '#374151',
        borderColor: isDark ? '#4c5772' : '#d1d5db',
    };
    
    // Only apply position styles if not in sidebar
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
                // Only toggle theme if we're not dragging or if in sidebar
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
