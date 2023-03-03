const colors = [
  ['#455d7a', '#f95959', '#facf5a', '#fff1bc', '#7dc383', '#699c78'],
  ['#fff1bc', '#7dc383', '#699c78'],
  ['#3a4750', '#303841', '#be3144'],
  ['#f5f5f5', '#d6e6f2', '#303841'],
  ['#3a4750', '#f6c90e', '#eeeeee'],
  ['#feffc2', '#ffd2a5', '#d38cad'],
  ['#8ea6b4', '#e7eff3', '#ff8f56'],
  ['#374955', '#f62a66', '#ffd933'],
  ['#f5d7a1', '#f0a28e', '#ba6375'],
  ['#2f3c4f', '#506f86', '#fbb040'],
  ['#113a5d', '#ff7a8a', '#f9f9f9'],
  ['#232831', '#393e46', '#00adb5'],
  ['#fec8d8', '#d291bc', '#957dad'],
  ['#cc63dd', '#1855cc', '#102ebb'],
  ['#ebd9dd', '#d8aed3', '#9182c4'],
  ['#fffee4', '#86e1ff', '#52c8f0'],
  ['#ffaa15', '#334755', '#efeeef'],
  ['#4c6983', '#38556a', '#273952'],
  ['#155e63', '#76b39d', '#f9f8eb'],
  ['#e2c798', '#526680', '#9fc1d2'],
  ['#edaf1f', '#f2f2ff', '#17466e'],
  ['#6bd5e1', '#ffd98e', '#ffb677'],
  ['#0088cc', '#006699', '#005580'],
  ['#d23e31', '#9cc5c4', '#f8f8f5'],
  ['#4dddb8', '#5a47cc', '#313131'],
  ['#17466e', '#f8af9e', '#fae098'],
  ['#2c3e83', '#3d67c5', '#2ec9e6'],
  ['#fab796', '#f37d7c', '#74567a'],
  ['#7480ff', '#7abdff', '#7cfcf9'],
  ['#ffcdcd', '#6a65d8', '#1d2786'],
  ['#dfebed', '#497285', '#2b4450'],
  ['#fb929e', '#ffdfdf', '#fff6f6'],
  ['#552e5a', '#cf7979', '#f6e198'],
  ['#4e709d', '#89a4c7', '#cdd5e0'],
  ['#f2f4fb', '#ff9280', '#ff755e'],
  ['#1b3c59', '#a6ed8e', '#f2f2f0'],
  ['#b9ceeb', '#87a8d0', '#c3b4d2'],
  ['#e84a5f', '#ff847b', '#fecea8'],
  ['#00943e', '#004060', '#0a0a0a'],
  ['#e0ecf4', '#9ebcda', '#895cc4'],
  ['#4c657e', '#f29696', '#ffe2ad'],
  ['#1c819e', '#e6e6d4', '#ffbe00'],
  ['#005792', '#ffe6eb', '#ffcdcd'],
  ['#606470', '#93deff', '#f7f7f7'],
  ['#b9ddb7', '#6ecc78', '#00bb46'],
  ['#f7f7f7', '#393e46', '#5c636e'],
  ['#3fc1c9', '#f5f5f5', '#fc5185'],
  ['#509aaf', '#7dd8c7', '#f5ffc3'],
  ['#25ddae', '#3faecc', '#2b9dbb'],
  ['#dbe2ef', '#3f72af', '#112d4e'],
  ['#742dd2', '#efb1ff', '#ffe2ff'],
  ['#dddddd', '#cccccc', '#bbbbbb'],
  ['#596c98', '#996445', '#fdd6ac'],
  ['#98ccd3', '#364e68', '#132238'],
  ['#9ed763', '#2c9e4b', '#0a4650'],
  ['#dcb5ff', '#d9f2ff', '#a5bdfd'],
  ['#f5b17b', '#4e709d', '#89a4c7'],
  ['#00c150', '#0070c6', '#1b3452'],
  ['#8ea6b4', '#e7eff3', '#dc7000'],
  ['#b1cbfa', '#8e98f5', '#7874f2'],
  ['#c9f658', '#55968f', '#8acbbb'],
  ['#192f1a', '#19441c', '#9be78e'],
  ['#6fdda1', '#9d50cc', '#bb809e'],
  ['#155e63', '#76b39d', '#eae7e7'],
  ['#d56073', '#ec9e69', '#ffff8f'],
  ['#e3a8cb', '#e98e10', '#a2dc84'],
  ['#78fee0', '#4bc2c5', '#3b9a9c'],
  ['#081f37', '#1e549f', '#2e79ba'],
  ['#3498db', '#fcc29a', '#ecf0f1'],
  ['#734a68', '#bb3fa9', '#e3cfdf'],
  ['#64638f', '#9795cf', '#cbc9ff'],
  ['#dd724d', '#43cccb', '#6596bb'],
  ['#ffe2e2', '#f6f6f6', '#8785a2'],
  ['#ececeb', '#f9a828', '#07617d'],
  ['#bcffa8', '#6ba083', '#4f323b'],
  ['#2185d5', '#3a4750', '#303841'],
  ['#00709f', '#ffda4a', '#eeeeee'],
  ['#87e0ff', '#53c7f0', '#1d97c1'],
  ['#677bdd', '#493acc', '#7e50bb'],
  ['#dd3939', '#cc0000', '#bb0000'],
  ['#db5ca6', '#f9cc6a', '#fcff88'],
  ['#fef2c5', '#c38a8b', '#b0747b'],
  ['#31588a', '#638ccc', '#90b2e4'],
  ['#fd0054', '#a80038', '#2b2024'],
  ['#b72a67', '#ff9797', '#fde8cb'],
  ['#faf6e9', '#ece8d9', '#fffdf6'],
  ['#ba4a8a', '#ff5d6c', '#ffb23d'],
  ['#150c14', '#360f33', '#571752'],
  ['#ffebbb', '#a0dbdb', '#f4aeba'],
  ['#fffac0', '#ffd79a', '#73b9d7'],
  ['#8dc6ff', '#34495e', '#22313f'],
  ['#000000', '#04e695', '#f8f8f8'],
  ['#ffec00', '#4dcc43', '#32bb5a'],
  ['#1b3ea1', '#afebf0', '#bb1f57'],
  ['#404b69', '#da0463', '#dbedf3'],
  ['#ffdfd3', '#fec8d8', '#d291bc']
]

