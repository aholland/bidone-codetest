# BidOne Code Test - Article Management System

A modern article management system built with SvelteKit, TypeScript, and Tailwind CSS. Features a custom BidFood theme with authentic branding, complete CRUD operations, and comprehensive testing capabilities.

## 🌐 Live Demo

**[View the application at bidone-codetest.vercel.app](https://bidone-codetest.vercel.app/)**

## Features

### Core Functionality
- **Article Management**: Create, read, update, and delete articles with localStorage persistence
- **Search & Filter**: Real-time search with highlighting and status filtering (Draft/Published)
- **Pagination**: Smart pagination with efficient navigation
- **Form Validation**: Client and server-side validation using Zod schemas
- **Responsive Design**: Mobile-first approach works seamlessly across all devices

### Theming & Design
- **4 Theme Options** (powered by [svelte-themes](https://svelte-themes.vercel.app/)):
  - 🍽️ **BidFood** - Custom theme with authentic BidFood colors (#72C262 green, #140749 blue)
  - ☀️ Light mode
  - 🌙 Dark mode  
  - 💻 System preference
- **BidFood Branding**:
  - Custom Guthen Bloots font matching BidFood's website
  - Official brand colors from bidfood.co.nz
  - Green heading text in BidFood theme
  - Light gray Draft badges for subtle status indication

### Developer Features
- **Error Simulation**: Controllable error rate (0-100%) for testing error handling
- **Validation Override**: Test server-side validation by bypassing client checks
- **View-Only Mode**: Simulate read-only user permissions
- **Character Counters**: Real-time character count with limit indicators (red when exceeded)

### Technical Excellence  
- **Type Safety**: Full TypeScript with Zod validation
- **Svelte 5 Runes**: Latest Svelte features (`$state`, `$derived`, `$effect`, `$props`)
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, focus management
- **Mock API**: Client-side API simulation with realistic delays and error handling
- **localStorage Persistence**: Data survives page refreshes and sessions
- **Performance**: Debounced search, optimistic updates, efficient rendering

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) with Svelte 5
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Validation**: [Zod](https://github.com/colinhacks/zod)
- **Testing**: [Vitest](https://vitest.dev/) with browser mode
- **Theme Management**: [svelte-themes](https://github.com/aholland/svelte-themes) v1.0.2 - A Svelte 5 port of next-themes
  - [Live Demo](https://svelte-themes.vercel.app/)
  - Initial Svelte 5 migration by @aholland ([acknowledged in changelog](https://github.com/beynar/svelte-themes/blob/main/CHANGELOG.md#thank-you))
  - Provides seamless theme switching with localStorage persistence
- **Custom Font**: Guthen Bloots (BidFood theme)
- **Date Formatting**: [date-fns](https://date-fns.org/)
- **Linting**: ESLint with TypeScript and Svelte plugins

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aholland/bidone-codetest.git
cd bidone-codetest
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm dev -- --open    # Start and open in browser

# Building
pnpm build            # Build for production
pnpm preview          # Preview production build

# Testing
pnpm test             # Run all tests once
pnpm test:unit        # Run tests in watch mode

# Code Quality
pnpm lint             # Run ESLint
pnpm check            # Type-check with svelte-check
pnpm check:watch      # Type-check in watch mode
```

## Project Structure

```
src/
├── lib/
│   ├── api/
│   │   ├── articles.ts           # Mock API endpoints with error simulation
│   │   └── mock-db.ts            # localStorage-backed database
│   ├── assets/
│   │   └── favicon.svg           # App favicon
│   ├── components/
│   │   ├── ArticleForm.svelte    # Article create/edit form with validation override
│   │   ├── ArticleList.svelte    # Article list with search highlighting
│   │   ├── Badge.svelte          # Status badge component
│   │   ├── Button.svelte         # Reusable button with variants
│   │   ├── Card.svelte           # Card container
│   │   ├── Input.svelte          # Form input with character counter
│   │   ├── Modal.svelte          # Native dialog modal
│   │   ├── Pagination.svelte     # Smart pagination with nav element
│   │   ├── SearchBar.svelte      # Debounced search input
│   │   ├── Select.svelte         # Select dropdown
│   │   ├── StatusFilter.svelte   # Status filter tabs
│   │   ├── ThemeSwitcher.svelte  # 4-theme switcher with icons
│   │   └── ThemeToggle.svelte    # Legacy theme toggle (unused)
│   ├── stores/
│   │   └── articles.svelte.ts    # Svelte 5 store with $state runes
│   ├── types/
│   │   └── article.ts            # TypeScript types & Zod schemas
│   └── utils/
│       ├── highlight.ts          # Search term highlighting
│       ├── validation.ts         # Form validation helpers
│       └── validation.spec.ts    # Validation unit tests
├── routes/
│   ├── +layout.svelte            # Root layout with theme provider
│   └── +page.svelte              # Main page with all controls
├── static/
│   └── fonts/
│       └── Guthen Bloots Personal Use.ttf  # BidFood theme font
├── app.css                       # Global styles, themes & @font-face
├── app.d.ts                      # TypeScript ambient declarations
└── app.html                      # HTML template
```

## 🎨 BidFood Theme Details

The BidFood theme authentically represents the brand with:
- **Primary Green**: `#72C262` - Used for headings and primary actions
- **Brand Blue**: `#140749` - Used for accents and dark backgrounds
- **Custom Font**: Guthen Bloots - Matches BidFood's website typography
- **Refined Details**: Draft badges use subtle gray instead of default purple

## 🧪 Testing Features

### Error Simulation
1. Enable "Simulate errors" checkbox in header
2. Set error rate (5% = occasional, 50% = frequent, 100% = always)
3. Try any operation (create, update, search, filter)
4. Observe error handling and recovery

### Validation Testing  
1. Open create/edit modal
2. Check "Override validation" at bottom
3. Try submitting with:
   - Empty fields
   - Text exceeding limits (200 chars for title, 100 for author)
4. See server-side validation messages

### View-Only Mode
1. Toggle "View-only" checkbox in header
2. New Article button disappears
3. Edit/Delete buttons are hidden
4. Read-only experience simulated

## 🏗️ Architecture

### Data Flow
1. **Mock API Layer**: Client-side API simulation with error injection
2. **Store Layer**: Svelte 5 reactive state with `$state` runes
3. **Component Layer**: Modular, accessible UI components
4. **Persistence Layer**: localStorage for data survival

### Key Patterns
- **Svelte 5 Runes**: Modern reactive state management
- **Component Composition**: Reusable UI building blocks
- **Optimistic Updates**: Immediate feedback with error recovery
- **Debounced Operations**: Performance-optimized search

## Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmark regions
- **ARIA Labels**: Descriptive labels for interactive elements
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Focus Management**: Proper focus handling in modals and forms
- **Screen Reader Support**: Announcements for dynamic content changes
- **Color Contrast**: WCAG AA compliant color combinations
- **Error Messages**: Associated error messages with form fields

## Performance Optimizations

- **Debounced Search**: Reduces API calls during typing
- **Pagination**: Limits rendered items for better performance
- **Optimistic Updates**: Immediate UI feedback
- **Reactive State**: Efficient updates with Svelte 5 runes
- **Code Splitting**: Automatic route-based code splitting

## Best Practices Demonstrated

- **Type Safety**: Comprehensive TypeScript usage
- **Component Reusability**: DRY principle applied
- **Error Handling**: Graceful error recovery
- **Form Validation**: Client-side validation with clear feedback
- **State Management**: Centralized, predictable state
- **Testing**: Unit and integration test coverage
- **Accessibility**: WCAG compliance
- **Code Organization**: Clear, maintainable structure

## 🚀 Deployment

### Vercel (Recommended)
This project is optimized for Vercel deployment:

```bash
# Install Vercel adapter
pnpm add -D @sveltejs/adapter-vercel

# Update svelte.config.js to use adapter-vercel

# Deploy
vercel
```

The app works perfectly on Vercel since it's a pure frontend with localStorage persistence.

## 🌟 Highlights

This project demonstrates:
- **Modern Svelte 5**: Latest framework features and patterns
- **Enterprise Theming**: Production-ready multi-theme support
- **Testing Tools**: Built-in error simulation and validation testing
- **Accessibility First**: WCAG compliant from the ground up
- **Real Brand Integration**: Authentic BidFood colors and typography
- **Developer Experience**: Hot reload, TypeScript, great DX

## License

This project was created as a technical assessment for BidOne.
