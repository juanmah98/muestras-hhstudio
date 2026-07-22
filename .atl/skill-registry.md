# Skill Registry — hh-base-angular19

**Generated**: 2026-05-06
**Project**: Angular 19 boilerplate / template (HH Studio)

## Project Standards (Compact Rules)

### Architecture
- **Standalone components only** — no NgModules, no `@NgModule()`
- **Folder structure**: `core/` (services), `shared/` (components/directives/pipes), `layouts/` (layout shells), `pages/` (routed components)
- **SCSS** for all styles, Bootstrap 5.3 utility classes available project-wide
- **SSR disabled** — this is a pure SPA (GSAP and Bootstrap require DOM)

### Conventions
- **Naming**: Spanish for business/domain names, English for technical names
- **Imports**: relative paths are fine (no mandatory aliases)
- **Components**: one folder per component with `.ts`, `.html`, `.scss`, `.spec.ts`
- **Services**: `providedIn: 'root'` by default, co-locate with `.spec.ts`

### Testing
- **Karma + Jasmine**: `ng test` runs unit tests
- **Every service and component** gets a `.spec.ts`
- **Arrange / Act / Assert** pattern

### Prohibited
- `any` type without explicit justification
- NgModules — this is standalone-only
- Direct HTTP calls from components — always through services
- Manual subscriptions without `async` pipe when applicable

### Dependencies
- **UI**: Bootstrap 5.3 + Bootstrap Icons
- **Animations**: GSAP 3.14
- **Backend/Auth**: Supabase client (optional, env-configured)
- **SEO**: SeoService already built (Title, Meta, OG, Twitter Cards, Canonical)

## User-Level Skills

| Skill | Source | Trigger |
|-------|--------|---------|
| branch-pr | skills/branch-pr | PR creation, opening a PR, preparing changes for review |
| chained-pr | skills/chained-pr | PR exceeding 400 lines, chained/stacked PRs |
| cognitive-doc-design | skills/cognitive-doc-design | Writing guides, READMEs, RFCs, onboarding docs |
| comment-writer | skills/comment-writer | Feedback, reviews, Slack, GitHub comments |
| issue-creation | skills/issue-creation | GitHub issues, bug reports, feature requests |
| judgment-day | skills/judgment-day | "judgment day", "doble review", adversarial review |
| skill-creator | skills/skill-creator | Creating new AI skills |
| supabase | skills/supabase | Any Supabase task (Database, Auth, Edge Functions, etc.) |
| work-unit-commits | skills/work-unit-commits | Implementing changes, preparing commits, splitting PRs |
