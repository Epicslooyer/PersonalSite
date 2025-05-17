"use client";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";

interface ClearProps {
  onComplete: () => void;
}

const ClearSequence: React.FC<ClearProps> = ({ onComplete }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const textColor = isDark ? "text-green-400" : "text-green-800";

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 500); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="font-mono text-xs sm:text-sm p-4 h-full">
      <div className={`${textColor}`}>Clearing terminal...</div>
    </div>
  );
};

export default ClearSequence;
