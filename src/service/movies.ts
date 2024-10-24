import { API } from "../lib/axios";

export class MoviesService{
  static async listMovies() {
    const response = await API.get("discover/movie", {
      params: {
        api_key: "db54934853c9ec1bc9926f2ca56bc80e",
        language:"pt-BR"
      }
    })

    return response.data
  }
  static async getMoviesById(id: string) {
    const response = await API.get("")
  }
}
