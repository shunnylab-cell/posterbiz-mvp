'use client';

export default function KpiCard({ label, value, hint }: { label: string, value: string, hint?: string }) {
  return (
    <div className="card">
      <div className="kpi">{value}</div>
      <div className="label">{label}</div>
      {hint && <div className="badge" style={{ marginTop: 8 }}>{hint}</div>}
    </div>
  );
}
