# 🧠 Figmenta Brain

**Enterprise AI Copilot with Admin‑Controlled Intelligence & RAG**

Figmenta Brain is a production‑grade AI system that reviews product requirements, detects ambiguity, and enforces organizational standards — **centrally governed via an Admin Console** and deployed through a **secure Next.js App Router architecture**.

This project treats AI like **infrastructure**, not a demo.

---

## ✨ Why This Project Exists

Most AI copilots fail in production because:

* Prompts are hardcoded and scattered
* Behavior changes unpredictably
* Hallucinations go undetected
* Knowledge updates silently break logic

**Figmenta Brain solves this with governance.**

It introduces a clear separation between **policy (instructions)** and **execution (models)**, enabling:

* Centralized control
* Consistent behavior
* Observable reasoning
* Safe knowledge ingestion

---

## 🏗️ Architecture Overview

<img width="886" height="648" alt="image" src="https://github.com/user-attachments/assets/824957e9-18f6-45e8-8e07-03c2bc69d2b7" />   <img width="3111" height="2625" alt="Untitled diagram-2026-01-14-062907" src="https://github.com/user-attachments/assets/16d3bafc-8b26-4dbf-839a-45caceb84e11" />


**Key principle:**

> The AI never runs without governance.

---

## 🧩 Core Components

### 1️⃣ Admin Console (`/admin`)

A centralized governance UI for controlling AI behavior in real time.

**Capabilities**

* Edit system instructions without redeploys
* Enforce organization‑wide AI behavior
* Act as the single source of truth for prompts

**Why this matters**
In real companies, **prompts are policy, not code**. Hardcoding them leads to risk, drift, and inconsistency.

The Admin Console is designed like an internal **Stripe / Linear‑style tool** — clean, focused, and powerful.

---

### 2️⃣ AI Chat Engine

Built using **Next.js App Router**, the AI engine composes every response from:

1. **Admin‑defined system instructions**
2. **Conversation summary** (context compression)
3. **Relevant document context** (RAG)

This ensures:

* Predictable behavior
* Minimal token waste
* Zero prompt leakage

---

### 3️⃣ RAG (Retrieval Augmented Generation)

The system supports controlled knowledge ingestion via PDFs (PRDs, specs, internal docs).

**Ingestion pipeline**

* PDF upload
* Intelligent chunking
* Embedding generation
* Storage in Supabase using `pgvector`

**Query flow**

* User prompt triggers semantic search
* Only **relevant chunks** are injected
* No full‑document stuffing

**Result**

* No hallucinated features
* No outdated assumptions
* Grounded, auditable answers

---

### 4️⃣ AI Explainability Layer (Advanced)

Each AI response internally tracks:

* Assumptions made
* Missing or unclear information
* Confidence level
* Risk classification

This enables future features like:

* “Why did the AI say this?”
* “What is uncertain here?”
* AI decision audits

> Transparency is a first‑class feature, not an afterthought.

---

## 🎯 Primary Use Case

### Enterprise‑Realistic AI Product Requirement Reviewer

**Input**

* Feature description (text)
* PRD (PDF upload)

**Output**

* Missing requirements
* Ambiguities
* Edge cases
* Risk flags
* Clarifying questions

This mirrors how **senior engineers and PMs** actually review specs — not how demos pretend they do.

---

## 🧠 Design Philosophy

### ✅ AI Governance > AI Power

The system prioritizes:

* Control
* Reliability
* Observability

Over raw model capability.

---

### ✅ Lean MVP, Strong Foundations

Instead of feature sprawl:

* One core workflow
* Executed cleanly
* Production‑ready by default

---

## 🛠️ Tech Stack

| Layer     | Technology                       |
| --------- | -------------------------------- |
| Frontend  | Next.js (App Router), TypeScript |
| Styling   | Tailwind CSS                     |
| Backend   | Next.js API Routes               |
| AI        | OpenAI‑compatible SDK            |
| Database  | Supabase                         |
| Vector DB | pgvector                         |
| Auth      | Supabase Auth (extensible)       |

---

## 📁 Folder Structure

```
figmenta-brain/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Dashboard
│   │   ├── admin/
│   │   │   └── page.tsx          # Admin Dashboard
│   │   ├── api/
│   │   │   ├── chat/route.ts     # AI Chat API
│   │   │   ├── pdf/route.ts      # PDF upload & RAG
│   │   │   └── tasks/route.ts    # Tasks CRUD
│   │
│   ├── components/
│   │   ├── ChatBox.tsx
│   │   ├── TaskBoard.tsx
│   │   ├── TaskCard.tsx
│   │   ├── PDFUploader.tsx
│   │   ├── Navbar.tsx
│   │   ├── DarkModeToggle.tsx
│   │   └── Charts.tsx
│   │
│   ├── lib/
│   │   ├── supabaseClient.ts
│   │   ├── aiClient.ts
│   │   └── pdfRag.ts
│   │
│   ├── hooks/
│   │   ├── useChat.ts
│   │   ├── useTasks.ts
│   │   └── useDarkMode.ts
│
├── public/
├── bot/
├── .env.local
├── package.json
└── README.md

```

Each layer has **one responsibility** — no cross‑contamination.

---

## 🔐 Reliability & Production Considerations

* Prompt source of truth: **Database**
* Stateless API routes
* Model‑agnostic (OpenAI / Claude / Gemini compatible)
* Easy rate‑limiting extension
* Clean failure states (no silent errors)

---

## 🚀 Local Development

```bash
git clone https://github.com/manojpm181/figmenta-brain.git
cd figmenta-brain
npm install
npm run dev
```

Create `.env.local`:

```env
OPENAI_API_KEY=your_key
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
ADMIN_PASSWORD=password


```

---

## 🧠 What Makes This Different

Most projects show:

* UI
* Chat
* Buzzwords

This project shows:

* Judgment
* Architecture
* Production thinking

**This is how real AI systems are built inside companies.**

<img width="1919" height="920" alt="Screenshot 2026-01-14 120907" src="https://github.com/user-attachments/assets/6300740f-f14a-4fad-8fb0-2b01b39493c6" />
<img width="1905" height="908" alt="Screenshot 2026-01-14 120917" src="https://github.com/user-attachments/assets/1d7cebe6-64b5-4bba-b4b3-84b87da915ba" />

<img width="1908" height="979" alt="Screenshot 2026-01-14 121342" src="https://github.com/user-attachments/assets/5fe7d069-8c74-487e-a7a2-7481fab3a5c5" />

---

## 📈 Future Extensions (Intentional, Not Implemented)

* Discord / Slack bot
* Role‑based prompt access
* Versioned system instructions
* Prompt diff & rollback
* AI response audits

---

## 👨‍💻 Author 
Manoj P M | manojpoojari15112gmail.com

Software Engineer | Full-Stack (AI + Web)
