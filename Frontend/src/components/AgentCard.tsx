import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface AgentCardProps {
  agent: string;
  icon: string;
  color: string;
  score: number;
  summary: string;
  strengths: string[];
  concerns: string[];
  recommendation: string;
}

export function AgentCard({
  agent,
  icon,
  color,
  score,
  summary,
  strengths,
  concerns,
  recommendation
}: AgentCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Work';
  };

  return (
    <Card className="p-6 hover:shadow-xl transition-shadow border-0 bg-white/80 backdrop-blur">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 bg-gradient-to-br ${color} rounded-xl`}>
            <span className="text-2xl">{icon}</span>
          </div>
          <div>
            <h3 className="text-slate-900">{agent}</h3>
            <Badge variant="secondary" className="mt-1">
              {getScoreLabel(score)}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <div className={`${getScoreColor(score)}`}>{score}</div>
          <p className="text-xs text-slate-500">out of 100</p>
        </div>
      </div>

      <Progress value={score} className="mb-4 h-2" />

      <div className="space-y-4">
        <div>
          <p className="text-slate-700">{summary}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm text-slate-900">Strengths</span>
          </div>
          <ul className="space-y-1 ml-6">
            {strengths.map((strength, index) => (
              <li key={index} className="text-sm text-slate-600 list-disc">
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span className="text-sm text-slate-900">Concerns</span>
          </div>
          <ul className="space-y-1 ml-6">
            {concerns.map((concern, index) => (
              <li key={index} className="text-sm text-slate-600 list-disc">
                {concern}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <span className="text-sm text-slate-900 block mb-1">Recommendation</span>
          <p className="text-sm text-slate-700 italic">{recommendation}</p>
        </div>
      </div>
    </Card>
  );
}
