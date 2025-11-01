# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Package Management
This project uses **pnpm** (v10.18.3) as the package manager in a monorepo structure.

- `pnpm install` - Install all dependencies
- `pnpm add <package>` - Add a dependency (use `-w` for workspace root, or run in specific package)

### Development
- `pnpm dev` - Start all apps in parallel with hot reload (frontend + backend)
- `cd apps/curator-frontend && pnpm dev` - Run frontend only
- `cd apps/curator-backend && pnpm dev` - Run backend only

### Build & Type Checking
- `pnpm build` - Build all apps for production
- `pnpm check` - Run TypeScript type checking across entire monorepo
- `cd apps/curator-frontend && pnpm typecheck` - Type check frontend only

### Linting & Code Quality
- `pnpm lint` - Run Biome linter on all files
- `pnpm lint:fix` - Run Biome with automatic fixes (includes formatting)

**CRITICAL**: After every file change, run `pnpm lint:fix` and `pnpm check` to ensure code quality.

### Testing
- `pnpm test` - Run all tests using Vitest
- Uses `@effect/vitest` for Effect-aware testing in backend
- Test files: `test/**/*.test.ts` and `src/**/*.test.ts`

### Database (Prisma)
- `pnpm db:migrate:dev` - Run database migrations (shortcut from root)
- `pnpm db:studio` - Open Prisma Studio GUI (shortcut from root)
- `cd apps/curator-backend && pnpm prisma generate` - Generate Prisma client
- `cd apps/curator-backend && pnpm prisma migrate dev` - Create and apply migrations

Database is SQLite with schema in `apps/curator-backend/prisma/schema.prisma`

### Dependency Updates
- `pnpm up --interactive --latest -r` - Upgrade dependencies interactively across all workspaces

## Architecture Overview

### Monorepo Structure
```
curator-app/
├── apps/
│   ├── curator-backend/    # Effect Platform HTTP API server
│   └── curator-frontend/   # React + Vite + TanStack Router
├── packages/
│   ├── design-system/      # Shared React components (@geo/design-system)
│   └── curator-utils/      # Shared utilities (@geo/curator-utils)
```

### Backend (curator-backend)
- **Framework**: Effect Platform HTTP API (functional TypeScript framework)
- **Runtime**: Node.js with tsx for development
- **Database**: SQLite + Prisma ORM
- **Authentication**: Privy (external auth) + custom session tokens
- **Observability**: OpenTelemetry with Honeycomb integration
- **Build Tool**: tsup

**Key Directories**:
- `src/config/` - Configuration modules
- `src/http/` - HTTP API definitions and handlers
- `src/services/` - Business logic services (Effect services)
- `patterns/` - Implementation pattern documentation (HTTP API, layer composition, testing)
- `specs/` - Feature specifications (spec-driven development)

**Effect Patterns**: Backend uses Effect TypeScript extensively:
- Prefer `Effect.fn` over `Effect.gen` for sequential operations
- Use `Data.TaggedError` for custom error types
- Service-based architecture with Layer composition
- Testing with `@effect/vitest` (use `assert` methods, NOT `expect`)

### Frontend (curator-frontend)
- **Framework**: React 19 + Vite
- **Router**: TanStack Router (file-based routing in `src/routes/`)
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack Query
- **Authentication**: Privy React Auth
- **Web3**: Viem + Wagmi + Hypergraph integration

**Key Directories**:
- `src/routes/` - TanStack Router file-based routes
- `src/components/` - React components
- `src/utils/` - Frontend utilities

**Note**: Router tree is auto-generated at `src/routeTree.gen.ts` - do not edit manually.

### Shared Packages
- **@geo/design-system**: React component library with class-variance-authority for variants
- **@geo/curator-utils**: Shared utilities compatible with Effect

## Technology Stack

### Core Technologies
- **Language**: TypeScript (ES2022 target, strict mode)
- **Package Manager**: pnpm with workspaces
- **Linter/Formatter**: Biome (120 char line width, 2-space indent, single quotes)
- **Testing**: Vitest (with @effect/vitest for backend)
- **Build**: tsup (backend), Vite (frontend)

### Backend Stack
- Effect (functional effects system)
- Effect Platform (HTTP server)
- Prisma + SQLite
- Privy Server Auth
- OpenTelemetry

### Frontend Stack
- React 19
- TanStack Router + Query
- Tailwind CSS v4
- Privy React Auth
- GraphProtocol Hypergraph
- Viem + Wagmi

## Initial Setup

Based on CONTRIBUTING.md, first-time setup:

```sh
pnpm install
cd apps/curator-backend
cp .env.example .env
# Add PRIVY_APP_SECRET and PRIVY_APP_ID to apps/curator-backend/.env
cd ../curator-frontend
cp .env.example .env
# Add VITE_PRIVY_APP_ID to apps/curator-frontend/.env
cd ../curator-backend
pnpm prisma migrate dev
```

## Development Patterns

### Spec-Driven Development (Backend)
The backend follows a strict **spec-driven development** workflow:

1. Create `instructions.md` (requirements capture)
2. Derive `requirements.md` (structured analysis)
3. Create `design.md` (technical design)
4. Generate `plan.md` (implementation roadmap)
5. Execute implementation

**Important**: User approval is required between each phase. Never implement without completing all specification phases.

### Effect TypeScript Patterns
```typescript
// Sequential operations with Effect.fn
const program = Effect.fn(function* () {
  const user = yield* getUser(id)
  const profile = yield* getProfile(user.profileId)
  return { user, profile }
})

// Custom errors with Data.TaggedError
class UserNotFound extends Data.TaggedError("UserNotFound")<{
  readonly id: string
}> {}

// Testing with @effect/vitest
import { assert, describe, it } from "@effect/vitest"
it.effect("test description", () =>
  Effect.fn(function* () {
    const result = yield* someEffect()
    assert.strictEqual(result, expected)
  }))
```

### Code Style Rules
- Never use `any` or type assertions
- Prefer early returns over deep nesting
- Validate inputs at system boundaries with Effect Schema
- Use Effect's resource management for cleanup
- 120 character line width
- Single quotes in TypeScript/JavaScript

## Pattern Documentation

The backend includes detailed pattern documentation in `apps/curator-backend/patterns/`:
- `http-api.md` - HTTP API definition and implementation patterns
- `layer-composition.md` - Layer-based dependency injection
- `generic-testing.md` - Testing patterns with @effect/vitest
- `README.md` - Overview of patterns

Reference these files when implementing new features in the backend.

## Docker Deployment

Build and run locally:
```sh
docker build . -t curator-backend
docker run -it --rm --name=curator-backend curator-backend:latest
```

For Railway deployment, see CONTRIBUTING.md for volume setup and environment variables.
