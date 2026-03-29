# 💰 Expense Tracker (Firebase Powered)

A full-stack expense tracking web application built using React and Firebase. This app enables users to manage their finances with real-time updates, multi-year tracking, and interactive data visualizations.

---

## 🚀 Features

* 🔐 User Authentication (Signup / Login / Logout)
* 👤 User-specific data using Firebase Firestore
* 📅 Multi-year expense tracking system
* ➕ Create and manage multiple years
* ❌ Delete past years (with protection for current year)
* 📆 Month-wise expense filtering
* 💾 Persist selected year using localStorage
* 🔄 Real-time data sync using Firestore onSnapshot

### 💰 Expense Management

* ➕ Add new transactions
* 🗑️ Delete transactions
* 💵 Automatic balance updates
* 📊 Dynamic income & expense calculations

### 📊 Analytics & Insights

* 📈 Monthly expense bar chart (click to filter)
* 🥧 Category-wise spending chart
* 📊 Summary cards (income vs expenses)
* 📉 Balance & utilization tracking

### 🎨 UI/UX Features

* 🪟 Modal-based interactions (Add Expense / Update Income)
* ⏳ Loading states for better UX
* 📱 Fully responsive design
* ⚡ Fast and smooth performance

### ⚙️ Smart Features

* 🔄 Auto-switch to new year when calendar changes
* 📂 Organized Firestore structure (user → year → expenses)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS

### Backend (BaaS)

* Firebase Authentication
* Firebase Firestore

---



## ⚙️ Environment Variables

Create a `.env` file in the root directory:

VITE_FIREBASE_API_KEY=your_api_key

VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com

VITE_FIREBASE_PROJECT_ID=your_project_id

VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com

VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id

VITE_FIREBASE_APP_ID=your_app_id

---

## 🔥 Firebase Setup

1. Create a Firebase project
2. Enable Authentication (Email/Password)
3. Set up Firestore Database
4. Add config values to `.env`

---

## 💻 Installation & Setup

### 1. Clone the repository

git clone https://github.com/rachitgupta05/expense-tracker.git

cd expense-tracker

### 2. Install dependencies

npm install

### 3. Run the project

npm run dev

---

## 🧠 How It Works

1. User logs in using Firebase Authentication
2. Each user has isolated data in Firestore
3. Expenses are stored under year-based collections
4. Data updates in real-time using listeners
5. Charts and summaries update dynamically

---

## 📸 Screenshots

<img width="1478" height="734" alt="image" src="https://github.com/user-attachments/assets/164af270-be4d-45b2-a1a0-a6b1d73f50dc" />
<img width="1449" height="659" alt="image" src="https://github.com/user-attachments/assets/36ba355b-141b-492e-8a9a-0240fd684fda" />
<img width="1432" height="526" alt="image" src="https://github.com/user-attachments/assets/07876698-a2f7-454b-882b-d48e76efc7c8" />


---

## 🌍 Deployment

* Firebase Hosting

---

## 📌 Future Improvements

* 📊 Advanced analytics (charts & insights)
* 📂 Category-based filtering improvements
* 🌙 Dark mode
* 📥 Export data (CSV/PDF)

---

## 👨‍💻 Author

**Rachit Gupta**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
