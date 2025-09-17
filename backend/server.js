const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let studentData = [];
let processedData = [];

function loadCsv(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    if (!fs.existsSync(filePath)) return resolve([]);
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', () => resolve(rows))
      .on('error', reject);
  });
}

async function loadData() {
  const base = __dirname;
  const originalPath = path.join(base, 'student_data.csv');
  const processedPath = path.join(base, 'processed_student_data.csv');
  studentData = await loadCsv(originalPath);
  processedData = await loadCsv(processedPath);
  console.log(`Loaded original: ${studentData.length}, processed: ${processedData.length}`);
}

function avg(field) {
  if (!studentData.length) return 0;
  const s = studentData.reduce((a, r) => a + parseFloat(r[field] || 0), 0);
  return +(s / studentData.length).toFixed(2);
}

function corr(xKey, yKey) {
  const n = studentData.length;
  if (n === 0) return 0;
  let sumX = 0, sumY = 0, sumX2 = 0, sumY2 = 0, sumXY = 0;
  for (const r of studentData) {
    const x = parseFloat(r[xKey] || 0);
    const y = parseFloat(r[yKey] || 0);
    sumX += x; sumY += y; sumX2 += x * x; sumY2 += y * y; sumXY += x * y;
  }
  const num = sumXY - (sumX * sumY / n);
  const den = Math.sqrt((sumX2 - sumX * sumX / n) * (sumY2 - sumY * sumY / n));
  return den ? +(num / den).toFixed(3) : 0;
}

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

app.get('/api/students', (req, res) => {
  const { page = 1, limit = 50, search = '', sortBy = 'student_id', sortOrder = 'asc' } = req.query;
  let rows = studentData.slice();
  if (search) {
    const q = String(search).toLowerCase();
    rows = rows.filter(r =>
      String(r.name).toLowerCase().includes(q) ||
      String(r.student_id).toLowerCase().includes(q) ||
      String(r.class).toLowerCase().includes(q) ||
      String(r.learning_persona || '').toLowerCase().includes(q)
    );
  }
  rows.sort((a, b) => {
    const av = a[sortBy];
    const bv = b[sortBy];
    if (sortOrder === 'desc') return av > bv ? -1 : 1;
    return av > bv ? 1 : -1;
  });
  const start = (parseInt(page) - 1) * parseInt(limit);
  const paged = rows.slice(start, start + parseInt(limit));
  res.json({ students: paged, total: rows.length, page: parseInt(page), totalPages: Math.ceil(rows.length / parseInt(limit)) });
});

app.get('/api/students/:id', (req, res) => {
  const s = studentData.find(r => r.student_id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  res.json(s);
});

app.get('/api/dashboard/stats', (req, res) => {
  if (!studentData.length) return res.json({ error: 'No data' });
  const gradeDistribution = {};
  const personaDistribution = {};
  for (const r of studentData) {
    gradeDistribution[r.class] = (gradeDistribution[r.class] || 0) + 1;
    const p = r.learning_persona || 'Average';
    personaDistribution[p] = (personaDistribution[p] || 0) + 1;
  }
  res.json({
    totalStudents: studentData.length,
    averageScores: {
      comprehension: String(avg('comprehension')),
      attention: String(avg('attention')),
      focus: String(avg('focus')),
      retention: String(avg('retention')),
      assessment_score: String(avg('assessment_score')),
      engagement_time: String(avg('engagement_time'))
    },
    gradeDistribution,
    personaDistribution
  });
});

app.get('/api/analytics/correlations', (req, res) => {
  res.json({
    comprehension: corr('comprehension', 'assessment_score'),
    attention: corr('attention', 'assessment_score'),
    focus: corr('focus', 'assessment_score'),
    retention: corr('retention', 'assessment_score'),
    engagement_time: corr('engagement_time', 'assessment_score')
  });
});

app.get('/api/analytics/clusters', (req, res) => {
  if (!processedData.length) return res.json({ error: 'Processed data not available' });
  const clusters = {};
  for (const r of processedData) {
    const key = r.cluster_persona || r.cluster || 'Unknown';
    clusters[key] = clusters[key] || { count: 0, avg: { comprehension: 0, attention: 0, focus: 0, retention: 0, assessment_score: 0, engagement_time: 0 } };
    clusters[key].count++;
    for (const k of Object.keys(clusters[key].avg)) clusters[key].avg[k] += parseFloat(r[k] || 0);
  }
  for (const k of Object.keys(clusters)) {
    for (const m of Object.keys(clusters[k].avg)) clusters[k].avg[m] = +(clusters[k].avg[m] / clusters[k].count).toFixed(2);
  }
  res.json(clusters);
});

app.get('/api/insights', (req, res) => {
  const c = {
    comprehension: corr('comprehension', 'assessment_score'),
    attention: corr('attention', 'assessment_score'),
    focus: corr('focus', 'assessment_score'),
    retention: corr('retention', 'assessment_score')
  };
  const avgScore = avg('assessment_score');
  const avgEng = avg('engagement_time');
  res.json({
    keyFindings: [
      `Comprehension correlates strongest with performance (${c.comprehension})`,
      `Average assessment score: ${avgScore}`,
      `Engagement time average: ${avgEng} minutes/day`
    ],
    recommendations: [
      'Strengthen comprehension strategies',
      'Support low-attention students with focus exercises',
      'Increase engagement for underperforming groups'
    ]
  });
});

loadData().then(() => {
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
});


