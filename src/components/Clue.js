import React, { useState } from "react";

const leftPaneStyle = {
  float: "left"
};

export default function Clue(props) {
  const [data, setData] = useState(props.data);

  function handleClueChange({ target }) {
    let newData = JSON.parse(JSON.stringify(data));
    newData.row = props.row;
    newData.col = props.col;
    if (props.direction === "across") {
      newData.across = target.value;
    } else {
      newData.down = target.value;
    }
    setData(newData);
    props.clueChangeHandler(props.direction, newData);
  }

  return (
    <div className="form-group">
      <p style={leftPaneStyle}>{data.cellNumber}</p>
      <textarea
        value={
          props.direction === "across" ? props.data.across : props.data.down
        }
        onChange={handleClueChange}
        className="form-control"
      ></textarea>
    </div>
  );
}
