/**
 * Verify that unit test works correctly.
 */
describe("example", () => {
  it("with TypeScript", () => {
    expect.hasAssertions()

    // ## Arrange ##
    const list: readonly number[] = [1, 2, 3, 4, 5]

    // ## Act ##
    const result = list
      .filter((n) => n % 2 === 0)
      .map((n) => n * 2)
      .reduce((l, r) => l + r)

    // ## Assert ##
    expect(result).toStrictEqual(12)
  })
})

describe("snapshot test", () => {
  it("ok", () => {
    expect.hasAssertions()
    expect({ a: 0, b: "b1" }).toMatchSnapshot()
    /* eslint-disable sort-keys-fix/sort-keys-fix -- for example */
    expect({ b: "b1", a: 0 }).toMatchInlineSnapshot(`
      {
        "a": 0,
        "b": "b1",
      }
    `)
    /* eslint-enable sort-keys-fix/sort-keys-fix -- for example */
  })
})

describe("async/await test", () => {
  // eslint-disable-next-line unicorn/consistent-function-scoping -- for example
  const sleep = async (milliSeconds: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, milliSeconds))
  }

  const doAsync = async (): Promise<string> => {
    await sleep(100)
    return "Hello"
  }

  it("simple await pattern", async () => {
    expect.hasAssertions()
    const result = await doAsync()
    expect(result).toStrictEqual("Hello")
  })

  it("expect-resolves pattern", async () => {
    expect.hasAssertions()
    await expect(doAsync()).resolves.toStrictEqual("Hello")
  })
})

describe("exception test", () => {
  // eslint-disable-next-line unicorn/consistent-function-scoping -- for example
  const throwable = (): never => {
    throw new Error("Lorem ipsum dolor sit")
  }

  it("assert exception message", () => {
    expect.hasAssertions()
    expect(() => {
      throwable()
    }).toThrowErrorMatchingInlineSnapshot('"Lorem ipsum dolor sit"')
  })
})
