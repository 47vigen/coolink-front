export default function lessable(data = {}, idx = 0, initial = null) {
  const combined = data || {}
  const keys = Object.keys(combined)
  if (keys.length) {
    return combined[keys[idx]]
  }
  return initial
}
