import React, { useState } from "react";

export default function Controls(props) {
  const [gridSize, setGridSize] = useState(15);
  const [mode, setMode] = useState("mark");

  function gridSizeChangeHandler({ target }) {
    setGridSize(parseInt(target.value, 10));
    props.gridSizeChangeHandler(parseInt(target.value, 10));
  }

  function modeChangeHandler({ target }) {
    setMode(target.value);
    props.modeChangeHandler(target.value);
  }

  return (
    <div>
      Grid Size:{" "}
      <input type="number" value={gridSize} onChange={gridSizeChangeHandler} />
      <div>
        <input
          type="radio"
          value="mark"
          name="mode"
          onChange={modeChangeHandler}
          checked={mode === "mark" ? true : false}
        />{" "}
        Mark
        <input
          type="radio"
          value="fill"
          name="mode"
          onChange={modeChangeHandler}
          checked={mode === "fill" ? true : false}
        />{" "}
        Fill
      </div>
    </div>
  );
}
