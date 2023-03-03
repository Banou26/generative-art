type State = number;

interface Cell {
  state: State;
  x: number;
  y: number;
}

type Neighborhood = Cell[];

type Rule = (cell: Cell, neighborhood: Neighborhood) => State;

interface Automaton {
  cells: Cell[][];
  rule: Rule;
}

function createAutomaton(
  width: number,
  height: number,
  range: number,
  states: number,
  threshold: number
): Automaton {
  const cells: Cell[][] = [];
  for (let y = 0; y < height; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < width; x++) {
      row.push({ state: Math.floor(Math.random() * states), x, y });
    }
    cells.push(row);
  }
  const rule: Rule = (cell, neighborhood) => {
    const counts: number[] = new Array(states).fill(0);
    for (const neighbor of neighborhood) {
      counts[neighbor.state]++;
    }
    const maxCount = Math.max(...counts);
    if (maxCount >= threshold) {
      return (cell.state + 1) % states;
    } else {
      return cell.state;
    }
  };
  return { cells, rule };
}

function getMooreNeighborhood(
  cells: Cell[][],
  x: number,
  y: number,
  range: number
): Neighborhood {
  const neighborhood: Neighborhood = [];
  for (let dy = -range; dy <= range; dy++) {
    for (let dx = -range; dx <= range; dx++) {
      if (dx === 0 && dy === 0) {
        continue;
      }
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < cells[0].length && ny >= 0 && ny < cells.length) {
        neighborhood.push(cells[ny][nx]);
      }
    }
  }
  return neighborhood;
}

function iterateAutomaton(automaton: Automaton): void {
  const newCells: Cell[][] = [];
  for (let y = 0; y < automaton.cells.length; y++) {
    const newRow: Cell[] = [];
    for (let x = 0; x < automaton.cells[y].length; x++) {
      const neighborhood = getMooreNeighborhood(
        automaton.cells,
        x,
        y,
        Math.floor(automaton.cells[y].length / 2)
      );
      const newState = automaton.rule(automaton.cells[y][x], neighborhood);
      newRow.push({ state: newState, x, y });
    }
    newCells.push(newRow);
  }
  automaton.cells = newCells;
}


const colors = ['#455d7a', '#f95959', '#facf5a', '#fff1bc', '#7dc383', '#699c78']

const canvas = document.body.appendChild(document.createElement('canvas'))
canvas.height = 1000
canvas.width = 1000
const ctx = canvas.getContext('2d')!

// Example usage:
;(async () => {
  const automaton = createAutomaton(100, 100, 1, 2, 3);
  for (let i = 0; i < 10; i++) {
    iterateAutomaton(automaton);
    console.log(automaton.cells);
    for (const row of automaton.cells) {
      for (const cell of row) {
        ctx.fillStyle = colors[cell.state]
        ctx.fillRect(cell.x * 1, cell.y * 1, 1, 1)
      }
    }
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  console.log(automaton.cells);
})()

export {}
