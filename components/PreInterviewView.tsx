import React, { useState } from 'react';
import { PreInterviewData, PreInterviewResult } from '../types';
import { generatePreInterviewPrep } from '../services/geminiService';
import Loading from './Loading';
import { FileText, Sparkles, Briefcase, User, Link as LinkIcon } from 'lucide-react';

const PreInterviewView: React.FC = () => {
  const [formData, setFormData] = useState<PreInterviewData>({
    customerName: '',
    companyName: '',
    internalNotes: '',
    externalInfo: '',
  });

  const [result, setResult] = useState<PreInterviewResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.companyName) return;
    
    setLoading(true);
    try {
      const data = await generatePreInterviewPrep(formData);
      setResult(data);
    } catch (err) {
      alert("Failed to generate preparation materials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="text-brand-600 w-6 h-6" />
          Pre-Interview Preparation
        </h2>
        <p className="text-slate-500">Aggregate internal CRM data and external insights to generate a winning interview strategy.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Inputs */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
          <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">Client Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Customer Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    className="pl-9 w-full rounded-md border border-slate-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="e.g. Jane Doe"
                    value={formData.customerName}
                    onChange={e => setFormData({...formData, customerName: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    className="pl-9 w-full rounded-md border border-slate-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="e.g. Acme Corp"
                    value={formData.companyName}
                    onChange={e => setFormData({...formData, companyName: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Internal Notes (CRM)</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <textarea 
                  className="pl-9 w-full rounded-md border border-slate-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[120px]"
                  placeholder="Paste history, previous objections, sales stage..."
                  value={formData.internalNotes}
                  onChange={e => setFormData({...formData, internalNotes: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">External Insights</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <textarea 
                  className="pl-9 w-full rounded-md border border-slate-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[120px]"
                  placeholder="Paste LinkedIn bio, recent news articles, company website info..."
                  value={formData.externalInfo}
                  onChange={e => setFormData({...formData, externalInfo: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-2.5 px-4 rounded-lg text-white font-medium transition-all ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-brand-600 hover:bg-brand-700 shadow-md hover:shadow-lg'}`}
            >
              {loading ? 'Analyzing...' : 'Generate Prep Materials'}
            </button>
          </form>
        </div>

        {/* Right Column: Output */}
        <div className="space-y-6">
          {loading && <div className="bg-white p-12 rounded-xl shadow-sm border border-slate-200"><Loading message="AI is researching internal and external data..." /></div>}
          
          {!loading && !result && (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center text-slate-400 text-center h-full min-h-[400px]">
              <Sparkles className="w-12 h-12 mb-4 text-slate-300" />
              <p>Fill in the details to generate your AI-powered interview kit.</p>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Strategy Card */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
                <h3 className="text-indigo-900 font-semibold mb-2 flex items-center">
                  <span className="bg-indigo-200 text-indigo-700 p-1 rounded mr-2 text-xs">STRATEGY</span>
                  AI Suggested Approach
                </h3>
                <p className="text-indigo-800 text-sm leading-relaxed">{result.suggestedStrategy}</p>
              </div>

              {/* Summary Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-slate-800 font-semibold mb-3 border-b pb-2">Client Background Summary</h3>
                <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">{result.backgroundSummary}</p>
              </div>

              {/* Outline Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-slate-800 font-semibold mb-3 border-b pb-2">Interview Outline</h3>
                <div className="text-slate-600 text-sm whitespace-pre-line leading-relaxed font-mono bg-slate-50 p-4 rounded-lg border border-slate-100">
                  {result.interviewOutline}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreInterviewView;