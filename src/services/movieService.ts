import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

interface SearchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface FetchMoviesResult {
  results: Movie[];
  totalPages: number;
}

export async function fetchMovies(
  query: string,
  page: number,
): Promise<FetchMoviesResult> {
  const response = await axios.get<SearchMoviesResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    },
  );

  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
}
