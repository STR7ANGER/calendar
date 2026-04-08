# Plan.in — Seasonal calendar

A single-page **monthly calendar** web app where each month gets its own **artwork**, **quote**, and **color theme**. You can create **multi-day events** by picking a start and end date on the grid; events are listed beside the calendar and persist in the browser via **localStorage**. **Light**, **dark**, and **system** appearance are supported.

The Next.js application lives in [`next-app/`](./next-app/).

## Features

- **Month navigation** — Previous / next month and a **Today** control to jump to the current month.
- **Event creation** — Click a day to set the range start, then another day to set the end. A dialog opens to add **title**, optional **description**, **date range** (editable), and a **color** from a fixed palette.
- **Grid feedback** — Days in the selected range or in a **highlighted event** show range styling; up to three **color dots** per cell indicate overlapping events.
- **Event sidebar** — Lists events that overlap the visible month, sorted by start date. Expand cards to read descriptions; **delete** removes an event. Selecting an event highlights its span on the grid.
- **Seasonal UI** — The left panel shows a month image and quote; the calendar shell picks up CSS variables from a per-month palette (see `MONTH_DATA` in [`next-app/components/calendar/types.ts`](./next-app/components/calendar/types.ts)).
- **Persistence** — Events are saved under the key `planin-events` in `localStorage` (JSON array). Clearing site data removes them; there is no backend.

## Tech stack

| Layer | Choice |
|--------|--------|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| UI | React 19, [Tailwind CSS](https://tailwindcss.com/) v4, custom layout/styles in `globals.css` |
| Components | [shadcn/ui](https://ui.shadcn.com/) (e.g. `Button`), [Radix UI](https://www.radix-ui.com/), [Lucide](https://lucide.dev/) icons |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) (class-based, system default) |
| Fonts | [Inter](https://fonts.google.com/specimen/Inter), Geist Mono (via `next/font`) |

Dev tooling includes TypeScript, ESLint, Prettier (with Tailwind plugin), and Turbopack for `next dev`.

## Project layout

```
calender/
└── next-app/
    ├── app/
    │   ├── layout.tsx      # Root layout, fonts, ThemeProvider
    │   ├── page.tsx        # Home: header, theme toggle, Calendar
    │   └── globals.css     # Global and component-oriented styles
    ├── components/
    │   ├── Calendar.tsx
    │   ├── theme-provider.tsx
    │   ├── calendar/
    │   │   ├── types.ts          # CalendarEvent, MONTH_DATA, EVENT_COLORS
    │   │   ├── calendarGrid.tsx  # 5–6 row grid, dots, range/today styles
    │   │   ├── eventBar.tsx      # Monthly event list, expand, delete
    │   │   ├── eventBox.tsx      # Modal form for new events
    │   │   └── imagePanel.tsx   # Month image + quote
    │   └── ui/                  # shadcn primitives
    ├── lib/utils.ts        # `cn()` helper
    └── public/             # Month images (e.g. january.png … december.png)
```

## Getting started

**Requirements:** Node.js 18+ (20+ recommended for Next 16).

```bash
cd next-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server uses Turbopack (`next dev --turbopack`).

### Other scripts

| Command | Purpose |
|---------|---------|
| `npm run build` | Production build |
| `npm start` | Run production server (after `build`) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier for `*.ts` / `*.tsx` |
| `npm run typecheck` | `tsc --noEmit` |

## Customizing months

1. **Images** — Add or replace files in `next-app/public/` and update the `image` paths in `MONTH_DATA` inside [`next-app/components/calendar/types.ts`](./next-app/components/calendar/types.ts).
2. **Quotes & colors** — Edit the `quote` and `theme` fields on each month entry in the same file. Theme values are exposed as CSS variables on the calendar wrapper (e.g. `--m-400`, `--m-light-bg`).

## Event data shape

Stored events are objects with:

- `id` — string  
- `title`, `description` — strings  
- `startDate`, `endDate` — `YYYY-MM-DD` (inclusive range)  
- `color` — hex (or any CSS color string)

Legacy entries that used a single `date` field are normalized to `startDate` / `endDate` on load.

## License

This project is private / personal unless you add a license file.
