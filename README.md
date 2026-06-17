# Gold Exchange — Frontend

Production-grade React frontend built with Vite, TypeScript, Tailwind CSS v4 and shadcn/ui.

## Tech Stack

| Concern           | Library                 |
| ----------------- | ----------------------- |
| Build tool / dev  | Vite                    |
| Language          | TypeScript              |
| UI library        | React 19                |
| Styling           | Tailwind CSS v4         |
| Component library | shadcn/ui (Radix + CVA) |
| Icons             | lucide-react            |
| Animations        | Framer Motion           |
| Routing           | React Router DOM        |
| Server state      | TanStack Query          |
| HTTP client       | Axios                   |
| Forms             | React Hook Form         |
| Validation        | Zod                     |
| Lint / Format     | ESLint + Prettier       |

## Getting Started

```bash
npm install            # install dependencies
cp .env.example .env   # create your local env file (optional; defaults exist)
npm run dev            # start the dev server (http://localhost:5173)
```

## Scripts

| Script                 | Description                           |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Start the Vite dev server with HMR    |
| `npm run build`        | Type-check and build for production   |
| `npm run preview`      | Preview the production build locally  |
| `npm run lint`         | Run ESLint                            |
| `npm run lint:fix`     | Run ESLint and auto-fix               |
| `npm run format`       | Format the codebase with Prettier     |
| `npm run format:check` | Check formatting without writing      |
| `npm run typecheck`    | Run the TypeScript compiler (no emit) |

## Adding shadcn/ui Components

```bash
npx shadcn@latest add button
```

Components are generated into `src/components/ui`.

## Path Aliases

`@/` resolves to `src/`, e.g. `import { cn } from '@/lib/utils'`.

## Project Structure

```
src/
├── assets/            # static assets (images, fonts)
├── components/
│   ├── ui/            # shadcn/ui primitives
│   └── common/        # shared, reusable app components
├── config/            # app config & validated env (env.ts)
├── features/          # feature modules (self-contained)
├── hooks/             # shared React hooks
├── layouts/           # layout/shell components
├── lib/               # singletons & utilities (axios, query client, cn)
├── pages/             # route-level pages
├── providers/         # global context providers
├── router/            # route configuration
├── services/          # API service layer
└── types/             # shared TypeScript types
```
