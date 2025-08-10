'use client';

export type Poster = {
  id: string;
  title: string;
  description: string;
  price: number;
  tags: string[];
  sizes: string[];
  imageDataUrl?: string;
  createdAt: string;
  updatedAt: string;
  isFeatured?: boolean;
  license?: 'personal' | 'commercial';
};

const KEY = 'posterbiz.v1.posters';

export function loadPosters(): Poster[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as Poster[] : [];
  } catch (e) {
    console.error('loadPosters failed', e);
    return [];
  }
}

export function savePosters(posters: Poster[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(posters));
}

export function upsertPoster(p: Poster) {
  const posters = loadPosters();
  const idx = posters.findIndex(x => x.id === p.id);
  if (idx >= 0) posters[idx] = p; else posters.push(p);
  savePosters(posters);
}

export function deletePoster(id: string) {
  const posters = loadPosters().filter(p => p.id !== id);
  savePosters(posters);
}
