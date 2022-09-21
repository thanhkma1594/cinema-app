import { ComingSoonMovieStoreModel } from "./coming-soon-movies-store"

let instance
beforeEach(() => {
  const mockEnvironment = {
    movieStoreAPI: {
      getComingSoonMoviesList: jest.fn(),
    },
  }
  instance = ComingSoonMovieStoreModel.create({}, mockEnvironment)
})
afterEach(() => jest.clearAllMocks())

test("Can be create coming soon movies store", () => {
  expect(instance).toBeTruthy()
})

const mockDataSuccess = {
  kind: "ok",
  movies: [
    {
      adult: false,
      backdropPath: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      genreIds: [77],
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
  ],
}

test("Get coming soon movies api success", async () => {
  instance.environment.movieStoreAPI.getComingSoonMoviesList.mockReturnValue(
    Promise.resolve(mockDataSuccess),
  )
  await instance.environment.movieStoreAPI.getComingSoonMoviesList(0)
  expect(instance.environment.movieStoreAPI.getComingSoonMoviesList).toHaveBeenCalledWith(0)
})

test("Get coming soon movies and save success", async () => {
  instance.environment.movieStoreAPI.getComingSoonMoviesList.mockReturnValue(
    Promise.resolve(mockDataSuccess),
  )
  await instance.getComingSoonMoviesStoreList()
  expect(instance.movies.length).toEqual(1)
})

/*
 * Test case false
 */

const mockDataFail = {
  kind: "fail",
  movies: null,
}

test("Get coming soon movies fail", async () => {
  instance.environment.movieStoreAPI.getComingSoonMoviesList.mockReturnValue(
    Promise.resolve(mockDataFail),
  )
  await instance.getComingSoonMoviesStoreList()
  expect(instance.movies.length).toEqual(0)
})
