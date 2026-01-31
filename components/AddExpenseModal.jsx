import React, { useState } from 'react';

// ✅ Category constants (JS-safe)
const CATEGORIES = [
  'FOOD',
  'TRANSPORT',
  'SHOPPING',
  'ENTERTAINMENT',
  'RENT',
  'UTILITIES',
  'OTHERS',
];

const AddExpenseModal = ({ onClose, onAdd, selectedYear }) => {

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('FOOD');
  const getDefaultDate = () => {
  const today = new Date();
  const currentYear = today.getFullYear().toString();

  // If selected year is current year → today
  if (selectedYear === currentYear) {
    return today.toISOString().split("T")[0];
  }

  // Otherwise → Jan 1 of selected year
  return `${selectedYear}-01-01`;
};

const [date, setDate] = useState(getDefaultDate());


  const handleSubmit = (e) => {
  e.preventDefault();
  if (!title || !amount) return;

  // 🔒 STRICT YEAR VALIDATION (OPTION 1)
  const expenseYear = date.split('-')[0];

  if (expenseYear !== selectedYear) {
    alert(`Please select a date within ${selectedYear}`);
    return;
  }

  onAdd({
    title,
    amount: parseFloat(amount),
    category,
    date,
    month: parseInt(date.split('-')[1], 10),
  });
};


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-extrabold text-slate-800 mb-6">
          Add Expense
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
              placeholder="e.g. Starbucks Coffee"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                Amount (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium appearance-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Date
            </label>
            <input
  type="date"
  value={date}
  min={`${selectedYear}-01-01`}
  max={`${selectedYear}-12-31`}
  onChange={(e) => setDate(e.target.value)}
  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
/>

          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
            >
              Add Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
