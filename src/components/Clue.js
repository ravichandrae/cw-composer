import React, { useState } from "react";

const leftPaneStyle = {
  float: "left"
};

export default function Clue(props) {
  const [data, setData] = useState(() => props.data);

  function handleClueChange({ target }) {
    data.clue = target.value;
    setData(data);
    props.clueChangeHandler(props.direction, data);
  }

  return (
    <div>
      <p style={leftPaneStyle}>{data.cellNumber}</p>
      <textarea value={data.clue} onChange={handleClueChange}></textarea>
    </div>
  );
}
