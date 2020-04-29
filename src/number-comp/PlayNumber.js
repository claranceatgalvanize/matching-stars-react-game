import React from "react";

export const PlayNumber = ({ number, status, colors, addCandidate }) => (
  <button
    onClick={() => addCandidate(number)}
    className="number"
    style={{ backgroundColor: colors[status] }}
  >
    {number}
  </button>
);
