---
applyTo: "**"
---

## Todo App Technical Plan

### **Recommended Tech Stack**

**Frontend Framework:** Next.js 14+ with App Router

- ✅ Your team knows it well
- ✅ Easy deployment to Vercel (zero config)
- ✅ TypeScript first-class support
- ✅ Built-in optimizations and SEO ready
- ✅ Can easily add API routes later for sync

**Styling:** Bootstrap 5 + CSS Modules

- ✅ Modern, clean design system you prefer
- ✅ Excellent responsive grid system
- ✅ CSS Modules for component-scoped styles
- ✅ Easy to customize without bloat

**State Management:** Zustand + React Query (TanStack Query)

- ✅ Simple, TypeScript-friendly state management
- ✅ Perfect for client-side data with localStorage persistence
- ✅ React Query handles async operations and caching elegantly
- ✅ Easy to migrate to server sync later

**Data Layer:**

- **Primary:** Browser localStorage with JSON serialization
- **Backup/History:** IndexedDB for larger datasets (completed tasks history)
- **Schema:** Zod for runtime type validation

### **Project Structure**

```
todo-app/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   ├── todo/               # Todo-specific components
│   │   └── layout/             # Layout components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities and configurations
│   │   ├── storage.ts          # localStorage/IndexedDB helpers
│   │   ├── types.ts            # TypeScript type definitions
│   │   └── validation.ts       # Zod schemas
│   ├── store/                  # Zustand stores
│   └── styles/                 # Global styles and Bootstrap customizations
├── public/
├── package.json
├── next.config.js
├── tailwind.config.js          # Optional: for utility classes
└── tsconfig.json
```

### **Core Data Model**

```typescript
// Task entity
interface Task {
  id: string; // UUID
  title: string;
  description?: string;
  status: "pending" | "completed";
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

// App state
interface TodoState {
  tasks: Task[];
  filter: "all" | "pending" | "completed";
  searchQuery: string;
  sortBy: "createdAt" | "status";
  sortOrder: "asc" | "desc";
  lastAction?: UndoAction; // For undo functionality
}
```

### **Implementation Phases**

#### **Phase 1: Core CRUD Operations (Week 1)**

- [ ] Project setup with Next.js + TypeScript + Bootstrap
- [ ] Basic task creation, editing, deletion
- [ ] Simple list view with responsive design
- [ ] localStorage persistence
- [ ] Basic styling with Bootstrap components

#### **Phase 2: Status & Organization (Week 2)**

- [ ] Task status toggle (pending/completed)
- [ ] Search functionality
- [ ] Filter by status
- [ ] Sort by date/status
- [ ] Responsive design refinements

#### **Phase 3: Enhanced UX (Week 3)**

- [ ] Undo last action functionality
- [ ] Task history (completed tasks archive)
- [ ] IndexedDB for large datasets
- [ ] Loading states and error handling
- [ ] Keyboard shortcuts

#### **Phase 4: Polish & Performance (Week 4)**

- [ ] Animations and micro-interactions
- [ ] Performance optimization
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] PWA features (offline capability, install prompt)
- [ ] Code splitting and lazy loading

### **Key Architectural Decisions**

#### **ADR 1: Next.js with App Router**

**Context:** Need modern React framework with easy deployment
**Decision:** Use Next.js 14+ with App Router
**Consequences:**

- ✅ Zero-config Vercel deployment
- ✅ Built-in TypeScript support
- ✅ Future-ready for API routes
- ⚠️ Slight learning curve for App Router vs Pages Router

#### **ADR 2: Zustand for State Management**

**Context:** Need simple, TypeScript-friendly state management
**Decision:** Use Zustand with localStorage persistence
**Consequences:**

- ✅ Minimal boilerplate vs Redux
- ✅ Excellent TypeScript integration
- ✅ Easy localStorage persistence
- ⚠️ Less ecosystem than Redux

#### **ADR 3: Bootstrap + CSS Modules**

**Context:** Want modern, clean design without Material UI
**Decision:** Bootstrap 5 + CSS Modules for component styles
**Consequences:**

- ✅ Proven responsive design system
- ✅ Component-scoped styling
- ✅ Easy customization
- ⚠️ Requires custom component wrapping

### **Deployment Strategy**

**Development:**

```bash
npm run dev          # Local development server
npm run build        # Production build
npm run start        # Production preview
```

**Production:**

- Push to GitHub repository
- Connect to Vercel (automatic deployments)
- Custom domain setup (optional)
- Environment variables for future API integration

### **Future Migration Path**

When ready to add sync/multi-device support:

1. Add API routes in Next.js (`app/api/`)
2. Replace localStorage with database calls
3. Add authentication (NextAuth.js)
4. Implement conflict resolution for offline sync
5. Use React Query for server state management

### **Getting Started Commands**

```bash
# Create Next.js project
npx create-next-app@latest todo-app --typescript --tailwind --eslint --app

# Add dependencies
npm install zustand bootstrap @types/uuid uuid zod
npm install -D @types/bootstrap

# Start development
cd todo-app && npm run dev
```
