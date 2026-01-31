import React from 'react';

const BalanceCard = ({ balance, utilization }) => {
  const isOverBudget = utilization > 100;
  const isNegative = balance < 0;

  return (
    <div
      className={`bg-[#0f172a] rounded-[32px] p-8 relative overflow-hidden text-white shadow-2xl transition-all duration-500 ${
        isOverBudget ? 'ring-4 ring-rose-500/20' : ''
      }`}
    >
      {/* Decorative background icon */}
      <div className="absolute top-4 right-8 opacity-10">
        <i
          className={`fa-solid ${
            isNegative ? 'fa-triangle-exclamation' : 'fa-indian-rupee-sign'
          } text-[140px]`}
        ></i>
      </div>

      <div className="relative z-10">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
          Remaining Balance in Period
        </p>

        <h2
          className={`text-5xl font-extrabold mb-10 tracking-tight transition-colors duration-500 ${
            isNegative ? 'text-rose-400' : 'text-white'
          }`}
        >
          {isNegative && '-'}₹{Math.abs(balance).toLocaleString('en-IN')}
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Limit Utilization
            </span>
            <span
              className={`text-sm font-bold px-3 py-1 rounded-xl transition-colors ${
                isOverBudget
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-900/40'
                  : 'bg-indigo-500/20 text-indigo-400'
              }`}
            >
              {Math.round(utilization)}%
            </span>
          </div>

          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ease-out rounded-full ${
                isOverBudget
                  ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]'
                  : 'bg-indigo-500'
              }`}
              style={{ width: `${Math.min(utilization, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
