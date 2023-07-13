import React from "react";
import TimeTick from "./TimeTick";

export default function TimeCell(props) {

  let cellStyle = {
    textAlign: "center",
    display: "inline-block",
    padding: "10px " + (2 * 5 * props.time).toString() + "px",
    color: "black",
    border: "2px solid black",
    position: "relative",
    fontFamily: "monospace",
    fontSize: "20px",
    backgroundColor: "#fad766",
    boxShadow: "0px 2px grey"
  };

  return (
    <div className="timeCell">
      {props.time !== 0 && <span style={cellStyle}>{props.name}</span>}
      <br />
      <TimeTick time={props.startTime} />
    </div>
  );
}