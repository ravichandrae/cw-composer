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
  }, [props]);

  function handleClueChange(direction, clue) {
    if (direction === "across") {
      let newClues = JSON.parse(JSON.stringify(acrossClues));
      newClues[clue.cellNumber] = clue;
      setAcrossClues(newClues);
    } else if (direction === "down") {
      let newClues = JSON.parse(JSON.stringify(downClues));
      newClues[clue.cellNumber] = clue;
      setDownClues(newClues);
    }
    props.clueChangeHandler(direction, clue);
  }

  return (
    <div className="col-sm-6">
      <div className="row">
        <div className="col-sm-6">
          <h6> Across </h6>
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
        <div className="col-sm-6">
          <h6> Down </h6>
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
    </div>
  );
}
