"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export function SkillVsScoreBar({ data }: { data: { skill: string; correlation: number }[] }) {
  return (
    <div className="h-72 w-full rounded-xl border bg-white p-4">
      <h3 className="font-semibold mb-2">Skill vs Assessment Correlation</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="skill" />
          <YAxis domain={[-1, 1]} />
          <Tooltip />
          <Bar dataKey="correlation" fill="#6366f1" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AttentionScatter({ points }: { points: { attention: number; assessment_score: number }[] }) {
  return (
    <div className="h-72 w-full rounded-xl border bg-white p-4">
      <h3 className="font-semibold mb-2">Attention vs Performance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid />
          <XAxis dataKey="attention" name="Attention" />
          <YAxis dataKey="assessment_score" name="Score" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Students" data={points} fill="#22c55e" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StudentRadar({ profile }: { profile: { label: string; value: number }[] }) {
  return (
    <div className="h-80 w-full rounded-xl border bg-white p-4">
      <h3 className="font-semibold mb-2">Student Profile</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={profile}>
          <PolarGrid />
          <PolarAngleAxis dataKey="label" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Radar name="Profile" dataKey="value" stroke="#ef4444" fill="#ef4444" fillOpacity={0.4} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}


