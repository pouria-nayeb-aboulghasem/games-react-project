type Genre = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
};

type GenresApiResponse = {
  count: number;
  results: Genre[];
};

export type { Genre, GenresApiResponse };
