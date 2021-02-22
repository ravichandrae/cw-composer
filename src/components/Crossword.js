import React, { useState } from 'react';
import Clue from './Clue';
import Controls from './Controls';
import Grid from './Grid';

const leftPaneStyle = {
    float: "left"
};

export default function Crossword() {
    const [gridSize, setGridSize] = useState(15);

    const handleGridSizeChange = (size) => {
        setGridSize(size);
    };

    const [mode, setMode] = useState("mark");

    const handleModeChange = (changedMode) => {
        let data = gridData;
        setMode(changedMode);
        if(changedMode == "fill") {
            generateCellNumbers(data);
            setGridData(() => data);
        }
    };

    function getInitialCellData() {
        const data = [];
        for(var i = 0; i < gridSize; i++) {
            const row = [];
            for(var j = 0; j < gridSize; j++) {
                row.push({content: "", isBlocked: false, cellNumber: "", across: null, down: null});
            }
            data.push(row);
        }
        return data;
    }
    

    const [gridData, setGridData] = useState(getInitialCellData());

    const handleStateChange = (changedData) => {
        let data = gridData;
        data[changedData.row][changedData.col] = changedData.cell;
        generateCellNumbers(data);
        setGridData(() => data);
    };

    function generateCellNumbers(data) {
        var cellNumber = 1;
        for(var i = 0; i < gridSize; i++) {
            for(var j = 0; j < gridSize; j++) {
                var needCellNumber = false;
                if(needCellNumberAcross(data, i, j)) {
                    data[i][j].cellNumber = cellNumber.toString();
                    data[i][j].down = null;
                    needCellNumber = true;
                }
                if(needCellNumberDown(data, i, j)) {
                    data[i][j].cellNumber = cellNumber.toString();
                    data[i][j].across = null;
                    needCellNumber = true;
                }
                if(needCellNumber) {
                    cellNumber++;
                }   else {
                    data[i][j].cellNumber = "";
                    data[i][j].across = null;
                    data[i][j].down = null;
                }
            }
        }
    }

    function needCellNumber(data, i, j) {
        if(data[i][j].isBlocked) {
            return false;
        }

         //Check if left cell is blocked
         var leftCellBlocked = false;
         if(j < 1 || data[i][j-1].isBlocked) {
             leftCellBlocked = true;
         }
 
         //check if top cell is blocked
         var topCellBlocked = false;
         if(i < 1 || data[i-1][j].isBlocked) {
             topCellBlocked = true;
         }
 
         //check if right cell is blocked
         var rightCellBlocked = false;
         if(j == (gridSize - 1 ) || data[i][j+1].isBlocked) {
             rightCellBlocked = true
         }
 
         //check if bottom cell is blocked
         var bottomCellBlocked = false;
         if(i == (gridSize - 1 ) || data[i+1][j].isBlocked) {
             bottomCellBlocked = true;
         }

         //Single cell, Island cell surrounded by blocked cells. we need number
         if(leftCellBlocked && rightCellBlocked && topCellBlocked & bottomCellBlocked)
             return true;

         //We need number for column
         if(topCellBlocked && !bottomCellBlocked)
             return true;

         //we need number for row
         if(leftCellBlocked && !rightCellBlocked)
             return true;

         return false;
    }

    function needCellNumberAcross(data, i, j) {
        if( isLeftCellBlocked(data, i, j) ) {
            if(isRightCellBlocked(data, i, j)) {
                if(isTopCellBlocked(data, i, j) && isBottomCellBlocked(data, i ,j)) {
                    return true;
                }
            } else {
                return true;
            }
        }
        return false;
    }

    function needCellNumberDown(data, i, j) {
        if(isTopCellBlocked(data, i, j) && !isBottomCellBlocked(data, i, j))
            return true;
        return false;
    }

    function isLeftCellBlocked(data, i, j) {
        var leftCellBlocked = false;
        if(j < 1 || data[i][j-1].isBlocked) {
            leftCellBlocked = true;
        }
        return leftCellBlocked;
    }

    function isRightCellBlocked(data, i, j) {
        var rightCellBlocked = false;
        if(j == (gridSize - 1 ) || data[i][j+1].isBlocked) {
            rightCellBlocked = true
        }
        return rightCellBlocked;
    }

    function isTopCellBlocked(data, i, j) {
        var topCellBlocked = false;
        if(i < 1 || data[i-1][j].isBlocked) {
            topCellBlocked = true;
        }
        return topCellBlocked;
    }

    function isBottomCellBlocked(data, i, j) {
        var bottomCellBlocked = false;
        if(i == (gridSize - 1 ) || data[i+1][j].isBlocked) {
            bottomCellBlocked = true;
        }
        return bottomCellBlocked;
    }

    return (
        <div>
            <div style={leftPaneStyle}>
                <Controls gridSizeChangeHandler={handleGridSizeChange} modeChangeHandler={handleModeChange} />
                <Grid size={gridSize} mode={mode} data={gridData} stateChangeHandler={handleStateChange} />
            </div>
            <div>
                 
            </div>
        </div>
    );
}