import React, { useState } from "react";
import InputArea from "./InputArea";
import Analysis from "./Analysis";
import SchedulingOption from "./SchedulingOption";

export default function App() {
  const [processes, setProcesses] = useState([]);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("fcfs");
  const [option, setOption] = useState("minFirst");

  return (
    <div className="App">
      <SchedulingOption
        mode={mode}
        setMode={setMode}
        setShow={setShow}
        setProcesses={setProcesses}
      />
      <InputArea
        setShow={setShow}
        setProcesses={setProcesses}
        processes={processes}
        mode={mode}
        option={option}
        setOption={setOption}
      />
      {show && (
        <Analysis
          mode={mode}
          processes={JSON.parse(JSON.stringify(processes))}
          option={option}
        />
      )}
      <br />
    </div>
  );
}
