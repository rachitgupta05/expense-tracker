import React from 'react';

// ✅ JS-safe category icons
const CATEGORY_ICONS = {
  FOOD: 'fa-utensils',
  RENT: 'fa-house',
  TRANSPORT: 'fa-car',
  ENTERTAINMENT: 'fa-film',
  SHOPPING: 'fa-bag-shopping',
  UTILITIES: 'fa-bolt',
  OTHERS: 'fa-receipt',
};

// ✅ JS-safe category colors
const CATEGORY_COLORS = {
  FOOD: '#22c55e',
  RENT: '#6366f1',
  TRANSPORT: '#f59e0b',
  ENTERTAINMENT: '#ec4899',
  SHOPPING: '#0ea5e9',
  UTILITIES: '#14b8a6',
  OTHERS: '#64748b',
};

const ExpenseList = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-slate-400 text-sm font-medium">
          Your expense list is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="group flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all"
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
              style={{
                backgroundColor:
                  CATEGORY_COLORS[expense.category] || '#64748b',
              }}
            >
              <i
                className={`fa-solid ${
                  CATEGORY_ICONS[expense.category] || 'fa-receipt'
                } text-lg`}
              ></i>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800">
                {expense.title}
              </h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {expense.category} •{' '}
                {new Date(expense.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-extrabold text-slate-900">
              -₹{expense.amount.toLocaleString('en-IN')}
            </span>
            <button
              onClick={() => onDelete(expense.id, expense.amount)}
              className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 transition-all"
            >
              <i className="fa-solid fa-trash-can text-sm"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
