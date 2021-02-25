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
    let newGridData = generateCellNumbers(adjustedData);
    setGridData(newGridData);
  }

  const [mode, setMode] = useState("mark");

  function handleModeChange(changedMode) {
    setMode(changedMode);
    if (changedMode === "fill") {
      let newGridData = generateCellNumbers(gridData);
      setGridData(newGridData);
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
    gridData[changedData.row][changedData.col] = changedData.cell;
    let newGridData = generateCellNumbers(gridData);
    setGridData(newGridData);
  }

  function clearGrid() {
    setGridData(getInitialCellData());
  }

  function handleClueChanges(direction, changedClue) {
    let data = JSON.parse(JSON.stringify(gridData));
    if (direction === "across") {
      data[changedClue.row][changedClue.col].across = changedClue.across;
    } else if (direction === "down") {
      data[changedClue.row][changedClue.col].down = changedClue.down;
    }
    setGridData(data);
  }

  return (
    <div className="container">
      <Controls
        gridSizeChangeHandler={handleGridSizeChange}
        modeChangeHandler={handleModeChange}
        fileUploadHandler={handleFileUpload}
        clearGridHandler={clearGrid}
        mode={mode}
        data={gridData}
      />
      <div className="row">
        <div className="col-sm-6">
          <Grid
            size={gridSize}
            mode={mode}
            data={gridData}
            stateChangeHandler={handleStateChange}
          />
        </div>
        <Clues
          gridSize={gridSize}
          data={gridData}
          clueChangeHandler={handleClueChanges}
        />
      </div>
    </div>
  );
}
