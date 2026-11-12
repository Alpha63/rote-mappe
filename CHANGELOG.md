# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [2.2.0] - 2026-11-12

### Changed
- **Wizard UX:** The disruptive animated view transitions during step changes
  have been completely removed. Forward and backward navigation now changes
  steps directly without a transition.
- **Form validation:** Nested React Hook Form errors are now passed to the UI
  as stable field paths.
- **Dialogs:** Warning and backup dialogs keep keyboard focus inside the open
  dialog and restore it when the dialog closes.
- **PDF and performance:** Complete PDF data is tested across all templates and
  languages. A performance budget checks the initial JavaScript chunk.
  Reduced-motion users receive shorter animations.
- **Form coverage:** A central field inventory test ensures that every
  persisted schema field is assigned to a wizard step for validation.
- **Backup and stability:** ZIP round-trip tests, import limits, dialog
  accessibility checks, PDF worker timeouts and compatible dependency updates
  have been added or verified.

### Fixed
- **Dependency update:** The npm `edgesOut` error under npm 9 is avoided by
  using the current npm resolver for compatible lockfile updates.

## [2.1.0] - 2026-08-25

### Added
- **Testing:** Comprehensive test infrastructure with Vitest and React Testing Library was introduced. Six test suites with 53 tests now cover accessibility, view transitions, stability and the complete E2E workflow.
- **UX (Toasts):** A new responsive toast notification system for success and error messages (for example, backup errors) was added to replace blocking browser alerts.

### Changed
- **Architecture (Steps 8–10):** Wizard steps 8 (Notes), 9 (Custom Chapters) and 10 (Finish) were migrated to `react-hook-form` with `useFormContext` and `useFieldArray`. All 10 steps now consistently use `react-hook-form` and `zod` for form state and validation.
- **Architecture (Steps 8 & 9):** The legacy `useArrayField` helper was replaced with the native `useFieldArray` from `react-hook-form`.
- **Architecture (Step 10):** Form data is now accessed through `useFormContext`. The app-specific `FormContext` only controls downloads.
- **Accessibility (Forms):** All input fields (`Input`, `Select`, `Textarea`, `DocumentUpload`) were made fully semantic and accessible, including unique `id`/`htmlFor` attributes via `useId()`, `aria-describedby`, `<fieldset>`/`<legend>` for radio groups and a wrapper `<form>`.
- **Accessibility (Language):** The `<html lang="de">` attribute is now updated dynamically on language changes with `i18next` to satisfy WCAG 3.1.1 (Language of Page).
- **Local assets:** All external CDN and font requests were removed. The app now uses 100% local assets, a system font stack and PDF-14 standard fonts for maximum privacy and offline capability.
- **Code cleanup:** Dead code (`App.css`, `split_i18n.py`, Vite boilerplate logos) and unused dependencies from `package.json` were removed. `vite.config.ts` now uses native ECMAScript import attributes (`with { type: 'json' }`).

### Fixed
- **PDF preview (Step 10):** A critical performance bug that caused the PDF preview to be regenerated continuously in an infinite loop was fixed.
- **UX:** Disruptive and UI-blocking native `alert()` calls during import and PDF export were removed and replaced with integrated toast messages.

## [2.0.0] - 2026-08-01

### Added
- **Security (Backup):** Optional AES-256 encryption for backup files. Backups can now be encrypted and decrypted directly in the browser with a password.
- **Basic data:** A new **Employment** section for employer details and workplace emergency contacts was added (Step 1).
- **Basic data:** A new list for people who should **not be notified** in an emergency was added (Step 1).
- **Medical data:** A new section for **attending physicians**, such as general practitioners, dentists or specialists, was added (Step 2).
- **PDF export:** Exported PDFs now also include employment data, people not to notify and attending physicians.
- **Localization:** Complete German and English translations were added for all new form fields and PDF sections.

### Fixed
- **Backup & export:** Missing form fields were added to the `.json` backup file, including newer document uploads such as the funeral directive and previously omitted optional note fields. All entered data is now preserved during export.

### Changed
- **Performance:** The 10 wizard steps are now loaded dynamically with `React.lazy()` (code splitting), significantly reducing the app's initial load time.
- **State management:** Form state writes to `sessionStorage` are now debounced by 500 ms to improve performance.
- **Architecture:** Legacy migration logic in `FormContext.tsx` was moved to a clean helper function (`utils/migrateData.ts`).
- **i18n:** German and English translations were moved from the main file into separate files in the `src/locales/` directory to improve code organization.
- **Configuration:** The misleading `packageManager` field was removed from `package.json`.
- **Dependencies:** Various npm dependencies were updated with minor and patch releases, including Vite, React, Tailwind and ESLint.

