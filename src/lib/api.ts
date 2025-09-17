export type Student = {
  student_id: string;
  name: string;
  class: string;
  comprehension: number;
  attention: number;
  focus: number;
  retention: number;
  assessment_score: number;
  engagement_time: number;
  learning_persona: string;
};

export type PaginatedStudents = {
  students: Student[];
  total: number;
  page: number;
  totalPages: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const api = {
  getStats: () => http('/api/dashboard/stats'),
  getCorrelations: () => http('/api/analytics/correlations'),
  getClusters: () => http('/api/analytics/clusters'),
  getInsights: () => http('/api/insights'),
  getStudents: (params: { page?: number; limit?: number; search?: string; sortBy?: string; sortOrder?: 'asc' | 'desc'; }) => {
    const q = new URLSearchParams({
      page: String(params.page ?? 1),
      limit: String(params.limit ?? 20),
      search: params.search ?? '',
      sortBy: params.sortBy ?? 'student_id',
      sortOrder: params.sortOrder ?? 'asc'
    }).toString();
    return http<PaginatedStudents>(`/api/students?${q}`);
  },
  getStudent: (id: string) => http<Student>(`/api/students/${id}`)
};


