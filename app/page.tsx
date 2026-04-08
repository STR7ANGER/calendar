"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import Calendar from "@/components/Calendar";

export default function Page() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <main className="page-container" id="page-container">
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

      <Calendar />
    </main>
  );
}