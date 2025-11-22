import React, { useState } from 'react';
import { CustomerPersona } from '../types';
import { Database, User, Tag, Calendar, DollarSign, ArrowLeft, Briefcase, Building, AlertCircle, MessageSquare, Clock } from 'lucide-react';

interface Props {
  customers: CustomerPersona[];
}

const CustomerDatabase: React.FC<Props> = ({ customers }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  // --- MASTER VIEW (Grid) ---
  if (!selectedCustomer) {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 animate-fade-in">
        <header className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Database className="text-brand-600 w-6 h-6" />
              Customer Persona Database
            </h2>
            <p className="text-slate-500">Live view of your enriched client profiles.</p>
          </div>
          <div className="text-sm text-slate-400">
            {customers.length} Records Found
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((customer) => (
            <button 
              key={customer.id} 
              onClick={() => setSelectedCustomerId(customer.id)}
              className="text-left bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-slate-200 overflow-hidden flex flex-col group"
            >
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 w-full">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-brand-600 transition-colors">{customer.name}</h3>
                    <p className="text-slate-500 text-sm font-medium">{customer.company}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    customer.status === 'Active' ? 'bg-green-100 text-green-700' :
                    customer.status === 'Churned' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {customer.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                   <div className="text-xs text-slate-500 flex items-center gap-1">
                     <User className="w-3 h-3" /> {customer.role}
                   </div>
                </div>
              </div>

              <div className="p-5 flex-grow space-y-4 w-full">
                {customer.keyPainPoints.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Top Issue</p>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {customer.keyPainPoints[0]}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {customer.tags.slice(0, 3).map((tag, i) => (
                    <div key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                      #{tag}
                    </div>
                  ))}
                  {customer.tags.length > 3 && (
                    <div className="px-2 py-1 bg-slate-50 text-slate-400 rounded text-xs">+{customer.tags.length - 3}</div>
                  )}
                </div>
              </div>

              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 w-full mt-auto">
                 <span className="flex items-center gap-1">
                   <Calendar className="w-3 h-3" /> Last: {customer.lastInterviewDate || 'Never'}
                 </span>
                 <span className="text-brand-600 font-medium">View Profile &rarr;</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // --- DETAIL VIEW ---
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in-up">
      <button 
        onClick={() => setSelectedCustomerId(null)}
        className="flex items-center text-slate-500 hover:text-brand-600 transition-colors text-sm font-medium mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Database
      </button>

      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-100 to-brand-50 rounded-full flex items-center justify-center text-brand-600 font-bold text-2xl border-2 border-white shadow-sm">
            {selectedCustomer.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{selectedCustomer.name}</h1>
            <div className="flex items-center gap-2 text-slate-500">
               <Building className="w-4 h-4" /> {selectedCustomer.company}
               <span className="text-slate-300">•</span>
               <User className="w-4 h-4" /> {selectedCustomer.role}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              selectedCustomer.status === 'Active' ? 'bg-green-100 text-green-700' :
              selectedCustomer.status === 'Churned' ? 'bg-red-100 text-red-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {selectedCustomer.status}
            </span>
            <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm">
              Edit Profile
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Persona DNA */}
        <div className="lg:col-span-1 space-y-6">
          {/* Key Stats Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b pb-2">Persona DNA</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Briefcase className="w-3 h-3"/> Industry</div>
                <div className="text-sm font-medium text-slate-800">{selectedCustomer.industry}</div>
              </div>
              
              <div>
                <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><DollarSign className="w-3 h-3"/> Budget</div>
                <div className="text-sm font-medium text-slate-800">{selectedCustomer.budget || 'Unknown'}</div>
              </div>

              <div>
                <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><User className="w-3 h-3"/> Decision Role</div>
                <div className="text-sm font-medium text-slate-800">
                  {selectedCustomer.decisionMakerStatus ? (
                     <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 text-xs">
                       {selectedCustomer.decisionMakerStatus}
                     </span>
                  ) : 'Unknown'}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500 mb-2 flex items-center gap-1"><Tag className="w-3 h-3"/> Tags</div>
              <div className="flex flex-wrap gap-2">
                {selectedCustomer.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pain Points Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
             <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b pb-2 flex items-center gap-2">
               <AlertCircle className="w-4 h-4 text-red-500" /> Key Pain Points
             </h3>
             <ul className="space-y-3">
               {selectedCustomer.keyPainPoints.map((pt, i) => (
                 <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                   <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5"></span>
                   {pt}
                 </li>
               ))}
             </ul>
          </div>
        </div>

        {/* Right Column: Interaction History */}
        <div className="lg:col-span-2">
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <MessageSquare className="text-brand-600 w-5 h-5" />
                  Engagement History
                </h3>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
                  {selectedCustomer.history?.length || 0} Sessions
                </span>
              </div>
              
              <div className="p-6 bg-slate-50/50 flex-grow">
                {!selectedCustomer.history || selectedCustomer.history.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Clock className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                    <p>No interview history recorded yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {selectedCustomer.history.map((record) => (
                      <div key={record.id} className="relative pl-10">
                        {/* Timeline Dot */}
                        <div className="absolute left-2.5 -translate-x-1/2 top-4 w-3 h-3 rounded-full bg-white border-2 border-brand-500 z-10"></div>
                        
                        <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 hover:border-brand-200 transition-colors">
                           <div className="flex justify-between items-start mb-2">
                             <h4 className="font-bold text-slate-800 text-sm">{record.title}</h4>
                             <span className="text-xs text-slate-500 font-mono bg-slate-50 px-2 py-1 rounded border border-slate-100">
                               {record.date}
                             </span>
                           </div>
                           <p className="text-slate-600 text-sm leading-relaxed">
                             {record.summary}
                           </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDatabase;