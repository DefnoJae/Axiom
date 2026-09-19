# AXIOM

AXIOM is a desktop-first academic operating system for university students. Milestone 1 delivers the frontend foundation: a premium desktop shell, course and material management surfaces, interactive weekly planning, mock AI study experiences, academic dashboards, and persistent appearance preferences.

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Verification

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Milestone 1 scope

- Dashboard, Courses, Tasks, Planner, AI Tutor, Practice, Grades, Progress, Drive, Formula Bank, and Settings routes
- Collapsible desktop navigation and Ctrl/Cmd + K command palette
- Typed centralized mock data and reusable UI components
- Accent color, glow, wallpaper, blur, overlay, and panel-transparency preferences in localStorage
- Planner event create, edit, delete, detail, and mock AI week generation
- Responsive desktop layouts and reduced-motion support

All academic data, AI responses, Drive content, and planner generation are mocked. Authentication, Google Drive, Gemini, Supabase, and production backend services are intentionally out of scope for this milestone.
