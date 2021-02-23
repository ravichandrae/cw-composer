export function generateCellNumbers(grid) {
  var cellNumber = 1;
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      var needCellNumber = false;
      if (needCellNumberAcross(grid, i, j)) {
        grid[i][j].cellNumber = cellNumber.toString();
        grid[i][j].across = "";
        grid[i][j].down = null;
        needCellNumber = true;
      }
      if (needCellNumberDown(grid, i, j)) {
        grid[i][j].cellNumber = cellNumber.toString();
        if (!needCellNumber) grid[i][j].across = null;
        grid[i][j].down = "";
        needCellNumber = true;
      }
      if (needCellNumber) {
        cellNumber++;
      } else {
        grid[i][j].cellNumber = "";
        grid[i][j].across = null;
        grid[i][j].down = null;
      }
    }
  }
}

function needCellNumberAcross(data, i, j) {
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

function needCellNumberDown(data, i, j) {
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
