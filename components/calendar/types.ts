export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO date string (YYYY-MM-DD)
  endDate: string; // ISO date string (YYYY-MM-DD)
  color: string;
}

export const EVENT_COLORS = [
  "#6366f1", // indigo
  "#f43f5e", // rose
  "#10b981", // emerald
  "#f59e0b", // amber
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#14b8a6", // teal
];

export interface MonthTheme {
  /** 5-color palette from lightest to darkest */
  50: string;   // very light tint
  100: string;  // light
  200: string;  // medium-light
  400: string;  // medium (primary accent)
  600: string;  // dark
  800: string;  // very dark

  /** Light mode background tint */
  lightBg: string;
  /** Dark mode background tint */
  darkBg: string;
}

export interface MonthData {
  image: string;
  quote: string;
  theme: MonthTheme;
}

export const MONTH_DATA: Record<number, MonthData> = {
  // January — Icy Blue / Indigo
  0: {
    image: "/january.png",
    quote: "New beginnings are often disguised as painful endings.",
    theme: {
      50:  "#eef2ff",
      100: "#c7d2fe",
      200: "#a5b4fc",
      400: "#6366f1",
      600: "#4f46e5",
      800: "#3730a3",
      lightBg: "rgba(99, 102, 241, 0.05)",
      darkBg:  "rgba(99, 102, 241, 0.08)",
    },
  },
  // February — Romantic Rose
  1: {
    image: "/february.png",
    quote: "Love is composed of a single soul inhabiting two bodies.",
    theme: {
      50:  "#fff1f2",
      100: "#fecdd3",
      200: "#fda4af",
      400: "#f43f5e",
      600: "#e11d48",
      800: "#9f1239",
      lightBg: "rgba(244, 63, 94, 0.05)",
      darkBg:  "rgba(244, 63, 94, 0.08)",
    },
  },
  // March — Fresh Sky Blue
  2: {
    image: "/march.png",
    quote: "Spring adds new life and new beauty to all that is.",
    theme: {
      50:  "#f0f9ff",
      100: "#bae6fd",
      200: "#7dd3fc",
      400: "#38bdf8",
      600: "#0284c7",
      800: "#075985",
      lightBg: "rgba(56, 189, 248, 0.05)",
      darkBg:  "rgba(56, 189, 248, 0.08)",
    },
  },
  // April — Spring Green
  3: {
    image: "/april.png",
    quote: "April hath put a spirit of youth in everything.",
    theme: {
      50:  "#ecfdf5",
      100: "#a7f3d0",
      200: "#6ee7b7",
      400: "#34d399",
      600: "#059669",
      800: "#065f46",
      lightBg: "rgba(52, 211, 153, 0.05)",
      darkBg:  "rgba(52, 211, 153, 0.08)",
    },
  },
  // May — Lavender Purple
  4: {
    image: "/may.png",
    quote: "The world is full of magical things patiently waiting.",
    theme: {
      50:  "#faf5ff",
      100: "#e9d5ff",
      200: "#d8b4fe",
      400: "#a855f7",
      600: "#9333ea",
      800: "#6b21a8",
      lightBg: "rgba(168, 85, 247, 0.05)",
      darkBg:  "rgba(168, 85, 247, 0.08)",
    },
  },
  // June — Ocean Teal
  5: {
    image: "/june.png",
    quote: "And so the adventure begins under summer skies.",
    theme: {
      50:  "#f0fdfa",
      100: "#99f6e4",
      200: "#5eead4",
      400: "#14b8a6",
      600: "#0d9488",
      800: "#115e59",
      lightBg: "rgba(20, 184, 166, 0.05)",
      darkBg:  "rgba(20, 184, 166, 0.08)",
    },
  },
  // July — Sunflower Gold
  6: {
    image: "/july.png",
    quote: "Sunshine is the best medicine for the soul.",
    theme: {
      50:  "#fffbeb",
      100: "#fde68a",
      200: "#fcd34d",
      400: "#f59e0b",
      600: "#d97706",
      800: "#92400e",
      lightBg: "rgba(245, 158, 11, 0.05)",
      darkBg:  "rgba(245, 158, 11, 0.08)",
    },
  },
  // August — Tropical Emerald
  7: {
    image: "/august.png",
    quote: "Summer afternoon — the two most beautiful words.",
    theme: {
      50:  "#ecfdf5",
      100: "#bbf7d0",
      200: "#86efac",
      400: "#22c55e",
      600: "#16a34a",
      800: "#166534",
      lightBg: "rgba(34, 197, 94, 0.05)",
      darkBg:  "rgba(34, 197, 94, 0.08)",
    },
  },
  // September — Warm Amber
  8: {
    image: "/september.png",
    quote: "Life starts all over again when it gets crisp in the fall.",
    theme: {
      50:  "#fffbeb",
      100: "#fed7aa",
      200: "#fdba74",
      400: "#f97316",
      600: "#ea580c",
      800: "#9a3412",
      lightBg: "rgba(249, 115, 22, 0.05)",
      darkBg:  "rgba(249, 115, 22, 0.08)",
    },
  },
  // October — Crimson Red
  9: {
    image: "/october.png",
    quote: "Every leaf speaks bliss to me, fluttering from the autumn tree.",
    theme: {
      50:  "#fef2f2",
      100: "#fecaca",
      200: "#fca5a5",
      400: "#ef4444",
      600: "#dc2626",
      800: "#991b1b",
      lightBg: "rgba(239, 68, 68, 0.05)",
      darkBg:  "rgba(239, 68, 68, 0.08)",
    },
  },
  // November — Earthy Brown
  10: {
    image: "/november.png",
    quote: "Be thankful for what you have; you'll end up having more.",
    theme: {
      50:  "#fdf8f0",
      100: "#f5deb3",
      200: "#d4a76a",
      400: "#b07d3a",
      600: "#92400e",
      800: "#6b2f07",
      lightBg: "rgba(176, 125, 58, 0.05)",
      darkBg:  "rgba(176, 125, 58, 0.08)",
    },
  },
  // December — Frosty Sapphire
  11: {
    image: "/december.png",
    quote: "What good is the warmth of summer, without the cold of winter.",
    theme: {
      50:  "#eff6ff",
      100: "#bfdbfe",
      200: "#93c5fd",
      400: "#3b82f6",
      600: "#2563eb",
      800: "#1e40af",
      lightBg: "rgba(59, 130, 246, 0.05)",
      darkBg:  "rgba(59, 130, 246, 0.08)",
    },
  },
};

export const MONTH_NAMES = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
