"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// Simulated boot messages inspired by Arch Linux boot process
const bootMessages = [
  "Loading Linux linux-zen...",
  "Loading initial ramdisk...",
  "[    0.000000] Initializing cgroup subsys cpuset",
  "[    0.000000] Initializing cgroup subsys cpu",
  "[    0.000000] Linux version 6.8.0-arch (packager@archlinux) (gcc version 14.1.0)",
  "[    0.000005] Command line: BOOT_IMAGE=/boot/vmlinuz-linux-zen root=UUID=a1b2c3d4 rw loglevel=3",
  "[    0.000632] x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'",
  "[    0.003114] ACPI: Early table checksum verification disabled",
  "[    0.004129] ACPI: RSDP 0x00000000000F68D0 000024 (v02 ACPIAM)",
  "[    0.006042] Detected 4.2 GHz processor, model: AMD Ryzen",
  "[    0.008753] Memory: 16384MB available",
  "[    0.010123] Initializing network interfaces...",
  "[    0.015487] Starting udev...",
  "[    0.025123] Mounting file systems...",
  "[    0.035642] Starting system services...",
  "[    0.045824] Starting SSH server...",
  "[    0.055124] Starting Apache server...",
  "[    0.065927] Starting MariaDB...",
  "[    0.075421] Setting up PostgreSQL...",
  "[    0.087542] Configuring firewall rules...",
  "[    0.097182] Configuring network interfaces...",
  "[    0.107421] Starting sshd daemon...",
  "[    0.117923] Setting up virtual hosts...",
  "[    0.120456] Loading user profiles...",
  "[    0.130294] Starting window manager...",
  "[    0.139583] Initializing terminal...",
  "[    0.142765] Setting up environment variables...",
  "[    0.153987] Loading user preferences...",
  "[    0.187246] Compiling scripts...",
  "[    0.197531] Initializing personal site framework...",
  "[    0.207984] Loading project modules...",
  "[    0.220478] Parsing markdown files...",
  "[    0.239875] Finalizing setup...",
  "[OK] System initialized successfully.",
  "Welcome to SajanOS 1.0.0",
  "Type 'help' for available commands."
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const textColor = isDark ? "text-green-400" : "text-green-800";
  const okColor = isDark ? "text-blue-400" : "text-blue-600";
  const welcomeColor = isDark ? "text-yellow-300" : "text-yellow-600";
  const helpColor = isDark ? "text-gray-400" : "text-gray-600";
  useEffect(() => {
    let currentIndex = 0;
    
    const addMessage = () => {
      if (currentIndex < bootMessages.length) {
        setVisibleMessages(prev => [...prev, bootMessages[currentIndex]]);
        currentIndex++;
        
        requestAnimationFrame(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "auto" });
          }
        });
        
        const baseDelay = currentIndex < 5 ? 100 : 
                         currentIndex < 20 ? 50 : 
                         currentIndex < bootMessages.length - 3 ? 30 : 600;
        const randomFactor = Math.random() * 0.5 + 0.75; // 0.75 to 1.25
        const delay = baseDelay * randomFactor;
        
        if (currentIndex < bootMessages.length) {
          setTimeout(addMessage, delay);
        } else {
          setTimeout(() => {
            onComplete();
          }, 1500);
        }
      }
    };
    
    // Start the boot sequence
    addMessage();
    
    // Clean up timers if component unmounts
    return () => {
      // No cleanup needed for setTimeout in this case
    };
  }, [onComplete]);  // Function to style a message based on its content
  const getMessageStyle = (message: string) => {
    if (!message || typeof message !== 'string') return textColor; // Guard against undefined, null, or non-string messages
    if (message.startsWith("[OK]")) return okColor;
    if (message.startsWith("Welcome")) return welcomeColor;
    if (message.startsWith("Type")) return helpColor;
    return textColor;
  };
  return (
    <div className="font-mono text-xs sm:text-sm overflow-auto p-4 h-full">
      {Array.isArray(visibleMessages) && visibleMessages.map((message, index) => (
        <div key={index} className={`${getMessageStyle(message || '')} whitespace-pre-wrap`}>
          {message || ''}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default BootSequence;
