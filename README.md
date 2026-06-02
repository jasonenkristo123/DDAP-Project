# 📌 GEULIST — Daily Discipline Action Planner (DDAP)

GEULIST is a modern, professional, and visually striking **Neobrutalist Daily Discipline & Action Planner (DDAP)** application. Designed to supercharge personal productivity, it integrates task management, agile Kanban workflows, reusable template lists, and gamified achievement tracking into a sleek, unified dashboard.

---

## ✨ Features

### 📊 1. Neobrutalist Dashboard
* **Pinned Todos**: Pin your most critical tasks to keep them front and center.
* **Productivity Trends**: Visualized monthly contribution chart showing todo creation frequency powered by `Chart.js`.
* **Activity Stream**: Timeline detailing todos created vs completed within the current month.

### 📋 2. Advanced Todo Management (CRUD)
* Full creation, retrieval, updating, and deletion of todos.
* Prioritization (High, Medium, Low) and categorization.
* Dynamic sorting, filtering, and real-time search support.
* Due date tracking and countdowns.

### 🗂️ 3. Kanban Board
* Visual workspace to track workflows using ToDo, InProgress, and Done columns.
* Simple status transitions for agile task flow management.

### 📑 4. Quick-Start Templates
* Reusable goal templates to spin up recurring task lists (e.g., Morning Routines, Study Schedules) in a single click.
* Easy creation of customized personal templates.

### 🏆 5. Gamification & Achievements
* Trackable trophies and milestone achievements.
* Difficulty tiers for achievements to gamify daily productivity and maintain user momentum.

### 👤 6. Customizable User Profile
* Collapsible sidebar profile settings.
* Manage profile photo, display name, pronouns, bio, and social links (LinkedIn, Instagram).

---

## 🛠️ Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with a custom Warm Neobrutalist Design System
* **Data Fetching & State**: [Axios](https://axios-http.com/) & [TanStack React Query](https://tanstack.com/query/latest)
* **Charts**: [Chart.js](https://www.chartjs.org/) & [React Chartjs 2](https://react-chartjs-2.js.org/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Code Quality**: [Biome](https://biomejs.dev/) (Linter & Formatter)

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v18.x or later)
* npm, yarn, pnpm, or bun

### ⚙️ Installation & Configuration

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jasonenkristo123/DDAP-Project.git
   cd DDAP-Project
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file in the root directory and specify the URL of your backend API service:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3001
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

5. **Linting and Formatting**
   Keep the codebase clean using Biome:
   ```bash
   npm run lint     # Runs Biome linting checks
   npm run format   # Auto-formats files
   ```

---

## 📂 Project Structure

```text
ddap-todolist/
├── public/                 # Static assets (fonts, icons, images)
├── src/
│   ├── app/                # Next.js App Router (pages and global styles)
│   │   ├── achievements/   # Achievements page
│   │   ├── kanban/         # Kanban board page
│   │   ├── templates/      # Goal templates page
│   │   ├── todos/          # Todos management page
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Shared & Page components
│   │   ├── achievements/   # Achievements sub-components
│   │   ├── api/            # API integration modules (Axios requests)
│   │   ├── dashboard/      # Dashboard page UI modules
│   │   ├── kanban/         # Kanban page UI modules
│   │   ├── shared/         # Reusable layouts, Navbar, Footer, Modal & Profile components
│   │   └── Todos/          # Todo list & Todo item components
│   └── lib/
│       └── axios.ts        # Axios client instance configuration
├── .env.local              # Local environment config
├── biome.json              # Biome linting/formatting rules
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies & scripts
└── tsconfig.json           # TypeScript configuration
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests to help improve the project.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
