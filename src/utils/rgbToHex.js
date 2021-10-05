function componentToHex(c) {
  var hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

export function rgbToHex(rgb) {
  const colors = rgb.replace('rgb(', '').replace(')', '').split(',')
  const r = +colors[0]?.trim()
  const g = +colors[1]?.trim()
  const b = +colors[2]?.trim()

  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}
