var base64Arraybuffer = require('base64-arraybuffer')

function getFileBase(req, res) {
  const { url: file } = req.body

  let url = new URL(file.replace('https:/', 'https://'))

  if (!url.hostname.endsWith('.cdninstagram.com') && !url.hostname.endsWith('.fbcdn.net')) {
    res.status(403).json({ error: true, data: 'Bad upstream hostname' })
  }

  if (!url.pathname.endsWith('.mp4') && !url.pathname.endsWith('.jpg')) {
    res.status(403).json({ error: true, data: 'Bad file extension' })
  }

  let base64Type = url.pathname.endsWith('.mp4') ? 'video/mp4' : 'image/jpg'

  fetch(url.toString())
    .then((response) => response.arrayBuffer())
    .then((result) => {
      res.status(200).json({
        base64: `data:${base64Type};base64, ${base64Arraybuffer.encode(result)}`
      })
    })
    .catch((error) => res.status(403).json({ error: true, data: error }))
}

export default getFileBase
