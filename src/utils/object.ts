/**
 * More powerful `JSON.stringify()`.
 * For more details: [javascript - Is it not possible to stringify an Error using JSON.stringify? - Stack Overflow](https://stackoverflow.com/a/26199752)
 */
export const stringify = (obj: unknown): string => {
  return JSON.stringify(obj, Object.getOwnPropertyNames(obj))
}
