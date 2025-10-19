import { useState } from 'react';
import { IdeaSubmissionForm } from './components/IdeaSubmissionForm';
import { EvaluationResults } from './components/EvaluationResults';

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [ideaData, setIdeaData] = useState({
    title: '',
    description: ''
  });

  const handleSubmit = (data: typeof ideaData) => {
    setIdeaData(data);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setIdeaData({
      title: '',
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {!submitted ? (
        <IdeaSubmissionForm onSubmit={handleSubmit} />
      ) : (
        <EvaluationResults ideaData={ideaData} onReset={handleReset} />
      )}
    </div>
  );
}
