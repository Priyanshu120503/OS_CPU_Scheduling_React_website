import React from "react";

function SchedulingOption(props) {
  function showChange(event) {
    const val = event.target.value;
    if (props.mode !== val) {
      props.setProcesses([]);
      props.setShow(false);
      props.setMode(val);
    }
  }

  return (
    <select
      name="scheduling"
      className="shadow d-block mx-auto mt-4 mb-5 display-6"
      onChange={showChange}
      value={props.mode}
    >
      <option className="display-6" value="fcfs">First Come First Serve</option>
      <option className="display-6" value="rr">Round Robin</option>
      <option className="display-6" value="priority">Priority</option>
      <option className="display-6" value="sjf">Shortest Job First</option>
      <option className="display-6" value="srjf">Shortest Remaining Job First</option>
    </select>
  );
}

export default SchedulingOption;
