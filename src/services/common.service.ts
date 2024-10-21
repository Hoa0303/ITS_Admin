const API_URL = import.meta.env.VITE_API_URL;

export const toImageLink = (url: string) => API_URL + "/" + url;

export const fomratVND = (value: number) =>
  new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  }).format(value);

const timezone7 = 7 * 60 * 60 * 1000;
export const formatISOString = (value: string) => {
  const time = new Date().getTime() + timezone7;
  return new Date(time).toISOString();
};

export const formatDate = (value: string) => {
  const data = new Date(value);
  return data.toLocaleDateString();
};

export const formatTime = (value: string) => {
  const data = new Date(value);
  return data.toLocaleTimeString();
};
