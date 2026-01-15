import React from 'react';
import { Clock, Briefcase } from 'lucide-react';

export const AnalysisHistory = ({ analyses, onSelectAnalysis }) => {
  if (analyses.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
        <p className="text-slate-600">
          No analysis history yet. Start by analyzing a resume!
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
  if (!dateString) return '—';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '—';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};


  const getScoreColor = (score) => {
    if (score >= 75) return 'text-green-600 bg-green-50';
    if (score >= 50) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
        <Clock size={20} />
        Recent Analyses
      </h3>

      <div className="grid gap-3">
        {analyses.map((analysis) => (
          <button
            key={analysis.id}
            onClick={() => onSelectAnalysis(analysis)}
            className="
              bg-white rounded-lg border border-slate-200 p-4 text-left
              hover:shadow-md hover:border-sky-300
              transition cursor-pointer
            "
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Briefcase size={18} className="text-slate-400" />
                <div>
                  <h4 className="font-semibold text-slate-900">
                    {analysis.jobTitle}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {analysis.companyName}
                  </p>
                </div>
              </div>

              <div
                className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(
                  analysis.atsScore
                )}`}
              >
                {analysis.atsScore}%
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-sm">
                <span className="text-slate-500">
                  Match: {analysis.matchPercentage}%
                </span>
              </div>
              <span className="text-xs text-slate-400">
                {formatDate(analysis.analyzedAt)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
