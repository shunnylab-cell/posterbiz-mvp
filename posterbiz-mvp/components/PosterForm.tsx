'use client';

import { useState } from 'react';
import { Poster, upsertPoster } from '@/lib/storage';
import { uid } from '@/lib/utils';

const DEFAULT_SIZES = ['A3', '18x24', '24x36'];

export default function PosterForm({ onSaved }: { onSaved?: (p: Poster) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(15);
  const [tags, setTags] = useState('vintage, neon, synthwave');
  const [sizes, setSizes] = useState<string[]>(DEFAULT_SIZES);
  const [license, setLicense] = useState<'personal' | 'commercial'>('personal');
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(reader.result as string);
    reader.readAsDataURL(f);
  }

  function toggleSize(s: string) {
    setSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const now = new Date().toISOString();
    const poster: Poster = {
      id: uid(),
      title, description,
      price: Number(price),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      sizes,
      imageDataUrl,
      createdAt: now,
      updatedAt: now,
      license
    };
    upsertPoster(poster);
    setBusy(false);
    onSaved?.(poster);
    setTitle(''); setDescription(''); setPrice(15); setTags(''); setSizes(DEFAULT_SIZES); setImageDataUrl(undefined);
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ display: 'grid', gap: 12 }}>
      <div>
        <label className="label">Title</label>
        <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Synthwave Skyline"/>
      </div>
      <div>
        <label className="label">Description</label>
        <textarea className="textarea" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Bold neon cityscape with retro sun and grid lines."/>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(12,1fr)' }}>
        <div style={{ gridColumn: 'span 4' }}>
          <label className="label">Price (USD)</label>
          <input className="number" type="number" min={1} value={price} onChange={e=>setPrice(Number(e.target.value))}/>
        </div>
        <div style={{ gridColumn: 'span 4' }}>
          <label className="label">License</label>
          <select className="select" value={license} onChange={e=>setLicense(e.target.value as any)}>
            <option value="personal">Personal</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div style={{ gridColumn: 'span 4' }}>
          <label className="label">Tags (comma separated)</label>
          <input className="input" value={tags} onChange={e=>setTags(e.target.value)} placeholder="retro, neon, city"/>
        </div>
      </div>
      <div>
        <div className="label">Sizes</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['A3', 'A2', 'A1', '18x24', '24x36'].map(s => (
            <button type="button" key={s} onClick={()=>toggleSize(s)} className="badge" style={{ borderColor: sizes.includes(s) ? '#22d3ee' : '#2a3242' }}>
              {sizes.includes(s) ? '✓ ' : ''}{s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="label">Upload Preview Image (optional)</label>
        <input className="file" type="file" accept="image/*" onChange={onFile}/>
        {imageDataUrl && <img alt="preview" src={imageDataUrl} style={{ marginTop: 12, maxWidth: '100%', borderRadius: 12, border: '1px solid #242a36' }}/>}
      </div>
      <div>
        <button className="btn" disabled={busy}>{busy ? 'Saving...' : 'Save Poster'}</button>
      </div>
    </form>
  );
}
