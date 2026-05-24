<div align="center">
  
# 🎭 The Agency — AI Agent Specialists Directory

**A comprehensive, curated directory of expertly crafted AI agent personalities, ready to deploy in Claude, Copilot, Cursor, or any AI tool. Turn generic AI into elite domain experts.**

<br />

[![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge&color=22c55e)](#)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&color=3b82f6)](LICENSE)
[![Next.js](https://img.shields.io/badge/Built_with-Next.js-black?style=for-the-badge&logo=next.js)](#)

[Live Demo](#) · [Report Bug](https://github.com/sourcecodeRTX/agency-platform/issues) · [Request Feature](https://github.com/sourcecodeRTX/agency-platform/issues)

</div>

---

## 🚀 About The Project

**The Agency** is a modern, beautifully designed platform built to centralize high-quality AI personas and system prompts. Instead of hunting through messy text files or generic prompt libraries, use The Agency to find specialized domain-expert agents instantly. 

Why settle for a "helpful assistant" when you can converse with an **Autonomous Optimization Architect**, a **Brand Guardian**, or an **AI Data Remediation Engineer**?

### ✨ Key Features:
- ⚡ **Lightning Fast Search** via Fuse.js for fuzzy-finding capabilities.
- 🎯 **Deep Interactivity**: Modal previews, prompt inspections, and one-click copying.
- 🌓 **Theming**: Elegant Dark & Light Mode support out-of-the-box.
- 🎨 **Modern UI**: Polished interfaces built with Tailwind CSS & Framer Motion.
- 📄 **Markdown First**: All agents are driven entirely by rich markdown prompt files.

---

## 🧠 The Agent Ledger (Categories & Domains)

The platform is seeded with dozens of meticulously crafted agent personas across high-impact industries. Simply find the category, copy the agent's identity, and paste it into your LLM's system prompt instructions.

Here is a glimpse into the AI Workforce available on the platform:

### 💻 Engineering & Development
- **Backend Architect**: Masters of scalable, high-performance database and API design.
- **Codebase Onboarding Engineer**: Quickly map and document unfamiliar codebases.
- **DevOps Automator**: CI/CD pipeline gurus for deployment workflows.
- *Also features: Database Optimizers, CMS Developers, Code Reviewers, and AI Data Remediation Engineers.*

### 🎨 Design & Creative
- **UX Architect & Researcher**: Masters of user journeys, wireframing, and accessibility.
- **UI Designer**: Specialists in translating wireframes into high-fidelity mockups.
- **Image Prompt Engineer**: Midjourney/Stable Diffusion prompt whisperers.
- **Visual Storyteller & Brand Guardian**: Maintaining visual coherence and narrative weight.

### 📚 Academic & Research
- **UX Researcher**: Deep-dive analysis and qualitative data summarization.
- **Narratologist**: Story mechanics and structural narrative design.
- *Also features: Anthropologists, Historians, Psychologists, and general researchers.*

### 📈 Marketing, Sales & Strategy
- **Paid Media Specialist**: Ad creatives, ROI optimization, and A/B testing frameworks.
- **Product Managers**: Agile lifecycle steering, backlog grooming, and user epics.
- *Additional domains: Finance, Game Development, Spatial Computing, and Support.*

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

## 🔄 Project Workflow (How It Works)

The Agency acts as a static-site generator specifically tailored for Markdown prompts.

1. **Content Engine:** Agents live directly in the `/content/*` directory as `.md` files equipped with frontmatter (metadata) and body content (the prompt instructions).
2. **Build Optimization:** A pre-build step (`scripts/build-agent-data.js`) scans the content folder and generates structured JSON output (`agents.json`, `categories.json`, `search-index.json`).
3. **High-Performance Client:** 
   - Users land on the dashboard to browse populated categories.
   - Fuse.js reads the built index for milliseconds-fast fuzzy searching.
   - The UI presents agent cards, badges, and modals dynamically out of the optimized JSON.
4. **Deploy to IDE:** The user copies the agent string and pastes it directly into their Copilot/Cursor Rules or ChatGPT System Instructions.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **pnpm** (Package manager)

### Local Deployment
```bash
# 1. Clone the repository
git clone https://github.com/sourcecodeRTX/agency-platform.git
cd agency-platform

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev
```
Open **[http://localhost:3000](http://localhost:3000)** to view the platform locally.

---

## 📦 Build & Production

For production builds, the project automatically runs a pre-build script to compile markdown files into structured JSON for the frontend to consume.

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

---

## 🤝 Contributing & Adding Agents

We welcome you to grow The Agency! Adding an agent is exactly as easy as making a Markdown file.

1. Create a `.md` file inside the appropriate `content/<category>/` folder.
2. Add your YAML frontmatter (Name, Description, Tags, Category, etc).
3. Write your elite prompt in the body.
4. Test it (`pnpm validate:agents`).
5. Open a Pull Request!

See our full **[Contributing Guide](CONTRIBUTING.md)**.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <p>Made with ❤️ by the open-source community</p>
</div>
