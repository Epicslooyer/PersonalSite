"use client";

import Link from "next/link";
import Lab from "@/components/lab/Lab";

export default function LabPage() {
  return (
    <div className="min-h-screen bg-black text-gray-200 p-6 font-mono">
      <Link href="/" className="text-xs text-blue-400 hover:underline">
        ← back to SajanOS
      </Link>
      <div className="mt-6">
        <Lab />
      </div>
    </div>
  );
}
