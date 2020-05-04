import React, { useState } from "react";
import "./App.scss";
import { MatchingStars } from "./matching-stars-comp/MatchingStars";

function App() {
  const [gameId, setGameId] = useState(0);
  return (
    <MatchingStars key={gameId} startNewGame={() => setGameId(gameId + 1)} />
  );
}

export default App;
