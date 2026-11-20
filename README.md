# BatchLog

BatchLog is a calorie tracker built for people who meal prep. Instead of logging every ingredient each time you eat, you log the batch once: weigh the cooked food in the pot, then log each portion by weight, by a saved container, or by weighing what's left. When the batch is gone, close it and see how much of it you actually logged.

Final project for CS 3484 (GUI Programming), Northeastern University.

## Team

| Name             | Role                                    |
| ---------------- | --------------------------------------- |
| Rico de Guzman   | Project Lead, Task Tracker, Contributor |
| Ethan Dsouza     | Contributor                             |
| Yuvaraj Goenka   | Contributor                             |
| Jordan Singleton | Contributor                             |
| Rhyam Jain       | Contributor                             |

## Run it

Requires [Node.js](https://nodejs.org/) 24 (LTS) or 22.12+. Odd-numbered versions such as Node 25 are not supported by Vitest.

```bash
git clone https://github.com/rdeguz22/batchlog.git
cd batchlog
npm install
npm run dev
```

Then open the link Vite prints (http://localhost:5173/batchlog/).

| Command             | What it does                                                  |
| ------------------- | ------------------------------------------------------------- |
| `npm run dev`       | Starts the dev server with live reload                        |
| `npm run build`     | Type-checks, then builds the static site into `dist/`         |
| `npm run typecheck` | Runs the TypeScript compiler without building                 |
| `npm test`          | Runs the unit tests (Vitest)                                  |
| `npm run e2e`       | Runs the end-to-end tests (Playwright) in Chromium and WebKit |
| `npm run lint`      | Checks the code with ESLint and Prettier                      |
| `npm run format`    | Formats the code with Prettier                                |

Before the first `npm run e2e`, install the test browsers once with `npx playwright install`.

## How it's built

React 18 and TypeScript, bundled with Vite. There is no server and no external API: all data is saved in the browser's localStorage, and food values come from a bundled `foods.json` (USDA FoodData Central).

The app uses React components for the view and one Flux-style reducer for state. Navigation follows our [state diagram](docs/state-diagram.png) exactly.

```
src/
├─ main.tsx, App.tsx      Entry point; App owns useReducer and runs the effects
├─ model/                 Pure TypeScript, no React: nutrition math, macros, schedule,
│                         validation, logging methods, food lookups, storage, clock
├─ state/
│  ├─ transitions.ts      Screens S1–S12 and transitions T1–T61 from the state diagram
│  └─ appReducer.ts       (state, action) -> next state; the only code that changes data
├─ hooks/                 usePersist, useHashBack, useToday, useFocusHeading
├─ screens/               One React component per screen (S1–S12)
├─ components/            Shared pieces: Header, Gauge, BottomNav, ErrorMessage, FoodSearchList
└─ data/foods.json
tests/
├─ unit/                  Vitest tests for the model and reducer, named by requirement ID
└─ e2e/                   Playwright tests for full user flows
docs/                     State diagram and architecture figures
```

Data flows one way. A screen calls `dispatch({ type: 'T44', grams: 410, ... })`, `appReducer` checks that T44 is an allowed transition from the current screen, calls the model, and returns the next state. React re-renders what changed, and `usePersist` saves the data. Screens never change data or open other screens themselves. See `docs/data_flow.png` and `docs/component_diagram.png`.

## Tests

Our requirements (F1–F59, D1–D8, I1–I13, C1–C5 in the requirements specification) are the test plan, and each test is named after the requirement it checks. Requirements that aren't built yet are listed as `todo` in `tests/unit/todo.test.ts` and `fixme` in `tests/e2e/`. When you build one, move its test into a real test file.

## Contributing

1. Pick an issue and assign yourself.
2. Branch from `main`: `feat/S8-batch-screen` or `fix/T45-portion-error`.
3. Keep the reducer pure: no localStorage, clock, or hashing inside it. Pass what it needs in the action.
4. Open a pull request that lists the states and transitions it covers. One teammate reviews before it merges.
5. `npm test` and `npm run lint` must pass.

## Known limitations

- Accounts exist only on the device and browser where they were created. There is no server, so data does not sync between devices (C4).
- Clearing browser data deletes all saved batches.
- Password hashing uses the browser's `crypto.subtle`, which only works on HTTPS or localhost, so the built site must be served over HTTPS.
