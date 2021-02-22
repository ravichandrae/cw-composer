import React from "react";

const leftPaneStyle = {
  float: "left"
};

export default function Clue(props) {
  return (
    <div>
      <p style={leftPaneStyle}>{props.cellNumber}</p>
      <textarea></textarea>
    </div>
  );
}
