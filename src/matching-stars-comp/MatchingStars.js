import React, { useState, useEffect } from "react";
import { PlayNumber } from "../number-comp/PlayNumber";
import { DisplayStars } from "../stars-comp/DisplayStars";
// import { Utils } from "../utils-comp/Utils";
import "./MatchingStars.scss";
import { PlayAgain } from "../play-again-comp/PlayAgain";

export const MatchingStars = ({ startNewGame }) => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsleft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsleft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

  const gameStatus =
    availableNums.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return "used";
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  const onNumberClick = (clickedNum, currentStatus) => {
    if (gameStatus !== "active" || currentStatus === "used") {
      return;
    }

    const newCandidateNums =
      currentStatus === "available"
        ? [...candidateNums, clickedNum]
        : candidateNums.filter((cn) => cn !== clickedNum);

    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
    console.log(newCandidateNums);
  };

  return (
    <div className="App">
      <div className="game">
        <div className="instruction">
          <div className="help">
            Pick 1 or more numbers that sum to the number of stars{" "}
          </div>
          <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
        <div className="body">
          <div className="top">
            {gameStatus !== "active" ? (
              <PlayAgain resetOnClick={startNewGame} gameStatus={gameStatus} />
            ) : (
              <span>
                {utils.range(1, stars).map((starId) => (
                  <DisplayStars key={starId} />
                ))}
              </span>
            )}
          </div>
          <div className="bottom">
            {utils.range(1, 9).map((number) => (
              <PlayNumber
                key={number}
                number={number}
                colors={colors}
                status={numberStatus(number)}
                onNumberClick={onNumberClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Color Theme
const colors = {
  available: "#222",
  used: "lightgreen",
  wrong: "lightcoral",
  candidate: "deepskyblue",
};

// Math science
const utils = {
  // Sum an array
  sum: (arr) => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};
