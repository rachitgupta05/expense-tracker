import React from 'react';

const Header = ({ totalSpent, onLogout }) => {
  return (
    <header className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-white/80">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <i className="fa-solid fa-indian-rupee-sign text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 leading-none">
              Expense Tracker
            </h1>
            
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
              Spent
            </span>
            <span className="text-lg font-bold text-slate-900">
              ₹{totalSpent.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={onLogout}
            className="text-slate-400 hover:text-rose-500 transition-colors p-2 rounded-lg hover:bg-slate-50"
            title="Logout"
          >
            <i className="fa-solid fa-right-from-bracket text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
