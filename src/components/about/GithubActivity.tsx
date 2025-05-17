"use client";
import React, { useEffect, useState } from "react";

interface DayActivity {
  date: string;
  count: number;
}

function getPastYearDates() {
  const dates: string[] = [];
  const today = new Date();
  const year = new Date();
  year.setFullYear(year.getFullYear() - 1);
  const day = year.getDay();
  year.setDate(year.getDate() - day);
  const endday = new Date(today);

  while (year <= endday) {
    dates.push(year.toISOString().slice(0, 10));
    year.setDate(year.getDate() + 1);
  }
  return dates;
}

async function fetchUserContributions(username: string): Promise<Record<string, number>> {
  const res = await fetch("/api/github", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  const json = await res.json();
  console.log(json);
  return json;
}

function mergeContributions(a: Record<string, number>, b: Record<string, number>): Record<string, number> {
  const merged: Record<string, number> = { ...a };
  for (const date in b) {
    merged[date] = (merged[date] || 0) + b[date];
  }
  return merged;
}

function getColor(count: number) {
  if (count === 0) return "bg-gray-800 border border-gray-700";
  if (count < 2) return "bg-green-900 border border-green-800";
  if (count < 4) return "bg-green-700 border border-green-800";
  if (count < 8) return "bg-green-500 border border-green-700";
  return "bg-green-300 border border-green-600";
}

export default function GithubActivity({ usernames }: { usernames: [string, string] }) {
  const [activity, setActivity] = useState<DayActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const [a, b] = await Promise.all([
        fetchUserContributions(usernames[0]),
        fetchUserContributions(usernames[1]),
      ]);
      if (!cancelled) {
        const merged = mergeContributions(a, b);
        const days = getPastYearDates().map(date => ({ date, count: merged[date] || 0 }));
        setActivity(days);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [usernames]);

  if (loading) return <div className="text-gray-400 font-mono">Loading GitHub activity...</div>;

  const weeks: DayActivity[][] = [];
  for (let i = 0; i < activity.length; i += 7) {
    weeks.push(activity.slice(i, i + 7));
  }


  return (
    <div className="pl-0">
      <div className="flex flex-row gap-1">
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-1">
            {week.map(day => (
              <div
                key={day.date}
                className={`w-4 h-4 ${getColor(day.count)} rounded-sm`}
                title={`${day.date}: ${day.count} commit${day.count !== 1 ? "s" : ""}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-gray-400 font-mono">Github Activity for School + Personal Account</div>
    </div>
  );
} 