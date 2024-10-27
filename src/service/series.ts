import { API } from "../lib/axios";

export class SeriesService {
  static async listSeries(page: number) {
    const response = await API.get("discover/tv", {
      params: {
        page,
        api_key: "db54934853c9ec1bc9926f2ca56bc80e",
      }
    })

    return response.data
  }

  static async getSeriesById(id: number) {
    const response = await API.get(`/tv/${id}`, {
      params: {
        api_key: "db54934853c9ec1bc9926f2ca56bc80e",
      }
    })
    console.log(response.data)

    return response.data
  }

  static async trailer(id: number) {
    const response = await API.get(`tv/${id}/season/1/episode/1/videos`, {
      params: {
        api_key: "db54934853c9ec1bc9926f2ca56bc80e",
      }
    })

    return response.data
  }

}
