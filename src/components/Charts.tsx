"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

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

// Student Profile Pie Chart
export function StudentProfilePie({ profile }: { profile: { label: string; value: number }[] }) {
  const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  return (
    <div className="h-80 w-full rounded-xl border bg-white p-4">
      <h3 className="font-semibold mb-2">Student Skills Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={profile}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {profile.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Student Profile Bar Chart
export function StudentProfileBar({ profile }: { profile: { label: string; value: number }[] }) {
  return (
    <div className="h-80 w-full rounded-xl border bg-white p-4">
      <h3 className="font-semibold mb-2">Student Skills Bar Chart</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={profile}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Student Profile Line Chart
export function StudentProfileLine({ profile }: { profile: { label: string; value: number }[] }) {
  return (
    <div className="h-80 w-full rounded-xl border bg-white p-4">
      <h3 className="font-semibold mb-2">Student Skills Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={profile}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Student Profile Column Chart (Area Chart)
export function StudentProfileColumn({ profile }: { profile: { label: string; value: number }[] }) {
  return (
    <div className="h-80 w-full rounded-xl border bg-white p-4">
      <h3 className="font-semibold mb-2">Student Skills Area Chart</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={profile}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}


