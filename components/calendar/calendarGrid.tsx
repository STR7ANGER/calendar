"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DAY_NAMES, MONTH_NAMES, CalendarEvent } from "./types";

const toISODate = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  highlightedRange: { startDate: string; endDate: string } | null;
  onDateClick: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const CalendarGrid = ({
  currentDate,
  events,
  highlightedRange,
  onDateClick,
  onPrevMonth,
  onNextMonth,
  onToday,
}: CalendarGridProps) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();

  // Calculate grid
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Build cells
  const cells: Array<{
    day: number;
    isCurrentMonth: boolean;
    date: Date;
  }> = [];

  // Previous month trailing days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    cells.push({
      day,
      isCurrentMonth: false,
      date: new Date(year, month - 1, day),
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      day,
      isCurrentMonth: true,
      date: new Date(year, month, day),
    });
  }

  // Next month leading days (fill to complete last row)
  const remaining = 42 - cells.length; // 6 rows × 7 cols
  for (let day = 1; day <= remaining; day++) {
    cells.push({
      day,
      isCurrentMonth: false,
      date: new Date(year, month + 1, day),
    });
  }

  // If only 5 rows needed, trim
  const totalRows = cells.length > 35 ? 6 : 5;
  const visibleCells = cells.slice(0, totalRows * 7);

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const dateStr = toISODate(date);
    return events.filter((e) => e.startDate <= dateStr && dateStr <= e.endDate);
  };

  const isToday = (date: Date): boolean => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isInHighlightedRange = (date: Date): boolean => {
    if (!highlightedRange) return false;
    const iso = toISODate(date);
    return highlightedRange.startDate <= iso && iso <= highlightedRange.endDate;
  };

  const isRangeStart = (date: Date): boolean => {
    if (!highlightedRange) return false;
    return toISODate(date) === highlightedRange.startDate;
  };

  const isRangeEnd = (date: Date): boolean => {
    if (!highlightedRange) return false;
    return toISODate(date) === highlightedRange.endDate;
  };

  return (
    <div className="calendar-grid" id="calendar-grid">
      {/* Header */}
      <div className="calendar-grid__header">
        <h3 className="calendar-grid__title">
          {MONTH_NAMES[month]} {year}
        </h3>
        <div className="calendar-grid__nav">
          <button
            className="calendar-grid__nav-btn"
            onClick={onToday}
            id="btn-today"
            aria-label="Go to today"
          >
            Today
          </button>
          <button
            className="calendar-grid__nav-btn calendar-grid__nav-btn--icon"
            onClick={onPrevMonth}
            id="btn-prev-month"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="calendar-grid__nav-btn calendar-grid__nav-btn--icon"
            onClick={onNextMonth}
            id="btn-next-month"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Day names */}
      <div className="calendar-grid__days">
        {DAY_NAMES.map((day) => (
          <div key={day} className="calendar-grid__day-name">
            {day}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div
        className="calendar-grid__cells"
        style={{ gridTemplateRows: `repeat(${totalRows}, 1fr)` }}
      >
        {visibleCells.map((cell, idx) => {
          const dayEvents = getEventsForDate(cell.date);
          const todayClass = isToday(cell.date) ? " calendar-grid__cell--today" : "";
          const rangeClass = isInHighlightedRange(cell.date) ? " calendar-grid__cell--range" : "";
          const rangeStartClass = isRangeStart(cell.date) ? " calendar-grid__cell--range-start" : "";
          const rangeEndClass = isRangeEnd(cell.date) ? " calendar-grid__cell--range-end" : "";
          const outsideClass = !cell.isCurrentMonth ? " calendar-grid__cell--outside" : "";

          return (
            <button
              key={idx}
              className={`calendar-grid__cell${todayClass}${rangeClass}${rangeStartClass}${rangeEndClass}${outsideClass}`}
              onClick={() => onDateClick(cell.date)}
              id={`cell-${cell.date.toISOString().split("T")[0]}`}
              aria-label={`${cell.day} ${MONTH_NAMES[cell.date.getMonth()]} ${cell.date.getFullYear()}`}
            >
              <span className="calendar-grid__cell-number">{cell.day}</span>
              {dayEvents.length > 0 && (
                <div className="calendar-grid__cell-dots">
                  {dayEvents.slice(0, 3).map((ev) => (
                    <span
                      key={ev.id}
                      className="calendar-grid__cell-dot"
                      style={{ backgroundColor: ev.color }}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
