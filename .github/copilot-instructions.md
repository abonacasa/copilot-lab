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

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

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
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
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

**Note:** The following links are external documentation references for reasoning purposes — not local files.
Refer to:

- [Angular 20 Official Docs](https://angular.dev/)
- [RxJS API Reference](https://rxjs.dev/api)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
