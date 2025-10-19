import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, Award } from 'lucide-react';

interface OverallScoreProps {
  score: number;
}

export function OverallScore({ score }: OverallScoreProps) {
  const getOverallRating = (score: number) => {
    if (score >= 85) return { label: 'Outstanding', color: 'bg-green-500', variant: 'default' as const };
    if (score >= 75) return { label: 'Strong Potential', color: 'bg-blue-500', variant: 'default' as const };
    if (score >= 65) return { label: 'Promising', color: 'bg-amber-500', variant: 'default' as const };
    return { label: 'Needs Refinement', color: 'bg-orange-500', variant: 'default' as const };
  };

  const rating = getOverallRating(score);

  return (
    <Card className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className={`p-4 ${rating.color} rounded-2xl`}>
            <Award className="w-12 h-12" />
          </div>
          <div>
            <p className="text-sm text-slate-300 mb-1">Overall Evaluation Score</p>
            <h2 className="text-white mb-2">{score}/100</h2>
            <Badge variant={rating.variant} className={`${rating.color} border-0`}>
              {rating.label}
            </Badge>
          </div>
        </div>

        <div className="text-center md:text-right">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span>Evaluation Complete</span>
          </div>
          <p className="text-sm text-slate-300">
            Based on analysis from 4 AI agents
          </p>
        </div>
      </div>
    </Card>
  );
}
