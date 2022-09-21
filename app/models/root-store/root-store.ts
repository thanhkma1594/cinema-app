import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ComingSoonMovieStoreModel } from "../coming-soon-movies-store/coming-soon-movies-store"
import { DetailMovieStoreModel } from "../detail-movie-store/detail-movie-store"
import { NowShowingMoviesStore } from "../now-showing-movies-store/now-showing-movies-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  nowShowingMoviesStore: types.optional(NowShowingMoviesStore, {} as any),
  comingSoonMoviesStore: types.optional(ComingSoonMovieStoreModel, {} as any),
  detailMoviesStore: types.optional(DetailMovieStoreModel, {} as any),

})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
