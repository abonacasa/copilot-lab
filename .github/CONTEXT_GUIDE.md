# 🧭 Copilot Context & Workflow Guide

This document explains how to use our **Copilot configuration** for the _Denuncias_ Angular project.
It defines how to collaborate effectively across planning, coding, and reviewing phases.

---

## 🧠 Purpose

This setup enables Copilot to act as part of the development workflow:

- **Planning:** Create structured implementation plans.
- **Coding:** Implement features using TDD and project conventions.
- **Reviewing:** Evaluate code quality and adherence to standards.

All files are located under `.github/` and version-controlled to maintain consistency.

---

## 📁 Structure Overview

| File                             | Purpose                                                     |
| -------------------------------- | ----------------------------------------------------------- |
| `copilot-instructions.md`        | Global Angular & TypeScript rules (single source of truth). |
| `chatmodes/planning.chatmode.md` | Defines the Architect persona for planning.                 |
| `chatmodes/coding.chatmode.md`   | Defines the TDD Developer persona for implementation.       |
| `chatmodes/reviewer.chatmode.md` | Defines the Reviewer persona for quality analysis.          |
| `plan-template.md`               | Template used to structure implementation plans.            |

---

## 🔄 Development Workflow (Manual Handoffs)

Since experimental handoffs are not enabled, use **separate chats** for each phase:

1. **Planning Mode**

   - Select mode **Planning**.
   - Example:
     ```
     /plan Add complaint filtering module to the dashboard.
     ```
   - Copilot generates a plan based on `plan-template.md`.

2. **Coding Mode**

   - Open a **new chat** (`Ctrl+N`) and select **Coding**.
   - Example:
     ```
     Implement the complaint filtering module from the plan below.
     ```
   - Follow the generated plan step by step using TDD principles.

3. **Reviewer Mode**
   - Open another chat, select **Reviewer**.
   - Example:
     ```
     Review the implementation in src/app/modules/complaints against the plan.
     ```
   - Receive constructive feedback focused on quality and standards.

---

## ⚙️ Context Management Principles

| Principle                        | Description                                             | Application                                                    |
| -------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------- |
| **Start small & iterate**        | Begin with minimal context and expand only when needed. | Keep `copilot-instructions.md` concise and technology-focused. |
| **Keep context fresh**           | Update context files as code evolves.                   | Review `.github/` at least once per release cycle.             |
| **Progressive context building** | Provide info step-by-step per phase.                    | Use distinct chat modes for each task.                         |
| **Maintain context isolation**   | Prevent context mixing between tasks.                   | Open a new chat per phase.                                     |
| **Version your context**         | Track context changes in Git.                           | Commit `.github/` updates with descriptive messages.           |

---

## 🚀 Workflow Optimization (without handoffs)

- **Feedback loops:** Ask Copilot to summarize its understanding before large tasks.
- **Incremental complexity:** Build features step by step, testing after each milestone.
- **Separate concerns:** Keep planning, coding, and review isolated.
- **Versioning:** Treat `.github/` as source code — branch and review context changes.
- **Continuous improvement:** Adjust context files whenever Copilot misinterprets your setup.

---

## ✅ Measuring Success

A healthy context setup should produce:

- **Reduced back-and-forth** — fewer clarifications needed.
- **Consistent code quality** — generated code matches standards.
- **Faster implementation** — minimal setup for each task.
- **Better architectural alignment** — suggestions fit your design goals.

---

## 📈 Continuous Improvement & Scaling

- Treat `.github/` as **living documentation**.  
  Refine based on observed Copilot behavior.
- **Focus on decision context**: keep instructions about _why_ patterns are used.
- **Use consistent patterns**: follow naming, architecture, and file structure conventions.
- **Reference external knowledge**:
  - [Angular 20 Official Docs](https://angular.dev/)
  - [RxJS API Reference](https://rxjs.dev/api)
  - [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### For Teams

- Share this setup via Git and keep context discussions in PRs.
- All `.github/` modifications must be reviewed by at least one developer.

### For Large Projects

- Extend this structure with module-specific or feature-specific context files if needed.

---

## 🧩 Summary Table

| Phase         | Chat Mode              | Goal                        | Model        |
| ------------- | ---------------------- | --------------------------- | ------------ |
| **Planning**  | `planning.chatmode.md` | Create implementation plans | GPT-4.1      |
| **Coding**    | `coding.chatmode.md`   | Implement with TDD          | GPT-4.1-mini |
| **Reviewing** | `reviewer.chatmode.md` | Review quality & standards  | GPT-4.1      |

---

> 💡 **Tip:** The cleaner your context, the smarter Copilot becomes.  
> Use small, focused sessions and keep documentation current.
