import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Rick and Morty character model.
 */
export const MovieModel = types.model("Movie").props({
  adult: types.maybe(types.boolean),
  backdrop_path: types.maybe(types.string), // return path image like:  "/2RSirqZG949GuRwN38MYCIGG4Od.jpg"
  genreIds: types.array(types.integer), // Array<number>
  id: types.maybe(types.number),
  originalLanguage: types.maybe(types.string),
  originalTitle: types.maybe(types.string),
  overview: types.maybe(types.string),
  popularity: types.maybe(types.number),
  posterPath: types.maybe(types.string), // return path image like:  "/v28T5F1IygM8vXWZIycfNEm3xcL.jpg"
  releaseDate: types.maybe(types.string), // "2022-08-11"
  title: types.maybe(types.string), // "Fall"
  video: types.maybe(types.boolean),
  voteAverage: types.maybe(types.number),
  voteCount: types.maybe(types.number),
})

export interface Movie extends Instance<typeof MovieModel> {}
export interface MovieSnapshotOut extends SnapshotOut<typeof MovieModel> {}
export interface MovieSnapshotIn extends SnapshotIn<typeof MovieModel> {}
export const createMovieDefaulyModel = () => types.optional(MovieModel, {})
