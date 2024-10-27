import { API } from "../lib/axios";

export class MoviesService {
  static async listMovies(page: number) {
    const response = await API.get("discover/movie", {
      params: {
        page,
        api_key: "db54934853c9ec1bc9926f2ca56bc80e",
        language: "pt-BR"
      }
    })

    return response.data
  }

  static async listPopularMovies() {
    const response = await API.get("movie/popular", {
      params: {
        api_key: "db54934853c9ec1bc9926f2ca56bc80e",
        language: "pt-BR"
      },
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjU0OTM0ODUzYzllYzFiYzk5MjZmMmNhNTZiYzgwZSIsIm5iZiI6MTcyOTk2Mjc2Ny45MzUwMzQsInN1YiI6IjY3MWE2NGNmZTgzM2Q5MmVmMDVmZTIyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.64qH8SqWCRjCeEKe_yzjffUYwAahspJUamPDvkIRboQ'
      }
    })

    return response.data
  }

  static async getMoviesById(id: number) {
    const response = await API.get(`movie/${id}`, {
      params: {
        api_key: "db54934853c9ec1bc9926f2ca56bc80e",
        language: "pt-BR"
      }
    })

    return response.data
  }


  static async trailer(id: number) {
    const response = await API.get(`movie/${id}/videos`, {
      params: {
        api_key: "db54934853c9ec1bc9926f2ca56bc80e",
        language: "pt-BR"
      }
    })

    return response.data
  }

}
