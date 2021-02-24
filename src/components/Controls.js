import React, { useState } from "react";
import { generateCellNumbers } from "./Utils";

const leftPaneStyle = {
  float: "left",
  marginLeft: "10px"
};

export default function Controls(props) {
  const [gridSize, setGridSize] = useState(15);
  const [mode, setMode] = useState(props.mode);
  const [downloadFileName, setDownloadFileName] = useState("crossword.txt");

  function gridSizeChangeHandler({ target }) {
    setGridSize(parseInt(target.value, 10));
    props.gridSizeChangeHandler(parseInt(target.value, 10));
  }

  function modeChangeHandler({ target }) {
    setMode(target.value);
    props.modeChangeHandler(target.value);
  }

  function handleExport() {
    var gridText = "";
    for (var i = 0; i < gridSize; i++) {
      for (var j = 0; j < gridSize; j++) {
        if (props.data[i][j].isBlocked) {
          gridText += "#";
        } else {
          gridText += props.data[i][j].content;
        }
        if (j < gridSize - 1) {
          gridText += "|";
        }
      }
      gridText += "\n";
    }
    gridText += "===";
    gridText += getAcrossClues();
    gridText += "===";
    gridText += getDownClues();

    const blob = new Blob([gridText]);
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = downloadFileName;
    a.click();
  }

  function getAcrossClues() {
    let acrossClues = "";
    for (var i = 0; i < gridSize; i++) {
      for (var j = 0; j < gridSize; j++) {
        if (props.data[i][j].across) {
          acrossClues += props.data[i][j].across;
          acrossClues += "\n";
        }
      }
    }
    return acrossClues;
  }

  function getDownClues() {
    let downClues = "";
    for (var i = 0; i < gridSize; i++) {
      for (var j = 0; j < gridSize; j++) {
        if (props.data[i][j].down) {
          downClues += props.data[i][j].down;
          downClues += "\n";
        }
      }
    }
    return downClues;
  }

  function handleFileNameChange({ target }) {
    setDownloadFileName(target.value);
  }

  function uploadFile({ target }) {
    let file = target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileText = e.target.result;
        props.fileUploadHandler(parseImportFileText(fileText));
      };
      reader.readAsText(file);
    }
  }

  function parseImportFileText(fileText) {
    let dataSplit = fileText.split("===");
    if (dataSplit.length === 0) {
      return;
    }
    const gridText = dataSplit[0].trim();
    let rows = gridText.split("\n");
    let gridData = [];
    for (var i = 0; i < rows.length; i++) {
      let columns = rows[i].split("|");
      let row = [];
      for (var j = 0; j < columns.length; j++) {
        let letter = "";
        let blocked = false;
        if (columns[j] !== "#") {
          letter = columns[j];
        } else {
          blocked = true;
        }
        row.push({
          content: letter,
          isBlocked: blocked,
          cellNumber: "",
          across: null,
          down: null
        });
      }
      gridData.push(row);
    }
    generateCellNumbers(gridData);
    if (dataSplit[1] && dataSplit[2]) {
      fillClues(dataSplit[1].trim(), dataSplit[2].trim(), gridData);
    }

    return gridData;
  }

  function fillClues(acrossClues, downClues, gridData) {
    let acrossClueLines = acrossClues.split("\n");
    let downClueLines = downClues.split("\n");

    let acrossClueIndex = 0,
      downClueIndex = 0;
    for (var i = 0; i < gridData.length; i++) {
      for (var j = 0; j < gridData[i].length; j++) {
        if (gridData[i][j].across !== null) {
          gridData[i][j].across = acrossClueLines[acrossClueIndex];
          acrossClueIndex++;
        }
        if (gridData[i][j].down != null) {
          gridData[i][j].down = downClueLines[downClueIndex];
          downClueIndex++;
        }
      }
    }
  }

  return (
    <div>
      <div style={leftPaneStyle}>
        <label>
          Grid Size:
          <input
            type="number"
            value={gridSize}
            onChange={gridSizeChangeHandler}
          />
        </label>
        <div>
          <label>
            <input
              type="radio"
              value="mark"
              name="mode"
              onChange={modeChangeHandler}
              checked={mode === "mark" ? true : false}
            />
            Mark
          </label>
          <label>
            <input
              type="radio"
              value="fill"
              name="mode"
              onChange={modeChangeHandler}
              checked={mode === "fill" ? true : false}
            />
            Fill
          </label>
        </div>
      </div>
      <div style={leftPaneStyle}>
        <div>
          <label>Import from a File:</label>
          <input type="file" onChange={uploadFile} />
        </div>
        <div>
          <label>Export to a File:</label>
          <input
            type="text"
            value={downloadFileName}
            onChange={handleFileNameChange}
          />
          <button onClick={handleExport}>Export</button>
        </div>
      </div>
    </div>
  );
}
