import React, { useState } from "react";
import Clues from "./Clues";
import Controls from "./Controls";
import Grid from "./Grid";
import { generateCellNumbers } from "./Utils";

const leftPaneStyle = {
  float: "left",
  marginLeft: "10px"
};

const cluesPaneStyle = {
  height: "600px",
  overflow: "auto"
};

export default function Crossword() {
  const [gridSize, setGridSize] = useState(15);

  function handleGridSizeChange(size) {
    setGridSize(size);
    let adjustedData = adjustGridData(size);
    generateCellNumbers(adjustedData);
    setGridData(adjustedData);
  }

  const [mode, setMode] = useState("mark");

  function handleModeChange(changedMode) {
    let data = gridData;
    setMode(changedMode);
    if (changedMode === "fill") {
      generateCellNumbers(data);
      setGridData(data);
    }
  }

  function handleFileUpload(data) {
    setGridData(data);
    setMode("fill");
  }

  function adjustGridData(size) {
    const data = [];
    for (var i = 0; i < size; i++) {
      const row = [];
      for (var j = 0; j < size; j++) {
        row.push({
          content: "",
          isBlocked: false,
          cellNumber: "",
          across: null,
          down: null
        });
      }
      data.push(row);
    }
    return data;
  }

  function getInitialCellData() {
    const data = [];
    for (var i = 0; i < gridSize; i++) {
      const row = [];
      for (var j = 0; j < gridSize; j++) {
        row.push({
          content: "",
          isBlocked: false,
          cellNumber: "",
          across: null,
          down: null
        });
      }
      data.push(row);
    }
    return data;
  }

  const [gridData, setGridData] = useState(getInitialCellData());

  function handleStateChange(changedData) {
    let data = gridData;
    data[changedData.row][changedData.col] = changedData.cell;
    generateCellNumbers(data);
    setGridData(data);
  }

  function handleClueChanges(direction, changedClue) {
    if (direction === "across") {
      gridData[changedClue.row][changedClue.col].across = changedClue.clue;
    } else if (direction === "down") {
      gridData[changedClue.row][changedClue.col].down = changedClue.clue;
    }
    setGridData(gridData);
  }

  return (
    <div>
      <div style={leftPaneStyle}>
        <Controls
          gridSizeChangeHandler={handleGridSizeChange}
          modeChangeHandler={handleModeChange}
          fileUploadHandler={handleFileUpload}
          mode={mode}
          data={gridData}
        />
        <Grid
          size={gridSize}
          mode={mode}
          data={gridData}
          stateChangeHandler={handleStateChange}
        />
      </div>
      <div style={cluesPaneStyle}>
        <Clues
          gridSize={gridSize}
          data={gridData}
          clueChangeHandler={handleClueChanges}
        />
      </div>
    </div>
  );
}
