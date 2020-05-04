import React from "react";

export const PlayAgain = ({ resetOnClick, gameStatus }) => {
  return (
    <div className="game-done">
      <div
        className="message"
        style={{ color: gameStatus === "lost" ? "red" : "green" }}
      >
        {gameStatus === "lost" ? "Game Over" : "Nice Job!"}
      </div>
      <button onClick={resetOnClick} className="game-done">
        Play Again
      </button>
    </div>
  );
};
