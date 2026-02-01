import React, { useState, useMemo, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';

import Header from './components/Header';
import BalanceCard from './components/BalanceCard';
import SummaryCards from './components/SummaryCards';
import SpendingChart from './components/SpendingChart';
import MonthlyBarChart from './components/MonthlyBarChart';
import ExpenseList from './components/ExpenseList';
import AddExpenseModal from './components/AddExpenseModal';
import UpdateIncomeModal from './components/UpdateIncomeModal';
import Auth from './components/Auth';
import { auth, db } from './firebase';

const CURRENT_YEAR = new Date().getFullYear().toString();


function App() {
  const [loadingExpenses, setLoadingExpenses] = useState(true);
  const [availableYears, setAvailableYears] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);



  // 🔐 AUTH STATE
  const [user, setUser] = useState(null);

  // 📅 FILTER STATE
  const [selectedYear, setSelectedYear] = useState(() => {
  return (
    localStorage.getItem("selectedYear") ||
    new Date().getFullYear().toString()
  );
});


  const [selectedMonth, setSelectedMonth] = useState(null);

  // 📊 DATA STATE
  const [expenses, setExpenses] = useState([]);
  const [yearlyIncome, setYearlyIncome] = useState(0);

  // 🪟 MODALS
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  

  useEffect(() => {
  if (selectedYear) {
    localStorage.setItem("selectedYear", selectedYear);
  }
}, [selectedYear]);

  // 🔐 AUTH LISTENER
  useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (u) => {
    if (u) {
      // optional: email verification check here

      setUser({
        uid: u.uid,
        email: u.email,
        name: u.email.split("@")[0], // or Firestore name
      });
    } else {
      setUser(null);
    }

    // 🔥 AUTH CHECK COMPLETED
    setAuthLoading(false);
  });

  return () => unsub();
}, []);




  useEffect(() => {
  if (!user) return;

  const loadYears = async () => {
    const yearsRef = collection(db, 'users', user.uid, 'years');
    const snap = await getDocs(yearsRef);

    let years = snap.docs.map(d => d.id);

    // 🔥 NEW USER CASE
    if (years.length === 0) {
      const currentYear = new Date().getFullYear().toString();

      await setDoc(doc(db, 'users', user.uid, 'years', currentYear), {
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        year: currentYear,
        createdAt: serverTimestamp(),
      });

      years = [currentYear];
      setSelectedYear(currentYear);
    }

    const sortedYears = years.sort((a, b) => b.localeCompare(a));
setAvailableYears(sortedYears);

// 🔒 Ensure selectedYear is valid
if (!sortedYears.includes(selectedYear)) {
  setSelectedYear(sortedYears[0]);
}

  };

  loadYears();
}, [user]);


  // 🧾 FETCH YEAR DATA + EXPENSES
  useEffect(() => {
  if (!user) return;

  setLoadingExpenses(true); // 👈 START LOADING

  const yearRef = doc(db, 'users', user.uid, 'years', selectedYear);

  const initYear = async () => {
    const snap = await getDoc(yearRef);
    if (!snap.exists()) {
      await setDoc(yearRef, {
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  year: selectedYear, // 👈 IMPORTANT
  createdAt: serverTimestamp(),
});

      setYearlyIncome(0);
    } else {
      setYearlyIncome(snap.data().totalIncome || 0);
    }
  };

  initYear();

  const expensesRef = collection(
    db,
    'users',
    user.uid,
    'years',
    selectedYear,
    'expenses'
  );

  const unsubscribe = onSnapshot(expensesRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setExpenses(data);
    setLoadingExpenses(false); // 👈 DATA READY
  });

  return () => unsubscribe();
}, [user, selectedYear]);


  // 📆 FILTER EXPENSES
  const activeFilteredExpenses = useMemo(() => {
    return expenses.filter((exp) => {
      const [year, month] = exp.date.split('-');
      const yearMatch = year === selectedYear;
      const monthMatch =
        selectedMonth === null || parseInt(month, 10) - 1 === selectedMonth;
      return yearMatch && monthMatch;
    });
  }, [expenses, selectedYear, selectedMonth]);

  // 💰 CALCULATIONS
  const totalSpentInPeriod = useMemo(
    () => activeFilteredExpenses.reduce((sum, e) => sum + e.amount, 0),
    [activeFilteredExpenses]
  );

  const periodIncome = useMemo(() => {
  if (!yearlyIncome) return 0;
  return selectedMonth === null
    ? yearlyIncome * 12
    : yearlyIncome;
}, [yearlyIncome, selectedMonth]);


  const currentBalance = periodIncome - totalSpentInPeriod;
  const utilization =
    periodIncome > 0 ? (totalSpentInPeriod / periodIncome) * 100 : 0;

 
