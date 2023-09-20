// Written by ChatGPT

/**
 * # ❌ BAD
 *
 * ```js
 * value === null
 * value !== null
 * value === undefined
 * value !== undefined
 * ```
 *
 * # ✅ GOOD
 *
 * ```js
 * value == null
 * value != null
 * ```
 */
module.exports = {
  create: (
    /** @type {{ report: (arg0: { message: string; node: any; }) => void; }} */ context,
  ) => ({
    BinaryExpression: (
      /** @type {{ operator: string; left: any; right: any; }} */ node,
    ) => {
      if (
        (node.operator === "===" || node.operator === "!==") &&
        (isNullLiteral(node.left) ||
          isNullLiteral(node.right) ||
          isUndefinedLiteral(node.left) ||
          isUndefinedLiteral(node.right))
      ) {
        context.report({
          message: `Use "== null" or "!= null" style for "null" and "undefined" checks.`,
          node,
        })
      }
    },
  }),
  meta: {
    docs: {
      category: "Best Practices",
      description: "Enforce the use of == or != for null and undefined checks.",
      recommended: true,
    },
    type: "suggestion",
  },
}

const isNullLiteral = (/** @type {{ type: string; value: any; }} */ node) =>
  node && node.type === "Literal" && node.value === null

const isUndefinedLiteral = (
  /** @type {{ type: string; name: string; }} */ node,
) => node && node.type === "Identifier" && node.name === "undefined"
