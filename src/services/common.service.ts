const API_URL = import.meta.env.VITE_API_URL

export const toImageLink = (url: string) => API_URL + '/' + url
