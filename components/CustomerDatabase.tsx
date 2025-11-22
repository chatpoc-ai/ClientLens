import React from 'react';
import { CustomerPersona } from '../types';
import { Database, User, Tag, Calendar, DollarSign } from 'lucide-react';

interface Props {
  customers: CustomerPersona[];
}

const CustomerDatabase: React.FC<Props> = ({ customers }) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in">
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
          <div key={customer.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{customer.name}</h3>
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
              <div className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                 <User className="w-3 h-3" /> {customer.role}
              </div>
            </div>

            <div className="p-5 flex-grow space-y-4">
              {customer.budget && (
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">{customer.budget}</span>
                </div>
              )}

              {customer.keyPainPoints.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Pain Points</p>
                  <ul className="space-y-1">
                    {customer.keyPainPoints.slice(0, 3).map((pt, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-red-400 text-lg leading-none">•</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {customer.tags.map((tag, i) => (
                  <div key={i} className="flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                    <Tag className="w-3 h-3" /> {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
               <span className="flex items-center gap-1">
                 <Calendar className="w-3 h-3" /> Last Interview
               </span>
               <span>{customer.lastInterviewDate || 'Never'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDatabase;