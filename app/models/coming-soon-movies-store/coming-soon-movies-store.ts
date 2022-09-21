import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { MovieModel, MovieSnapshotOut } from "../movies/movies"

/**
 * Example store containing Rick and Morty characters
 */
export const ComingSoonMovieStoreModel = types
  .model("ComingSoonMoviesStore")
  .props({
    movies: types.optional(types.array(MovieModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveListComingSoon: (movieSnapshots: MovieSnapshotOut[]) => {
      // @ts-ignore
      self.movies.replace(movieSnapshots)
    },
  }))
  .actions((self) => ({
    getComingSoonMoviesStoreList: async () => {
      const result = await self.environment.movieStoreAPI.getComingSoonMoviesList()

      if (result.kind === "ok") {
        self.saveListComingSoon(result.movies)
      } else {
        __DEV__ && console?.tron?.log(result.kind)
      }
    },
  }))

export interface MovieStore extends Instance<typeof ComingSoonMovieStoreModel> {}
export interface MovieStoreSnapshotOut extends SnapshotOut<typeof ComingSoonMovieStoreModel> {}
export interface MovieStoreSnapshotIn extends SnapshotIn<typeof ComingSoonMovieStoreModel> {}
export const createMovieStoretModel = () => types.optional(ComingSoonMovieStoreModel, {})
