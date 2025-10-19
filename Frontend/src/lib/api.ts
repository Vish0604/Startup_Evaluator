export async function evaluateIdea(payload: {
  title: string; description: string; market: string; competitors?: string; team?: string;
}) {
  const res = await fetch('/api/agents/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}