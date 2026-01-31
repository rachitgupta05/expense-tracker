import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

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

const SpendingChart = ({ expenses, title = 'Category Breakdown' }) => {
  // Aggregate data by category
  const dataMap = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const chartData = Object.entries(dataMap).map(([name, value]) => ({
    name,
    value,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-xl">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">
            {payload[0].name}
          </p>
          <p className="text-lg font-bold text-slate-800">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Spending Mix</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            {title}
          </p>
        </div>
        <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
          {expenses.length > 0 ? 'Monthly Data' : 'No Data'}
        </span>
      </div>

      <div className="h-[300px] w-full mt-4">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={8}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CATEGORY_COLORS[entry.name] || '#cbd5e1'}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#64748b',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
            <i className="fa-solid fa-chart-pie text-4xl opacity-20"></i>
            <p className="text-sm font-medium">
              No expenses recorded for this selection
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpendingChart;
