// Define the size of the grid
const GRID_WIDTH = 50;
const GRID_HEIGHT = 50;

// Define the number of states and the rule for updating cells
const NUM_STATES = 4;
const RULE = [1, 2, 3, 0];

// Create the grid and initialize it with random states
let grid = new Array(GRID_WIDTH);
for (let i = 0; i < GRID_WIDTH; i++) {
  grid[i] = new Array(GRID_HEIGHT);
  for (let j = 0; j < GRID_HEIGHT; j++) {
    grid[i][j] = Math.floor(Math.random() * NUM_STATES);
  }
}

// Define a function to update the state of each cell based on its neighbors
function updateGrid() {
  let newGrid = new Array(GRID_WIDTH);
  for (let i = 0; i < GRID_WIDTH; i++) {
    newGrid[i] = new Array(GRID_HEIGHT);
    for (let j = 0; j < GRID_HEIGHT; j++) {
      let neighborSum = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x == 0 && y == 0) continue;
          let neighborI = (i + x + GRID_WIDTH) % GRID_WIDTH;
          let neighborJ = (j + y + GRID_HEIGHT) % GRID_HEIGHT;
          neighborSum += grid[neighborI][neighborJ];
        }
      }
      newGrid[i][j] = RULE[neighborSum % NUM_STATES];
    }
  }
  grid = newGrid;
}

// Define a function to draw the current state of the grid on a canvas
function drawGrid(canvas) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let cellWidth = canvas.width / GRID_WIDTH;
  let cellHeight = canvas.height / GRID_HEIGHT;
  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      let state = grid[i][j];
      ctx.fillStyle = `rgb(${state * 64}, ${state * 64}, ${state * 64})`;
      ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
    }
  }
}

// Define the main loop that updates the grid and redraws it on the canvas
function mainLoop(canvas) {
  updateGrid();
  drawGrid(canvas);
  requestAnimationFrame(() => mainLoop(canvas));
}

// Get the canvas element from the DOM
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

// Set the canvas size based on the size of the grid
canvas.width = GRID_WIDTH * 10;
canvas.height = GRID_HEIGHT * 10;

// Start the main loop
mainLoop(canvas);