import React, { useState, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Input,
  Button,
  TextArea,
  FileInput,
  Card,
} from '../components/UI';
import { AnalysisResults } from '../components/AnalysisResults';
import { AnalysisHistory } from '../components/AnalysisHistory';
import { analysisService } from '../services/api';
import { Upload, Loader } from 'lucide-react';

export const DashboardPage = () => {
  const { isAuthenticated } = useAuth();

  const [resume, setResume] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [analyses, setAnalyses] = useState([]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await analysisService.getAllAnalysis();
        setAnalyses(data);
      } catch (err) {
        console.error('Failed to load analysis history', err);
      }
    };

    fetchHistory();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('Only PDF and DOCX files are allowed');
      return;
    }

    setResume(file);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!resume || !companyName || !jobTitle || !jobDescription) {
      setError('Please fill in all fields and upload a resume');
      return;
    }

    setIsLoading(true);

    try {
      const analysisResult = await analysisService.uploadResume(
        resume,
        companyName,
        jobTitle,
        jobDescription
      );

      setResult(analysisResult);
      setAnalyses((prev) => [analysisResult, ...prev]);

      
      setResume(null);
      setCompanyName('');
      setJobTitle('');
      setJobDescription('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAnalysis = (analysis) => {
    setResult(analysis);
  };

  if (result) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setResult(null)}
            className="mb-6 text-sky-600 hover:text-sky-700 font-medium"
          >
            ← Back to Dashboard
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AnalysisResults result={result} />
            </div>
            <AnalysisHistory
              analyses={analyses}
              onSelectAnalysis={handleSelectAnalysis}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Analyze Your Resume
          </h1>
          <p className="text-slate-600">
            Upload your resume and provide job details to get instant ATS analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <FileInput
                  ref={fileInputRef}
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  label="Upload Resume"
                />

                <Input
                  label="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />

                <Input
                  label="Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />

                <TextArea
                  label="Job Description"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={8}
                />

                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                >
                  <Upload size={18} />
                  {isLoading ? 'Analyzing...' : 'Analyze Resume'}
                  {isLoading && <Loader className="animate-spin" size={18} />}
                </Button>
              </form>
            </Card>
          </div>

          <Card className="p-6 sticky top-24">
            <AnalysisHistory
              analyses={analyses}
              onSelectAnalysis={handleSelectAnalysis}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
