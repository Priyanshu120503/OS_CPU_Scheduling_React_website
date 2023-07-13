import React from "react";

function TableRow(props) {
  function handleChange(event) {
    props.updateProcess(event, props.index);
  }

  function handleCheck() {
    props.deleteProcess(props.index);
  }

  return (
    <tr>
      <td>
        <input
          type="text"
          name="pName"
          onChange={handleChange}
          value={props.processInfo.pName}
          className="textInput text-center border border-1 "
        />
      </td>
      <td>
        <input
          type="number"
          name="aTime"
          onChange={handleChange}
          value={props.processInfo.aTime}
          className="numberInput border border-1 text-center"
          min={0}
        />
      </td>
      <td>
        <input
          type="number"
          name="bTime"
          onChange={handleChange}
          value={props.processInfo.bTime}
          className="numberInput border border-1 text-center"
          min={0}
        />
      </td>
      {props.mode === "priority" && (
        <td>
          <input
            type="number"
            name="priority"
            onChange={handleChange}
            value={props.processInfo.priority}
            className="numberInput border border-1 text-center"
            min={0}
          />
        </td>
      )}
      <td>
        <input type="checkbox" checked={false} onChange={handleCheck} />
      </td>
    </tr>
  );
}

export default TableRow;
