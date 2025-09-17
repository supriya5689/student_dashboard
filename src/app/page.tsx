"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { api, Student, Stats, Correlations } from '@/lib/api';
import { StatsCards } from '@/components/StatsCards';
import { SkillVsScoreBar, AttentionScatter, StudentProfilePie, StudentProfileBar, StudentProfileLine, StudentProfileColumn } from '@/components/Charts';
import { StudentTable } from '@/components/StudentTable';
import { Insights } from '@/components/Insights';
import { Sidebar } from '@/components/Sidebar';

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [corr, setCorr] = useState<Correlations | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeChartType, setActiveChartType] = useState('pie');

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

  const renderStudentProfileChart = () => {
    switch (activeChartType) {
      case 'pie':
        return <StudentProfilePie profile={radarProfile} />;
      case 'bar':
        return <StudentProfileBar profile={radarProfile} />;
      case 'line':
        return <StudentProfileLine profile={radarProfile} />;
      case 'column':
        return <StudentProfileColumn profile={radarProfile} />;
      default:
        return <StudentProfilePie profile={radarProfile} />;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Cognitive Skills & Student Performance Dashboard</h1>
              <p className="text-gray-600">Analyze cognitive skills, predict performance, and identify learning personas.</p>
            </div>
            {stats && <StatsCards stats={stats} />}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2"><SkillVsScoreBar data={barData} /></div>
              <div className="space-y-4">
                {/* Chart Type Selector */}
                <div className="bg-white rounded-xl border border-gray-300 p-4">
                  <h3 className="font-semibold mb-3 text-black">Student Profile Chart Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveChartType('pie')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeChartType === 'pie'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Pie Chart
                    </button>
                    <button
                      onClick={() => setActiveChartType('bar')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeChartType === 'bar'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Bar Chart
                    </button>
                    <button
                      onClick={() => setActiveChartType('line')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeChartType === 'line'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Line Chart
                    </button>
                    <button
                      onClick={() => setActiveChartType('column')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeChartType === 'column'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Area Chart
                    </button>
                  </div>
                </div>
                {/* Dynamic Chart */}
                {renderStudentProfileChart()}
              </div>
            </div>
            <AttentionScatter points={scatterPts} />
            <Insights />
            <StudentTable />
          </div>
        );
      case 'students':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Students</h1>
              <p className="text-gray-600">Manage and view student information and performance data.</p>
            </div>
            <StudentTable />
          </div>
        );
      case 'insights':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Insights</h1>
              <p className="text-gray-600">AI-powered insights and analysis of student performance patterns.</p>
            </div>
            <Insights />
            {stats && <StatsCards stats={stats} />}
          </div>
        );
      case 'recommendations':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Recommendations</h1>
              <p className="text-gray-600">Personalized recommendations for improving student performance.</p>
            </div>
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4">Coming Soon</h3>
              <p className="text-gray-600">AI-powered recommendations will be available here.</p>
            </div>
          </div>
        );
      case 'timetable':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Timetable</h1>
              <p className="text-gray-600">View class schedules and academic calendar.</p>
            </div>
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4">Coming Soon</h3>
              <p className="text-gray-600">Timetable functionality will be available here.</p>
            </div>
          </div>
        );
      case 'attendance':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Attendance</h1>
              <p className="text-gray-600">Track and manage student attendance records.</p>
            </div>
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4">Coming Soon</h3>
              <p className="text-gray-600">Attendance tracking will be available here.</p>
            </div>
          </div>
        );
      case 'exams':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Exams</h1>
              <p className="text-gray-600">Manage exam schedules and results.</p>
            </div>
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4">Coming Soon</h3>
              <p className="text-gray-600">Exam management will be available here.</p>
            </div>
          </div>
        );
      case 'assignments':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Assignments</h1>
              <p className="text-gray-600">View and manage student assignments.</p>
            </div>
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4">Coming Soon</h3>
              <p className="text-gray-600">Assignment management will be available here.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-y-auto bg-white text-black">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </>
  );
}
