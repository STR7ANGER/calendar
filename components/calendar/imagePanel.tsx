"use client";

import { MONTH_NAMES, MONTH_DATA } from "./types";

interface ImagePanelProps {
  currentDate: Date;
}

const ImagePanel = ({ currentDate }: ImagePanelProps) => {
  const month = currentDate.getMonth();
  const monthData = MONTH_DATA[month];
  const monthName = MONTH_NAMES[month];
  const year = currentDate.getFullYear();

  return (
    <div className="calendar-image-panel" id="image-panel">
      {/* Background image */}
      <div
        className="calendar-image-panel__bg"
        style={{ backgroundImage: `url(${monthData.image})` }}
      />

      {/* Gradient overlays for text readability */}
      <div className="calendar-image-panel__overlay" />

      {/* Content */}
      <div className="calendar-image-panel__content">
        <div className="calendar-image-panel__top">
          <span className="calendar-image-panel__year">{year}</span>
        </div>

        <div className="calendar-image-panel__bottom">
          <h2 className="calendar-image-panel__month">{monthName}</h2>
          <p className="calendar-image-panel__quote">&ldquo;{monthData.quote}&rdquo;</p>
        </div>
      </div>
    </div>
  );
};

export default ImagePanel;