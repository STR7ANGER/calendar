"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { EVENT_COLORS, MONTH_NAMES } from "./types";

interface EventBoxProps {
  rangeStart: Date | null;
  rangeEnd: Date | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    startDate: string,
    endDate: string,
    title: string,
    description: string,
    color: string,
  ) => void;
}

const toISODate = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const formatLong = (date: Date): string => {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const EventBox = ({ rangeStart, rangeEnd, isOpen, onClose, onSave }: EventBoxProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(EVENT_COLORS[0]);
  const [startISO, setStartISO] = useState(() => (rangeStart ? toISODate(rangeStart) : ""));
  const [endISO, setEndISO] = useState(() => (rangeEnd ? toISODate(rangeEnd) : ""));

  const isReady = Boolean(isOpen && rangeStart && rangeEnd);

  if (!isReady) return null;

  const startDate = startISO && endISO ? (startISO <= endISO ? startISO : endISO) : toISODate(rangeStart!);
  const endDate = startISO && endISO ? (startISO <= endISO ? endISO : startISO) : toISODate(rangeEnd!);

  const headerDateStr = `${formatLong(new Date(startDate + "T00:00:00"))} — ${formatLong(
    new Date(endDate + "T00:00:00"),
  )}`;

  const handleSave = () => {
    if (!title.trim()) return;
    if (!startDate || !endDate) return;
    onSave(startDate, endDate, title.trim(), description.trim(), selectedColor);
    setTitle("");
    setDescription("");
    setSelectedColor(EVENT_COLORS[0]);
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setSelectedColor(EVENT_COLORS[0]);
    setStartISO("");
    setEndISO("");
    onClose();
  };

  return (
    <div className="event-box-overlay" id="event-box-overlay" onClick={handleClose}>
      <div
        className="event-box"
        id="event-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="event-box__header">
          <div>
            <h3 className="event-box__title">New Event</h3>
            <p className="event-box__date">{headerDateStr}</p>
          </div>
          <button
            className="event-box__close"
            onClick={handleClose}
            id="btn-close-event-box"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="event-box__form">
          <div className="event-box__field">
            <label className="event-box__label">Date range</label>
            <div className="event-box__date-range">
              <input
                id="event-start-date"
                type="date"
                className="event-box__input"
                value={startISO}
                onChange={(e) => setStartISO(e.target.value)}
              />
              <span className="event-box__date-sep">—</span>
              <input
                id="event-end-date"
                type="date"
                className="event-box__input"
                value={endISO}
                onChange={(e) => setEndISO(e.target.value)}
              />
            </div>
          </div>

          <div className="event-box__field">
            <label htmlFor="event-title" className="event-box__label">
              Title
            </label>
            <input
              id="event-title"
              type="text"
              className="event-box__input"
              placeholder="Enter event title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
            />
          </div>

          <div className="event-box__field">
            <label htmlFor="event-description" className="event-box__label">
              Description
            </label>
            <textarea
              id="event-description"
              className="event-box__textarea"
              placeholder="Add a description (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Color picker */}
          <div className="event-box__field">
            <label className="event-box__label">Color</label>
            <div className="event-box__colors">
              {EVENT_COLORS.map((color) => (
                <button
                  key={color}
                  className={`event-box__color-btn${selectedColor === color ? " event-box__color-btn--active" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="event-box__actions">
          <button
            className="event-box__btn event-box__btn--cancel"
            onClick={handleClose}
            id="btn-cancel-event"
          >
            Cancel
          </button>
          <button
            className="event-box__btn event-box__btn--save"
            onClick={handleSave}
            disabled={!title.trim()}
            id="btn-save-event"
          >
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventBox;
