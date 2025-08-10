'use client';

import KpiCard from '@/components/KpiCard';
import { useEffect, useState } from 'react';

function Spark({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  return (
    <svg width="100%" height="48" viewBox="0 0 100 48" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke="url(#g)"
        strokeWidth="2"
        points={values.map((v,i)=>`${(i/(values.length-1))*100},${48-(v/max)*46}`).join(' ')}
      />
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function AnalyticsPage() {
  const [sales, setSales] = useState([3,5,7,6,9,12,14,16,15,18,21,25]);
  const [subs, setSubs] = useState([1,2,3,3,4,5,6,6,7,8,9,10]);

  useEffect(() => {
    // In a real app, fetch analytics from your backend
  }, []);

  const revenue = sales.reduce((a,b)=>a+b,0)*15 + subs[subs.length-1]*20;

  return (
    <div className="grid">
      <div style={{ gridColumn: 'span 4' }}><KpiCard label="Monthly Revenue (est.)" value={`$${revenue.toLocaleString()}`} /></div>
      <div style={{ gridColumn: 'span 4' }}><KpiCard label="Poster Sales (YTD)" value={String(sales.reduce((a,b)=>a+b,0))} /></div>
      <div style={{ gridColumn: 'span 4' }}><KpiCard label="Subscribers" value={String(subs[subs.length-1])} /></div>

      <div style={{ gridColumn: 'span 6' }} className="card">
        <div className="label">Poster Sales (per month)</div>
        <Spark values={sales} />
      </div>
      <div style={{ gridColumn: 'span 6' }} className="card">
        <div className="label">Subscribers (cumulative)</div>
        <Spark values={subs} />
      </div>
    </div>
  );
}
