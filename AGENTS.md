# AGENTS.md

## Project overview

pnpm + Turborepo monorepo:

- `apps/web` — TanStack Start app (React 19, Vite, `@tanstack/react-router`). File-based routes in `src/routes/` with a generated `src/routeTree.gen.ts`.
- `packages/ui` (`@workspace/ui`) — shared UI package: shadcn/ui components (Base UI), Tailwind v4, `src/components/`, `src/hooks/`, `src/lib/`, `src/styles/`.

Commands (run from root):

- `pnpm dev` — start all workspaces in dev mode
- `pnpm build` / `pnpm lint` / `pnpm typecheck` / `pnpm format` — turbo tasks across workspaces
- Scoped: `pnpm --filter web dev`, `pnpm --filter @workspace/ui typecheck`

## Rules

### 1. UI components always go in packages/ui

- shadcn/ui components and any third-party UI components are always installed/created in `packages/ui/src/components`, never in app code.
- Add them via: `pnpm dlx shadcn@latest add <name> -c apps/web` (this places files in `packages/ui/src/components`).
- Import from the package: `import { Button } from "@workspace/ui/components/button"`.
- Shared helpers (e.g. `cn`) go in `packages/ui/src/lib`, shared hooks in `packages/ui/src/hooks`.

### 2. Route structure (`apps/web/src/routes`)

- Each route gets a folder under `src/routes/` containing:
  - `index.tsx` and/or `router.tsx` (or both) — the route definition/component
  - `components/` — components used directly by that route, colocated as close to the route as possible
- Only shared/common components (used across multiple routes) belong in `packages/ui/src/components`. Route-specific components stay in the route's own `components/`.
- `routeTree.gen.ts` is generated — never edit it by hand; it regenerates via the router plugin on dev/build.

### 3. Data fetching

- Use `useQuery` from `@tanstack/react-query` for all data fetching (not yet installed — install with `pnpm --filter web add @tanstack/react-query` when first needed).
- One hook per API endpoint, e.g. `use-users`, `use-user` (`useQuery`, plus mutations/validation where needed).
- All API hooks live centrally in `apps/web/src/hooks`.