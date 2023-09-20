// @ts-check

/**
 * @type {import("prettier").Config}
 */
const config = {
  // Prettier is opinionated code formatter. Only add settings if you think you are smarter than the Prettier team.
  semi: false,
  // trailingComma: To prepare for the next prettier@3
  trailingComma: "all",
  plugins: ["prettier-plugin-organize-imports"],
}

module.exports = config
