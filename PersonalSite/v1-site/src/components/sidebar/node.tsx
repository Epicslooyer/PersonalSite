import React, { useState } from "react";
import type { FileSysNode } from "../terminal/terminal";
import * as Icons from "react-icons/fa";

interface NodeProps {
    node: FileSysNode;
    onClick: (command: string) => void;
    level: number;
    isLast: boolean; 
    hoverBg: string;
    selectedFile?: string;
}

function getFileIcon(name: string) {
    if (name === 'README.md') return <Icons.FaBookOpen className="text-yellow-500" />;
    if (name === '.gitignore') return <Icons.FaBan className="text-pink-500" />;
    if (name === 'package.json' || name === 'package-lock.json') return <Icons.FaNpm className="text-red-500" />;
    if (name === 'Dockerfile') return <Icons.FaDocker className="text-blue-400" />;
    if (name.endsWith('.md')) return <Icons.FaMarkdown className="text-green-500" />;
    if (name.endsWith('.ts') || name.endsWith('.tsx')) return <Icons.FaFileCode className="text-blue-500" />;
    if (name.endsWith('.js') || name.endsWith('.jsx')) return <Icons.FaJs className="text-yellow-400" />;
    if (name.endsWith('.json')) return <Icons.FaFileAlt className="text-orange-400" />;
    if (name.endsWith('.yml') || name.endsWith('.yaml')) return <Icons.FaFileCode className="text-purple-400" />;
    if (name.endsWith('.scss') || name.endsWith('.css')) return <Icons.FaCss3Alt className="text-pink-400" />;
    return <Icons.FaRegFile className="text-gray-400" />;
}

export default function Node ({
    node,
    onClick,
    level,
    hoverBg,
    selectedFile
}: NodeProps) {
    const [isOpen, setIsOpen] = useState(false);
    const isFolder = node.type === "folder";
    const isSelected = selectedFile && node.name === selectedFile;

    const handleClick = () => {
        if (isFolder) {
            setIsOpen(!isOpen);
        } else if (node.command) {
            onClick(node.command);
        }
    };

    const paddingLeftValue = `${level * 1.25}rem`;
    const folderColor = isFolder ? 'text-blue-400 font-semibold' : '';
    const fileColor = !isFolder ? 'text-gray-300' : '';
    const selectedBg = isSelected ? 'bg-blue-900/60' : '';
    const selectedText = isSelected ? 'text-white' : '';

    return (
        <li className="list-none">
            <button
                onClick={handleClick}
                disabled={!isFolder && !node.command}
                className={`w-full text-left py-1 rounded text-base flex items-center whitespace-nowrap ${selectedBg} ${selectedText} ${folderColor} ${fileColor} ${(isFolder || node.command) ? hoverBg : ''} ${(isFolder || node.command) ? 'cursor-pointer' : 'cursor-default'}`}
                style={{ paddingLeft: paddingLeftValue }}
                title={node.name}
            >
                <span className="inline-block w-4 text-center mr-1">
                   {isFolder ? (isOpen ? <Icons.FaFolderOpen className="text-blue-400" /> : <Icons.FaFolder className="text-blue-300" />) : getFileIcon(node.name)}
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
                            selectedFile={selectedFile}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}