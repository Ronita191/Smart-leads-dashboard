# 📊 Smart Leads Dashboard

A modern full-stack **Lead Management Dashboard** built using **React, TypeScript, Node.js, and Express**. The application helps users efficiently manage and track leads through a clean, responsive, and user-friendly dashboard interface.

---

## 🚀 Features

* 🔐 User Authentication System
* 📋 Add, Update, Delete, and Manage Leads
* 🔎 Search and Filter Leads
* 📊 Interactive Dashboard UI
* 🌙 Responsive Design with Dark Mode
* ⚡ Fast Frontend powered by Vite
* 📱 Mobile-Friendly Layout
* 🔗 Frontend and Backend API Integration

---

## 🛠️ Tech Stack

### Frontend

* React.js
* TypeScript
* Vite
* HTML5
* CSS3
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript

### Tools & Platforms

* Git & GitHub
* VS Code
* GitHub Desktop

---

## 📂 Project Structure

```bash
Smart-leads-dashboard/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   ├── package.json
│   └── .env (not tracked by Git)
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ronita191/Smart-leads-dashboard.git
cd Smart-leads-dashboard
```

### 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

### 3️⃣ Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## ▶️ Running the Application

### Start the Backend Server

```bash
cd server
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

### Start the Frontend

Open a new terminal:

```bash
cd client
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

> Note: The `.env` file is excluded from Git using `.gitignore` to keep sensitive information secure.

---

## 📈 Future Improvements

* 🗄️ Database Integration Enhancements
* 📧 Email Notifications
* 📊 Advanced Analytics Dashboard
* ☁️ Cloud Deployment
* 👥 Role-Based Access Control
* 📌 Lead Status Tracking and Reporting

---

## 👨‍💻 Author

**Ronita Ekka**

* GitHub: https://github.com/Ronita191
