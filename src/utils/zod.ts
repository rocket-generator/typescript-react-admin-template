import { z } from "zod"

const iso8601DateTimeRegex =
  /\d{4}-[01]\d-[0-3]\dT[0-2](?:\d:[0-5]){2}\d\.\d{3}Z/

/**
 * Parse ISO8601 string to Date.
 *
 * @FIXME
 * I want to perform further validation on the value after transform.
 * However, I am not able to do the following at the expense of the latter. The latter is sacrificed.
 *
 * - Using the z.ZodDate schema and the convenient validation utilities of the zod standard.
 * - Return custom error messages when .regex() fails.
 *
 * ref. [typescript - zod: set min max after transform string to number - Stack Overflow](https://stackoverflow.com/a/71478819)
 */
export const zIso8601String = (
  schema: z.ZodDate = z.date(),
): z.ZodEffects<z.ZodDate, Date, unknown> => {
  return z.preprocess((input) => {
    const processed = z
      .string()
      .regex(
        iso8601DateTimeRegex,
        `Invalid date time format. Must be UTC-based ISO 8601. e.g. '2000-01-23T11:22:33.450Z'`,
      )
      .transform((x) => new Date(x))
      .safeParse(input)
    return processed.success ? processed.data : input
  }, schema)
}

const bigIntRegex = /^-?\d+$/

export const zBigIntString = <TBrand extends bigint = bigint>(
  schema: z.ZodBigInt = z.bigint(),
): z.ZodEffects<z.ZodBigInt, TBrand, unknown> => {
  return z.preprocess((input) => {
    const processed = z
      .string()
      .regex(
        bigIntRegex,
        `Invalid bigint format. Must be a string of an integer. e.g. '123'`,
      )
      .transform(BigInt)
      .safeParse(input)
    return processed.success ? processed.data : input
    // FIXME cast as a workaround because of type mismatch.
  }, schema) as z.ZodEffects<z.ZodBigInt, TBrand, unknown>
}

export const zBrandString = <TBrand extends string>(
  schema: z.ZodString = z.string(),
): z.ZodEffects<z.ZodString, TBrand, unknown> => {
  return z.preprocess((input) => {
    // TODO FIXME remove redundant process
    const processed = z.string().safeParse(input)
    return processed.success ? processed.data : input
    // FIXME cast as a workaround because of type mismatch.
  }, schema) as z.ZodEffects<z.ZodString, TBrand, unknown>
}
