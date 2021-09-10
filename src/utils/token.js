export const setToken = (token) => {
  if (typeof window !== 'undefined') return localStorage.setItem('token', token)
}

export const getToken = () => {
  if (typeof window !== 'undefined') return localStorage.getItem('token')
}

export const removeToken = () => {
  if (typeof window !== 'undefined') return localStorage.removeItem('token')
}