type State = number;
type Neighborhood = State[];


const canvas = document.body.appendChild(document.createElement('canvas'))
canvas.height = 1000
canvas.width = 1000
const ctx = canvas.getContext('2d')!


class CyclicAutomata {
  private readonly range: number;
  private readonly states: number;
  private readonly threshold: number;
  private readonly iter: number;
  private readonly width: number;
  private readonly height: number;
  private grid: State[][];

  constructor(
    range: number,
    states: number,
    threshold: number,
    iter: number,
    width: number,
    height: number
  ) {
    this.range = range;
    this.states = states;
    this.threshold = threshold;
    this.iter = iter;
    this.width = width;
    this.height = height;

    // Initialize grid with random values
    this.grid = new Array(height);
    for (let i = 0; i < height; i++) {
      this.grid[i] = new Array(width);
      for (let j = 0; j < width; j++) {
        this.grid[i][j] = Math.floor(Math.random() * states);
      }
    }
  }

  async run() {
    for (let i = 0; i < this.iter; i++) {
      const nextGrid: State[][] = new Array(this.height);
      for (let j = 0; j < this.height; j++) {
        nextGrid[j] = new Array(this.width);
        for (let k = 0; k < this.width; k++) {
          const neighborhood = this.getNeighborhood(j, k);
          const nextState = this.getNextState(neighborhood);
          nextGrid[j][k] = nextState;
        }
      }
      this.grid = nextGrid;
      for (const [i, row] of this.grid.entries()) {
        for (const [j, state] of row.entries()) {
          ctx.fillStyle = colors[0][state]
          
          ctx.fillRect(j * 1, i * 1, 1, 1)
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 0))
    }
  }

  private getNextState(neighborhood: Neighborhood): State {
    const counts = new Array(this.states).fill(0);
    for (const state of neighborhood) {
      counts[state]++;
    }
    const maxCount = Math.max(...counts);
    const candidates = counts
      .map((count, state) => ({ state, count }))
      .filter((candidate) => candidate.count === maxCount)
      .map((candidate) => candidate.state);
    const nextState = candidates[Math.floor(Math.random() * candidates.length)];
    return nextState;
  }

  private getNeighborhood(row: number, col: number): Neighborhood {
    const neighborhood: Neighborhood = [];
    for (let i = -this.range; i <= this.range; i++) {
      for (let j = -this.range; j <= this.range; j++) {
        const r = (row + i + this.height) % this.height;
        const c = (col + j + this.width) % this.width;
        neighborhood.push(this.grid[r][c]);
      }
    }
    return neighborhood;
  }

  public getGrid(): State[][] {
    return this.grid;
  }
}

const ca = new CyclicAutomata(5, 5, 29, 100, 100, 500);
ca.run();
const grid = ca.getGrid();
console.log(grid);

export {}
