type Platform = {
  id: number;
  name: string;
  slug: string;
};

type PlatformsApiResponse = {
  count: number;
  results: Platform[];
};

export type { Platform, PlatformsApiResponse };
