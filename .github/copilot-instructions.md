These global rules override chat mode-specific behavior. All agents must adhere to these conventions unless explicitly instructed otherwise.
You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
- `NgOptimizedImage` does not work for inline base64 images.
- Using meaningful names for components, services, and other entities

## Zone-less Configuration

This project is configured as **zone-less**.

### General Rules

- Do **not** import or reference `zone.js` anywhere.
- Do **not** use code or libraries that rely on `NgZone`.
- Change detection must be manual or signal-based.
- Always use `ChangeDetectionStrategy.OnPush` in components.
- Prefer Angular **Signals** and **RxJS streams** for reactivity.
- Do not use `fakeAsync`, `tick`, or `whenStable`.
- Use `effect()`, `computed()`, or explicit component updates (`cdr.markForCheck()`) when needed.

### Testing Rules

- Always use `provideZonelessChangeDetection()` in TestBed setups.
- Trigger manual change detection via `fixture.detectChanges()`.
- Avoid APIs that implicitly depend on `zone.js`, such as automatic async detection or unstable lifecycle hooks.

## Angular Scaffolding and Structure

When generating files, always follow Angular’s recommended folder structure to ensure a scalable, consistent and robust application. Organize the src/app directory using vertical slicing around features and shared services:

- features/ – Contains feature‑specific standalone components, pages, services and signals. Each feature has its own folder named after the domain (for example, complaints/), with sub‑folders for components/, pages/, services/, state/ and routes.ts. Keep each feature self‑contained and lazy‑loadable.

- core/ – Global singletons and cross‑cutting concerns such as authentication, logging or HTTP interceptors. Services here are provided at root and do not depend on features. Avoid placing any UI components in core.

- shared/ – Reusable UI components, pipes, directives and utilities that can be imported by multiple features. Shared components should be standalone and not depend on other features.

- state/ – Optional layer to organise global or feature‑specific state management. Use Angular signals and computed() for local state and RxJS for shared/async state. Consider colocating state folders inside features when the state is feature‑specific.

- models/ – Define TypeScript interfaces and types used across the app (for example, domain models). Keep models decoupled from services to prevent circular dependencies.

- environments/ – Separate environment configuration files for production and development (for example, environment.ts and environment.prod.ts). Do not store sensitive secrets here; use environment variables via build tooling.

### Additional guidelines:

- Use standalone components exclusively; avoid NgModules. Each component belongs to a feature or shared folder.
- Place routing configuration (routes.ts) inside each feature folder and import it in the app’s top‑level route definitions.
- Adopt clear naming conventions (kebab‑case for folders and files) and co‑locate files that change together.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators `@Input` and `@Output`.
- **Do not use decorators** such as `@Input()` or `@Output()`.
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Use `readonly` for properties that shouldn't change
- Use `protected` on class members that are only used by a component's template

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
- For shared or async state, use RxJS streams
- Prefer `BehaviorSubject` for representing stateful observables
- Combine signals and RxJS using `toSignal()` or `toObservable()` when appropriate
- Keep RxJS logic inside services, not components

## Templates

- Keep templates simple and avoid complex logic
- **Never use structural directives** like `*ngIf`, `*ngFor`, or `*ngSwitch`. Always use the native equivalents `@if`, `@for`, and `@switch`.
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
- Prefer using RxJS observables for all asynchronous operations (HTTP, timers, user input, etc.)
- Always return `Observable<T>` from service methods instead of `Promise<T>`
- Use RxJS operators (`map`, `switchMap`, `catchError`, `tap`, `takeUntil`) to transform and manage streams
- When consuming HTTP services, handle errors with `catchError` and return fallback values when appropriate
- Use the `async` pipe in templates to subscribe to observables instead of manual subscriptions
- Avoid calling `.subscribe()` in components unless absolutely necessary (e.g., side effects)
