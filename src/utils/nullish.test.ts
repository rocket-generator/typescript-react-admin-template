import { nonNullish } from "src/utils/nullish"
import { expectType } from "tsd"

describe("nonNullish", () => {
  it("ok", () => {
    expect.hasAssertions()

    // ## Arrange ##
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- allowed for special testing
    const maybe: string | undefined = "hello" as any

    // ## Act ##
    // ## Assert ##
    expectType<string>(nonNullish(maybe, "because blah..."))
    expect(nonNullish(maybe, "because blah...")).toStrictEqual("hello")
  })

  it("ng", () => {
    expect.hasAssertions()

    // ## Arrange ##
    type SomeObject = {
      id: string
      nested: {
        a: string
      }
      rate: number
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- allowed for special testing
    const maybe: SomeObject | undefined = undefined as any

    // ## Act ##
    // ## Assert ##
    expect(() => {
      expectType<SomeObject>(nonNullish(maybe, "because blah..."))
    }).toThrowErrorMatchingInlineSnapshot(
      `"Unexpected null or undefined. Should exist value. (because blah...)"`,
    )
  })
})
