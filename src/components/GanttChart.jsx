import React from "react";
import TimeCell from "./TimeCell";

export default function GanttChart(props) {
  const arrLength = props.processes.length;

  return (
    <div style={{ textAlign: "left" }}>
      <h4 style={{ marginBottom: "10px" }}>Gannt Chart</h4>
      {props.processes.map((process, index) => (
        <TimeCell
          key={index}
          time={process.bTime}
          startTime={process.startTime}
          name={process.pName}
          isLast={index === arrLength - 1}
        />
      ))}
      <TimeCell
        time={0}
        startTime={
          props.processes[arrLength - 1].startTime +
          Number(props.processes[arrLength - 1].bTime)
        }
      />
    </div>
  );
}
