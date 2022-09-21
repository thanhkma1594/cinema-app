import { NowShowingMoviesStore } from "./now-showing-movies-store"

let instance
beforeEach(() => {
  const mockEnvironment = {
    movieStoreAPI: {
      getNowShowingList: jest.fn(),
    },
  }
  instance = NowShowingMoviesStore.create({}, mockEnvironment)
})
afterEach(() => jest.clearAllMocks())

test("Can be create now showing movies store", () => {
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

test("Get now showing movies api success", async () => {
  instance.environment.movieStoreAPI.getNowShowingList.mockReturnValue(
    Promise.resolve(mockDataSuccess),
  )
  await instance.environment.movieStoreAPI.getNowShowingList(0)
  expect(instance.environment.movieStoreAPI.getNowShowingList).toHaveBeenCalledWith(0)
})

test("Get now showing movies and save success", async () => {
  instance.environment.movieStoreAPI.getNowShowingList.mockReturnValue(
    Promise.resolve(mockDataSuccess),
  )
  await instance.getNowShowingMoviesStoreList()
  expect(instance.movies.length).toEqual(1)
})

/*
 * Test case false
 */

const mockDataFail = {
  kind: "fail",
  movies: null,
}

test("Get now showing movies fail", async () => {
  instance.environment.movieStoreAPI.getNowShowingList.mockReturnValue(
    Promise.resolve(mockDataFail),
  )
  await instance.getNowShowingMoviesStoreList()
  expect(instance.movies.length).toEqual(0)
})
