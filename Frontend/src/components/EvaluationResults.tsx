import { useState, useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { AgentCard } from "./AgentCard";
import { OverallScore } from "./OverallScore";

interface EvaluationResultsProps {
  ideaData: {
    title: string;
    description: string;
  };
  onReset: () => void;
}

export function EvaluationResults({
  ideaData,
  onReset,
}: EvaluationResultsProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Mock evaluation data
  const evaluations = {
    ideaEvaluator: {
      agent: "Idea Evaluator",
      icon: "💡",
      color: "from-amber-500 to-orange-600",
      score: 78,
      summary:
        "Your idea shows strong potential with a clear problem-solution fit. The concept is innovative and addresses a real pain point in the market.",
      strengths: [
        "Clear value proposition",
        "Solves a genuine problem",
        "Scalable concept",
        "Good market timing",
      ],
      concerns: [
        "Competition analysis needs more depth",
        "Revenue model could be more detailed",
      ],
      recommendation:
        "Move forward with prototype development while conducting deeper market research.",
    },
    marketAnalyst: {
      agent: "Market Analyst",
      icon: "📊",
      color: "from-blue-500 to-indigo-600",
      score: 72,
      summary:
        "The target market shows promising growth trends. Market size is substantial, though competition is moderately high in this space.",
      strengths: [
        "Large addressable market ($2.5B+)",
        "Growing demand (15% YoY)",
        "Clear customer pain points",
        "Good market entry timing",
      ],
      concerns: [
        "Saturated market segment",
        "Customer acquisition costs may be high",
        "Market education required",
      ],
      recommendation:
        "Focus on a specific niche within the broader market to establish initial traction.",
    },
    technicalFeasibility: {
      agent: "Technical Feasibility Checker",
      icon: "⚙️",
      color: "from-green-500 to-emerald-600",
      score: 85,
      summary:
        "The technical implementation is highly feasible with existing technologies. Development complexity is moderate with manageable technical risks.",
      strengths: [
        "Proven technology stack",
        "Reasonable development timeline (4-6 months)",
        "Good scalability potential",
        "Available technical talent",
      ],
      concerns: [
        "Integration complexity with third-party services",
        "Data security considerations",
      ],
      recommendation:
        "Start with an MVP focusing on core features. Plan for iterative development cycles.",
    },
    businessMentor: {
      agent: "Business Mentor",
      icon: "🎯",
      color: "from-purple-500 to-pink-600",
      score: 75,
      summary:
        "Strong business foundation with clear monetization paths. Team capabilities and go-to-market strategy need more definition.",
      strengths: [
        "Multiple revenue streams identified",
        "Reasonable capital requirements",
        "Clear customer acquisition strategy",
        "Good unit economics potential",
      ],
      concerns: [
        "Team composition needs strengthening",
        "Longer path to profitability (18-24 months)",
        "Partnership strategy unclear",
      ],
      recommendation:
        "Build a strong founding team with complementary skills. Develop a detailed 12-month execution roadmap.",
    },
  };

  const overallScore = Math.round(
    (evaluations.ideaEvaluator.score +
      evaluations.marketAnalyst.score +
      evaluations.technicalFeasibility.score +
      evaluations.businessMentor.score) /
      4,
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-12 text-center max-w-md shadow-xl border-0 bg-white/80 backdrop-blur">
          <Loader2 className="w-16 h-16 mx-auto mb-6 text-blue-600 animate-spin" />
          <h2 className="text-slate-900 mb-2">
            Analyzing Your Idea
          </h2>
          <p className="text-slate-600 mb-6">
            Our AI agents are evaluating your startup idea
          </p>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-slate-500 mt-3">
            {progress}% complete
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onReset}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Evaluate Another Idea
        </Button>

        <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg border-0">
          <h1 className="text-slate-900 mb-2">
            {ideaData.title}
          </h1>
          <p className="text-slate-600">
            {ideaData.description}
          </p>
        </div>
      </div>

      <OverallScore score={overallScore} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <AgentCard {...evaluations.ideaEvaluator} />
        <AgentCard {...evaluations.marketAnalyst} />
        <AgentCard {...evaluations.technicalFeasibility} />
        <AgentCard {...evaluations.businessMentor} />
      </div>

      <Card className="mt-8 p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
        <h3 className="mb-4">Next Steps</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">
              1
            </span>
            <span>
              Refine your business model based on the feedback
              from our agents
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">
              2
            </span>
            <span>
              Develop a detailed MVP plan focusing on core
              features
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">
              3
            </span>
            <span>
              Conduct user interviews to validate assumptions
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">
              4
            </span>
            <span>
              Build your founding team with complementary skills
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}