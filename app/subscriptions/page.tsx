'use client';

import { useMemo, useState } from 'react';
import KpiCard from '@/components/KpiCard';
import { fmtCurrency } from '@/lib/utils';

type Member = { id: string; plan: 'basic'|'pro'; joinedAt: string; active: boolean; };

export default function SubsPage() {
  const [members, setMembers] = useState<Member[]>([
    { id: 'u1', plan: 'basic', joinedAt: new Date().toISOString(), active: true },
    { id: 'u2', plan: 'pro', joinedAt: new Date().toISOString(), active: true },
  ]);

  const mrr = useMemo(() => members.filter(m=>m.active).reduce((sum,m) => sum + (m.plan === 'basic' ? 10 : 20), 0), [members]);

  return (
    <div className="grid">
      <div style={{ gridColumn: 'span 4' }}><KpiCard label="Active Members" value={String(members.filter(m=>m.active).length)} /></div>
      <div style={{ gridColumn: 'span 4' }}><KpiCard label="MRR" value={fmtCurrency(mrr)} /></div>
      <div style={{ gridColumn: 'span 4' }}><KpiCard label="Plans" value="Basic $10 / Pro $20" /></div>

      <div style={{ gridColumn: 'span 12' }} className="card">
        <h2>How to enable real subscriptions</h2>
        <ol>
          <li>Connect Stripe: create two products (Basic $10, Pro $20).</li>
          <li>In production, replace this mock with a Stripe Checkout link per plan.</li>
          <li>Handle webhooks to mark members active/canceled.</li>
        </ol>
      </div>
    </div>
  );
}
