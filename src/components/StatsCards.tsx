"use client";
import React from 'react';
import { TrendingUp, Users, Brain, Timer } from 'lucide-react';

type Stats = {
  totalStudents: number;
  averageScores: {
    comprehension: string;
    attention: string;
    focus: string;
    retention: string;
    assessment_score: string;
    engagement_time: string;
  };
};

export function StatsCards({ stats }: { stats: Stats }) {
  const cards = [
    { label: 'Total Students', value: stats.totalStudents, icon: <Users className="h-5 w-5"/> },
    { label: 'Avg Assessment', value: stats.averageScores.assessment_score, icon: <TrendingUp className="h-5 w-5"/> },
    { label: 'Avg Comprehension', value: stats.averageScores.comprehension, icon: <Brain className="h-5 w-5"/> },
    { label: 'Avg Engagement (min)', value: stats.averageScores.engagement_time, icon: <Timer className="h-5 w-5"/> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-gray-500 text-sm">{c.label}</div>
            <div className="text-indigo-600">{c.icon}</div>
          </div>
          <div className="mt-2 text-2xl font-semibold">{c.value}</div>
        </div>
      ))}
    </div>
  );
}


