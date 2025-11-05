# Angular coding style guide

## Introduction
This document aims to establish a set of coding practices that promote consistency across the Angular ecosystem.

## Naming Conventions
- Use `kebab-case` for file and folder names.
- Use `PascalCase` for component, directive, pipe, and service class names.
- Use `camelCase` for variable and function names.
- Use the same file name for a component's TypeScript, template, and styles.

## Project Structure  

### All the application's code goes in a directory named `src`

All of your Angular UI code (TypeScript, HTML, and styles) should live inside a directory
named `src`. Code that's not related to UI, such as configuration files or scripts, should live
outside the `src` directory.

This keeps the root application directory consistent between different Angular projects and creates
a clear separation between UI code and other code in your project.

### Group closely related files together in the same directory

Angular components consist of a TypeScript file and, optionally, a template and one or more style
files. You should group these together in the same directory.

Unit tests should live in the same directory as the code-under-test. Avoid collecting unrelated
tests into a single `tests` directory.

### Organize your project by feature areas

Organize your project into subdirectories based on the features of your application or common themes
to the code in those directories. For example, the project structure for a movie theater site,
MovieReel, might look like this:

```
src/
├─ movie-reel/
│ ├─ show-times/
│ │ ├─ film-calendar/
│ │ ├─ film-details/
│ ├─ reserve-tickets/
│ │ ├─ payment-info/
│ │ ├─ purchase-confirmation/
```

Avoid creating subdirectories based on the type of code that lives in those directories. For
example, avoid creating directories like `components`, `directives`, and `services`.

Avoid putting so many files into one directory that it becomes hard to read or navigate. As the
number of files in a directory grows, consider splitting further into additional sub-directories.


## Dependency injection

### Prefer the `inject` function over constructor parameter injection

Prefer using the `inject` function over injecting constructor parameters. The `inject` function works the same way as constructor parameter injection, but offers several style advantages:

*   `inject` is generally more readable, especially when a class injects many dependencies.
*   It's more syntactically straightforward to add comments to injected dependencies
*   `inject` offers better type inference.
*   When targeting ES2022+ with [`useDefineForClassFields`](https://www.typescriptlang.org/tsconfig/#useDefineForClassFields), you can avoid separating field declaration and initialization when fields read on injected dependencies.

[You can refactor existing code to `inject` with an automatic tool](reference/migrations/inject-function).
