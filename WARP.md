# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a full-stack expenses tracker application with a Deno backend API and Astro frontend client. The application tracks financial purposes, transactions, and accumulated savings with basic authentication.

## Architecture

### Backend (`/api`)
- **Runtime**: Deno with Oak framework 
- **Database**: MySQL with Drizzle ORM
- **Authentication**: Basic Auth with Base64 tokens
- **Structure**:
  - `/src/main.ts` - Main server entry point with middleware
  - `/src/routes/` - API routes (purpose, transaction, accumulated)
  - `/src/db/` - Database managers and schema (Drizzle ORM)
  - `/src/auth/` - Basic authentication validation
  - `/src/validation/` - Request validation schemas
  - `/src/types/` - TypeScript type definitions

### Frontend (`/client`)
- **Framework**: Astro with TailwindCSS
- **Components**: Astro components for UI (charts, lists, forms)
- **Structure**: Standard Astro project layout with pages, components, layouts

### Database Schema
- **purpose**: Categories for expenses/income with totals
- **transaction**: Individual financial transactions linked to purposes
- **accumulated**: Savings/accumulation tracking

## Development Commands

### Backend (API)
```bash
# Development server with file watching
cd api && deno task dev

# Run tests
cd api && deno test

# Cache dependencies
cd api && deno cache src/main.ts
```

### Frontend (Client)
```bash
# Development server
cd client && npm run dev

# Build for production
cd client && npm run build

# Preview production build
cd client && npm run preview
```

### Docker Development
```bash
# Full stack with Docker Compose (includes MySQL, phpMyAdmin, Traefik)
docker compose up --build

# With file watching for development
docker compose up --build --watch
```

### Git Hooks & Commits
```bash
# Install git hooks (lefthook)
npx lefthook install

# Conventional commits (commitizen)
npx cz
```

## Key Development Patterns

### Database Operations
- All database operations use Drizzle ORM managers (`TransactionManager`, `PurposeManager`, `AccumulatedManager`)
- Each manager returns a `Response<T>` type with success/failure handling
- User-based data isolation using `belong_to` field and JWT user context

### Authentication Flow
- Basic Auth tokens stored in `BASIC_AUTH_TOKEN` environment variable
- Token validation in middleware for private routes (`/purpose`, `/transaction`, `/accumulated`)
- User ID extracted from Base64 decoded token and stored in `ctx.state.user`

### API Routes Structure
- Private routes require authentication middleware
- Consistent response format using `Response<T>` type
- UUID-based entity identification for external references
- Internal integer IDs for database relationships

### Frontend Data Flow
- Astro components fetch data from API endpoints
- Chart.js integration for data visualization
- TailwindCSS for styling with custom font (Raleway)

## Environment Setup

### Required Environment Variables (API)
- `DB_HOST` - MySQL database host
- `DB_PASSWORD` - MySQL database password  
- `DB_USERNAME` - MySQL database username
- `DB_NAME` - MySQL database name
- `BASIC_AUTH_TOKEN` - Base64 encoded authentication token

### Local Development URLs
- API: `http://api.localhost` (via Traefik proxy)
- Database Admin: `http://db.localhost` (phpMyAdmin)
- Frontend: `http://localhost:4321` (Astro dev server)

## Testing Strategy

### Backend Tests
- Uses Deno's built-in testing framework with `@std/assert`
- Test files: `main_test.ts` and other `*_test.ts` files
- Run with `deno test` from `/api` directory

### Single Test Execution
```bash
cd api && deno test --filter "specific_test_name"
```

## Database Management

### Schema Changes
- Modify `/api/src/db/schema.ts` for table definitions
- Use Drizzle Kit for migrations: `npx drizzle-kit generate`
- Database managers handle CRUD operations with proper user isolation

### Local Database Access
- phpMyAdmin available at `http://db.localhost` when using Docker Compose
- Direct MySQL connection using environment variables from `/api/src/db/.env`

## Code Quality

### Linting & Formatting
- Commitlint for conventional commits
- Lefthook for git hooks
- Deno's built-in formatter: `deno fmt`
- Astro's built-in checks: `npm run astro check`

### Type Safety
- Full TypeScript support in both backend and frontend
- Drizzle ORM provides type-safe database operations
- Comprehensive type definitions in `/api/src/types/`

## Deployment Architecture

### Docker Setup
- Multi-service architecture with Traefik reverse proxy
- Backend built from Deno image with cached dependencies
- MySQL with persistent volumes
- Development file watching support

### Production Considerations
- Environment variables must be properly configured
- Database migrations handled through Drizzle
- Basic Auth tokens should be securely generated Base64 strings
