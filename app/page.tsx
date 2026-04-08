"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import Calendar from "@/components/Calendar";
import { MONTH_DATA } from "@/components/calendar/types";

export default function Page() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());

  useEffect(() => setMounted(true), []);

  const handleMonthChange = useCallback((monthIndex: number) => {
    setCurrentMonthIndex(monthIndex);
  }, []);

  const bgImage = MONTH_DATA[currentMonthIndex]?.image ?? "/january.png";

  return (
    <main className="page-container" id="page-container">
      {/* Blurred month background image */}
      <div className="page-bg-blur" aria-hidden="true">
        <img
          key={bgImage}
          src={bgImage}
          alt=""
          className="page-bg-blur__img"
        />
        <div className="page-bg-blur__overlay" />
      </div>

      <header className="page-header" id="page-header">
        <h1 className="page-logo">
          Plan<span className="page-logo__dot">.</span>in
        </h1>
      </header>

      {mounted && (
        <button
          className="theme-toggle"
          id="theme-toggle"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      )}

      <Calendar onMonthChange={handleMonthChange} />
    </main>
  );
}
