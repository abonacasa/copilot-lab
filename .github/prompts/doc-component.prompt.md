---
mode: ask
model: 'GPT-4.1'
description: 'Generate or update documentation for Angular components, directives, or services'
---

You are an expert in **Angular 20 and TypeScript documentation**.

Your task is to generate or update documentation for the selected Angular file (${fileBasename}) within the workspace `${workspaceFolderBasename}`.

## 🧩 Requirements

- Add `/** ... */` JSDoc comments for:
  - Classes, inputs, outputs, public methods, and signals.
- For components:
  - Describe their purpose, inputs/outputs, lifecycle hooks.
- For services:
  - Document public methods, return types, and dependency injection (`providedIn: 'root'` if used).
- For directives:
  - Explain host bindings and event listeners.

Also:

- Generate or update a `README.md` in the same folder (`${fileDirname}`) if missing.
- Include:
  - Description of the component or service.
  - Inputs and outputs table.
  - Example usage snippet.
  - Accessibility and i18n notes if applicable.

Use concise, consistent language, and keep formatting Markdown-compatible.

## 🧠 Behavior

When run:

1. Read the file `${file}`.
2. Analyze the Angular class, decorators, and metadata.
3. Insert or update inline documentation.
4. Generate or update a `README.md` file beside it.

## 💬 Example invocations

- `/doc-component document user-profile.component.ts`
- `/doc-component update documentation for auth.service.ts`
