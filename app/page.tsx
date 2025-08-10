'use client';

import KpiCard from '@/components/KpiCard';
import Link from 'next/link';
import { loadPosters } from '@/lib/storage';
import { useEffect, useState } from 'react';
import { fmtCurrency } from '@/lib/utils';

export default function Dashboard() {
  const [count, setCount] = useState(0);
  const [featured, setFeatured] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);

  useEffect(() => {
    const ps = loadPosters();
    setCount(ps.length);
    setFeatured(ps.filter(p => p.isFeatured).length);
    setAvgPrice(ps.length ? ps.reduce((a,b)=>a+b.price,0)/ps.length : 0);
  }, []);

  return (
    <div className="grid">
      <div style={{ gridColumn: 'span 4' }}><KpiCard label="Total Posters" value={String(count)} hint="Catalog size"/></div>
      <div style={{ gridColumn: 'span 4' }}><KpiCard label="Featured" value={String(featured)} hint="Homepage highlights"/></div>
      <div style={{ gridColumn: 'span 4' }}><KpiCard label="Avg Price" value={fmtCurrency(avgPrice || 0)} hint="Across catalog"/></div>

      <div style={{ gridColumn: 'span 12' }} className="card">
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <Link className="btn" href="/create">Create Poster</Link>
          <Link className="btn" href="/catalog">Manage Catalog</Link>
          <Link className="btn" href="/analytics">View Analytics</Link>
        </div>
      </div>
    </div>
  );
}
