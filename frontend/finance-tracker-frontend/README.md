# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
/*

Act as a senior frontend UI/UX engineer.

I have a finance dashboard built with React + Tailwind CSS.
Current layout includes:
- Sidebar (dark)
- Top 4 stat cards (Total Balance, Total Income, Total Expense, Savings)
- Income vs Expense bar chart
- Expense breakdown donut chart
- Loan summary section

The current design looks like a basic college project.
I want to transform it into a modern SaaS-level dashboard (like Stripe, Notion, Linear, or modern fintech apps).

Requirements:

1️⃣ Improve Stat Cards
- Add clean icons (Lucide React)
- Add subtle gradient backgrounds
- Add trend indicators (↑ +12%, ↓ -8%)
- Add subtext (e.g., "vs last month")
- Make Total Balance visually dominant
- Make Savings green if positive, red only if negative
- Improve typography hierarchy

2️⃣ Improve Chart Section
- Add proper empty state handling (if income = 0 show placeholder message)
- Improve spacing and card styling
- Add month filter dropdown (This Month / Last 3 Months / This Year)
- Add legend styling improvements
- Make charts look premium

3️⃣ Improve Donut Chart
- Show category legend with percentage
- Add hover tooltip styling
- Improve center text styling

4️⃣ Layout Improvements
- Improve padding consistency
- Add subtle card shadows
- Use rounded-xl or rounded-2xl
- Improve background contrast
- Make spacing more balanced
- Improve responsiveness

5️⃣ UX Improvements
- Add hover states
- Smooth transitions (transition-all duration-200)
- Proper loading skeleton
- Better empty states

6️⃣ Keep it:
- Clean
- Minimal
- Professional
- Not over-designed
- Production-ready

Provide:
- Updated React + Tailwind JSX code
- Clean reusable StatCard component
- Clean Dashboard layout structure
- Maintainability and scalability in mind

Do NOT overcomplicate.
Focus on premium SaaS aesthetic.*