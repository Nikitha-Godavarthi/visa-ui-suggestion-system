# 💡 Visa Design System – Natural Language → Component Suggestion Tool

This is a web application that lets developers describe UI components in natural language and receive:

- 🧩 Suggested components from the **Visa Product Design System**.
- 💻 Ready-to-use React code snippets using Visa Nova components.

---

## 🛠️ Approach & Technical Choices

- **Frontend**: Vite + React + TypeScript + Visa Nova Design System.
- **Backend**: Express.js with a lightweight REST API.
- **Component Suggestion Logic**: Rule-based keyword matcher (no AI or ML).
- **Design**: Fully responsive layout, consistent Nova styling, fixed header, and onboarding message.

---

## ⚙️ Assumptions & Shortcuts

- 🔍 **No real AI model** – all logic is manually hardcoded via keyword matching.
- 🧠 **Recent queries are stored in memory only**, not persisted.
- 📦 **Only a subset** of commonly-used Nova components are included for suggestions.

---

## 🚀 Improvements With More Time

- 🤖 Integrate a lightweight NLP/LLM backend for smarter intent understanding.
- 🧱 Add real-time live preview of suggested components.
- 📝 Enable saving snippets to a database.
- 🌐 Expand component database and support theme switching.
- ♿ Conduct full WCAG 2.1 + VGAR accessibility audit.

---

## 🤖 AI Usage

- ChatGPT was used to brainstorm features, refine UI copy, and assist in drafting rule-based logic. All application logic and integration were developed and customized manually.
- Leveraged AI suggestions for component organization, React hook patterns, and state management approaches.

---

## 🔗 Deployment

A live version of the app is deployed at: [https://visa-ui-suggestion-system.vercel.app](https://visa-ui-suggestion-system.vercel.app)

---

> Made with using the Visa Nova Design System.