## [1.3.1] - 2026-05-10

### Changed
- **Refactoring:** Wizard components in `WizardSteps.tsx` were cleaned up and now consistently use the extracted files from the `steps` directory.
- **Security & privacy:** A complete privacy code analysis was performed and missing build dependencies (`npm install`) were fixed. The app was verified to operate 100% locally without external API or tracking requests.

### Fixed
- **UI:** Overlapping Tailwind dark-mode classes were corrected (#15 by [@LucaNerlich]).

## [1.3.0] - 2026-04-28

### Added
- **CI:** A basic GitHub Action for continuous integration was added (#10 by [@LucaNerlich]).

### Changed
- **PWA:** `vite-pwa` was replaced with a stub service worker to resolve Chrome warnings (#13 by [@LucaNerlich]).
- **Docker:** The environment variable `PORT` in the Compose file was renamed to `HOST_PORT` (#12 by [@LucaNerlich]).
- **Refactoring:** Wizard steps were split into separate files for better maintainability (#9 by [@LucaNerlich]).
- **Cleanup:** Unused helper scripts were removed (#7 by [@LucaNerlich]).
- **Localization:** Translation strings were corrected and improved (#6 by [@LucaNerlich]).

### Fixed
- **UI (Wizard):** A duplicate CSS class (`className`) on the mobile menu button was removed (#14 by [@LucaNerlich]).
- **UI:** The missing pointer cursor (`cursor: pointer`) was added to the Welcome buttons.

## [1.2.0] - 2026-04-22

### Changed
- **Automated versioning:** The app version is now read automatically from `package.json` during the build and exposed in the frontend through Vite configuration (`import.meta.env`). A new release no longer requires manually updating the version in the code. Thanks to [@LucaNerlich] for this helpful contribution!
- **Port configuration:** The default Vite port can now be overridden through the `PORT` environment variable and listens on all network interfaces by default (`host: true`). Thanks to [@LucaNerlich] for this helpful contribution!
- **Docker & security:** The Docker setup was improved by adding a `.dockerignore` and Dockerfile caching. To avoid running as root, the image was changed to `nginxinc/nginx-unprivileged:stable-alpine`. A Docker health check was also implemented (Merge Request #2). Thanks to [@LucaNerlich] for this helpful contribution!

## [1.1.0] - 2026-04-20

### Added
- **Helpful links & templates:** New information boxes were added to **Powers of Attorney & Directives** with direct links to official templates (BMJV, Verbraucherzentrale and Friedhofsverband Sauerland). Thanks to klotzbrocken for the suggestion.
- **App version:** The current app version (v1.1.0) is now shown discreetly at the bottom of the start page and links directly to the GitHub repository. It is also included in `package.json`.
- **Sample data:** `Muster_Notfallakte_Dummy_Daten.json` was expanded with new standard documents and directives, such as a birth certificate and living will, to demonstrate the placeholder feature.

### Fixed
- **PDF export (Directives):** Placeholder pages for standard directives are now created correctly in the PDF when **Attach later as a copy** is selected.
- **PDF export (Documents):** Placeholders for standard IDs, such as driver's licenses and identity cards, are now displayed correctly in generated PDFs.
- **Docker:** The npm version was corrected from 22 to 24.
- **Build process:** The build process was fixed after an unused import caused `npm run build` to fail.

## [1.0.0] - 2026-04-18

### Added
- **Initial release:** Initial structure of the emergency dossier application.
- **Wizard navigation:** Step-by-step form for collecting basic data, contacts, medical information, digital assets and finances.
- **Local processing (privacy first):** All data is processed exclusively in the browser; no server communication takes place.
- **Backup & restore:** Entered data can be exported as a `.json` file and imported later.
- **PDF generation:** Direct export of the completed emergency dossier as a structured and formatted PDF.
- **PWA support:** The app can be installed locally as a Progressive Web App and used offline.
- **Install button:** A native **Install as local app** button is shown on the start page when supported by the browser.
- **Internationalization (i18n):** Complete German and English support with automatic language detection was implemented.
- **Performance:** Resource-intensive PDF generation was moved to a Web Worker so the user interface remains responsive during export.
- **Dark mode:** Full dark-mode support with a toggle on the Welcome page, sidebar and mobile header.
- **Markdown editor:** `@uiw/react-md-editor` was integrated into text areas for simple formatting such as bold, italic and hyperlinks.
- **PDF formatting:** The PDF generator now reads Markdown tags from text fields and renders bold and italic text as well as real, clickable hyperlinks.
