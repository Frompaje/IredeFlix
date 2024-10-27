export type SeriesData = {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  type: string
  number_of_seasons:number
  number_of_episodes: number
  homepage:string
};

export type SeriesResponse = {
    page: number;
    results: SeriesData[];
    total_pages: number;
    total_results: number;
};
