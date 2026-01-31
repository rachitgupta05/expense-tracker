import React from 'react';

const SummaryCards = ({
  income,
  totalExpense,
  onUpdateIncome,
  isYearly = false,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Income Card */}
      <div
        onClick={onUpdateIncome}
        className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:border-indigo-200 transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-2 h-2 rounded-full ${
              isYearly ? 'bg-indigo-500' : 'bg-emerald-500'
            }`}
          ></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {isYearly ? 'Annual Budget (Estimate)' : 'Monthly Income'}
          </span>
          <i className="fa-solid fa-pen text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity ml-auto"></i>
        </div>

        <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          ₹{income.toLocaleString('en-IN')}
        </h3>
        <p className="text-[10px] text-slate-400 font-medium mt-1">
          Click to edit base monthly rate
        </p>
      </div>

      {/* Expense Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full bg-rose-500"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {isYearly ? 'Total Yearly Spending' : 'Total Monthly Spending'}
          </span>
        </div>

        <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          ₹{totalExpense.toLocaleString('en-IN')}
        </h3>
      </div>
    </div>
  );
};

export default SummaryCards;
