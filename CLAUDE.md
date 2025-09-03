# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Type
SvelteKit application with TypeScript, Tailwind CSS, and Vitest testing

## Commands

### Development
- `pnpm dev` - Start development server
- `pnpm dev -- --open` - Start dev server and open browser

### Build & Preview
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

### Testing
- `pnpm test` - Run all tests once
- `pnpm test:unit` - Run tests in watch mode
- Tests are split into client (browser) and server (node) environments
- Client tests: `src/**/*.svelte.{test,spec}.{js,ts}` (run in Playwright browser)
- Server tests: `src/**/*.{test,spec}.{js,ts}` (excluding `.svelte.` tests)

### Code Quality
- `pnpm lint` - Run ESLint
- `pnpm check` - Type-check with svelte-check
- `pnpm check:watch` - Type-check in watch mode

## Architecture

### Project Structure
- `/src/routes/` - SvelteKit routes (file-based routing)
- `/src/lib/` - Shared library code and components
- `/src/app.html` - HTML template
- `/src/app.css` - Global styles with Tailwind directives
- `/src/app.d.ts` - TypeScript ambient declarations

### Key Technologies
- **Framework**: SvelteKit with Svelte 5 (uses runes like `$props()`)
- **Styling**: Tailwind CSS v4 (integrated via Vite plugin)
- **Testing**: Vitest with browser mode for component tests
- **Type Checking**: TypeScript with strict mode enabled
- **Linting**: ESLint with TypeScript and Svelte plugins

### Testing Setup
- Vitest configured with separate client/server test projects
- Client tests run in Playwright Chromium browser
- All tests require assertions (`requireAssertions: true`)
- Setup file for client tests: `vitest-setup-client.ts`