import React, { useState } from 'react';
import { AppView, CustomerPersona } from './types';
import PreInterviewView from './components/PreInterviewView';
import PostInterviewView from './components/PostInterviewView';
import CustomerDatabase from './components/CustomerDatabase';
import { LayoutDashboard, Mic, Database, Aperture, PlayCircle } from 'lucide-react';

// Mock Initial Data
const INITIAL_CUSTOMERS: CustomerPersona[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    company: 'TechFlow Solutions',
    role: 'CTO',
    industry: 'SaaS',
    keyPainPoints: ['Legacy system latency', 'High cloud costs', 'Slow deployment cycles'],
    budget: '$150k/annually',
    decisionMakerStatus: 'Primary',
    tags: ['Tech-savvy', 'Budget-conscious', 'Early Adopter'],
    status: 'Active',
    lastInterviewDate: '2023-10-15',
    history: [
      {
        id: 'h1',
        date: '2023-10-15',
        title: 'Q3 Business Review',
        summary: 'Discussed Q3 performance. Alice is happy with stability but concerned about rising AWS costs. We need to propose our optimization module next quarter.'
      },
      {
        id: 'h2',
        date: '2023-08-01',
        title: 'Initial Implementation Check-in',
        summary: 'Smooth rollout. Team is adjusting to the new dashboard. Requested a training session for the DevOps team.'
      }
    ]
  },
  {
    id: '2',
    name: 'Marcus Chen',
    company: 'GreenLeaf Logistics',
    role: 'VP Operations',
    industry: 'Logistics',
    keyPainPoints: ['Supply chain visibility', 'Driver retention', 'Fuel cost optimization'],
    budget: '$500k Project Cap',
    decisionMakerStatus: 'Influencer',
    tags: ['Urgent', 'Enterprise', 'Q4 Target'],
    status: 'Lead',
    lastInterviewDate: '2023-11-02',
    history: [
      {
        id: 'h3',
        date: '2023-11-02',
        title: 'Discovery Call',
        summary: 'Deep dive into logistics challenges. Marcus mentioned losing 15% of drivers due to scheduling inefficiencies. He is very interested in the auto-scheduling feature.'
      }
    ]
  },
  {
    id: '3',
    name: 'Sarah Miller',
    company: 'EduCreate',
    role: 'Director of Product',
    industry: 'EdTech',
    keyPainPoints: ['Low student engagement', 'Mobile app crashes', 'Content delivery lag'],
    budget: 'TBD',
    decisionMakerStatus: 'Evaluator',
    tags: ['New Prospect', 'Education', 'Mobile First'],
    status: 'Prospect',
    lastInterviewDate: '2023-09-20',
    history: [
      {
        id: 'h4',
        date: '2023-09-20',
        title: 'Introductory Call',
        summary: 'Sarah is evaluating vendors to replace their current legacy LMS. Key criteria: Mobile performance and gamification features.'
      }
    ]
  },
  {
    id: '4',
    name: 'David Kovac',
    company: 'FinStream',
    role: 'Head of Security',
    industry: 'FinTech',
    keyPainPoints: ['Compliance reporting', 'Data sovereignty', 'Audit trails'],
    budget: '$2M+',
    decisionMakerStatus: 'Gatekeeper',
    tags: ['High Risk', 'Compliance', 'Slow Mover'],
    status: 'Churned',
    lastInterviewDate: '2023-05-10',
    history: [
      {
        id: 'h5',
        date: '2023-05-10',
        title: 'Exit Interview',
        summary: 'Client decided to build in-house due to strict new data sovereignty regulations in the EU that we could not meet in time.'
      },
      {
        id: 'h6',
        date: '2023-01-15',
        title: 'Security Audit Review',
        summary: 'Tense meeting regarding SOC2 report delays. David needs assurance on our pen-testing schedule.'
      }
    ]
  },
  {
    id: '5',
    name: 'Elena Rodriguez',
    company: 'Urban Architectures',
    role: 'CEO',
    industry: 'Real Estate',
    keyPainPoints: ['Client communication silos', 'Project timeline drift', 'Vendor management'],
    budget: '$50k/mo',
    decisionMakerStatus: 'Primary',
    tags: ['VIP', 'High Growth', 'Referral'],
    status: 'Active',
    lastInterviewDate: '2023-11-14',
    history: [
      {
        id: 'h7',
        date: '2023-11-14',
        title: 'Partnership Expansion',
        summary: 'Elena wants to roll out our tool to their 3 new satellite offices. Agreed on a 20% bulk discount for the new seats.'
      },
      {
        id: 'h8',
        date: '2023-06-22',
        title: 'Mid-Year Sync',
        summary: 'General health check. No major issues. She loves the mobile app for site visits.'
      }
    ]
  }
];

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [customers, setCustomers] = useState<CustomerPersona[]>(INITIAL_CUSTOMERS);

  const handleUpdateCustomer = (id: string, updates: Partial<CustomerPersona>) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, ...updates };
      }
      return c;
    }));
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.PRE_INTERVIEW:
        return <PreInterviewView />;
      case AppView.POST_INTERVIEW:
        return <PostInterviewView customers={customers} onUpdateCustomer={handleUpdateCustomer} />;
      case AppView.CUSTOMER_DB:
        return <CustomerDatabase customers={customers} />;
      case AppView.DASHBOARD:
      default:
        return (
          <div className="max-w-4xl mx-auto text-center py-20 animate-fade-in">
            <h1 className="text-4xl font-bold text-slate-900 mb-6">Welcome to ClientLens</h1>
            <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
              Your intelligent lens for mastering client conversations. Research deeply, interview confidently, and update your insights automatically.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <button 
                onClick={() => setCurrentView(AppView.PRE_INTERVIEW)}
                className="group p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-blue-50 text-brand-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-800 text-lg">Start Preparation</h3>
                <p className="text-sm text-slate-500 mt-2">Generate summaries and questions for upcoming calls.</p>
              </button>

              <button 
                onClick={() => setCurrentView(AppView.POST_INTERVIEW)}
                className="group p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mic className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-800 text-lg">Analyze Interview</h3>
                <p className="text-sm text-slate-500 mt-2">Process transcripts and update client personas automatically.</p>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Aperture className="text-brand-500 w-7 h-7" />
            <span className="tracking-tight">ClientLens</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setCurrentView(AppView.DASHBOARD)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === AppView.DASHBOARD ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          
          <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider px-4">Workflows</div>
          
          <button 
            onClick={() => setCurrentView(AppView.PRE_INTERVIEW)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === AppView.PRE_INTERVIEW ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <PlayCircle className="w-5 h-5" />
            Pre-Interview Prep
          </button>
          
          <button 
            onClick={() => setCurrentView(AppView.POST_INTERVIEW)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === AppView.POST_INTERVIEW ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Mic className="w-5 h-5" />
            Post-Interview Analysis
          </button>

          <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider px-4">Data</div>

          <button 
            onClick={() => setCurrentView(AppView.CUSTOMER_DB)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === AppView.CUSTOMER_DB ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Database className="w-5 h-5" />
            Customer Persona DB
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          Powered by Gemini 2.5
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-sm font-semibold text-slate-500">
            {currentView === AppView.DASHBOARD && 'Home'}
            {currentView === AppView.PRE_INTERVIEW && 'Preparation Module'}
            {currentView === AppView.POST_INTERVIEW && 'Analysis Module'}
            {currentView === AppView.CUSTOMER_DB && 'Database View'}
          </h1>
          <div className="flex items-center gap-4">
             <div className="h-8 w-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-xs">AI</div>
          </div>
        </header>

        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;