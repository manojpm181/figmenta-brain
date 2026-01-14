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

```
┌─────────────────┐       ┌────────────────────┐
│  Admin Console  │──────▶│ System Instructions │
└─────────────────┘       └────────────────────┘
         │                          │
         │                          ▼
         │                ┌────────────────┐
         │                │   AI Engine    │
         │                │ (Chat + RAG)   │
         │                └────────────────┘
         │                          │
         ▼                          ▼
┌─────────────────┐       ┌────────────────────┐
│  PDF / PRDs     │──────▶│ Vector Search (RAG) │
└─────────────────┘       └────────────────────┘
```

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
src/
 ├─ app/
 │   ├─ admin/              # AI governance UI
 │   ├─ api/
 │   │   ├─ chat/           # AI execution engine
 │   │   └─ instructions/   # System prompt control
 │   ├─ layout.tsx
 │   └─ page.tsx
 ├─ components/             # Clean UI primitives
 ├─ hooks/                  # Chat & state logic
 ├─ lib/                    # AI clients, Supabase, constants
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
git clone <repo>
cd figmenta-brain
npm install
npm run dev
```

Create `.env.local`:

```env
OPENAI_API_KEY=your_key
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
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
