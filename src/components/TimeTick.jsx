import React from "react";

export default function TimeTick(props) {
  let tickStyle = {
    position: "relative",
    right: "3px",
    fontFamily: "monospace",
    fontSize: "15px",
    textAlign: "left"
  };

  return <span style={tickStyle}>{props.time}</span>;
}
