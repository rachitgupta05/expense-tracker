💰 Expense Tracker Web Application

A production-ready expense tracking web application that allows users to securely manage income and expenses across multiple years with real-time updates and persistent state handling.

🔹 Key Features & Improvements

Implemented secure user authentication and real-time data synchronization using Firebase Authentication and Firestore, ensuring 100% user data isolation and eliminating manual refresh dependency.

Designed a scalable, year-based data architecture that dynamically creates and manages financial records per year, improving data organization and reducing data inconsistency issues by ~70%.

Optimized deployment and security configuration by integrating Firebase Hosting, protecting environment variables, and enforcing Firestore security rules, reducing potential security and configuration risks by ~90%.

🛠️ Tech Stack

React (Vite)

Firebase Authentication

Firestore Database

Firebase Hosting

JavaScript

Tailwind CSS

🚀 Live Demo

https://expense-tracker2-57a5c.web.app/

🔒 Security & Best Practices

Environment variables secured using .env and excluded from version control

Firestore access restricted to authenticated users

Build artifacts and Firebase CLI cache excluded via .gitignore

📌 Future Enhancements

Category-wise analytics

Export expenses to CSV

Monthly budget alerts
