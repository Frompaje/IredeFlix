import { API } from "../lib/axios";

export class SeriesService{
  static async listSeries() {
    const response = await API.get("tv/changes", {
      params: {
        api_key: "db54934853c9ec1bc9926f2ca56bc80e",
        language:"pt-BR"
      }
    })

    return response.data
  }
}
