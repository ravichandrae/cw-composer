export function generateCellNumbers(grid) {
  let newGrid = [];
  var cellNumber = 1;
  for (var i = 0; i < grid.length; i++) {
    let newRow = [];
    for (var j = 0; j < grid[i].length; j++) {
      let newCell = {};
      let needCellNumber = false;
      newCell.content = grid[i][j].content;
      newCell.isBlocked = grid[i][j].isBlocked;

      let isClueNeededAcross = needClueAcross(grid, i, j);
      let isClueNeededDown = needClueDown(grid, i, j);
      if (isClueNeededAcross && isClueNeededDown) {
        //If previous grid contains a clue, retain it; happens when we load the grid from a file
        //Otherwise initialize them with empty string
        newCell.across = grid[i][j].across ? grid[i][j].across : "";
        newCell.down = grid[i][j].down ? grid[i][j].down : "";
        needCellNumber = true;
      } else if (isClueNeededAcross) {
        newCell.across = grid[i][j].across ? grid[i][j].across : "";
        newCell.down = null;
        needCellNumber = true;
      } else if (isClueNeededDown) {
        newCell.down = grid[i][j].down ? grid[i][j].down : "";
        newCell.across = null;
        needCellNumber = true;
      } else {
        newCell.across = null;
        newCell.down = null;
      }
      if (needCellNumber) {
        newCell.cellNumber = cellNumber.toString();
        cellNumber += 1;
      } else {
        newCell.cellNumber = "";
      }
      newRow.push(newCell);
    }
    newGrid.push(newRow);
  }
  return newGrid;
}

function needClueAcross(data, i, j) {
  if (data[i][j].isBlocked) return false;
  if (isLeftCellBlocked(data, i, j)) {
    if (isRightCellBlocked(data, i, j)) {
      if (isTopCellBlocked(data, i, j) && isBottomCellBlocked(data, i, j)) {
        return true;
      }
    } else {
      return true;
    }
  }
  return false;
}

function needClueDown(data, i, j) {
  if (data[i][j].isBlocked) return false;
  if (isTopCellBlocked(data, i, j) && !isBottomCellBlocked(data, i, j))
    return true;
  return false;
}

function isLeftCellBlocked(data, i, j) {
  var leftCellBlocked = false;
  if (j < 1 || data[i][j - 1].isBlocked) {
    leftCellBlocked = true;
  }
  return leftCellBlocked;
}

function isRightCellBlocked(grid, i, j) {
  var rightCellBlocked = false;
  if (j === grid.length - 1 || grid[i][j + 1].isBlocked) {
    rightCellBlocked = true;
  }
  return rightCellBlocked;
}

function isTopCellBlocked(grid, i, j) {
  var topCellBlocked = false;
  if (i < 1 || grid[i - 1][j].isBlocked) {
    topCellBlocked = true;
  }
  return topCellBlocked;
}

function isBottomCellBlocked(grid, i, j) {
  var bottomCellBlocked = false;
  if (i === grid.length - 1 || grid[i + 1][j].isBlocked) {
    bottomCellBlocked = true;
  }
  return bottomCellBlocked;
}
