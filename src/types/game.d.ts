type Game = {
  id: number;
  name: string;
  background_image: string | null;
  rating: number;
  released: string | null;
  metacritic?: number | null;
  platforms?: Array<{
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  }>;
};

type GamesApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
};

type GameFilters = {
  page: number;
  pageSize: number;
  search?: string;
  genres?: string;
  platforms?: string;
  ordering?: string;
};

export type { Game, GamesApiResponse, GameFilters };
