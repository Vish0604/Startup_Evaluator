import { useState } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { evaluateIdea } from '../lib/api';

type SubmitData = {
  title: string;
  description: string;
  targetMarket: string;
  uniqueValue: string;
};

interface IdeaSubmissionFormProps {
  onSubmit?: (data: SubmitData) => void;
}

export function IdeaSubmissionForm({ onSubmit }: IdeaSubmissionFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [uniqueValue, setUniqueValue] = useState('');
  const [aiResults, setAiResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = !!(title && description && targetMarket && uniqueValue);

  async function runAgents() {
    setLoading(true);
    setError(null);
    try {
      const result = await evaluateIdea({
        title,
        description,
        market: targetMarket,     // map to backend shape
        competitors: '',
        team: uniqueValue         // reuse as “team/UVP” field
      });
      setAiResults(result);
    } catch (e: any) {
      setError(e?.message || 'Failed to evaluate with agents');
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ title, description, targetMarket, uniqueValue });
    await runAgents();
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-slate-900">Startup Idea Evaluator</h1>
        </div>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Get comprehensive feedback on your startup idea from our AI-powered evaluation team
        </p>
      </div>

      <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              placeholder="Enter your startup idea name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Describe Your Idea</Label>
            <Textarea
              id="description"
              placeholder="Tell us about your startup idea..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              required
            />
            <p className="text-xs text-slate-500">
              Tip: Include problem, target market, solution, and your unique edge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="targetMarket">Target Market</Label>
              <Input
                id="targetMarket"
                placeholder="e.g., SMBs in retail"
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uniqueValue">Unique Value / Team</Label>
              <Input
                id="uniqueValue"
                placeholder="Your moat or team strengths"
                value={uniqueValue}
                onChange={(e) => setUniqueValue(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={!isValid || loading}>
            <Sparkles className="w-5 h-5 mr-2" />
            {loading ? 'Evaluating…' : 'Evaluate My Idea'}
          </Button>
        </form>
      </Card>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {([
          { label: 'Idea Evaluator', icon: '💡' },
          { label: 'Market Analyst', icon: '📊' },
          { label: 'Tech Checker', icon: '⚙️' },
          { label: 'Business Mentor', icon: '🎯' }
        ]).map((agent) => (
          <div key={agent.label} className="p-4 bg-white/60 backdrop-blur rounded-lg">
            <div className="text-2xl mb-1">{agent.icon}</div>
            <div className="text-sm text-slate-600">{agent.label}</div>
          </div>
        ))}
      </div>

      {aiResults && (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white">
          <h2 className="text-xl mb-2">AI Evaluation Results</h2>
          {'scores' in aiResults || 'agents' in aiResults ? (
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(aiResults, null, 2)}
            </pre>
          ) : (
            <div className="text-sm">{String(aiResults)}</div>
          )}
        </div>
      )}

      {loading && (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white">
          <h2 className="text-xl">Loading...</h2>
        </div>
      )}

      {error && (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white">
          <h2 className="text-xl mb-2">Error</h2>
          <div className="text-sm">{error}</div>
        </div>
      )}
    </div>
  );
}
