import React, { useState } from "react";
import Clue from "./Clue";

const leftPaneStyle = {
  float: "left",
  marginLeft: "10px"
};

export default function Clues(props) {
  const [acrossClues, setAcrossClues] = useState(getAcrossClues());
  const [downClues, setDownClues] = useState(getDownClues());

  function getAcrossClues() {
    let aClues = [];
    for (var i = 0; i < props.gridSize; i++) {
      for (var j = 0; j < props.gridSize; j++) {
        if (props.data[i][j].across != null) {
          aClues.push({
            cellNumber: props.data[i][j].cellNumber,
            clue: props.data[i][j].across
          });
        }
      }
    }
    //alert(JSON.stringify(aClues));
    return aClues;
  }

  function getDownClues() {
    let dClues = [];
    for (var i = 0; i < props.gridSize; i++) {
      for (var j = 0; j < props.gridSize; j++) {
        if (props.data[i][j].down != null) {
          dClues.push({
            cellNumber: props.data[i][j].cellNumber,
            clue: props.data[i][j].down
          });
        }
      }
    }
    return dClues;
  }

  return (
    <div>
      <div style={leftPaneStyle}>
        <h2> Across </h2>
        {props.data.map((row) =>
          row.map((cell) =>
            cell.across != null ? <Clue cellNumber={cell.cellNumber} /> : ""
          )
        )}
      </div>
      <div style={leftPaneStyle}>
        <h2> Down </h2>
        {props.data.map((row) =>
          row.map((cell) =>
            cell.down != null ? <Clue cellNumber={cell.cellNumber} /> : ""
          )
        )}
      </div>
    </div>
  );
}
