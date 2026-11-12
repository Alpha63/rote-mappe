# Copilot instructions for `rote-mappe`

## Project commands

Install dependencies with `npm ci` (or `npm install` for local development).

- `npm run dev` — start the Vite development server on port 5173; `PORT` overrides the port.
- `npm run build` — run the TypeScript project build and create the production bundle in `dist/`.
- `npm run lint` — run ESLint across the repository.
- `npm run test` — run the full Vitest suite once in the configured `jsdom` environment.
- `npx vitest run tests/<file>.test.tsx` — run one test file.
- `npx vitest run tests/<file>.test.tsx -t "test name"` — run one named test.
- `npm run preview` — serve the built `dist/` output locally.
- `docker compose up --build` — build and serve the production image on `http://localhost:8080` (override the host port with `HOST_PORT`).

CI runs `npm ci`, `npm run lint`, and `npm run build` on pushes to `main` and pull requests. The CI workflow does not currently run Vitest, so run the test suite locally for behavior changes.

## Architecture

- This is a client-only React 19 + TypeScript + Vite PWA. There is no backend or database; sensitive form data is processed in the browser.
- `src/App.tsx` switches between the welcome/import screen and the multi-step wizard. `src/components/Wizard.tsx` owns step navigation, view-transition behavior, and the step components under `src/components/steps/`.
- `src/FormContext.tsx` combines React context with React Hook Form and the Zod resolver. The form schema in `src/schema.ts` is the validation contract; shared data types and defaults live in `src/types.ts`.
- Form state is periodically kept in `sessionStorage` under `notfallakte_data`, so a reload can restore an in-progress record while closing the browser tab removes the session data. Imported data passes through `migrateData()` to normalize older backup shapes before entering the form.
- `src/i18n.ts` configures i18next with German and English resources. User-visible strings should use translation keys from `src/locales/de.ts` and `src/locales/en.ts`, and language changes also update `document.documentElement.lang`.
- PDF generation is split into domain sections under `src/utils/pdf/`, coordinated by `src/utils/pdfGenerator.ts` and `PdfBuilder`. `src/utils/pdfWorker.ts` and `pdfWorkerWrapper.ts` run generation in a module Web Worker so large exports do not block the UI. `exportGenerator.ts` packages the PDF, uploaded document data, and either a JSON backup or encrypted backup into a ZIP download.
- Backup encryption in `src/utils/crypto.ts` uses Web Crypto PBKDF2-derived AES-GCM keys. Keep encrypted import/export behavior compatible with the existing backup format.
- `vite-plugin-pwa` generates the manifest and service-worker behavior. The Docker image builds the static `dist/` output and serves it with unprivileged NGINX on port 8080.

## Repository-specific conventions

- Preserve backward compatibility for saved data. When the form shape changes, update `migrateData()` and defaults rather than assuming every imported JSON file is current.
- Keep validation aligned across `schema.ts`, `types.ts`, and the form components. The schema contains nested collections for contacts, accounts, documents, medical data, contracts, vehicles, pets, and custom chapters.
- Maintain accessible form semantics: labels must point to controls, grouped options use `fieldset`/`legend`, validation errors expose `role="alert"` and the appropriate `aria-*` links, and wizard forms remain `noValidate` because navigation implements its own warning/validation flow.
- Keep the application local-first. Do not add remote fonts, analytics, CDN dependencies, or network storage for user data. Assets referenced by the app and PDF templates should remain local.
- Keep user-facing text translatable; avoid hard-coding new UI strings in components when a locale key is appropriate.
- PDF sections should use the existing `PdfBuilder` helpers and template configuration rather than drawing directly with duplicated layout logic. Preserve the table-of-contents/chapter ordering established in `pdfGenerator.ts`.
- Uploaded documents are represented as data URLs in form state and are copied into categorized `Uploads/` folders by ZIP export. Preserve safe filenames and existing backup file names when changing export behavior.
- Tests live in `tests/` and use Vitest, React Testing Library, `user-event`, and the shared `tests/setup.ts`. Existing suites cover end-to-end wizard/import flows, accessibility semantics, view transitions, cleanup/schema migration, and local-asset guarantees; follow those boundaries when adding focused coverage.
- TypeScript is strict with unused locals/parameters and no unchecked side-effect imports. ESLint uses the flat config in `eslint.config.js`, including React Hooks and React Refresh rules.
