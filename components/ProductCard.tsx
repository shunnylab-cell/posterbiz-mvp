'use client';

import { Poster, deletePoster, upsertPoster } from '@/lib/storage';
import { fmtCurrency } from '@/lib/utils';
import { useState } from 'react';

export default function ProductCard({ p, onChange }: { p: Poster, onChange?: () => void }) {
  const [featured, setFeatured] = useState(!!p.isFeatured);

  function toggleFeatured() {
    p.isFeatured = !featured;
    setFeatured(!featured);
    upsertPoster(p);
    onChange?.();
  }

  function remove() {
    if (!confirm('Delete this poster?')) return;
    deletePoster(p.id);
    onChange?.();
  }

  function exportJson() {
    const data = JSON.stringify(p, null, 2);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
    a.download = `${p.title.replace(/\s+/g,'-').toLowerCase()}.json`;
    a.click();
  }

  return (
    <div className="card" style={{ display: 'grid', gap: 10 }}>
      {p.imageDataUrl ? <img src={p.imageDataUrl} alt={p.title} style={{ width: '100%', borderRadius: 12, border: '1px solid #242a36' }}/> : <div className="badge">No preview</div>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 800 }}>{p.title}</div>
        <div>{fmtCurrency(p.price)}</div>
      </div>
      <div className="label">{p.description || '—'}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {p.tags.map(t => <span key={t} className="badge">#{t}</span>)}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {p.sizes.map(s => <span key={s} className="badge">{s}</span>)}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn" onClick={toggleFeatured}>{featured ? '★ Featured' : '☆ Make Featured'}</button>
        <button className="btn" onClick={exportJson}>Export JSON</button>
        <button className="btn" onClick={remove}>Delete</button>
      </div>
    </div>
  );
}
