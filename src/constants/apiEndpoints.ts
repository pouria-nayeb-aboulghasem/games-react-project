const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_ENDPOINTS = {
  games: "api/games",
  genres: "api/genres",
  platforms: "api/platforms",
} as const;

export { API_BASE_URL, API_ENDPOINTS };
