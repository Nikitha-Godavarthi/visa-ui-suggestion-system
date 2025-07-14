Visa Design System – Natural Language → Component Suggestion Tool

A web app that allows developers to describe UI components in natural language and receive intelligent suggestions of Visa Design System components along with ready-to-use code snippets.

🛠️ Approach & Technical Choices

Frontend: Built with React + TypeScript + Vite, using Visa Nova Design System components for consistent UI and theming.
Backend: Lightweight Express.js API with hardcoded rule-based logic for component suggestion and code generation.
Component Matching: User input is matched using keyword heuristics (e.g., "login", "pagination") to return relevant components and JSX snippets.
Key Features:
Query input with keyboard shortcut (Cmd/Ctrl + Enter)
Suggestion list with descriptions, props, and “Copy” buttons
Auto-generated code preview section with copy functionality
Sidebar with recent and sample queries
Onboarding tour for first-time users
⚙️ Assumptions & Shortcuts

No real AI or LLM: All suggestions are derived from keyword-based matching rather than semantic parsing.
Stateless backend: Recent queries are stored in-memory only (resets on server restart).
Limited component coverage: Only a predefined subset of commonly-used Nova components are included for suggestions.
Design System docs: Assumed all component variants, styles, and behavior align with Visa Nova defaults.
🚀 What I'd Improve With More Time

Implement semantic understanding (e.g., embedding model or LLM integration).
Add support for component composition previews or live sandbox.
Save favorites or persist recent queries to localStorage or backend DB.
Expand supported component catalog and allow theme customization.
Implement full WCAG-compliant accessibility audit.
🤖 AI Usage

ChatGPT was used to brainstorm feature ideas, cleanly structure code, and draft rule-based mappings. All final logic and code integration was written and adapted manually.