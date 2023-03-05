// https://www.colourlovers.com/api/palettes/top?format=json
const colors = [
  ["#69D2E7", "#A7DBD8", "#E0E4CC", "#F38630", "#FA6900"],
  ["#FE4365", "#FC9D9A", "#F9CDAD", "#C8C8A9", "#83AF9B"],
  ["#ECD078", "#D95B43", "#C02942", "#542437", "#53777A"],
  ["#556270", "#4ECDC4", "#C7F464", "#FF6B6B", "#C44D58"],
  ["#774F38", "#E08E79", "#F1D4AF", "#ECE5CE", "#C5E0DC"],
  ["#E8DDCB", "#CDB380", "#036564", "#033649", "#031634"],
  ["#490A3D", "#BD1550", "#E97F02", "#F8CA00", "#8A9B0F"],
  ["#594F4F", "#547980", "#45ADA8", "#9DE0AD", "#E5FCC2"],
  ["#00A0B0", "#6A4A3C", "#CC333F", "#EB6841", "#EDC951"],
  ["#E94E77", "#D68189", "#C6A49A", "#C6E5D9", "#F4EAD5"],
  ["#3FB8AF", "#7FC7AF", "#DAD8A7", "#FF9E9D", "#FF3D7F"],
  ["#D9CEB2", "#948C75", "#D5DED9", "#7A6A53", "#99B2B7"],
  ["#FFFFFF", "#CBE86B", "#F2E9E1", "#1C140D", "#CBE86B"],
  ["#343838", "#005F6B", "#008C9E", "#00B4CC", "#00DFFC"],
  ["#EFFFCD", "#DCE9BE", "#555152", "#2E2633", "#99173C"],
  ["#413E4A", "#73626E", "#B38184", "#F0B49E", "#F7E4BE"],
  ["#FF4E50", "#FC913A", "#F9D423", "#EDE574", "#E1F5C4"],
  ["#99B898", "#FECEA8", "#FF847C", "#E84A5F", "#2A363B"],
  ["#655643", "#80BCA3", "#F6F7BD", "#E6AC27", "#BF4D28"],
  ["#00A8C6", "#40C0CB", "#F9F2E7", "#AEE239", "#8FBE00"],
]

// https://stackoverflow.com/a/47593316
const cyrb128 = (str: string) => {
  let h1 = 1779033703, h2 = 3144134277,
      h3 = 1013904242, h4 = 2773480762
  for (let i = 0, k; i < str.length; i++) {
      k = str.charCodeAt(i)
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067)
      h2 = h3 ^ Math.imul(h2 ^ k, 2869860233)
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213)
      h4 = h1 ^ Math.imul(h4 ^ k, 2716044179)
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067)
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233)
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213)
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179)
  return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0] as const
}

const sfc32 = (a: number, b: number, c: number, d: number) =>
  () => {
    a >>>= 0
    b >>>= 0
    c >>>= 0
    d >>>= 0 
    let t = (a + b) | 0
    a = b ^ b >>> 9
    b = c + (c << 3) | 0
    c = (c << 21 | c >>> 11)
    d = d + 1 | 0
    t = t + d | 0
    c = c + t | 0
    return (t >>> 0) / 4294967296
  }

const array = n => {let A = new Array(n); for (let i = 0; i < n; i++) A[i] = i; return A}

// https://stackoverflow.com/a/53758827
function shuffle(array: any[], _random: (min: number, max?: number) => number) {                // <-- ADDED ARGUMENT
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(_random(1) * m--);        // <-- MODIFIED LINE

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

// More pattern ideas here https://makio135.com/shapes/

// https://observablehq.com/@makio135/blend-modes-clippaths?collection=@makio135/generating-svgs
export const makeSVG = (
  { width, height, seed = Date.now(), palette }:
  { width: number, height: number, seed: number, palette: string[] }
) => {
  const rand = sfc32(...cyrb128(seed.toString()))
  const prng = {
    rand: (min: number, max?: number) => {
      if (!max) {
        max = min;
        min = 0;
      }
      return Math.round(min + (rand() * (max - min)))
    }
  }

  if (!palette) palette = shuffle(colors[Math.floor(rand() * colors.length)], prng.rand)

  const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" style="background: ${palette[0]}">
    <defs>
      ${(() => {
        const createClip = (N: number) => {
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
      const createShapes = (N: number) => {
        const size = width / N
        let ny = Math.ceil(height / size)
        if(ny % 2) ny ++
        const marginY = (height - ny * size) / 2
        return array(N).map((_, i) => {
          const x = i * size
          return array(ny).map(j => {
            const c = palette[prng.rand(1, palette.length-1)]
            const y = marginY + j * size
            const dir = prng.rand(1)
            
            return `<g transform="translate(${x}, ${y})" clip-path="url(#clip-${N})">
              ${array(2).map(() => {
                const lw = prng.rand(size)
                const x1 = dir === 0 ? prng.rand(-size, size) : prng.rand(size * 2)
                const x2 = x1 + (size + lw * 2) * (dir === 0 ? 1: -1)
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
  </svg>
  `

  return svg
}

setTimeout(() => {
  const svg = makeSVG({ width: 800, height: 800, seed: 1234 })
  var svgBlob = new Blob([svg], {type: 'image/svg+xml'});
  var svgURL = window.URL.createObjectURL(svgBlob);

  const img = document.createElement('img')
  document.body.appendChild(img)

  // img.outerHTML = svg
  img.src = svgURL
}, 1_000)
