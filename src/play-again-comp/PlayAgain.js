import React from "react";

export const PlayAgain = ({ resetOnClick }) => {
  return (
    <button onClick={resetOnClick} className="game-done">
      Play Again
    </button>
  );
};
