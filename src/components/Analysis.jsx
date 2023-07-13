import React from "react";
import fcfs, { rr, priorityS, sjf, srjf } from "../utils";
import GanttChart from "./GanttChart";

function Analysis(props) {
  let processes, order;

  if (props.mode === "fcfs") processes = fcfs(props.processes);
  else if (props.mode === "rr") {
    [order, processes] = rr(props.processes, props.option);
  } else if (props.mode === "priority")
    processes = priorityS(props.processes, props.option);
  else if (props.mode === "sjf") processes = sjf(props.processes);
  else if (props.mode === "srjf") [order, processes] = srjf(props.processes);

  let customStyle = {
    marginTop: "20px",
    textAlign: "center",
    display: "inline-block"
  };

  let count = 0,
    waitSum = 0,
    tatSum = 0,
    rSum = 0;

  return (
    <div style={customStyle} className="container d-flex flex-column justify-content-center align-items-center">
      <hr className="w-25 hr" />
      <h2 className="analysis">
        <u>Analysis</u>
      </h2>
      <table className="shadow table table-bordered border-dark w-75 mt-4 mb-3">
        <thead>
          <tr>
            <th className="bg-warning">Process Name</th>
            <th className="bg-warning">Arrival Time</th>
            {props.mode === "priority" && <th className="bg-warning">Priority</th>}
            <th className="bg-warning">Burst Time</th>
            <th className="bg-warning">Response Time</th>
            <th className="bg-warning">Waiting Time</th>
            <th className="bg-warning">Completion Time</th>
            <th className="bg-warning">Turnaround Time</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process, idx) => {
            if (process.pName !== "Idle") {
              // console.log(process);
              count++;
              waitSum += process.wTime;
              tatSum += process.tat;
              rSum += process.rTime;
              return (
                <tr key={idx}>
                  <td>{process.pName}</td>
                  <td>{process.aTime}</td>
                  {props.mode === "priority" && <td>{process.priority}</td>}
                  <td>{process.bTime}</td>
                  <td>{process.rTime}</td>
                  <td>{process.wTime}</td>
                  <td>{process.cTime}</td>
                  <td>{process.tat}</td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
      <br />
      <br />
      <table className="shadow table table-bordered border-dark w-50 mb-3">
        <thead>
          <tr>
            <th className="bg-warning">Avg. Wait Time</th>
            <th className="bg-warning">Avg. Response Time</th>
            <th className="bg-warning">Avg. Turnaround Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{Math.round((waitSum * 100) / count) / 100}</td>
            <td>{Math.round((rSum * 100) / count) / 100}</td>
            <td>{Math.round((tatSum * 100) / count) / 100}</td>
          </tr>
        </tbody>
      </table>
      <br />
      {props.mode === "rr" || props.mode === "srjf" ? (
        <GanttChart processes={order} />
      ) : (
        <GanttChart processes={processes} />
      )}
    </div>
  );
}

export default Analysis;
