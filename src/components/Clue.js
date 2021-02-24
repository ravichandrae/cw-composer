import React, { useEffect, useState } from "react";

const leftPaneStyle = {
  float: "left"
};

export default function Clue(props) {
  const [data, setData] = useState(props.data);

  function handleClueChange({ target }) {
    let newData = JSON.parse(JSON.stringify(data));
    newData.clue = target.value;
    alert(JSON.stringify(newData));
    setData(newData);
    props.clueChangeHandler(props.direction, newData);
  }

  return (
    <div className="form-group">
      <p style={leftPaneStyle}>{data.cellNumber}</p>
      <textarea
        value={data.clue}
        onChange={handleClueChange}
        className="form-control"
      ></textarea>
    </div>
  );
}
