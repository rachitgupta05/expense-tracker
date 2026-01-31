import React, { useState } from 'react';

const UpdateIncomeModal = ({ currentIncome, onClose, onUpdate }) => {
  const [income, setIncome] = useState(
    currentIncome ? currentIncome.toString() : ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedIncome = parseFloat(income);

    // 🔒 Backend safety checks
    if (isNaN(parsedIncome) || parsedIncome < 0) return;

    onUpdate(parsedIncome);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-extrabold text-slate-800 mb-6">
          Update Income
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Monthly Income (₹)
            </label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-extrabold text-2xl"
              autoFocus
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl font-bold bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateIncomeModal;
