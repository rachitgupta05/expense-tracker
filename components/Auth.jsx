import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { sendEmailVerification } from "firebase/auth";


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (isLogin) {
    // 🔐 LOGIN
    const cred = await signInWithEmailAndPassword(auth, email, password);
    onAuthSuccess(); // auth listener will handle user
  } else {
    // 🆕 SIGN UP
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // 🔥 SAVE USER PROFILE
    await setDoc(doc(db, "users", cred.user.uid), {
      name: name,
      email: email,
      createdAt: new Date(),
    });

    onAuthSuccess();
  }
};


  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-indigo-600 w-16 h-16 rounded-[22px] flex items-center justify-center shadow-2xl shadow-indigo-200 mb-4">
            <i className="fa-solid fa-indian-rupee-sign text-white text-3xl"></i>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Expense Tracker
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">
            Smart Finance Manager
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-[40px] p-10 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-indigo-700"></div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-slate-400 text-sm mb-8 font-medium">
            {isLogin
              ? 'Enter your details to manage your expenses.'
              : 'Start your journey to financial freedom today.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-4 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-4 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                  placeholder="hello@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-4 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all mt-4 transform active:scale-95"
            >
              {isLogin ? 'Login to Dashboard' : 'Create My Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm font-medium">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 font-bold hover:underline"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-400 text-[10px] mt-10 font-bold uppercase tracking-widest">
          Secure • Simple • Smart
        </p>
      </div>
    </div>
  );
};

export default Auth;
