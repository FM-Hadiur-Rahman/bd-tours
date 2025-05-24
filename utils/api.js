// bd-tours/utils/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchFromAPI(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, options);
  if (!res.ok) throw new Error("API request failed");
  return res.json();
}

export { API_BASE_URL };
