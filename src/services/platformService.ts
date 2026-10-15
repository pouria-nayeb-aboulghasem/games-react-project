import { API_BASE_URL, API_ENDPOINTS } from "@/constants";
import type { PlatformsApiResponse } from "@/types";

async function getPlatforms(): Promise<PlatformsApiResponse> {
  const params = new URLSearchParams({
    key: import.meta.env.VITE_RAWG_API_KEY,
  });

  const response = await fetch(
    `${API_BASE_URL}/${API_ENDPOINTS.platforms}?${params}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch platforms");
  }

  return response.json();
}

export { getPlatforms };
