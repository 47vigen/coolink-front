export const getImgSrc = (data) => {
  if (!data) return null

  if (data.includes('base64') || data.includes('gravatar.com')) {
    return data
  }

  if (isIgLink(data)) {
    return `https://${process.env.API_WORKER}/${data}`
  }

  return process.env.API_URI.concat(data)
}

export const isIgLink = (data) => {
  if (data.includes('.cdninstagram.com') || data.includes('.fbcdn.net')) {
    return data
  } else return false
}
