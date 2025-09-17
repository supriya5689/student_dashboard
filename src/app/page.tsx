"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { StatsCards } from '@/components/StatsCards';
import { SkillVsScoreBar, AttentionScatter, StudentRadar } from '@/components/Charts';
import { StudentTable } from '@/components/StudentTable';
import { Insights } from '@/components/Insights';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [corr, setCorr] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    api.getStats().then(setStats).catch(console.error);
    api.getCorrelations().then(setCorr).catch(console.error);
    api.getStudents({ limit: 200 }).then((r) => setStudents(r.students)).catch(console.error);
  }, []);

  const barData = useMemo(() => corr ? Object.entries(corr).map(([skill, correlation]) => ({ skill, correlation: Number(correlation) })) : [], [corr]);
  const scatterPts = useMemo(() => students.map(s => ({ attention: Number(s.attention), assessment_score: Number(s.assessment_score) })), [students]);
  const radarProfile = useMemo(() => {
    if (!students.length) return [];
    const s = students[0];
    return [
      { label: 'Comprehension', value: Number(s.comprehension) },
      { label: 'Attention', value: Number(s.attention) },
      { label: 'Focus', value: Number(s.focus) },
      { label: 'Retention', value: Number(s.retention) },
      { label: 'Engagement', value: Math.min(Number(s.engagement_time), 100) },
    ];
  }, [students]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Cognitive Skills & Student Performance Dashboard</h1>
          <p className="text-gray-600">Analyze cognitive skills, predict performance, and identify learning personas.</p>
        </div>
        {stats && <StatsCards stats={stats} />}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2"><SkillVsScoreBar data={barData} /></div>
          <StudentRadar profile={radarProfile} />
        </div>
        <AttentionScatter points={scatterPts} />
        <Insights />
        <StudentTable />
      </div>
    </main>
  );
}
