import React from "react";

function OptionArea(props) {
  let doneButtonStyle = {
    display: "inline-block",
    margin: "auto"
  };

  function handleDone() {
    let temp = props.processes.filter((p) => {
      if (props.mode === "priority") {
        return (
          p.pName === "" ||
          p.aTime === "" ||
          p.bTime === "" ||
          p.priority === ""
        );
      } else {
        return p.pName === "" || p.aTime === "" || p.bTime === "";
      }
    });

    for (let i = 0; i < props.processes.length; ++i) {
      for (let j = i + 1; j < props.processes.length; ++j) {
        if (props.processes[i].pName === props.processes[j].pName) {
          alert(
            "Two or more processes have the same name. Please change it and then try again."
          );
          return;
        }
      }
    }

    if (temp.length > 0) {
      alert("Please fill the table completely or remove unrequired rows");
    } else if (props.processes.length === 0) {
      alert("Please insert values in process table.");
    } else {
      props.setShow(true);
    }
  }

  function handleChange(event) {
    const val = event.target.value;
    props.setOption(val);
    console.log(props.option);
  }

  return (
    <div>
      {props.mode === "priority" && (
        <div style={{ margin: "0px 0px 20px" }}>
          <select name="pOrder" onChange={handleChange} value={props.option}>
            <option value="minFirst">Min First</option>
            <option value="maxFirst">Max First</option>
          </select>
        </div>
      )}
      {props.mode === "rr" && (
        <div style={{ margin: "0px 0px 20px" }}>
          <label>Time Slice</label> <br />
          <input
            type="number"
            min={0}
            name="tSlice"
            id="tSlice"
            onChange={handleChange}
            value={props.option}
          />
        </div>
      )}
      <button onClick={handleDone} style={doneButtonStyle} className="shadow-sm btn btn-info ">Done</button>
    </div>
  );
}

export default OptionArea;
