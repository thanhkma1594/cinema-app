import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { MovieModel, MovieSnapshotOut } from "../movies/movies"

/**
 * Example store containing Rick and Morty characters
 */
export const NowShowingMoviesStore = types
  .model("NowPlayingMoviesStore")
  .props({
    movies: types.optional(types.array(MovieModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveListNowPlaying: (movieSnapshots: MovieSnapshotOut[]) => {
      // @ts-ignore
      self.movies.replace(movieSnapshots)
    },
  }))
  .actions((self) => ({
    getNowShowingMoviesStoreList: async () => {
      const result = await self.environment.movieStoreAPI.getNowShowingList()

      if (result.kind === "ok") {
        self.saveListNowPlaying(result.movies)
      } else {
        __DEV__ && console?.tron?.log(result.kind)
      }
    },
  }))

export interface MovieStore extends Instance<typeof NowShowingMoviesStore> {}
export interface MovieStoreSnapshotOut extends SnapshotOut<typeof NowShowingMoviesStore> {}
export interface MovieStoreSnapshotIn extends SnapshotIn<typeof NowShowingMoviesStore> {}
export const createMovieStoretModel = () => types.optional(NowShowingMoviesStore, {})
