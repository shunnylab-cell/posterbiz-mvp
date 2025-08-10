'use client';

import PosterForm from '@/components/PosterForm';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const router = useRouter();
  return (
    <div>
      <h1>Create Poster</h1>
      <p className="label" style={{ marginBottom: 16 }}>Add a new poster to your catalog. Upload a preview or leave it blank.</p>
      <PosterForm onSaved={() => router.push('/catalog')} />
    </div>
  );
}
