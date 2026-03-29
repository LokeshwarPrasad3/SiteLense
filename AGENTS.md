# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 15 App Router project. Route entry points live in `app/`, including the landing page in `app/page.tsx`, scan flow in `app/scan`, results UI in `app/result`, and server endpoints in `app/api`. Reusable UI belongs in `components/` (`ui`, `shared`, and `layouts`). Feature-specific code lives in `features/`, shared hooks in `hooks/`, lightweight helpers in `lib/` and `utils/`, global styles in `styles/globals.css`, and static assets in `public/`. SST deployment config is in `sst.config.ts`.

## Build, Test, and Development Commands

Use the scripts in `package.json`:

- `npm run dev` starts the local Next.js dev server.
- `npm run build` creates the production build.
- `npm run start` serves the built app locally.
- `npm run lint` runs ESLint across the repository.
- `npm run format` runs Prettier on all files.

CI uses Bun (`bun install`, `bun run build`), so keep lockfile changes intentional when updating dependencies.

## Coding Style & Naming Conventions

Follow `.editorconfig` and Prettier: 2-space indentation, LF line endings, 100-character line width, semicolons, and single quotes. Tailwind classes are auto-sorted by `prettier-plugin-tailwindcss`. Use PascalCase for React components (`ScanForm.tsx`), camelCase for hooks and utilities (`usePdfExport.ts`), and keep route folders lowercase to match URL paths. Prefer colocating feature-only components under `features/<feature-name>`.

## Testing Guidelines

There is currently no automated test suite checked in. Before opening a PR, run `npm run lint` and `npm run build` as the minimum validation baseline. If you add tests, keep them close to the feature using `*.test.ts` or `*.test.tsx` naming and document the new command in `package.json`.

## Commit & Pull Request Guidelines

Recent history favors short Conventional Commit style messages such as `feat(ui): ...`, `fix(api): ...`, and `ui: ...`. Keep commits scoped to one change. PRs should include a concise summary, linked issue or task when relevant, and screenshots or screen recordings for UI changes. Note any env var or deployment impact explicitly.

## Security & Configuration Tips

Keep secrets in `.env` and never commit real credentials. Review changes to `app/api` and `sst.config.ts` carefully because they affect external access and deployment behavior.
