
var TAPS = {
  2: [2, 1], // 3
  3: [3, 2], // 7
  4: [4, 3], // 15
  5: [5, 3], // 31
  6: [6, 5], // 63
  7: [7, 6], // 127
  8: [8, 6, 5, 4], // 255
  9: [9, 5], // 511
  10: [10, 7], // 1023
  11: [11, 9], // 2027
  12: [12, 11, 10, 4], // 4095
  13: [13, 12, 11, 8], // 8191
  14: [14, 13, 12, 2], // 16383
  15: [15, 14], // 32767
  16: [16, 14, 13, 11], // 65535
  17: [17, 14], // 131071
  18: [18, 11], // 262143
  19: [19, 18, 17, 14], // 524287
  20: [20, 17],
  21: [21, 19],
  22: [22, 21],
  23: [23, 18],
  24: [24, 23, 22, 17],
  25: [25, 22],
  26: [26, 6, 2, 1],
  27: [27, 5, 2, 1],
  28: [28, 25],
  29: [29, 27],
  30: [30, 6, 4, 1],
  31: [31, 28]
  // Out of javascript integer range
  // 32: [32, 22, 2, 1],
  // 33: [33, 20],
  // 34: [34, 27, 2, 1],
  // 35: [35, 33],
  // 36: [36, 25],
  // 37: [37, 5, 4, 3, 2, 1],
  // 38: [38, 6, 5, 1],
  // 39: [39, 35],
  // 40: [40, 38, 21, 19],
  // 41: [41, 38],
  // 42: [42, 41, 20, 19],
  // 43: [43, 42, 38, 37],
  // 44: [44, 43, 18, 17],
  // 45: [45, 44, 42, 41],
  // 46: [46, 45, 26, 25],
  // 47: [47, 42],
  // 48: [48, 47, 21, 20],
  // 49: [49, 40],
  // 50: [50, 49, 24, 23],
  // 51: [51, 50, 36, 35],
  // 52: [52, 49],
  // 53: [53, 52, 38, 37],
  // 54: [54, 53, 18, 17],
  // 55: [55, 31],
  // 56: [56, 55, 35, 34],
  // 57: [57, 50],
  // 58: [58, 39],
  // 59: [59, 58, 38, 37],
  // 60: [60, 59],
  // 61: [61, 60, 46, 45],
  // 62: [62, 61, 6, 5],
  // 63: [63, 62],
  // 64: [64, 63, 61, 60]
};

/**
* @param {Number} [n] number of bits in the register
* @param {Number} [seed] start state
*/
function LFSR(n, seed) {
  this.n = n || this.DEFAULT_LENGTH;
  this.taps = TAPS[this.n];
  seed || (seed = this._defaultSeed(this.n));

  // Get last n bit from the seed if it's longer
  var mask = parseInt(Array(this.n + 1).join('1'), 2);
  this.register = (seed & mask);
}

LFSR.prototype = {
  TAPS: TAPS,
  DEFAULT_LENGTH: 31,
  shift: function() {
      var tapsNum = this.taps.length,
          i,
          bit = this.register >> (this.n - this.taps[0]);
      for (i = 1; i < tapsNum; i++) {
          bit = bit ^ (this.register >> (this.n - this.taps[i]));
      }
      bit = bit & 1;
      this.register = (this.register >> 1) | (bit << (this.n - 1));
      return bit & 1;
  },
  /**
   * @return {Number} sequence of next n shifted bits from
   */
  seq: function(n) {
      var seq = 0;
      for (var i = 0; i < n; i++) {
          seq = (seq << 1) | this.shift();
      }
      return seq;
  },
  /**
   * @return {String} string representing binary sequence of n bits
   */
  seqString: function(n) {
      var seq = '';
      for (var i = 0; i < n; i++) {
          seq += this.shift();
      }
      return seq;
  },
  /**
   * @return {Number} number of shifts before initial state repeats
   */
  maxSeqLen: function() {
      var initialState = this.register,
          counter = 0;
      do {
          this.shift();
          counter++;
      } while (initialState != this.register);
      return counter;
  },
  /**
   * @return {Number} number that is represented by sequence
   * of 1 and 0
   */
  _defaultSeed: function(n) {
      if (!n) throw new Error('n is required');
      var lfsr = new LFSR(8, 92914);
      return lfsr.seq(n);
  }
};

const DEFAULT_SEED = 149304961039362642461
const REGISTER_LENGTH = 31
const FLUSH_TIMES = 20

/**
 * @param {Number} [seed] value for LFSR
 */
function PRNG(seed) {
    this.lfsr = new LFSR(REGISTER_LENGTH, seed || DEFAULT_SEED);
    // flush initial state of register because thay may produce
    // weird sequences
    this.lfsr.seq(FLUSH_TIMES * REGISTER_LENGTH);
}

