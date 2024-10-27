import { MovieData } from "./movies"

export type PaginationResponse = {
  page: number
  result: MovieData[]
  total_pages: number
  total_results: number

}
