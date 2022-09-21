import React from "react"
import { render } from "@testing-library/react-native"
import { HomeScreen } from "./home-screen"

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
  const { getByTestId } = render(<HomeScreen {...props} />)
  expect(getByTestId("moviesList")).toBeTruthy()
})
