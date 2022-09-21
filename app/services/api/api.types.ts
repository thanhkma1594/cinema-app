import { GeneralApiProblem } from "./api-problem"
import { Movie } from "../../models/movies/movies"

export type GetMoviesResult = { kind: "ok"; movies: Movie[] } | GeneralApiProblem
export type GetDetailMoviesResult = { kind: "ok"; movies: Movie } | GeneralApiProblem
