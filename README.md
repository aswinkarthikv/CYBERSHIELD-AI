<div align="center">

# 🛡️ CYBERSHIELD AI

### **AI-Powered Cybersecurity Threat Intelligence Platform**

[![Built with React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Powered by Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

<br />

<p align="center">
  <strong>Detect. Explain. Protect.</strong>
  <br />
  <em>Enterprise-grade AI threat detection, phishing analysis, and real-time security intelligence — powered by Google Gemini.</em>
</p>

<br />

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

</div>

<br />

## ⚡ What is CyberShield AI?

**CyberShield AI** is a next-generation cybersecurity platform that leverages **Google Gemini AI** to provide real-time threat detection, intelligent phishing analysis, and comprehensive security monitoring. Built for security professionals, IT teams, and organizations who demand enterprise-grade protection with AI-driven insights.

> 🧠 Unlike traditional rule-based scanners, CyberShield AI uses **large language models** to understand, explain, and contextualize threats in natural language — making cybersecurity accessible to everyone.

<br />

## 🚀 Features

<table>
<tr>
<td width="50%">

### 🔍 AI Threat Scanner
Analyze **URLs, emails, QR codes, files, and screenshots** for phishing, malware, and social engineering attacks. Get detailed AI-generated threat breakdowns with risk scores and remediation steps.

### 🤖 AI Security Copilot
An intelligent assistant powered by **Google Gemini** that answers security questions, provides incident response guidance, and educates users about emerging threats in real-time.

### 📊 Real-Time Dashboard
Live security metrics, threat trend charts, scan history analytics, and system health monitoring — all in a stunning dark/light themed interface.

</td>
<td width="50%">

### 🚨 Emergency Response Playbooks
Step-by-step incident response workflows for common security scenarios — credential compromise, ransomware, data breach, and more. Toggle steps as you execute them.

### 🧪 Security Training Simulator
Interactive phishing detection training modules with real-world scenarios. Test your team's ability to identify spoofed emails, fake login pages, and malicious QR codes.

### 🔌 Browser Extension Simulator
A built-in Chrome extension simulation that demonstrates real-time URL scanning and threat detection as users browse the web.

</td>
</tr>
</table>

### Additional Capabilities

| Feature | Description |
|---|---|
| 🌓 **Dark / Light Theme** | Seamless theme toggle with system preference persistence |
| 📱 **Fully Responsive** | Optimized for desktop, tablet, and mobile devices |
| 📈 **Threat Analytics** | Visual charts for scan trends, risk distributions, and threat categories |
| 🔐 **API Key Management** | Secure credential configuration with masked input display |
| 🔔 **Smart Notifications** | Real-time alerts for blocked phishing attempts and security events |
| ⚡ **Quick Posture Sweep** | One-click security health check across all digital endpoints |

<br />

## 🏁 Quick Start

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Google Gemini API Key** — [Get one free from Google AI Studio](https://aistudio.google.com/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/aswinkarthikv/CYBERSHIELD-AI.git
cd CYBERSHIELD-AI

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# 4. Start the development server
npm run dev
```

The app will be running at **`http://localhost:3000`** 🎉

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ | Your Google Gemini API key for AI-powered analysis |
| `APP_URL` | ❌ | Application URL (defaults to `http://localhost:3000`) |

<br />

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (React)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │Dashboard │  │AI Copilot│  │ Scanner  │  │  Reports   │  │
│  │   View   │  │   View   │  │  View    │  │   View     │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────┬──────┘  │
│       │              │             │               │        │
│  ┌────┴──────────────┴─────────────┴───────────────┴─────┐  │
│  │              React Context + State Management         │  │
│  │          (SecurityContext, ThemeContext)                │  │
│  └───────────────────────┬───────────────────────────────┘  │
└──────────────────────────┼──────────────────────────────────┘
                           │ API Calls
┌──────────────────────────┼──────────────────────────────────┐
│                    SERVER (Express + TSX)                    │
│  ┌───────────────────────┴───────────────────────────────┐  │
│  │                   Express Server                       │  │
│  │              (Vite Dev Middleware + API)                │  │
│  └───────────────────────┬───────────────────────────────┘  │
│                          │                                  │
│  ┌───────────────────────┴───────────────────────────────┐  │
│  │              Google Gemini AI SDK                      │  │
│  │         (Threat Analysis, Chat, Explanations)          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

<br />

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19 + TypeScript | Component-based UI with type safety |
| **Styling** | Tailwind CSS 4 | Utility-first styling with custom design tokens |
| **Animations** | Motion (Framer Motion) | Smooth page transitions & micro-interactions |
| **Charts** | Recharts | Data visualization for threat analytics |
| **Icons** | Lucide React | Beautiful, consistent icon system |
| **AI Engine** | Google Gemini SDK | Natural language threat analysis & chat |
| **Server** | Express.js | API proxy & SSR middleware |
| **Build Tool** | Vite 6 | Lightning-fast HMR & optimized builds |
| **Runtime** | TSX | Direct TypeScript execution for server |

</div>

<br />

## 📁 Project Structure

```
CYBERSHIELD-AI/
├── src/
│   ├── components/
│   │   ├── views/               # Page-level view components
│   │   │   ├── DashboardView    # Security metrics & overview
│   │   │   ├── CopilotView      # AI chat assistant
│   │   │   ├── AnalyzerView     # Threat scanner interface
│   │   │   ├── ReportsView      # Analytics & reports
│   │   │   ├── HistoryView      # Scan history log
│   │   │   ├── SettingsView     # App configuration
│   │   │   ├── EmergencyView    # Incident response playbooks
│   │   │   ├── SimulatorView    # Phishing training modules
│   │   │   ├── HealthView       # System health monitor
│   │   │   └── AboutView        # Product information
│   │   ├── CyberCard.tsx        # Reusable glassmorphic card
│   │   ├── CyberBadge.tsx       # Status badge component
│   │   ├── CyberTerminal.tsx    # Animated terminal output
│   │   ├── ExtensionSimulator   # Browser extension demo
│   │   └── ScanLineOverlay      # Scan animation effect
│   ├── context/
│   │   ├── SecurityContext.tsx   # Security state management
│   │   └── ThemeContext.tsx      # Dark/Light theme provider
│   ├── data.ts                  # Mock data & training scenarios
│   ├── types.ts                 # TypeScript type definitions
│   ├── App.tsx                  # Root application component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles & theme overrides
├── server.ts                    # Express server + Gemini API integration
├── index.html                   # HTML entry point
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies & scripts
```

<br />

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR on port 3000 |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Run production server |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Type-check with TypeScript compiler |
| `npm run clean` | Remove build artifacts |

<br />

## 🤝 Contributing

Contributions are welcome! Whether it's bug fixes, new features, or documentation improvements — every contribution matters.

```bash
# Fork the repository
# Create your feature branch
git checkout -b feature/amazing-feature

# Commit your changes
git commit -m "feat: add amazing feature"

# Push to the branch
git push origin feature/amazing-feature

# Open a Pull Request
```

<br />

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<br />

---

<div align="center">

### 💻 Built with ❤️ by **Aswin Karthik Vijayakumar**

<br />

**⭐ Star this repository if CyberShield AI helped you! ⭐**

<br />

<sub>Powered by Google Gemini AI • React 19 • TypeScript • Tailwind CSS</sub>

</div>