const handleDeleteYear = async () => {
  // ❌ Block deleting current year
  if (selectedYear === CURRENT_YEAR) {
    alert("You cannot delete the current year");
    return;
  }

  const confirmDelete = window.confirm(
    `Are you sure you want to delete year ${selectedYear}?`
  );

  if (!confirmDelete) return;

  // 🔥 Reference to selected year
  const yearRef = doc(db, "users", user.uid, "years", selectedYear);

  // 🔥 Reference to expenses inside that year
  const expensesRef = collection(
    db,
    "users",
    user.uid,
    "years",
    selectedYear,
    "expenses"
  );

  // 🔥 Delete all expenses
  const snapshot = await getDocs(expensesRef);
  await Promise.all(snapshot.docs.map((d) => deleteDoc(d.ref)));

  // 🔥 Delete year document
  await deleteDoc(yearRef);

  // 🔄 Update UI state
  setAvailableYears((prev) =>
    prev.filter((year) => year !== selectedYear)
  );

  // 🔁 Switch dashboard to current year
  setSelectedYear(CURRENT_YEAR);
  setSelectedMonth(null);
};



  // ➕ ADD EXPENSE (🔥 backend + UI)
  const handleAddExpense = async (newExpense) => {
    const expRef = collection(
      db,
      'users',
      user.uid,
      'years',
      selectedYear,
      'expenses'
    );

    const docRef = await addDoc(expRef, {
      ...newExpense,
      month: newExpense.month,
      createdAt: serverTimestamp(),
    });

    await updateDoc(
      doc(db, 'users', user.uid, 'years', selectedYear),
      {
        totalExpense: increment(newExpense.amount),
        balance: increment(-newExpense.amount),
      }
    );

    

    setIsExpenseModalOpen(false);
  };

  // ❌ DELETE EXPENSE (🔥 backend + UI)
  const handleDeleteExpense = async (id, amount) => {
    await deleteDoc(
      doc(db, 'users', user.uid, 'years', selectedYear, 'expenses', id)
    );

    await updateDoc(
      doc(db, 'users', user.uid, 'years', selectedYear),
      {
        totalExpense: increment(-amount),
        balance: increment(amount),
      }
    );

   
  };

  // ✏️ UPDATE INCOME
  const handleUpdateIncomeForYear = async (newIncome) => {
    await updateDoc(
      doc(db, 'users', user.uid, 'years', selectedYear),
      { totalIncome: newIncome }
    );
    setYearlyIncome(newIncome);
    setIsIncomeModalOpen(false);
  };

  // 🚪 LOGOUT
  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleMonthClick = (idx) =>
    setSelectedMonth((prev) => (prev === idx ? null : idx));

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const handleCreateNewYear = async () => {
  const input = prompt("Enter year (e.g. 2027)");
  if (!input) return;

  const newYear = input.trim();
  if (!/^\d{4}$/.test(newYear)) {
    alert("Invalid year");
    return;
  }

  await setDoc(
    doc(db, 'users', user.uid, 'years', newYear),
    {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
      year: newYear,
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );

  setAvailableYears(prev =>
    prev.includes(newYear)
      ? prev
      : [...prev, newYear].sort((a, b) => b.localeCompare(a))
  );

  setSelectedYear(newYear);
  setSelectedMonth(null);
};


  if (authLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-400 font-medium">
      Loading...
    </div>
  );
}

