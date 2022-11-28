const water = "~";

function getMPopulatedWithMap(matrix) {
  const ROW = matrix[0].length;
  const COL = matrix.length;
  const water = "~";
  // initialise islandSoulCounter to hold the the population number while we traverse trough the islands
  let islandSoulCounter = 0;
  // initialise 2 arrays to hold the current island coordinates we are traversing trough
  let currentIslandRow = [];
  let currentIslandColl = [];

  // initialise our boolean and html element matrix
  let visited = new Array(ROW);
  let display = new Array(ROW);
  for (let i = 0; i < ROW; i++) {
    visited[i] = new Array(COL);
    display[i] = new Array(COL);
  }
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      // Fill out boolean and display matrix with value
      visited[i][j] = false;
      display[i][j] = { style: { color: "" }, children: "" };
    }
  }

  const isNewConnectedLand = (matrix, row, col, visited) => {
    // row number is in range, column number is in range
    // and value is not water and not yet visited
    return (
      row >= 0 &&
      row < ROW &&
      col >= 0 &&
      col < COL &&
      matrix[row][col] != water &&
      !visited[row][col]
    );
  };

  // A utility function to do DFS for a 2D boolean matrix.
  // It only considers the 8 neighbors as adjacent vertices
  const DFS = (matrix, row, col, visited) => {
    // These arrays are used to get row and column numbers
    // of 8 neighbors of a given cell
    let rowNbr = [-1, -1, -1, 0, 0, 1, 1, 1];
    let colNbr = [-1, 0, 1, -1, 1, -1, 0, 1];
    // Mark this cell as visited
    visited[row][col] = true;
    // Recur for all connected neighbours
    for (let k = 0; k < 8; ++k) {
      if (
        isNewConnectedLand(matrix, row + rowNbr[k], col + colNbr[k], visited)
      ) {
        // increase our current island soul counter
        islandSoulCounter += matrix[row + rowNbr[k]][col + colNbr[k]];
        // populate the 2 array holding the current island's coordinates
        currentIslandRow.push(row + rowNbr[k]);
        currentIslandColl.push(col + colNbr[k]);
        // populate the display matrix with the island tiles;
        display[row + rowNbr[k]][col + colNbr[k]] = {
          style: { color: "lightsalmon" },
          children: matrix[row + rowNbr[k]][col + colNbr[k]],
        };
        DFS(matrix, row + rowNbr[k], col + colNbr[k], visited);
      }
    }
  };

  // initialise highestSoulCount to hold the soul count of highest population island
  let highestSoulCount = 0;
  // initialise 2 arrays to hold the first island that holds the highest soulCount
  let finalIslandRow;
  let finalIslandColl;
  for (let l = 0; l < ROW; ++l) {
    for (let m = 0; m < COL; ++m) {
      if (matrix[l][m] != water && !visited[l][m]) {
        // value is not water and not
        // visited yet, then new island found
        // Start storing the current island coordinates
        currentIslandRow.push(l);
        currentIslandColl.push(m);
        // Start incrementing our current island soul counter
        islandSoulCounter += matrix[l][m];
        // Add island tile to display matrix
        display[l][m] = {
          style: { color: "lightsalmon" },
          children: matrix[l][m],
        };
        // Visit all cells in this island
        DFS(matrix, l, m, visited);

        if (islandSoulCounter > highestSoulCount) {
          // Store Highest and reset
          highestSoulCount = islandSoulCounter;
          finalIslandRow = currentIslandRow;
          finalIslandColl = currentIslandColl;
          currentIslandRow = [];
          currentIslandColl = [];
          islandSoulCounter = 0;
        } else {
          // reset
          islandSoulCounter = 0;
          currentIslandRow = [];
          currentIslandColl = [];
        }
      } else if (!visited[l][m]) {
        // add water tile
        display[l][m] = { style: { color: "blue" }, children: matrix[l][m] };
      }
    }
  }

  //color the first biggest island in the displayMatrix
  for (let k = 0; k < finalIslandRow.length; k++) {
    display[finalIslandRow[k]][finalIslandColl[k]].style = { color: "green" };
  }

  return [highestSoulCount, display];
}
function nearestCeilSq(n) {
  return Math.pow(Math.ceil(Math.sqrt(n)), 2);
}

function fillSequence(sequence) {
  const remainingTiles = nearestCeilSq(sequence.length) - sequence.length;
  if (remainingTiles) {
    for (let i = 0; i < remainingTiles; i++) {
      sequence.push(water);
    }
  }
}

function decodeScroll(scroll) {
  let counter = 0;
  let sequence = [...scroll].map((tile) => {
    if (tile === water) {
      counter++;
      return water;
    } else if (counter % 10 === 0) {
      counter = 0;
      return water;
    } else {
      let result = counter % 10;
      counter = 0;
      return result;
    }
  });
  return sequence;
}

function createSquareMatrix(length) {
  return Array.from(Array(length), () => Array.from(Array(length)));
}

function formSpiralMatrix(arr, matrix) {
  const ROW = matrix[0].length;
  const COLL = matrix.length;
  let top = 0;
  let bottom = COLL - 1;
  let left = 0;
  let right = ROW - 1;

  let index = 0;

  while (1) {
    if (left > right) {
      break;
    }
    // Print top row
    for (let i = right; i >= left; i--) {
      matrix[top][i] = arr[index++];
    }

    top++;

    if (top > bottom) {
      break;
    }
    // Print left column
    for (let i = top; i <= bottom; i++) {
      matrix[i][left] = arr[index++];
    }

    left++;

    if (left > right) break;

    // print bottom row
    for (let i = left; i <= right; i++) {
      matrix[bottom][i] = arr[index++];
    }

    bottom--;

    if (bottom < top) break;

    // Print right column
    for (let i = bottom; i >= top; i--) {
      matrix[i][right] = arr[index++];
    }

    right--;
  }

  return matrix;
}

function mapIsValid(str) {
  return /^[~|#]+$/.test(str);
}

export default {
  getMPopulatedWithMap,
  decodeScroll,
  createSquareMatrix,
  formSpiralMatrix,
  mapIsValid,
  fillSequence,
  nearestCeilSq,
};
