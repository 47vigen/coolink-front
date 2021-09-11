const tailColors = require('tailwindcss/colors')
const colors = {
  gray: tailColors.coolGray,
  red: tailColors.red,
  yellow: tailColors.amber,
  green: tailColors.emerald,
  blue: tailColors.blue,
  indigo: tailColors.indigo,
  purple: tailColors.violet,
  pink: tailColors.pink
}

export function getPalette() {
  const palette = []
  Object.keys(colors).map((color) => {
    Object.keys(colors[color]).map(
      (range) =>
        range >= 500 &&
        palette.push({
          color,
          range,
          hex: colors[color][range],
          class: `${color}-${range}`
        })
    )
  })
  return palette
}

export function getSimilarColor(colorHex) {
  const smilarColors = getPalette().map(({ hex }) => hex)

  const hexToRgb = (hex) =>
    hex
      .slice(1)
      .replace(/^(.)(.)(.)$/gi, '$1$1$2$2$3$3')
      .match(/.{2}/g)
      .map((c) => parseInt(c, 16))

  const distance = (a, b) => Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2))

  const nearestColor = (colorHex) =>
    smilarColors.reduce(
      (a, v, i, arr) => (a = distance(hexToRgb(colorHex), hexToRgb(v)) < a[0] ? [distance(hexToRgb(colorHex), hexToRgb(v)), v] : a),
      [Number.POSITIVE_INFINITY, smilarColors[0]]
    )[1]

  return getPalette().find(({ hex }) => hex == nearestColor(colorHex))
}
