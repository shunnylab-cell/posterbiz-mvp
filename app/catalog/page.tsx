'use client';

import { useEffect, useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { loadPosters, Poster } from '@/lib/storage';
import { download } from '@/lib/utils';

export default function CatalogPage() {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'new'|'price-asc'|'price-desc'>('new');

  function refresh() {
    setPosters(loadPosters());
  }

  useEffect(() => { refresh(); }, []);

  const filtered = useMemo(() => {
    const term = q.toLowerCase();
    let arr = posters.filter(p => 
      p.title.toLowerCase().includes(term) ||
      p.tags.some(t => t.toLowerCase().includes(term))
    );
    switch (sort) {
      case 'new': arr = arr.sort((a,b)=> b.createdAt.localeCompare(a.createdAt)); break;
      case 'price-asc': arr = arr.sort((a,b)=> a.price - b.price); break;
      case 'price-desc': arr = arr.sort((a,b)=> b.price - a.price); break;
    }
    return arr;
  }, [posters, q, sort]);

  function exportCSV() {
    const headers = ['id','title','description','price','tags','sizes','license','createdAt','updatedAt'];
    const rows = posters.map(p => [p.id, p.title, p.description, p.price, p.tags.join('|'), p.sizes.join('|'), p.license ?? '', p.createdAt, p.updatedAt]);
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))].join('\n');
    download('catalog.csv', csv);
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div className="card">
        <div className="searchbar">
          <input className="input" placeholder="Search by title or tag..." value={q} onChange={e=>setQ(e.target.value)} />
          <select className="select" value={sort} onChange={e=>setSort(e.target.value as any)}>
            <option value="new">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <button className="btn" onClick={refresh}>Refresh</button>
          <button className="btn" onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      <div className="grid">
        {filtered.map(p => (
          <div key={p.id} style={{ gridColumn: 'span 4' }}>
            <ProductCard p={p} onChange={refresh} />
          </div>
        ))}
        {filtered.length === 0 && <div className="card">No posters yet. Go to <a href="/create">Create</a> to add your first!</div>}
      </div>
    </div>
  );
}
