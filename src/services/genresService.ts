import { API_BASE_URL, API_ENDPOINTS } from "@/constants";
import type { GenresApiResponse } from "@/types";

async function getGenres(signal?: AbortSignal): Promise<GenresApiResponse> {
  const params = new URLSearchParams({
    key: import.meta.env.VITE_RAWG_API_KEY,
  });

  const response = await fetch(
    `${API_BASE_URL}/${API_ENDPOINTS.genres}?${params}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }

  return response.json();
}

export { getGenres };
