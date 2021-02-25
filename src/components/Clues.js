import React from "react";
import Clue from "./Clue";

const leftPaneStyle = {
  float: "left",
  marginLeft: "10px"
};

export default function Clues(props) {
  function handleClueChange(direction, clue) {
    props.clueChangeHandler(direction, clue);
  }
  console.log(JSON.stringify(props.data));
  return (
    <div className="col-sm-6">
      <div className="row">
        <div className="col-sm-6">
          <h6> Across </h6>
          {props.data.map((row, i) =>
            row.map((cell, j) =>
              (cell.across != null)? (
                <Clue
                  data={cell}
                  key={`across_${i}_${j}`}
                  row={i}
                  col={j}
                  direction="across"
                  clueChangeHandler={handleClueChange}
                />
              ) : (
                ""
              )
            )
          )}
        </div>
        <div className="col-sm-6">
          <h6> Down </h6>
          {props.data.map((row, i) =>
            row.map((cell, j) =>
              (cell.down != null)? (
                <Clue
                  data={cell}
                  key={`down${i}_${j}`}
                  row={i}
                  col={j}
                  direction="down"
                  clueChangeHandler={handleClueChange}
                />
              ) : (
                ""
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}
