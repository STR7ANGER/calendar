"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, Trash2 } from "lucide-react";
import { CalendarEvent, MONTH_NAMES } from "./types";

interface EventBarProps {
  events: CalendarEvent[];
  currentDate: Date;
  onDeleteEvent: (id: string) => void;
  selectedEventId: string | null;
  onSelectEvent: (id: string) => void;
}

const toISODate = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const EventBar = ({
  events,
  currentDate,
  onDeleteEvent,
  selectedEventId,
  onSelectEvent,
}: EventBarProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthStart = toISODate(new Date(year, month, 1));
  const monthEnd = toISODate(new Date(year, month + 1, 0));

  // Filter events that overlap the current month
  const monthEvents = events
    .filter((e) => {
      return e.startDate <= monthEnd && e.endDate >= monthStart;
    })
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr + "T00:00:00");
    return `${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
  };

  const formatRange = (startDate: string, endDate: string): string => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const handleCardClick = (eventId: string) => {
    // Toggle expand/collapse
    setExpandedId((prev) => (prev === eventId ? null : eventId));
    onSelectEvent(eventId);
  };

  return (
    <div className="event-bar" id="event-bar">
      <div className="event-bar__header">
        <CalendarDays size={18} />
        <h3 className="event-bar__title">Events</h3>
        <span className="event-bar__count">{monthEvents.length}</span>
      </div>

      <div className="event-bar__list">
        {monthEvents.length === 0 ? (
          <div className="event-bar__empty">
            <p>No events this month</p>
            <span>Click a start date, then an end date</span>
          </div>
        ) : (
          monthEvents.map((event) => {
            const isExpanded = expandedId === event.id;
            return (
              <div
                key={event.id}
                className={`event-bar__item${selectedEventId === event.id ? " event-bar__item--active" : ""}${isExpanded ? " event-bar__item--expanded" : ""}`}
                id={`event-${event.id}`}
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(event.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleCardClick(event.id);
                }}
                aria-label={`Select event: ${event.title}`}
                aria-expanded={isExpanded}
              >
                <div
                  className="event-bar__item-accent"
                  style={{ backgroundColor: event.color }}
                />
                <div className="event-bar__item-content">
                  <span className="event-bar__item-date">
                    {formatRange(event.startDate, event.endDate)}
                  </span>
                  <span className="event-bar__item-title">{event.title}</span>
                  {event.description && (
                    <div
                      className={`event-bar__item-desc${isExpanded ? " event-bar__item-desc--visible" : ""}`}
                    >
                      {event.description}
                    </div>
                  )}
                </div>
                <div className="event-bar__item-actions">
                  {event.description && (
                    <ChevronDown
                      size={14}
                      className={`event-bar__item-chevron${isExpanded ? " event-bar__item-chevron--open" : ""}`}
                    />
                  )}
                  <button
                    className="event-bar__item-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteEvent(event.id);
                    }}
                    aria-label={`Delete event: ${event.title}`}
                    id={`delete-event-${event.id}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EventBar;

