import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { MovieModel, MovieSnapshotOut } from "../movies/movies"

/**
 * Example store containing Rick and Morty characters
 */
interface Props {
  movieId?: number
}

export const DetailMovieStoreModel = types
  .model("DetailMoviesStore")
  .props({
    movies: types.optional(types.maybe(MovieModel), {}),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveDetailMovie: (movieSnapshots: MovieSnapshotOut) => {
      // @ts-ignore
      self.movies = movieSnapshots
    },
  }))
  .actions((self) => ({
    getDetailMovies: async (params: Props) => {
      const result = await self.environment.movieStoreAPI.getDetailMoviesStore({
        movieId: params?.movieId,
      })

      if (result.kind === "ok") {
        self.saveDetailMovie(result.movies)
      } else {
        __DEV__ && console?.tron?.log(result.kind)
      }
    },
  }))

export interface MovieStore extends Instance<typeof DetailMovieStoreModel> {}
export interface MovieStoreSnapshotOut extends SnapshotOut<typeof DetailMovieStoreModel> {}
export interface MovieStoreSnapshotIn extends SnapshotIn<typeof DetailMovieStoreModel> {}
export const createMovieStoretModel = () => types.optional(DetailMovieStoreModel, {})
