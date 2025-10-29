---
applyTo: 'src/**/*.component.{ts,html,scss}'
---

# Internationalization (i18n) Standards

- Use Angular built-in i18n tools for text localization.
- All static text should be wrapped in i18n markers.
- Do not hardcode visible text; use translation IDs instead.
- When using dynamic text, interpolate translation keys using Transloco or ngx-translate.
