import React from "react";
import TableRow from "./TableRow";

function InputTable(props) {
  let buttonStyle = {
    borderRadius: "0px 5px 5px",
    boxShadow: "2px 2px grey",
    backgroundColor: "#f5db18",
    padding: "0px 10px 1px",
    fontSize: "18px",
    position: "relative",
    float: "right",
    left: "33px"
  };

  function handlePlus() {
    props.setProcesses([
      ...props.processes,
      {
        pName: "P" + (props.processes.length + 1),
        aTime: "",
        bTime: ""
      }
    ]);
    props.setShow(false);
  }

  function handleChange(event, index) {
    const { name, value } = event.target;

    props.setProcesses([
      ...props.processes.slice(0, index),
      { ...props.processes[index], [name]: value },
      ...props.processes.slice(index + 1)
    ]);
    // console.log(props.processes);
    props.setShow(false);
  }

  function deleteProcess(index) {
    props.setProcesses(props.processes.filter((p, idx) => idx !== index));
    props.setShow(false);
  }

  return (
    <div className="">
      <table className="shadow-lg table text-center table-striped mb-0">
        <thead>
          <tr>
            <th>Process Name</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            {props.mode === "priority" && <th>Priority</th>}
            <td>Remove</td>
          </tr>
        </thead>
        <tbody>
          {props.processes.map((process, index) => (
            <TableRow
              key={index}
              updateProcess={handleChange}
              deleteProcess={deleteProcess}
              index={index}
              processInfo={process}
              mode={props.mode}
            />
          ))}
        </tbody>
      </table>
      {/* style={buttonStyle} */}
      <button onClick={handlePlus} style={buttonStyle} 
      className> 
        +
      </button>
    </div>
  );
}

export default InputTable;
