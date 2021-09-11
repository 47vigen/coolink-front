export const getFileBase = async (url) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  const raw = JSON.stringify({ url })

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
    redirect: 'follow'
  }

  try {
    const response = await fetch('/api/filebase', requestOptions)
    const result = await response.json()
    return result
  } catch (error) {
    return console.log('error', error)
  }
}
