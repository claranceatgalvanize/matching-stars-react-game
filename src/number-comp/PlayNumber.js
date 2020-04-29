import React from "react";

export const PlayNumber = ({ number, status, colors, onNumberClick }) => (
  <button
    onClick={() => onNumberClick(number, status)}
    className="number"
    style={{ backgroundColor: colors[status] }}
  >
    {number}
  </button>
);
