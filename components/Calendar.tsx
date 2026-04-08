"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import ImagePanel from "./calendar/imagePanel";
import CalendarGrid from "./calendar/calendarGrid";
import EventBar from "./calendar/eventBar";
import EventBox from "./calendar/eventBox";
import { CalendarEvent, MONTH_DATA } from "./calendar/types";

const STORAGE_KEY = "planin-events";

const toISODate = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const normalizeEvent = (raw: unknown): CalendarEvent | null => {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;

  const id = typeof obj.id === "string" ? obj.id : null;
  if (!id) return null;

  const title = typeof obj.title === "string" ? obj.title : "";
  const description = typeof obj.description === "string" ? obj.description : "";
  const color = typeof obj.color === "string" ? obj.color : "#6366f1";

  const legacyDate = typeof obj.date === "string" ? obj.date : null;
  const startDate = typeof obj.startDate === "string" ? obj.startDate : legacyDate;
  const endDate = typeof obj.endDate === "string" ? obj.endDate : legacyDate;
  if (!startDate || !endDate) return null;

  const normalizedStart = startDate <= endDate ? startDate : endDate;
  const normalizedEnd = startDate <= endDate ? endDate : startDate;

  return { id, title, description, color, startDate: normalizedStart, endDate: normalizedEnd };
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored) as unknown;
      if (!Array.isArray(parsed)) return [];
      return parsed.map(normalizeEvent).filter((e): e is CalendarEvent => Boolean(e));
    } catch {
      return [];
    }
  });
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [showEventBox, setShowEventBox] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const monthTheme = useMemo(
    () => MONTH_DATA[currentDate.getMonth()].theme,
    [currentDate],
  );

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const handlePrevMonth = useCallback(() => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const handleToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const handleDateClick = useCallback((date: Date) => {
    setSelectedEventId(null);

    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date);
      setRangeEnd(null);
      setShowEventBox(false);
      return;
    }

    const start = toISODate(rangeStart);
    const end = toISODate(date);
    if (end < start) {
      setRangeEnd(rangeStart);
      setRangeStart(date);
    } else {
      setRangeEnd(date);
    }
    setShowEventBox(true);
  }, [rangeEnd, rangeStart]);

  const handleCloseEventBox = useCallback(() => {
    setShowEventBox(false);
    setRangeStart(null);
    setRangeEnd(null);
  }, []);

  const handleSaveEvent = useCallback(
    (startDate: string, endDate: string, title: string, description: string, color: string) => {
      const normalizedStart = startDate <= endDate ? startDate : endDate;
      const normalizedEnd = startDate <= endDate ? endDate : startDate;

      const newEvent: CalendarEvent = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        title,
        description,
        startDate: normalizedStart,
        endDate: normalizedEnd,
        color,
      };

      setEvents((prev) => [...prev, newEvent]);
      setShowEventBox(false);
      setRangeStart(null);
      setRangeEnd(null);
    },
    [],
  );

  const handleDeleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setSelectedEventId((prev) => (prev === id ? null : prev));
  }, []);

  const handleSelectEvent = useCallback((id: string) => {
    setSelectedEventId((prev) => (prev === id ? null : id));
    setShowEventBox(false);
    setRangeStart(null);
    setRangeEnd(null);
  }, []);

  const highlightedRange = useMemo(() => {
    if (selectedEventId) {
      const ev = events.find((e) => e.id === selectedEventId);
      if (!ev) return null;
      return { startDate: ev.startDate, endDate: ev.endDate };
    }

    if (rangeStart && rangeEnd) {
      const start = toISODate(rangeStart);
      const end = toISODate(rangeEnd);
      return start <= end ? { startDate: start, endDate: end } : { startDate: end, endDate: start };
    }

    if (rangeStart && !rangeEnd) {
      const start = toISODate(rangeStart);
      return { startDate: start, endDate: start };
    }

    return null;
  }, [events, rangeEnd, rangeStart, selectedEventId]);

  // Apply month theme as CSS custom properties (6-shade palette)
  const themeStyle = {
    "--m-50":  monthTheme[50],
    "--m-100": monthTheme[100],
    "--m-200": monthTheme[200],
    "--m-400": monthTheme[400],
    "--m-600": monthTheme[600],
    "--m-800": monthTheme[800],
    "--m-light-bg": monthTheme.lightBg,
    "--m-dark-bg":  monthTheme.darkBg,
  } as React.CSSProperties;

  return (
    <div className="calendar-wrapper" id="calendar-wrapper" style={themeStyle}>
      {/* Main calendar card */}
      <div className="calendar-card" id="calendar-card">
        {/* Calendar body */}
        <div className="calendar-body">
          {/* Left: Image Panel */}
          <ImagePanel currentDate={currentDate} />

          {/* Center: Calendar Grid */}
          <CalendarGrid
            currentDate={currentDate}
            events={events}
            highlightedRange={highlightedRange}
            onDateClick={handleDateClick}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
          />

          {/* Right: Event Bar */}
          <EventBar
            events={events}
            currentDate={currentDate}
            onDeleteEvent={handleDeleteEvent}
            selectedEventId={selectedEventId}
            onSelectEvent={handleSelectEvent}
          />
        </div>
      </div>

      {/* Event creation dialog */}
      <EventBox
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        isOpen={showEventBox}
        onClose={handleCloseEventBox}
        onSave={handleSaveEvent}
        key={
          showEventBox && rangeStart && rangeEnd
            ? `${toISODate(rangeStart)}-${toISODate(rangeEnd)}`
            : "event-box"
        }
      />
    </div>
  );
};

export default Calendar;
