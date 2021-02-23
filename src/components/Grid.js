import React from "react";
import Row from "./Row";

const tableStyle = {
  borderCollapse: "collapse",
  border: "1px solid black"
};

export default function Grid(props) {
  const handleStateChange = (changedData) => {
    props.stateChangeHandler(changedData);
  };

  return (
    <table style={tableStyle}>
      <tbody>
        {[...Array(props.size)].map((e, i) => (
          <Row
            key={i}
            id={i}
            size={props.size}
            mode={props.mode}
            data={props.data}
            stateChangeHandler={handleStateChange}
          />
        ))}
      </tbody>
    </table>
  );
}
