import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/UI';
import {
  Zap,
  BarChart3,
  ArrowRight,
  Sparkles,
  Target,
  Rocket,
} from 'lucide-react';

export const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGetStarted = () => {
    navigate('/register');
  };

  const features = [
    {
      icon: <BarChart3 size={24} />,
      title: 'ATS Score',
      description:
        'Get a real ATS score to understand how well your resume will pass through applicant tracking systems',
    },
    {
      icon: <Target size={24} />,
      title: 'Match Percentage',
      description:
        'See how closely your resume aligns with the job description and requirements',
    },
    {
      icon: <Zap size={24} />,
      title: 'Missing Skills',
      description:
        'Identify key skills and keywords you should add to improve your chances',
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Improvement Tips',
      description:
        'Get actionable recommendations to optimize your resume for better results',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen pt-32 pb-16 px-4 bg-gradient-to-r from-sky-600 to-purple-600 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slideUp">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full border border-white/30">
                  <Rocket size={16} className="text-white" />
                  <span className="text-sm font-medium text-white">
                    AI-Powered Resume Analysis
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  Optimize Your Resume for Success
                </h1>

                <p className="text-xl text-white/90 leading-relaxed">
                  Get instant ATS analysis, identify missing skills, and receive
                  actionable improvement tips to land your dream job.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  variant="secondary"
                  className="text-sky-600"
                >
                  Get Started Free
                  <ArrowRight size={20} />
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-white">10K+</div>
                  <div className="text-sm text-white/80">
                    Resumes Analyzed
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">95%</div>
                  <div className="text-sm text-white/80">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">4.9★</div>
                  <div className="text-sm text-white/80">User Rating</div>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl p-8 backdrop-blur-sm border border-white/30">
                  <div className="space-y-4">
                    <div className="h-12 bg-white/20 rounded-lg animate-pulse" />
                    <div className="h-12 bg-white/20 rounded-lg animate-pulse" />
                    <div className="h-12 bg-white/20 rounded-lg animate-pulse" />
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      <div className="h-20 bg-white/20 rounded-lg animate-pulse" />
                      <div className="h-20 bg-white/20 rounded-lg animate-pulse" />
                      <div className="h-20 bg-white/20 rounded-lg animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to craft a resume that passes ATS and impresses
              hiring managers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-sky-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600">
              Simple 3-step process to optimize your resume
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Upload Resume',
                description: 'Share your resume in PDF or DOCX format',
              },
              {
                step: '2',
                title: 'Provide Job Details',
                description:
                  'Enter the company, position, and job description',
              },
              {
                step: '3',
                title: 'Get Insights',
                description:
                  'Receive ATS score, match %, skills, and tips',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-sky-600 to-purple-600 text-white text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-sky-600 to-purple-600 rounded-2xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Optimize Your Resume?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start your free analysis today and take the first step towards
            landing your dream job.
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            variant="secondary"
            className="text-sky-600"
          >
            Get Started Free
            <ArrowRight size={20} />
          </Button>
        </div>
      </section>
    </>
  );
};