if (!user) return <Auth />;


  return (
    <div className="min-h-screen pb-20 bg-slate-50/50">
      <Header totalSpent={totalSpentInPeriod} onLogout={handleLogout} />

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-6">
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h2 className="text-2xl font-bold text-slate-800">
        Hi, {user.name}!
      </h2>
      <p className="text-slate-400 font-medium text-sm flex items-center gap-2">
        <i className="fa-solid fa-calendar-check text-indigo-500 text-xs"></i>
        Viewing{' '}
        {selectedMonth !== null
          ? `${months[selectedMonth]} ${selectedYear}`
          : `Full Year ${selectedYear}`}
      </p>
    </div>

    <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2 mr-2">
        Select Year:
      </span>
      <select
        value={selectedYear}
        onChange={(e) => {
  if (e.target.value === "__ADD_NEW_YEAR__") {
    handleCreateNewYear();
    return;
  }
  setSelectedYear(e.target.value);
  setSelectedMonth(null);
}}

        className="bg-slate-50 rounded-xl px-4 py-1.5 text-sm font-bold text-indigo-600 focus:ring-2 focus:ring-indigo-500 outline-none"
      >
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
        <option value="__ADD_NEW_YEAR__">➕ Add new year</option>

      </select>
       <button
    onClick={handleDeleteYear}
    disabled={selectedYear === CURRENT_YEAR}
    className={`px-4 py-2 rounded-xl text-sm font-bold
      ${
        selectedYear === CURRENT_YEAR
          ? "bg-slate-200 text-slate-400 cursor-not-allowed"
          : "bg-red-500 text-white hover:bg-red-600"
      }`}
  >
    Delete Year
  </button>
    </div>
  </div>

  <BalanceCard balance={currentBalance} utilization={utilization} />

  <SummaryCards
    income={periodIncome}
    totalExpense={totalSpentInPeriod}
    onUpdateIncome={() => setIsIncomeModalOpen(true)}
    isYearly={selectedMonth === null}
  />

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <MonthlyBarChart
      expenses={expenses}
      year={selectedYear}
      selectedMonth={selectedMonth}
      onMonthClick={handleMonthClick}
    />
    <SpendingChart
      expenses={activeFilteredExpenses}
      title={
        selectedMonth !== null
          ? `Categories for ${months[selectedMonth]}`
          : `Categories for ${selectedYear}`
      }
    />
  </div>

  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h3 className="text-xl font-bold text-slate-800">
          Transactions
        </h3>
        <p className="text-sm text-slate-400 uppercase tracking-wider">
          Showing {activeFilteredExpenses.length} entries for{' '}
          {selectedMonth !== null
            ? `${months[selectedMonth]} ${selectedYear}`
            : selectedYear}
        </p>
      </div>

      <button
        onClick={() => setIsExpenseModalOpen(true)}
        className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200"
      >
        <span className="text-lg">+</span>
        New Entry
      </button>
    </div>

   {loadingExpenses ? (
  <p className="text-center text-slate-400 font-medium py-10">
    Loading expenses…
  </p>
) : (
  <ExpenseList
    expenses={activeFilteredExpenses}
    onDelete={handleDeleteExpense}
  />
)}

  </div>
</main>


      {isExpenseModalOpen && (
  <AddExpenseModal
    selectedYear={selectedYear}
    onClose={() => setIsExpenseModalOpen(false)}
    onAdd={handleAddExpense}
  />
)}


      {isIncomeModalOpen && (
        <UpdateIncomeModal
          currentIncome={yearlyIncome}
          onClose={() => setIsIncomeModalOpen(false)}
          onUpdate={handleUpdateIncomeForYear}
        />
      )}
    </div>
  );
}

export default App;
