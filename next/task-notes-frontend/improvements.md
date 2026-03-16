## UI Improvements Summary (Task Notes App)

### Files modified
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/tasks/page.tsx`
- `src/components/Modal.tsx`
- `src/components/TaskForm.tsx`
- `src/components/TaskCard.tsx`
- `src/components/TaskList.tsx`
- `src/components/LoadingSpinner.tsx`
- `src/components/Counter.tsx`
- `src/components/ErrorBoundary.tsx`

### What was improved
- **Navbar/layout**: cleaner sticky header, better spacing, centered content width, and a consistent background/footer.
- **Modal (Create Task)**:
  - added a clear title ("Create Task") and cleaner card styling
  - labeled inputs with consistent spacing and visible borders
  - aligned footer buttons: **Cancel** (gray) and **Add Task** (purple)
- **Buttons**:
  - standardized styles for primary (purple), success (green), danger (red), and secondary (gray)
  - consistent padding, rounded corners, and hover/focus states
- **Task cards**:
  - improved card spacing and readability
  - moved actions to a horizontal row at the bottom right: **Toggle** + **Delete**
- **Inputs**:
  - consistent input borders, padding, rounded corners, and focus styling
  - improved search input styling
- **Task creation feedback**: added a small success message (`✔ Task created successfully`) that disappears after a few seconds.
- **Counter section**: updated spacing and button styling to match the rest of the UI.

### New feature: Task persistence (localStorage)
- Tasks are loaded from `localStorage` on page load (when available).
- Tasks are saved back to `localStorage` whenever the tasks state changes.
- Refreshing the page keeps your created tasks.

### Dynamic Routing and Error Handling
- **Dynamic task route**: added `src/app/tasks/[id]/page.tsx` to display a simple task details view using the URL `id`.
- **Task links**: task titles now link to their detail pages at `/tasks/{id}`.
- **Catch-all route**: added `src/app/categories/[...slug]/page.tsx` to render all category path segments.
- **Loading UI**: added `src/app/tasks/loading.tsx` with an `animate-pulse` skeleton layout.
- **Error boundary**: added `src/app/tasks/error.tsx` with a friendly message and a **Retry** button using `reset()`.
- **Not found page**: added `src/app/tasks/not-found.tsx` for invalid task IDs and a link back to `/tasks`.

### Fix: Task loading priority (localStorage vs API)
- Prevented `localStorage` saved value `[]` (empty array) from overwriting tasks loaded from `/api/tasks`.
- Updated loading logic to use this priority:
  - if `localStorage` has a **non-empty** tasks array → load it
  - otherwise → fetch from `/api/tasks` and then persist to `localStorage`

### Metadata and SEO
- **Static metadata**: added page-level metadata for Home and About pages (title + description + Open Graph).
- **Tasks metadata**: added route-level metadata for `/tasks` via `src/app/tasks/layout.tsx`.
- **Dynamic metadata**: added `generateMetadata` for `src/app/tasks/[id]/page.tsx` so titles/descriptions update based on task ID.
- **Open Graph tags**: included basic Open Graph title/description for social sharing.

### Task ID Implementation
- Tasks now include a unique `id` field in the task model.
- Task IDs are used in links for dynamic routing at `/tasks/{id}`.
- New tasks generate IDs using `Date.now().toString()`.
- Dynamic route `src/app/tasks/[id]/page.tsx` now loads tasks from `localStorage` and displays the real task details (title, description, year, and status) for the matching ID.
- Dynamic task page state handling was simplified to resolve `params.id` first and update task state once per `id` change, avoiding React effect state warnings.

### Drill Set 1: shadcn/ui setup
- Initialized shadcn/ui in this Next.js + TypeScript project with CSS variables enabled and `components.json` updated for `src/...` paths.
- Added UI components in `src/components/ui/`: `Button`, `Card`, `Input`, and `Label`.
- Replaced plain HTML in key task screens:
  - `button` -> `Button`
  - task container `div` -> `Card`
  - `input` -> `Input`
  - form `label` -> `Label`
- Updated these files for the UI layer only: `src/app/tasks/page.tsx`, `src/components/TaskCard.tsx`, and `src/components/TaskForm.tsx`.
- Benefits for beginners: reusable UI blocks, cleaner code, and a more consistent default design without changing existing task logic.

