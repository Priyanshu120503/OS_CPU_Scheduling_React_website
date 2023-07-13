import React from "react";
import OptionArea from "./OptionArea";
import InputTable from "./InputTable";

export default function InputArea(props) {
  return (
    
    <div className="d-flex justify-content-evenly align-items-center flex-wrap inputArea text-center">
      <InputTable
        processes={props.processes}
        setProcesses={props.setProcesses}
        setShow={props.setShow}
        mode={props.mode}
      />
      <OptionArea
        processes={props.processes}
        mode={props.mode}
        setShow={props.setShow}
        setOption={props.setOption}
        option={props.option}
      />
    </div>
  );
}
