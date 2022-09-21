import { DetailMovieStoreModel } from "./detail-movie-store"

let instance
beforeEach(() => {
  const mockEnvironment = {
    movieStoreAPI: {
      getDetailMoviesStore: jest.fn(),
    },
  }
  instance = DetailMovieStoreModel.create({}, mockEnvironment)
})
afterEach(() => jest.clearAllMocks())

test("Can be create detail movie store", () => {
  expect(instance).toBeTruthy()
})

const mockDataSuccess = {
  kind: "ok",
  movies: {
    adult: false,
    backdropPath: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    id: 11111,
    originalLanguage: "en",
    originalTitle: "The Godfather",
    overview:
      "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest",
    popularity: 555.222,
    posterPath: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    releaseDate: "2022-08-11",
    title: "The Godfather",
    video: false,
    voteAverage: 5.5,
    voteCount: 333,
  },
}

test("Get detail movie api success", async () => {
  instance.environment.movieStoreAPI.getDetailMoviesStore.mockReturnValue(
    Promise.resolve(mockDataSuccess),
  )
  await instance.environment.movieStoreAPI.getDetailMoviesStore(0)
  expect(instance.environment.movieStoreAPI.getDetailMoviesStore).toHaveBeenCalledWith(0)
})

test("Get detail movie and save success", async () => {
  instance.environment.movieStoreAPI.getDetailMoviesStore.mockReturnValue(
    Promise.resolve(mockDataSuccess),
  )
  await instance.getDetailMovies()
  expect(instance.movies).toBeTruthy()
})

/*
 * Test case false
 */

const mockDataFail = {
  kind: "fail",
  movies: null,
}

test("Get detail movie fail", async () => {
  instance.environment.movieStoreAPI.getDetailMoviesStore.mockReturnValue(
    Promise.resolve(mockDataFail),
  )
  await instance.getDetailMovies()
  expect(instance.movies).toBeTruthy()
})
