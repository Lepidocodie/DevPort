<div align="center">

# 🚀 DevPortfolio

**Meticulously Designed. Thoroughly Engineered.**

A modern, highly performant personal developer portfolio built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. Designed by a former geologist applying structural logic to web interfaces.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)

</div>

---

## ✨ Overview

**DevPortfolio** is a sleek, dynamic portfolio application created to showcase professional projects, technical skills, and certifications. It features a bold, dark-themed UI enhanced with custom glassmorphism panels, fluid framer-motion animations, and highly structured data-driven content.

The portfolio is fully responsive, leveraging an advanced Next.js App Router architecture and data fetched dynamically from local configuration files (`data.json`).

---

## 🖼️ Key Features

| Feature | Description |
|---|---|
| **🎨 Technical Arsenal** | A 7-category grid system showcasing comprehensive skills across Front-end, Back-end, Cloud/DevOps, Database, and Security. |
| **💼 Featured Work** | Detailed "Case Study" views for major projects (e.g., E-commerce platforms, Learning systems) complete with tags and dual CTA links. |
| **🧪 Laboratory** | A section dedicated to mini-projects and technical experiments (e.g., Weather Dashboards, Calculators). |
| **🏅 Verified Certificates** | A centralized gallery of 15+ Google Cloud certifications functioning through an interactive Modal viewing system. |
| **✨ Fluid Animations** | Immersive entry animations, staggered layout reveals, and hover interactions powered by `framer-motion`. |
| **⚙️ Data-Driven System** | The entire content layer is decoupled into `public/data/data.json`, allowing effortless updates without touching UI components. |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Core Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) (with `tailwind-merge` & `clsx`) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) (`@radix-ui/react-slot`) |
| **Icons** | [Lucide React](https://lucide.dev/), FontAwesome, React Icons |

---

## 📁 Project Structure

```text
DevPort/
├── app/
│   ├── components/           # Reusable UI elements
│   │   ├── CertificateCard.tsx
│   │   ├── CertificateModal.tsx
│   │   ├── MiniProjectCard.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProjectCard.tsx
│   │   └── ProjectCarousel.tsx
│   ├── project/              # Dynamic project routing
│   │   └── [id]/page.tsx
│   ├── globals.css           # Global Tailwind & Custom styles
│   ├── layout.tsx            # Next.js Root Layout
│   └── page.tsx              # Main Portfolio entry page
├── public/
│   ├── data/
│   │   ├── data.json         # Master content data
│   │   └── image/            # Organized asset directory
├── lib/                      # Utilities
├── postcss.config.mjs
├── tailwind.config.ts        # Tailwind setup
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.x
- **npm** ≥ 9.x (or yarn / pnpm)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Lepidocodie/DevPort.git
cd DevPort

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Create optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint for code quality checks |

---

## ⚡ Design System Highlights

**CSS Architecture**:
- Utilizes CSS custom properties extensively in `globals.css`
- Custom `glass-panel` utilities with dynamic border shading and backdrop filters
- Distinct `btn-clean` system with neon glow hover effects

**Color Theme** (Deep Slate & Emerald):
- `--primary`: Vibrant Emerald
- `--secondary`: Electric Sky Blue
- `--background-dark`: Rich, deep slate/obsidian for high contrast

---

<div align="center">
  <sub>Built with ❤️ by Narongrit Sornjai (<a href="https://github.com/Lepidocodie">Lepidocodie</a>)</sub>
</div>
