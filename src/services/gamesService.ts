import { API_BASE_URL, API_ENDPOINTS } from "@/constants";
import type { GamesApiResponse, GameFilters } from "@/types";

async function getGames(
  filters: GameFilters,
  signal?: AbortSignal,
): Promise<GamesApiResponse> {
  const params = new URLSearchParams({
    key: import.meta.env.VITE_RAWG_API_KEY,
    page: String(filters.page),
    page_size: String(filters.pageSize),
  });

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.genres) {
    params.set("genres", filters.genres);
  }

  if (filters.platforms) {
    params.set("platforms", filters.platforms);
  }

  if (filters.ordering) {
    params.set("ordering", filters.ordering);
  }

  const response = await fetch(
    `${API_BASE_URL}/${API_ENDPOINTS.games}?${params}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
}

export { getGames };
