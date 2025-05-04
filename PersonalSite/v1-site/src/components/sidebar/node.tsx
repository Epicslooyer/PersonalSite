import React, { useState } from "react";
import type { FileSysNode } from "../terminal/terminal";
import * as Icons from "react-icons/fa";

interface NodeProps {
    node: FileSysNode;
    onClick: (command: string) => void;
    level: number;
    isLast: boolean; 
    hoverBg: string;
}

export default function Node ({
    node,
    onClick,
    level,
    hoverBg
}: NodeProps) {
    const [isOpen, setIsOpen] = useState(false);
    const isFolder = node.type === "folder";

    const handleClick = () => {
        if (isFolder) {
            setIsOpen(!isOpen);
        } else if (node.command) {
            onClick(node.command);
        }
    };

    const paddingLeftValue = `${level * 1}rem`;

    return (
        <li className="list-none">
            <button
                onClick={handleClick}
                disabled={!isFolder && !node.command}
                
                className={`w-full text-left py-1 rounded text-lg flex items-center whitespace-nowrap
                    ${(isFolder || node.command) ? hoverBg : ''}
                    ${(isFolder || node.command) ? 'cursor-pointer' : 'cursor-default'}`}
                style={{ paddingLeft: paddingLeftValue }}
                title={node.name}
            >
  
                <span className="inline-block w-4 text-center text-gray-500 mr-1">
                   {isFolder ? (isOpen ? <Icons.FaFolderMinus /> : <Icons.FaFolderPlus/>) : <span className="inline-block w-4"></span>}
                </span>

 
                <span className="truncate">{node.name}</span>
            </button>

            {isFolder && isOpen && node.children && (
                <ul className="space-y-1">
                    {node.children.map((child, index) => (
                        <Node
                            key={child.name}
                            node={child}
                            onClick={onClick}
                            level={level + 1}
                            isLast={index === node.children!.length - 1}
                            hoverBg={hoverBg}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}