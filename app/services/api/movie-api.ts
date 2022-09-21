import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetDetailMoviesResult, GetMoviesResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

export class MoviesStoreAPI {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getNowShowingList(): Promise<GetMoviesResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get("/top_rated")
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const movies = response.data?.results || []
      return { kind: "ok", movies: this.mapData(movies) }
    } catch (error) {
      __DEV__ && console.tron.log(error.message)
      return { kind: "bad-data" }
    }
  }
  async getComingSoonMoviesList(): Promise<GetMoviesResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get("/upcoming")
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const movies = response.data?.results || []
      return { kind: "ok", movies: this.mapData(movies) }
    } catch (error) {
      __DEV__ && console.tron.log(error.message)
      return { kind: "bad-data" }
    }
  }

  async getDetailMoviesStore({ movieId }): Promise<GetDetailMoviesResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`/${movieId}`)
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const movies = response.data || {}
      console.log("moviesmoviesmoviesmovies", response?.data)
      const convertBeforeData: any = {
        adult: movies.adult,
        backdropPath: movies.backdrop_path, // return path image like:  "/2RSirqZG949GuRwN38MYCIGG4Od.jpg"
        // genreIds: movies.genre_ids,
        id: movies.id,
        originalLanguage: movies.original_language,
        originalTitle: movies.original_title,
        overview: movies.overview,
        popularity: movies.popularity,
        posterPath: movies.poster_path, // return path image like:  "/v28T5F1IygM8vXWZIycfNEm3xcL.jpg"
        releaseDate: movies.release_date,
        title: movies.title,
        video: movies.video,
        voteAverage: movies.vote_average,
        voteCount: movies.vote_count,
      }
      return { kind: "ok", movies: convertBeforeData }
    } catch (error) {
      __DEV__ && console.tron.log(error.message)
      return { kind: "bad-data" }
    }
  }

  private mapData(beforeData: Array<any>): Array<any> {
    return beforeData.map((movie) => ({
      adult: movie.adult,
      backdropPath: movie.backdrop_path, // return path image like:  "/2RSirqZG949GuRwN38MYCIGG4Od.jpg"
      genreIds: movie.genre_ids,
      id: movie.id,
      originalLanguage: movie.original_language,
      originalTitle: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      posterPath: movie.poster_path, // return path image like:  "/v28T5F1IygM8vXWZIycfNEm3xcL.jpg"
      releaseDate: movie.release_date,
      title: movie.title,
      video: movie.video,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
    }))
  }
}
