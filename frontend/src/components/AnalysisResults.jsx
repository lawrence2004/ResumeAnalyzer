import React from 'react';
import { Zap, CheckCircle, TrendingUp, BarChart3 } from 'lucide-react';

export const AnalysisResults = ({ result }) => {
  const CircularProgress = ({ value, label }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
      circumference - (value / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 120 120"
          >
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#e2e8f0"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="url(#grad)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient
                id="grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#0284c7" /> {/* sky-600 */}
                <stop offset="100%" stopColor="#9333ea" /> {/* purple-600 */}
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-sky-600">
              {value}%
            </span>
          </div>
        </div>
        <p className="text-sm font-medium text-slate-600 mt-3">
          {label}
        </p>
      </div>
    );
  };

  const ProgressBar = ({ value, label }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">
          {label}
        </span>
        <span className="text-sm font-bold text-sky-600">
          {value}%
        </span>
      </div>

      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-500 to-purple-500 rounded-full transition-all duration-1000"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-slideUp">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2 mb-2">
          <BarChart3 className="text-sky-600" size={32} />
          Analysis Results
        </h2>
        <p className="text-slate-600">
          Your resume analysis is complete
        </p>
      </div>

      {/* Scores Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg border border-slate-200 p-8 flex justify-center">
          <CircularProgress
            value={result.atsScore}
            label="ATS Score"
          />
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-sky-600" />
            Match Percentage
          </h3>

          <ProgressBar
            value={result.matchPercentage}
            label="Overall Match"
          />

          <p className="text-sm text-slate-600 mt-4">
            {result.matchPercentage >= 75
              ? '🎉 Excellent match! Your resume aligns well with the job description.'
              : result.matchPercentage >= 50
              ? '✅ Good match! Consider implementing the suggestions below.'
              : '⚠️ Fair match. Review the missing skills and improvement tips.'}
          </p>
        </div>
      </div>

      {/* Missing Skills */}
      {result.missingSkills.length > 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Missing Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {result.missingSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200 hover:bg-red-100 transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Keywords */}
      {result.suggestedKeywords.length > 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Zap size={20} className="text-green-600" />
            Suggested Keywords
          </h3>

          <div className="flex flex-wrap gap-2">
            {result.suggestedKeywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200 hover:bg-green-100 transition"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Improvement Tips */}
      {result.improvementTips.length > 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle size={20} className="text-blue-600" />
            Improvement Tips
          </h3>

          <ul className="space-y-3">
            {result.improvementTips.map((tip, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-sky-600 font-bold min-w-fit">
                  #{index + 1}
                </span>
                <p className="text-slate-700">{tip}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
