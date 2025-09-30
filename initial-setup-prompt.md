# Todo App Initial Setup Prompt for Coding Agent

## Project Overview
Create a high-grade todo application using the specified technology stack and architecture. This is a learning project that should demonstrate production-ready code quality while remaining simple and focused.

## Tech Stack Requirements
- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Bootstrap 5 + CSS Modules
- **State Management:** Zustand with localStorage persistence
- **Data Validation:** Zod schemas
- **Utilities:** UUID for task IDs

## Project Setup Instructions

### 1. Initialize Project
```bash
npx create-next-app@latest todo-app --typescript --eslint --app --src-dir
cd todo-app
```

### 2. Install Dependencies
```bash
npm install zustand bootstrap @types/uuid uuid zod
npm install -D @types/bootstrap
```

### 3. Project Structure
Create the following folder structure in `src/`:
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── todo/
│   └── layout/
├── hooks/
├── lib/
│   ├── storage.ts
│   ├── types.ts
│   └── validation.ts
├── store/
└── styles/
```

## Core Data Model
Implement these TypeScript interfaces:

```typescript
interface Task {
  id: string;                   // UUID
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

interface TodoState {
  tasks: Task[];
  filter: 'all' | 'pending' | 'completed';
  searchQuery: string;
  sortBy: 'createdAt' | 'status';
  sortOrder: 'asc' | 'desc';
  lastAction?: UndoAction;
}
```

## Phase 1 Implementation Requirements

### Essential Features to Implement:
1. **Task CRUD Operations**
   - Create new tasks with title and optional description
   - Edit existing task details
   - Delete tasks with confirmation
   - Mark tasks as pending/completed

2. **Task Display**
   - Responsive list view using Bootstrap grid
   - Clean, content-focused design
   - Mobile-first responsive design (phone, tablet, desktop)

3. **Data Persistence**
   - localStorage integration for task storage
   - Automatic save on every change
   - Data recovery on app reload

4. **Basic State Management**
   - Zustand store for application state
   - TypeScript-first implementation
   - Clean action patterns

### Technical Requirements:
- **Code Quality:** Production-ready, well-documented code
- **TypeScript:** Strict mode, no `any` types
- **Styling:** Bootstrap 5 components with CSS Modules for custom styles
- **Performance:** Optimized for <100 visible tasks
- **Accessibility:** Basic ARIA labels and keyboard navigation

### Component Architecture:
```
components/
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Modal.tsx
├── todo/
│   ├── TaskList.tsx
│   ├── TaskItem.tsx
│   ├── TaskForm.tsx
│   └── TaskFilters.tsx
└── layout/
    ├── Header.tsx
    └── Container.tsx
```

## Configuration Files

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### tsconfig.json additions
Ensure strict TypeScript configuration:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true
  }
}
```

## Styling Guidelines
- Use Bootstrap 5 utility classes for layout and spacing
- Implement CSS Modules for component-specific styles
- Follow mobile-first responsive design principles
- Maintain clean, modern aesthetic with focus on content
- Ensure proper contrast ratios for accessibility

## Success Criteria
The initial implementation should:
- ✅ Allow creating, editing, deleting, and toggling tasks
- ✅ Persist data in localStorage
- ✅ Display tasks in a clean, responsive list
- ✅ Work seamlessly on mobile, tablet, and desktop
- ✅ Follow TypeScript best practices
- ✅ Use Bootstrap for consistent styling
- ✅ Be ready for Vercel deployment
- ✅ Have clean, documented code structure

## Future-Proofing Notes
- Structure should easily accommodate search/filter features (Phase 2)
- State management should be extensible for undo functionality (Phase 3)
- Component architecture should support advanced UX features (Phase 4)
- Consider API integration points for future sync capabilities

## Development Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production preview
npm run lint         # Code linting
```

Focus on creating a solid foundation that demonstrates excellent React/TypeScript practices while keeping the user experience simple and intuitive.