PRNG.prototype = {
    /**
     * @param {Number} min value
     * @param {Number} max value
     */
    rand: function(min, max) {
        // if invoked with one value consider min to be 0
        // rand(16) == rand(0, 16)
        if (!max) {
            max = min;
            min = 0;
        }

        // swap if min > max
        if (min > max) {
            var t = max;
            max = min;
            min = t;
        }

        const offset = min;

        var bits = ~~this._log2(max - offset) + 1,
            random;
        do {
            random = this.lfsr.seq(bits);
        } while (random > (max - offset));
        return random + offset;
    },
    _log2: function(n) {
        return Math.log(n) / Math.LN2;
    }
};

const array = n => {let A = new Array(n); for (let i = 0; i < n; i++) A[i] = i; return A}

const shuffle = arr => {
  const copy = [...arr] // create a copy of original array
  for (let i = copy.length - 1; i; i --) {
    const randomIndex = randInt(i + 1);
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]] // swap
  }
  return copy
}

const random = (a, b) => {
  if(Array.isArray(a)) return a[Math.random() * a.length | 0]
  if(!a && a !== 0) return Math.random()
  if(!b && b !== 0) return Math.random() * a

  if(a > b) [a, b] = [b, a] // swap values
  return a + Math.random() * (b - a)
}

const randInt = (a, b) => ~~random(a, b)

const palettes = [
  ['#455d7a', '#f95959', '#facf5a'],
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

const getRandomPalette = () => {
  const keys = Object.keys(palettes)
  return palettes[keys[Math.random() * keys.length | 0]]
}

const makeSVG = (
  { width, height, N = 8, seed = Date.now(), palette = shuffle(getRandomPalette())  }:
  { width: number, height: number, seed: number, palette: [string, string, string] }
) => {

  const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" style="background: ${palette[0]}">
  <style>
    g { 
      /* testing different blend modes, only the last one is used
      mix-blend-mode: normal;
      mix-blend-mode: darken;
      mix-blend-mode: exclusion;
      mix-blend-mode: difference;
      mix-blend-mode: overlay;
      mix-blend-mode: soft-light;
      mix-blend-mode: multiply;
      mix-blend-mode: screen;
      mix-blend-mode: hard-light;
 */
    }
  </style>

  <defs>
    ${(() => {
      const createClip = N => {
        const size = width / N
        return `<clipPath id="clip-${N}">
          <rect
            x="0"
            y="0"
            width="${size + .2}"
            height="${size + .2}"
          />
        </clipPath>`
      }
      
      const clips = []
      for(let i = 2; i <= 32; i *= 2) {
        clips.push(createClip(i))
      }
      return clips.join('')
    })()}
  </defs>

  ${(() => {
    const prng = new PRNG(seed)
    const createShapes = N => {
      const size = width / N
      let ny = Math.ceil(height / size)
      if(ny % 2) ny ++
      const marginY = (height - ny * size) / 2
      return array(N).map((d, i, arr) => {
        const x = i * size
        return array(ny).map(j => {
          const c = palette[prng.rand(1, palette.length-1)]
          const y = marginY + j * size
          const cx = prng.rand(1) * size
          const cy = prng.rand(1) * size
          const dir = prng.rand(1)
          
          return `<g
            transform="translate(${x}, ${y})"
            clip-path="url(#clip-${N})"
          >
            ${array(2).map(j => {
              const lw = prng.rand(size)
              const x1 = dir === 0 ? prng.rand(-size, size) : prng.rand(size * 2)
              const x2 = x1 + (size + lw * 2) * (dir === 0 ? 1: -1)
              // const x1 = prng.rand(-size, size)
              // const x2 = x1 + size + lw * 2
              return `<line
                x1="${x1}"
                y1="${-lw}"
                x2="${x2}"
                y2="${size + lw}"
                stroke="${c}"
                stroke-width="${lw*.8}"
                opacity="${prng.rand(.95, 1.2)}"
              />`
            }).join()}
          </g>`
        }).join('')
      }).join('')
    }
    
    const shapes = []
    for(let i = 64; i >= 4; i /= 2) {
      shapes.push(createShapes(i))
    }
    return shapes.join('')
  })()}
</svg>`

  return svg
}

makeSVG({ width: 800, height: 800, seed: 1234 })

// const svg = document.createElement('svg')
// svg.innerHTML = makeSVG({ width: 800, height: 800, seed: 1234 })
// document.body.appendChild(svg)

setTimeout(() => {
  const svg = makeSVG({ width: 800, height: 800, seed: 1234 })
  var svgBlob = new Blob([svg], {type: 'image/svg+xml'});
  var svgURL = window.URL.createObjectURL(svgBlob);

  const img = document.createElement('img')
  img.src = svgURL
  document.body.appendChild(img)
}, 1_000)

// const div = document.createElement('div')
// div.style.height = '800px'
// div.style.width = '800px'
// div.style.backgroundImage = `url('data:image/svg+xml;base64,${btoa(svg)}')`
// document.body.appendChild(div)
// url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><linearGradient id='gradient'><stop offset='10%' stop-color='%23F00'/><stop offset='90%' stop-color='%23fcc'/> </linearGradient><rect fill='url(%23gradient)' x='0' y='0' width='100%' height='100%'/></svg>")