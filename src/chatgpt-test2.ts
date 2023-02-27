
function initial_grid(s, w, h) {
  var matrix = [];
  for (var i = 0; i < h; i++) {
    var row = [];
    for (var j = 0; j < w; j++) {
      row.push(Math.floor(Math.random() * s));
    }
    matrix.push(row);
  }
  return matrix;
}

function convolution_indexes(r, n) {
  var indexes = [];
  for (var x = -r; x <= r; x++) {
    for (var y = -r; y <= r; y++) {
      if (x != 0 || y != 0) {
        var M = 1;
        var N = Math.abs(x) + Math.abs(y) <= r ? M : 0;
        var Mr = Math.abs(x) == r || Math.abs(y) == r ? M : 0;
        var Nr = Math.abs(x) + Math.abs(y) == r ? M : 0;
        var Cr = x == 0 || y == 0 ? M : 0;
        var S1 = (x > 0 && y > 0) || (x < 0 && y < 0) ? 1 : 0;
        var Bl = Math.abs(x) == Math.abs(y) ? M : 0;
        var D1 = Math.abs(x) > Math.abs(y) ? M : 0;
        var D2 = Math.abs(x) == Math.abs(y) || Math.abs(x) == r ? M : 0;
        var C2 = M - N;
        var Z = Math.abs(y) == r || x == y ? M : 0;
        var t = y == r || x == 0 ? M : 0;
        var U = Math.abs(x) == r || y == -r ? M : 0;
        var H = Math.abs(x) == r || y == 0 ? M : 0;
        var TM = Math.abs(x) == Math.abs(y) || Math.abs(x) == r || Math.abs(y) == r ? M : 0;
        var S2 = y == 0 || (x == r && y > 0) || (x == -r && y < 0) ? M : 0;
        var M2 = Math.abs(x) == r || (Math.abs(x) == Math.abs(y) && y > 0) ? M : 0;
        
        if (eval(n) > 0) {
          indexes.push({x: x, y: y});
        }
      }
    }
  }
  return indexes;
}

// # Set parameters
const range = 5;
const thresold = 29;
const states = 5;
const neighborhood = "M";
const iter = 600;

const width = 1500;
const height = 1500;

// Helper function to create a w x h matrix of random states
function initial_grid(s, w, h) {
  const matrix = new Array(h).fill(null).map(() => new Array(w));
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      matrix[i][j] = Math.floor(Math.random() * s);
    }
  }
  return matrix;
}

let X = initial_grid(states, width, height);

for (let i = 0; i < iter; i++) {
  const L = convolution_indexes(range, neighborhood);
  X = iterate_cyclic(X, L, states, thresold);
}

// Transform resulting environment matrix into data frame
const df = [];
for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    df.push({x: j, y: i, v: X[i][j]});
  }
}

// Pick a top palette from colourlovers
const palettes = colourlovers.getPalettes({numResults: 1, sortBy: "numVotes"});
const palette = palettes[0];
const colors = palette.colors.map(color => "#" + color);

// Do the plot
const plot = ggplot(df, aes(x, y, fill = v)) +
  geom_raster(interpolate = true) +
  coord_equal() +
  scale_fill_gradientn(colors) +
  scale_y_continuous(expand = [0, 0]) + 
  scale_x_continuous(expand = [0, 0]) +
  theme_void();

print(plot);
