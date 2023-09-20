export const nonNullish = <T>(
  // eslint-disable-next-line @typescript-eslint/ban-types -- `null` needs to be processed as well.
  x: T | null | undefined,
  extraMessage: string,
): T => {
  if (x == null) {
    throw new Error(
      `Unexpected null or undefined. Should exist value. (${extraMessage})`,
    )
  }
  return x
}
