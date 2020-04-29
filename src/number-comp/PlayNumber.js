import React from "react";

export const PlayNumber = (props) => (
  <button onClick={() => console.log("Num", props.number)} className="number">
    {props.number}
  </button>
);
