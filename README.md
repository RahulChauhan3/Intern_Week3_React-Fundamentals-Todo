# React To-Do App (Vite)

**Task:** Week 3 – React fundamentals
Create a React (Vite) app with components, props and state, and convert the existing to-do app to React.

## Technologies and tools used

| Tool | Purpose |
| --- | --- |
| React 19 | UI components, props, state, hooks |
| Vite | Dev server and production build |
| prop-types | Runtime validation of component props |
| CSS (custom properties) | Styling, responsive layout, no UI framework |
| localStorage | Saving tasks between visits |

## Project features

- Add tasks (with validation for empty input)
- Mark a task done or active, or mark all at once
- Edit a task: double-click it or press **Edit**; `Enter` saves, `Esc` cancels; emptying a task deletes it
- Delete a task
- Filter by **All / Active / Completed**
- **Clear completed** in one click
- Live progress indicator and task counter
- Tasks persist across page reloads
- Responsive layout (desktop and mobile), keyboard accessible, labelled form controls

## How React fundamentals are used

**Components** (`src/components/`)

```
App
├── Header      – date, title, progress bar
├── TodoForm    – controlled input + validation
├── TodoList    – renders the list or an empty state
│   └── TodoItem – checkbox, inline edit, delete
└── Footer      – counter, filter buttons, clear completed
```

**Props** – data flows down (`todos`, `filter`, `remaining`) and events flow up as callbacks (`onAdd`, `onToggle`, `onEdit`, `onDelete`). Every component declares its props with `PropTypes`.

**State** – `App` owns `todos` and `filter` with `useState`. `TodoForm` owns its input text and error; `TodoItem` owns its editing flag and draft text. Derived values (`visibleTodos`, `remaining`) are computed from state instead of being stored twice.

**Hooks** – `useState`, `useEffect` (focus edit field, persist to storage), `useRef`, `useMemo`, and a custom `useLocalStorage` hook (`src/hooks/useLocalStorage.js`).

## Installation requirements

- [Node.js](https://nodejs.org/) 18 or newer
- npm (comes with Node.js)

## Steps to run the project

```bash
cd Source_Code
npm install
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173).

Other commands:

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Deployment

The `dist/` folder is a static site. On **Vercel** or **Netlify**: import the GitHub repository, set the root directory to `Source_Code`, build command `npm run build`, output directory `dist`.

## Output description

Screenshots are in the `Output/` folder:

| File | Shows |
| --- | --- |
| `01-empty-state.png` | First load with no tasks |
| `02-validation-error.png` | Error shown when adding an empty task |
| `03-tasks-added.png` | Tasks added, two completed, progress bar |
| `04-filter-completed.png` | "Completed" filter applied |
| `05-mobile-view.png` | Responsive mobile layout |

## Folder structure

```
Internship_Task/
├── Source_Code/
│   ├── public/favicon.svg
│   ├── src/
│   │   ├── components/   (Header, TodoForm, TodoList, TodoItem, Footer)
│   │   ├── hooks/useLocalStorage.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── Output/               (screenshots)
└── README.md
```

## Live demo

Live link: _add your deployed URL here_
GitHub: _add your repository URL here_
