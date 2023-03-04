// Define some constants
const GRID_SIZE = 1;
const NUM_CELLS = 500;
const PALETTE = ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"];

// Define the cell grid
let grid: number[][] = [];
for (let i = 0; i < NUM_CELLS; i++) {
  grid[i] = [];
  for (let j = 0; j < NUM_CELLS; j++) {
    grid[i][j] = Math.floor(Math.random() * PALETTE.length);
  }
}

const canvas = document.body.appendChild(document.createElement('canvas'))
canvas.height = 1000
canvas.width = 1000
const ctx = canvas.getContext('2d')!

// Define the draw function
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the grid
  for (let i = 0; i < NUM_CELLS; i++) {
    for (let j = 0; j < NUM_CELLS; j++) {
      const color = PALETTE[grid[i][j]];
      ctx.fillStyle = color;
      ctx.fillRect(i * GRID_SIZE, j * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }
  }

  // Update the grid
  let newGrid: number[][] = [];
  for (let i = 0; i < NUM_CELLS; i++) {
    newGrid[i] = [];
    for (let j = 0; j < NUM_CELLS; j++) {
      let neighbors = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x === 0 && y === 0) {
            continue;
          }
          const ni = (i + x + NUM_CELLS) % NUM_CELLS;
          const nj = (j + y + NUM_CELLS) % NUM_CELLS;
          if (grid[ni][nj] === grid[i][j]) {
            neighbors++;
          }
        }
      }
      newGrid[i][j] = (grid[i][j] + (neighbors % PALETTE.length)) % PALETTE.length;
    }
  }
  grid = newGrid;
  // for (const [i, row] of grid.entries()) {
  //   for (const [j, state] of row.entries()) {
  //     ctx.fillStyle = colors[0][state]
      
  //     ctx.fillRect(j * 1, i * 1, 1, 1)
  //   }
  // }

  // Request the next animation frame
  // requestAnimationFrame(draw);
}

// Start the animation
draw();

export {}
