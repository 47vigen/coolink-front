export const getImgSrc = (data) => {
  if (!data) return null

  if (data.includes('base64') || data.includes('gravatar.com')) {
    return data
  }

  return process.env.API_URI.concat(data)
}
