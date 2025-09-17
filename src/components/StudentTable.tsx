"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { api, Student } from '@/lib/api';
import { ArrowUpDown } from 'lucide-react';

export function StudentTable() {
  const [data, setData] = useState<Student[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('assessment_score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  async function load() {
    const res = await api.getStudents({ page, limit: 20, search, sortBy, sortOrder });
    setData(res.students);
    setTotal(res.total);
  }

  useEffect(() => { load(); }, [page, search, sortBy, sortOrder]);

  function toggleSort(col: string) {
    if (sortBy === col) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortOrder('asc'); }
  }

  return (
    <div className="rounded-xl border bg-white">
      <div className="p-4 flex items-center justify-between gap-4 flex-wrap">
        <input
          placeholder="Search by name, id, class, persona..."
          className="w-full md:w-80 rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => { setPage(1); setSearch(e.target.value); }}
        />
        <div className="text-sm text-gray-500">Total: {total}</div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {[
                { k: 'student_id', l: 'ID' },
                { k: 'name', l: 'Name' },
                { k: 'class', l: 'Class' },
                { k: 'assessment_score', l: 'Score' },
                { k: 'comprehension', l: 'Compr.' },
                { k: 'attention', l: 'Attn.' },
                { k: 'focus', l: 'Focus' },
                { k: 'retention', l: 'Retention' },
                { k: 'engagement_time', l: 'Engage (min)' },
                { k: 'learning_persona', l: 'Persona' },
              ].map(col => (
                <th key={col.k} className="px-3 py-2 text-left font-medium text-gray-600">
                  <button className="inline-flex items-center gap-1" onClick={() => toggleSort(col.k)}>
                    {col.l}
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((s) => (
              <tr key={s.student_id} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">{s.student_id}</td>
                <td className="px-3 py-2">{s.name}</td>
                <td className="px-3 py-2">{s.class}</td>
                <td className="px-3 py-2 font-semibold">{Number(s.assessment_score).toFixed(1)}</td>
                <td className="px-3 py-2">{Number(s.comprehension).toFixed(1)}</td>
                <td className="px-3 py-2">{Number(s.attention).toFixed(1)}</td>
                <td className="px-3 py-2">{Number(s.focus).toFixed(1)}</td>
                <td className="px-3 py-2">{Number(s.retention).toFixed(1)}</td>
                <td className="px-3 py-2">{Number(s.engagement_time).toFixed(1)}</td>
                <td className="px-3 py-2">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-700">
                    {s.learning_persona}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-3 flex items-center justify-end gap-2">
        <button className="px-3 py-1.5 rounded border disabled:opacity-50" disabled={page<=1} onClick={() => setPage(p => p-1)}>Prev</button>
        <button className="px-3 py-1.5 rounded border disabled:opacity-50" disabled={(page*20)>=total} onClick={() => setPage(p => p+1)}>Next</button>
      </div>
    </div>
  );
}


