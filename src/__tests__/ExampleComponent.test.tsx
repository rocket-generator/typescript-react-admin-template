import { render } from "@testing-library/react"

type Props = {
  message: string
}

const ExampleComponent = ({ message }: Props): JSX.Element => {
  return (
    <div>
      <p>Welcome to React!</p>
      <p>This is an example of a React snapshot test.</p>
      <p>{message}</p>
    </div>
  )
}

describe("example", () => {
  it("renders correctly", () => {
    const rendered = render(<ExampleComponent message="wow" />)
    expect(rendered.asFragment()).toMatchSnapshot()
  })
})
