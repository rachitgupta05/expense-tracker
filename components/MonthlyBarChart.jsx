import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const MonthlyBarChart = ({ expenses, year, selectedMonth, onMonthClick }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Initialize monthly data
  const monthlyData = months.map(month => ({ month, total: 0 }));

  // Populate data for the selected year (backend-safe)
  expenses.forEach(exp => {
    const expYear = exp.date?.split?.('-')?.[0];
    if (expYear === year) {
      const monthIdx =
        typeof exp.month === 'number'
          ? exp.month - 1
          : parseInt(exp.date.split('-')[1], 10) - 1;

      if (monthIdx >= 0 && monthIdx < 12) {
        monthlyData[monthIdx].total += exp.amount;
      }
    }
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-xl">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">
            {label} {year}
          </p>
          <p className="text-lg font-bold text-indigo-600">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] font-medium text-slate-400 mt-1">
            {selectedMonth === months.indexOf(label)
              ? 'Click to deselect'
              : 'Click to see breakdown'}
          </p>
        </div>
      );
    }
    return null;
  };

  const handleBarClick = (data, index) => {
    onMonthClick(index);
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Monthly Trend</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Expenses across {year}
          </p>
        </div>
        <div className="bg-indigo-50 p-2 rounded-lg">
          <i className="fa-solid fa-calendar-days text-indigo-500"></i>
        </div>
      </div>

      <div className="flex-grow h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', radius: 6 }} />
            <Bar
              dataKey="total"
              radius={[6, 6, 0, 0]}
              barSize={24}
              onClick={handleBarClick}
              className="cursor-pointer"
            >
              {monthlyData.map((entry, index) => {
                const isActive = selectedMonth === index;
                const hasValue = entry.total > 0;

                let fill = '#e2e8f0';
                if (hasValue) {
                  fill = isActive ? '#4338ca' : '#6366f1';
                } else if (isActive) {
                  fill = '#c7d2fe';
                }

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={fill}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded bg-indigo-500"></div>
          <span>Has Data</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded bg-indigo-800"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded bg-slate-200"></div>
          <span>Empty</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBarChart;
