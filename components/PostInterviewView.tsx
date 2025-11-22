import React, { useState } from 'react';
import { CustomerPersona, PostInterviewResult } from '../types';
import { generatePostInterviewAnalysis } from '../services/geminiService';
import Loading from './Loading';
import { Mic, FileOutput, UserCheck, ArrowRight, Save } from 'lucide-react';

interface Props {
  customers: CustomerPersona[];
  onUpdateCustomer: (id: string, updates: Partial<CustomerPersona>) => void;
}

const PostInterviewView: React.FC<Props> = ({ customers, onUpdateCustomer }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PostInterviewResult | null>(null);

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  const handleAnalyze = async () => {
    if (!selectedCustomerId || !notes) return;
    
    setLoading(true);
    try {
      const analysis = await generatePostInterviewAnalysis({
        customerId: selectedCustomerId,
        customerName: selectedCustomer?.name || 'Unknown',
        interviewNotes: notes
      });
      setResult(analysis);
    } catch (err) {
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyUpdates = () => {
    if (!result || !selectedCustomerId) return;
    
    onUpdateCustomer(selectedCustomerId, {
      ...result.updatedPersonaData,
      lastInterviewDate: new Date().toISOString().split('T')[0]
    });
    
    alert("Database updated successfully!");
    setResult(null);
    setNotes('');
    setSelectedCustomerId('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
       <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <UserCheck className="text-brand-600 w-6 h-6" />
          Post-Interview Review
        </h2>
        <p className="text-slate-500">Analyze interview transcripts, generate reports, and auto-update your customer database.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Area */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Customer</label>
            <select 
              className="w-full bg-white text-slate-900 rounded-md border border-slate-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 mb-4"
              value={selectedCustomerId}
              onChange={(e) => {
                setSelectedCustomerId(e.target.value);
                setResult(null);
              }}
            >
              <option value="">-- Choose a customer --</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} - {c.company}</option>
              ))}
            </select>

            <label className="block text-sm font-medium text-slate-700 mb-2">Interview Transcript / Notes</label>
            <div className="relative">
              <Mic className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <textarea 
                className="pl-9 w-full bg-white text-slate-900 rounded-md border border-slate-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[300px] font-mono leading-relaxed placeholder-slate-400"
                placeholder="Paste raw text, transcript, or bullet points from the meeting here..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>
            
            <button 
              onClick={handleAnalyze}
              disabled={loading || !selectedCustomerId || !notes}
              className={`mt-4 w-full py-2.5 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${loading || !selectedCustomerId ? 'bg-slate-300 cursor-not-allowed' : 'bg-brand-600 hover:bg-brand-700'}`}
            >
              {loading ? 'Processing...' : (
                <>
                  Generate Report & Update DB <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Output Area */}
        <div className="lg:col-span-7">
           {loading && (
             <div className="h-full flex items-center justify-center bg-white rounded-xl border border-slate-200 shadow-sm min-h-[400px]">
               <Loading message="Extracting insights and updating persona..." />
             </div>
           )}

           {!loading && !result && (
             <div className="h-full flex flex-col items-center justify-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 min-h-[400px] text-slate-400">
               <FileOutput className="w-12 h-12 mb-4 text-slate-300" />
               <p>Select a customer and paste notes to begin analysis.</p>
             </div>
           )}

           {!loading && result && (
             <div className="space-y-6 animate-fade-in-up">
               {/* Extracted Data Card */}
               <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 shadow-sm">
                 <div className="flex justify-between items-start mb-4">
                    <h3 className="text-emerald-900 font-bold flex items-center gap-2">
                      <Save className="w-5 h-5" /> Detected Database Updates
                    </h3>
                    <button 
                      onClick={handleApplyUpdates}
                      className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-full hover:bg-emerald-700 transition-colors font-medium shadow-sm"
                    >
                      Confirm & Save to DB
                    </button>
                 </div>
                 <div className="grid grid-cols-2 gap-4 text-sm">
                    {result.updatedPersonaData.decisionMakerStatus && (
                      <div className="bg-white/60 p-2 rounded border border-emerald-100">
                        <span className="block text-emerald-600 text-xs font-semibold uppercase">Role</span>
                        {result.updatedPersonaData.decisionMakerStatus}
                      </div>
                    )}
                    {result.updatedPersonaData.budget && (
                      <div className="bg-white/60 p-2 rounded border border-emerald-100">
                        <span className="block text-emerald-600 text-xs font-semibold uppercase">Budget</span>
                        {result.updatedPersonaData.budget}
                      </div>
                    )}
                    {result.updatedPersonaData.industry && (
                      <div className="bg-white/60 p-2 rounded border border-emerald-100">
                        <span className="block text-emerald-600 text-xs font-semibold uppercase">Industry</span>
                        {result.updatedPersonaData.industry}
                      </div>
                    )}
                 </div>
                 <div className="mt-3">
                    <span className="block text-emerald-600 text-xs font-semibold uppercase mb-1">Pain Points Identified</span>
                    <ul className="list-disc pl-4 text-emerald-900 text-sm">
                      {result.updatedPersonaData.keyPainPoints?.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                 </div>
                 <div className="mt-3 flex gap-2 flex-wrap">
                    {result.updatedPersonaData.tags?.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-emerald-200 text-emerald-800 text-xs rounded-md font-medium">#{tag}</span>
                    ))}
                 </div>
               </div>

               {/* Report Card */}
               <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                 <h3 className="text-slate-800 font-bold text-lg mb-4 border-b pb-2 flex items-center gap-2">
                   <FileOutput className="w-5 h-5 text-brand-600" />
                   Generated Meeting Report
                 </h3>
                 <div className="prose prose-slate prose-sm max-w-none text-slate-600">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{result.meetingReportMarkdown}</pre>
                 </div>
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default PostInterviewView;