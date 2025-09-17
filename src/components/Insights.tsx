"use client";
import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Lightbulb } from 'lucide-react';

export function Insights() {
  const [insights, setInsights] = useState<any>(null);
  useEffect(() => { api.getInsights().then(setInsights).catch(console.error); }, []);
  if (!insights) return <div className="rounded-xl border bg-white p-4">Loading insights...</div>;
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center gap-2 mb-2 text-amber-600"><Lightbulb className="h-5 w-5"/> <h3 className="font-semibold">Key Insights</h3></div>
      <ul className="list-disc pl-5 space-y-1">
        {insights.keyFindings?.map((t: string, i: number) => <li key={i}>{t}</li>)}
      </ul>
      <h4 className="mt-4 font-semibold">Recommendations</h4>
      <ul className="list-disc pl-5 space-y-1">
        {insights.recommendations?.map((t: string, i: number) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
}


