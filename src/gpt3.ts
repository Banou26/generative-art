function convolution_indexes(r, n) {
  let result = [];
  for (let x = -r; x <= r; x++) {
    for (let y = -r; y <= r; y++) {
      let M = (x != 0 || y != 0) * 1;
      let N = (Math.abs(x) + Math.abs(y) <= r) * M;
      let Mr = ((Math.abs(x) == r) || (Math.abs(y) == r)) * M;
      let Nr = (Math.abs(x) + Math.abs(y) == r) * M;
      let Cr = ((x == 0) || (y == 0)) * M;
      let S1 = (((x > 0) && (y > 0)) || ((x < 0) && (y < 0))) * 1;
      let Bl = (Math.abs(x) == Math.abs(y)) * M;
      let D1 = (Math.abs(x) > Math.abs(y)) * M;
      let D2 = ((Math.abs(x) == Math.abs(y)) || Math.abs(x) == r) * M;
      let C2 = M - N;
      let Z = ((Math.abs(y) == r) || (x == y)) * M;
      let t = ((y == r) || (x == 0)) * M;
      let U = ((Math.abs(x) == r) || (y == -r)) * M;
      let H = (Math.abs(x) == r || y == 0) * M;
      let TM = ((Math.abs(x) == Math.abs(y)) || Math.abs(x) == r || Math.abs(y) == r) * M;
      let S2 = ((y==0) || ((x == r) && (y > 0)) ||((x == -r) && (y < 0))) * M;
      let M2 = ((Math.abs(x) == r) || (Math.abs(x) == Math.abs(y) && y > 0)) * M;

      if (M > 0 && (n == "M" || n == "N" || n == "Mr" || n == "Nr" || n == "Cr" || n == "S1" || n == "Bl" || n == "D1" || n == "D2" || n == "C2" || n == "Z" || n == "t" || n == "U" || n == "H" || n == "TM" || n == "S2" || n == "M2")) {
        result.push([x, y]);
      }
    }
  }
  return result;
}
