import React, { useEffect, useState } from "react";
import Clue from "./Clue";

const leftPaneStyle = {
  float: "left",
  marginLeft: "10px"
};

export default function Clues(props) {
  const [acrossClues, setAcrossClues] = useState({});
  const [downClues, setDownClues] = useState({});

  useEffect(() => {
    const getAcrossClues = () => {
      let aClues = {};
      for (var i = 0; i < props.gridSize; i++) {
        for (var j = 0; j < props.gridSize; j++) {
          if (props.data[i][j].across !== null) {
            aClues[props.data[i][j].cellNumber] = {
              row: i,
              col: j,
              cellNumber: props.data[i][j].cellNumber,
              clue: props.data[i][j].across
            };
          }
        }
      }
      setAcrossClues(aClues);
    };

    const getDownClues = () => {
      let dClues = {};
      for (var i = 0; i < props.gridSize; i++) {
        for (var j = 0; j < props.gridSize; j++) {
          if (props.data[i][j].down !== null) {
            dClues[props.data[i][j].cellNumber] = {
              row: i,
              col: j,
              cellNumber: props.data[i][j].cellNumber,
              clue: props.data[i][j].down
            };
          }
        }
      }
      setDownClues(dClues);
    };
    getAcrossClues();
    getDownClues();
  }, [props.data, props.gridSize]);

  function handleClueChange(direction, clue) {
    if (direction === "across") {
      acrossClues[clue.cellNumber] = clue;
      setAcrossClues(acrossClues);
      props.clueChangeHandler(direction, clue);
    } else if (direction === "down") {
      downClues[clue.cellNumber] = clue;
      setDownClues(downClues);
      props.clueChangeHandler(direction, clue);
    }
  }

  return (
    <div>
      <div style={leftPaneStyle}>
        <h2> Across </h2>
        {acrossClues &&
          Object.entries(acrossClues).map(([k, v]) => (
            <Clue
              data={v}
              key={`across_${v.row}_${v.col}`}
              direction="across"
              clueChangeHandler={handleClueChange}
            />
          ))}
      </div>
      <div style={leftPaneStyle}>
        <h2> Down </h2>
        {downClues &&
          Object.entries(downClues).map(([k, v]) => (
            <Clue
              data={v}
              key={`down_${v.row}_${v.col}`}
              direction="down"
              clueChangeHandler={handleClueChange}
            />
          ))}
      </div>
    </div>
  );
}
