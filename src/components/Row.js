import React from "react";
import Cell from "./Cell";

const tableRowStyle = {
  border: "1px solid black"
};

export default function Row(props) {
  const handleStateChange = (changedData) => {
    props.stateChangeHandler(changedData);
  };

  return (
    <tr style={tableRowStyle}>
      {[...Array(props.size)].map((e, i) => (
        <Cell
          key={i}
          id={i}
          row={props.id}
          mode={props.mode}
          data={props.data}
          stateChangeHandler={handleStateChange}
        />
      ))}
    </tr>
  );
}
