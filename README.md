# 🚀 Employee Management System (EMS)

A modern, responsive, client-side **Employee Management System** built with **React, Vite, Tailwind CSS, and LocalStorage**. Manage tasks, employees, and administrative workflows seamlessly without the need for an external backend or database.

---

## ✨ Features

### 👑 Admin Dashboard
- **Create Tasks:** Assign tasks to specific employees with Title, Category, Assigned Date, Deadline Date, and Description.
- **Create Users:** Add new Employees or Admins directly from the dashboard.
- **Manage Team:** View real-time task statistics for all employees (`New`, `Active`, `Completed`, `Failed`).
- **Delete Employees:** Remove employees and their corresponding task history.

### 👤 Employee Dashboard
- **Task Summary Cards:** Live counters showing **New Task**, **Accepted**, **Completed**, and **Failed** tasks.
- **Interactive Task Actions:**
  - **New Tasks:** Accept task or delete.
  - **Accepted Tasks:** Mark as *Completed*, *Failed*, or delete.
  - **Completed & Failed Tasks:** Review and manage status cards.
- **Persistent Progress:** All task updates immediately reflect in the counters and stay saved in browser storage.

### 💾 LocalStorage Powered
- Fully functional without external API or server latency.
- State persists across browser reloads and sessions.
- Automatic seeding of default Admin and Employee accounts upon first launch.

---

## 🔑 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin21@gmail.com` | `123` |
| **Employee** | `ritik21@gmail.com` | `123` |

> 💡 *You can also create new Admin or Employee accounts from the Admin Dashboard.*

---

## 🛠️ Tech Stack

- **Frontend Library:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State & Storage:** React Context API + Browser LocalStorage
- **Deployment Ready:** Netlify (`netlify.toml` + SPA redirect rules configured)

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+) installed.

### 1. Clone the repository
```bash
git clone https://github.com/ritikvarun/EMS.git
cd EMS
```

### 2. Navigate to frontend & install dependencies
```bash
cd frontend
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
The optimized production build will be generated in `frontend/dist`.

---

## 🌐 Deploy to Netlify

### Option 1: Automatic Deploy via GitHub
1. Connect your GitHub repository `ritikvarun/EMS` on [Netlify](https://app.netlify.com/).
2. Netlify will auto-detect settings from `netlify.toml`:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Click **Deploy Site**.

### Option 2: Drag & Drop Deploy
1. Run `npm run build` inside the `frontend` folder.
2. Drag and drop the `frontend/dist` directory directly onto [Netlify Drop](https://app.netlify.com/drop).

---

## 📂 Project Structure

```
EMS/
├── frontend/
│   ├── public/
│   │   ├── _redirects         # Netlify SPA redirect rules
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/          # Login component
│   │   │   ├── Dashboard/     # Admin & Employee Dashboards
│   │   │   ├── TaskList/      # Task cards (Accept, Complete, Failed, New)
│   │   │   └── other/         # Header, CreateTask, CreateUser, AllTask, etc.
│   │   ├── context/           # AuthContext provider
│   │   ├── utils/
│   │   │   └── localStorage.js # Storage engine & default seed data
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── netlify.toml               # Netlify build configuration
└── README.md
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
