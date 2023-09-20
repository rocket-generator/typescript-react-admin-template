import { parseISO } from "date-fns"
import { zBigIntString, zIso8601String } from "src/utils/zod"
import { expectNotType, expectType } from "tsd"
import type { Brand } from "utility-types"
import { z } from "zod"

describe("zISO8601String", () => {
  it("valid cases", () => {
    expect(zIso8601String().safeParse("2000-01-23T11:22:33.450Z"))
      .toMatchInlineSnapshot(`
        {
          "data": 2000-01-23T11:22:33.450Z,
          "success": true,
        }
      `)

    // primitive Date is also allowed
    expect(zIso8601String().safeParse("2000-01-23T11:22:33.450Z"))
      .toMatchInlineSnapshot(`
        {
          "data": 2000-01-23T11:22:33.450Z,
          "success": true,
        }
      `)

    // with custom date validation
    expect(
      zIso8601String(
        z.date().min(parseISO("2000-01-23T11:22:33.000Z")),
      ).safeParse("2000-01-23T11:22:33.450Z"),
    ).toMatchInlineSnapshot(`
      {
        "data": 2000-01-23T11:22:33.450Z,
        "success": true,
      }
    `)
  })

  it("invalid cases", () => {
    expect(zIso8601String().safeParse(undefined)).toMatchInlineSnapshot(`
      {
        "error": [ZodError: [
        {
          "code": "invalid_type",
          "expected": "date",
          "received": "undefined",
          "path": [],
          "message": "Required"
        }
      ]],
        "success": false,
      }
    `)
    expect(zIso8601String().safeParse("")).toMatchInlineSnapshot(`
      {
        "error": [ZodError: [
        {
          "code": "invalid_type",
          "expected": "date",
          "received": "string",
          "path": [],
          "message": "Expected date, received string"
        }
      ]],
        "success": false,
      }
    `)
    expect(zIso8601String().safeParse("2000-01-23")).toMatchInlineSnapshot(`
      {
        "error": [ZodError: [
        {
          "code": "invalid_type",
          "expected": "date",
          "received": "string",
          "path": [],
          "message": "Expected date, received string"
        }
      ]],
        "success": false,
      }
    `)

    // disallow ambiguous format
    expect(zIso8601String().safeParse("2000-01-23 11:22:33"))
      .toMatchInlineSnapshot(`
        {
          "error": [ZodError: [
          {
            "code": "invalid_type",
            "expected": "date",
            "received": "string",
            "path": [],
            "message": "Expected date, received string"
          }
        ]],
          "success": false,
        }
      `)

    // with custom date validation
    // Error message (Date.toString() [^1]) results change depending on the locale of the execution environment, which makes the test a bit odd.
    // [^1]: e.g. "Sun Jan 23 2000 11:22:33 GMT+0000 (協定世界時)"
    const actual = zIso8601String(
      z.date().min(parseISO("2000-01-23T11:22:33.000Z")),
    ).safeParse("2000-01-23T11:22:30.000Z")
    expect(actual.success).toBeFalsy()
    // eslint-disable-next-line vitest/no-conditional-tests, vitest/no-conditional-in-test -- for type safe
    if (!actual.success) {
      // eslint-disable-next-line vitest/no-conditional-expect -- for type safe
      expect(actual.error.message).toContain(
        "Date must be greater than or equal to Sun Jan 23 2000 11:22:33 GMT+0000",
      )
    }
  })
})

describe("zBigIntString", () => {
  it("valid cases", () => {
    expect(zBigIntString().safeParse("0")).toMatchInlineSnapshot(`
      {
        "data": 0n,
        "success": true,
      }
    `)
    expect(zBigIntString().safeParse("99999999999999999999"))
      .toMatchInlineSnapshot(`
        {
          "data": 99999999999999999999n,
          "success": true,
        }
      `)
    expect(zBigIntString().safeParse("-99999999999999999999"))
      .toMatchInlineSnapshot(`
        {
          "data": -99999999999999999999n,
          "success": true,
        }
      `)

    // with custom bigint validation
    expect(zBigIntString(z.bigint().min(100n)).safeParse("100"))
      .toMatchInlineSnapshot(`
        {
          "data": 100n,
          "success": true,
        }
      `)

    // with brand type
    type BrandedId = Brand<bigint, "BrandedId">
    const brandedResult = zBigIntString<BrandedId>().safeParse("100")
    // eslint-disable-next-line vitest/no-conditional-tests, vitest/no-conditional-in-test -- for type safe
    if (brandedResult.success) {
      expectNotType<bigint>(brandedResult.data)
      expectType<BrandedId>(brandedResult.data)
    }
    expect(brandedResult).toMatchInlineSnapshot(`
      {
        "data": 100n,
        "success": true,
      }
    `)
  })

  it("invalid cases", () => {
    expect(zBigIntString().safeParse(null)).toMatchInlineSnapshot(`
      {
        "error": [ZodError: [
        {
          "code": "invalid_type",
          "expected": "bigint",
          "received": "null",
          "path": [],
          "message": "Expected bigint, received null"
        }
      ]],
        "success": false,
      }
    `)

    // Disallow "n" sign
    expect(zBigIntString().safeParse("1n")).toMatchInlineSnapshot(`
      {
        "error": [ZodError: [
        {
          "code": "invalid_type",
          "expected": "bigint",
          "received": "string",
          "path": [],
          "message": "Expected bigint, received string"
        }
      ]],
        "success": false,
      }
    `)

    // Disallow decimal
    expect(zBigIntString().safeParse("99999999999999999999.1"))
      .toMatchInlineSnapshot(`
        {
          "error": [ZodError: [
          {
            "code": "invalid_type",
            "expected": "bigint",
            "received": "string",
            "path": [],
            "message": "Expected bigint, received string"
          }
        ]],
          "success": false,
        }
      `)

    // with custom bigint validation
    expect(zBigIntString(z.bigint().min(100n)).safeParse("99"))
      .toMatchInlineSnapshot(`
        {
          "error": [ZodError: [
          {
            "code": "too_small",
            "type": "bigint",
            "minimum": "100",
            "inclusive": true,
            "message": "Invalid input",
            "path": []
          }
        ]],
          "success": false,
        }
      `)
  })
})
