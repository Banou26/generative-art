type State = number;
type Neighborhood = State[];

interface CyclicAutomataParams {
  range: number;
  states: number;
  threshold: number;
  iter: number;
  width: number;
  height: number;
}

interface CyclicAutomata {
  grid: State[][];
}

const getNextState = (
  neighborhood: Neighborhood,
  states: number,
  threshold: number
): State => {
  const counts = new Array(states).fill(0);
  for (const state of neighborhood) {
    counts[state]++;
  }
  const maxCount = Math.max(...counts);
  const candidates = counts
    .map((count, state) => ({ state, count }))
    .filter((candidate) => candidate.count >= threshold)
    .map((candidate) => candidate.state);
  const nextState = candidates[Math.floor(Math.random() * candidates.length)];
  return nextState;
};

const getNeighborhood = (
  grid: State[][],
  row: number,
  col: number,
  range: number
): Neighborhood => {
  const neighborhood: Neighborhood = [];
  const height = grid.length;
  const width = grid[0].length;
  for (let i = -range; i <= range; i++) {
    for (let j = -range; j <= range; j++) {
      const r = (row + i + height) % height;
      const c = (col + j + width) % width;
      neighborhood.push(grid[r][c]);
    }
  }
  return neighborhood;
};

const createGrid = (height: number, width: number, states: number): State[][] =>
  Array.from({ length: height }, () =>
    Array.from({ length: width }, () => Math.floor(Math.random() * states))
  );

const updateGrid = (
  grid: State[][],
  range: number,
  states: number,
  threshold: number
): State[][] => {
  const height = grid.length;
  const width = grid[0].length;
  const nextGrid: State[][] = new Array(height);
  for (let i = 0; i < height; i++) {
    nextGrid[i] = new Array(width);
    for (let j = 0; j < width; j++) {
      const neighborhood = getNeighborhood(grid, i, j, range);
      const nextState = getNextState(neighborhood, states, threshold);
      nextGrid[i][j] = nextState;
    }
  }
  return nextGrid;
};

const runSimulation = (
  grid: State[][],
  range: number,
  states: number,
  threshold: number,
  iter: number
): State[][] => {
  let nextGrid = grid;
  for (let i = 0; i < iter; i++) {
    nextGrid = updateGrid(nextGrid, range, states, threshold);
  }
  return nextGrid;
};

const createCyclicAutomata = (params: CyclicAutomataParams): CyclicAutomata => {
  const { range, states, threshold, iter, width, height } = params;
  const grid = createGrid(height, width, states);
  return { grid }
  const updatedGrid = runSimulation(grid, range, states, threshold, iter);
  return { grid: updatedGrid };
};

const params: CyclicAutomataParams = {
  range: 5,
  states: 5,
  threshold: 29,
  iter: 100,
  width: 200,
  height: 200,
};

const { grid } = createCyclicAutomata(params);

const colors = ['#455d7a', '#f95959', '#facf5a', '#fff1bc', '#7dc383', '#699c78']

const canvas = document.body.appendChild(document.createElement('canvas'))
canvas.height = 1000
canvas.width = 1000
const ctx = canvas.getContext('2d')!

for (let i = 0; i < params.iter; i++) {
  const newGrid = updateGrid(grid, params.range, params.states, params.threshold);
  for (const [i, row] of newGrid.entries()) {
    for (const [j, state] of row.entries()) {
      ctx.fillStyle = colors[state]
      
      ctx.fillRect(j * 1, i * 1, 1, 1)
    }
  }
}

export {}
