<div align="center">
  
# 🎭 The Agency — AI Agent Specialists

**A curated directory of expertly crafted AI agent personalities, ready to deploy in Claude, Copilot, Cursor, or any AI tool.**

<br />

[![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge&color=22c55e)](#)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&color=3b82f6)](LICENSE)
[![Next.js](https://img.shields.io/badge/Built_with-Next.js-black?style=for-the-badge&logo=next.js)](#)

[Live Demo](#) · [Report Bug](https://github.com/sourcecodeRTX/agency-platform/issues) · [Request Feature](https://github.com/sourcecodeRTX/agency-platform/issues)

</div>

---

## 🚀 About The Project

**The Agency** is a modern, beautifully designed platform built to centralize high-quality AI personas and prompts. Instead of hunting through messy text files or generic prompt libraries, use The Agency to find domain-expert agents.

### ✨ Key Features:
- ⚡ **Lightning Fast Search** with Fuse.js matching.
- 🎯 **Advanced Filtering** by domains (Engineering, Marketing, Strategy, etc).
- 📋 **One-Click Copy** and download modal for any agent.
- 🌓 **Dark & Light Mode** support out-of-the-box.
- 🎨 **Minimal & Modern UI** built with Tailwind CSS & Framer Motion.

---

## 💻 Tech Stack

| Technology | Description |
| :--- | :--- |
| <img src="https://skillicons.dev/icons?i=nextjs,react" height="40" /> | **Next.js 14 & React 18** (App Router, Server Components) |
| <img src="https://skillicons.dev/icons?i=tailwind" height="40" /> | **Tailwind CSS** (Styling & Responsive Design) |
| <img src="https://skillicons.dev/icons?i=typescript" height="40" /> | **TypeScript** (Static Typing & Type-Safety) |
| 🌊 | **Framer Motion** (Smooth Animations & Transitions) |
| 🔍 | **Fuse.js** (Client-side Fuzzy Searching) |
| 📝 | **Marked.js** (Markdown Parsing for Prompts) |

---

## 🔄 Project Workflow

How it works behind the scenes and for the end-user:

1. **Agent Content Creation:** All agent prompts are stored as Markdown files in the /content folder.
2. **Build Step:** The uild-agent-data.js script converts .md files into an optimized JSON index during the build process.
3. **End-User Flow:**
   - **Browse:** Users land on the dashboard, viewing categories and popular agents.
   - **Search:** Users type in the search bar.
   - **Interact:** Clicking an agent opens a modal detailing instructions.
   - **Copy:** A single click copies the robust markdown prompt to the clipboard.
   - **Deploy:** Paste directly into ChatGPT, Claude, GitHub Copilot, or Cursor.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** as the package manager

### Installation

1. **Clone the repository:**
   `ash
   git clone https://github.com/sourcecodeRTX/agency-platform.git
   cd agency-platform
   `

2. **Install dependencies:**
   `ash
   pnpm install
   `

3. **Start the development server:**
   `ash
   pnpm dev
   `

4. **Open your browser:** Navigate to http://localhost:3000.

---

## 📦 Build & Production

For production builds, the project automatically runs a pre-build script to compile markdown files into structured JSON for the frontend to consume.

`ash
# Build the application
pnpm build

# Start production server
pnpm start
`

*Note: The project is Vercel-ready. The \.gitignore\ is properly configured to exclude \
ode_modules\, \.next\, etc. Push to your main branch, and Vercel will auto-deploy it.*

---

## 🤝 Contributing

We welcome community contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to get started on adding your own agent personas or enhancing the platform.

---

## 📜 License

Distributed under the MIT License. See \LICENSE\ for more information.

<div align="center">
  <p>Made with ❤️ by the open-source community</p>
</div>
