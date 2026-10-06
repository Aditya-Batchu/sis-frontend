# RGUKT SIS - Frontend

Modern, responsive frontend application for the **RGUKT Student Information System (SIS)**.

## 🛠 Tech Stack
- **Core**: React 18, Vite
- **State Management**: Redux Toolkit & React Redux
- **Styling**: Tailwind CSS, PostCSS, Lucide React icons
- **Data Tables**: AG-Grid Community (v31)
- **Routing & Networking**: React Router DOM (v6), Axios

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment (optional, defaults to `http://localhost:5000/api`):
   Create a `.env` file if connecting to an external backend:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```
