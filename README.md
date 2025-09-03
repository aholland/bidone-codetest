# Article Management System

A modern, accessible article management system built with SvelteKit, TypeScript, and Tailwind CSS. This application provides content editors with a comprehensive tool for managing articles with full CRUD operations, search, filtering, and pagination.

## Features

### Core Functionality
- **Article Management**: Create, read, update, and delete articles
- **Search & Filter**: Search articles by title and filter by status (Published/Draft)
- **Pagination**: Efficient navigation through large article lists
- **Form Validation**: Robust client-side validation using Zod
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Responsive Design**: Works seamlessly across desktop and mobile devices

### Technical Highlights
- **Type Safety**: Full TypeScript implementation with strict mode
- **Component Architecture**: Reusable, accessible UI components
- **State Management**: Reactive store with Svelte 5 runes
- **Mock API**: Simulated backend with realistic delays and error handling
- **Testing**: Unit tests for validation logic and integration tests for components
- **Accessibility**: WCAG compliant with semantic HTML and ARIA labels
- **Performance**: Optimized rendering with efficient state updates

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) with Svelte 5
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Validation**: [Zod](https://github.com/colinhacks/zod)
- **Testing**: [Vitest](https://vitest.dev/) with browser mode
- **Theme Management**: [svelte-themes](https://github.com/aholland/svelte-themes)
- **Date Formatting**: [date-fns](https://date-fns.org/)
- **Linting**: ESLint with TypeScript and Svelte plugins

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CodeTest1
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
│   │   ├── articles.ts      # Mock API service
│   │   └── mock-db.ts       # In-memory database
│   ├── components/
│   │   ├── ArticleForm.svelte    # Article create/edit form
│   │   ├── ArticleList.svelte    # Article list display
│   │   ├── Badge.svelte          # Status badge component
│   │   ├── Button.svelte         # Reusable button
│   │   ├── Card.svelte           # Card container
│   │   ├── Input.svelte          # Form input field
│   │   ├── Modal.svelte          # Modal dialog
│   │   ├── Pagination.svelte     # Pagination controls
│   │   ├── SearchBar.svelte      # Search input
│   │   ├── Select.svelte         # Select dropdown
│   │   ├── StatusFilter.svelte   # Status filter tabs
│   │   └── ThemeToggle.svelte    # Dark/light theme toggle
│   ├── stores/
│   │   └── articles.svelte.ts    # Article state management
│   ├── types/
│   │   └── article.ts            # TypeScript definitions
│   └── utils/
│       └── validation.ts         # Validation utilities
├── routes/
│   ├── +layout.svelte            # Root layout with theme provider
│   └── +page.svelte              # Main application page
├── app.css                       # Global styles and Tailwind directives
├── app.d.ts                      # TypeScript ambient declarations
└── app.html                      # HTML template
```

## Architecture Overview

### Data Flow
1. **Mock API Layer**: Simulates backend operations with realistic delays
2. **Store Layer**: Manages application state with reactive updates
3. **Component Layer**: Presents UI and handles user interactions
4. **Validation Layer**: Ensures data integrity using Zod schemas

### Key Design Patterns
- **Component Composition**: Small, focused components combined to create features
- **Prop-based Configuration**: Components accept configuration via props
- **Event-driven Updates**: Child components emit events to parent handlers
- **Optimistic UI Updates**: Immediate feedback with error recovery

## Testing

The project includes comprehensive test coverage:

### Unit Tests
- Validation logic for article creation and updates
- Error formatting utilities
- Schema validation edge cases

### Integration Tests
- Form submission and validation
- Component interaction flows
- State management updates

Run tests with:
```bash
pnpm test              # Run once
pnpm test:unit         # Watch mode
```

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

## Future Enhancements (Optional)

The following features could be added to extend functionality:

- **Role-based Access Control**: Different permissions for viewers and editors
- **Advanced Filtering**: Multiple filter criteria
- **Bulk Operations**: Select and operate on multiple articles
- **Export Functionality**: Export articles to various formats
- **Rich Text Editor**: Enhanced content creation
- **Tags/Categories**: Article categorization
- **Version History**: Track article changes over time
- **Real-time Collaboration**: Multiple editors working simultaneously

## License

This project was created as a technical assessment for BidOne.
