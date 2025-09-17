"use client";
import React from 'react';
import { 
  BarChart3, 
  Users, 
  Lightbulb, 
  Target, 
  Calendar, 
  CheckCircle, 
  FileText, 
  BookOpen 
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const mainSections = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
    { id: 'recommendations', label: 'Recommendations', icon: Target },
  ];

  const academicSections = [
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'attendance', label: 'Attendance', icon: CheckCircle },
    { id: 'exams', label: 'Exams', icon: FileText },
    { id: 'assignments', label: 'Assignments', icon: BookOpen },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-300 h-full flex flex-col text-black">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-black">Student Portal</h1>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {mainSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{section.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Separator */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Academic Section Header */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Fees</h3>
        </div>

        {/* Academic Navigation */}
        <nav className="space-y-2">
          {academicSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{section.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
