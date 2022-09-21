import React from "react"
import { render } from "@testing-library/react-native"
import { DetailMovies } from "./detail-movie"

const createTestProps = (props: any) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
})

let props

beforeEach(() => {
  props = createTestProps({})
})

test("renders correctly", () => {
  const { getByTestId } = render(<DetailMovies {...props} />)
  expect(getByTestId("movieDetail")).toBeTruthy()
})
