// @ts-check

/**
 * @type {Record<string, string>}
 */
// @ts-expect-error -- ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires -- Unfortunately, no types
const rulesDirPlugin = require("eslint-plugin-rulesdir")
rulesDirPlugin["RULES_DIR"] = "scripts/eslint-custom-rules"

/**
 * @typedef {ReadonlyArray<import("./scripts/naming-convention-utils").Selector>} NamingConventions
 */
/**
 * @type {NamingConventions}
 */
const baseNamingConventions = [
  {
    format: ["StrictPascalCase"],
    selector: ["typeAlias"],
  },
  {
    format: ["PascalCase"],
    selector: ["typeParameter"],
  },
]

/**
 * @type {NamingConventions}
 */
const lenientNamingConventions = [
  ...baseNamingConventions,
  {
    format: ["strictCamelCase"],
    leadingUnderscore: "allow",
    selector: ["method", "parameterProperty", "variableLike"],
  },
]

/**
 * It is impossible to apply "camelCase" even to external interfaces.
 * So, the rules are divided to apply stronger rules only to the internal code.
 * @type {NamingConventions}
 */
const strictNamingConventions = [
  ...baseNamingConventions,
  {
    format: ["strictCamelCase"],
    leadingUnderscore: "allow",
    selector: ["memberLike", "property", "variableLike"],
  },
]

const reactNamingConventions = [
  ...baseNamingConventions,
  {
    format: ["strictCamelCase"],
    leadingUnderscore: "allow",
    selector: ["memberLike", "variableLike"],
  },
  {
    format: ["StrictPascalCase", "strictCamelCase"],
    modifiers: ["const"],
    selector: "variable",
  },
  {
    // Sometimes, even components need to handle snake_case API responses, so it is allowed.
    format: ["strictCamelCase", "snake_case"],
    selector: "property",
  },
]

/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:unicorn/recommended",
    "plugin:@eslint-community/eslint-comments/recommended",
    "plugin:@typescript-eslint/all",
    "plugin:array-func/all",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:no-use-extend-native/recommended",
    "plugin:promise/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:typescript-sort-keys/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: [
        "src/__tests__/**/*.ts",
        "src/models/**/*.ts",
        "src/components/**/*.ts",
        "src/utils/**/*.ts",
      ],
      rules: {
        "@typescript-eslint/naming-convention": [2, ...strictNamingConventions],
      },
    },
    {
      files: ["src/**/*.tsx"],
      rules: {
        "@typescript-eslint/naming-convention": [2, ...reactNamingConventions],
      },
    },
    {
      extends: ["plugin:vitest/all"],
      files: ["*.test.ts", "*.test.tsx"],
      rules: {
        "unicorn/no-useless-promise-resolve-reject": 0,
        "vitest/max-expects": 0,
      },
    },
    {
      files: ["*.d.ts"],
      rules: {
        "unicorn/filename-case": 0,
        "unicorn/prevent-abbreviations": 0,
      },
    },
    {
      files: ["*.ts"],
      rules: {
        "@typescript-eslint/ban-types": [
          2,
          {
            types: {
              null: {
                // React needs to use `null`, but other code does not need to use it, so force `undefined`
                fixWith: "undefined",
                message: "Use `undefined` type instead of `null`.",
              },
            },
          },
        ],
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: "./tsconfig.json",
    sourceType: "module",
  },
  plugins: [
    "import-access",
    "prefer-arrow-functions",
    "react-refresh",
    "rulesdir",
    "sort-destructure-keys",
    "sort-keys-fix",
    "toplevel",
  ],
  rules: {
    "@eslint-community/eslint-comments/no-unused-disable": 2,
    "@eslint-community/eslint-comments/require-description": 2,
    "@typescript-eslint/ban-types": [
      2,
      {
        types: {
          /**
           * `React.FC/VFC` has only disadvantages, since it cannot define generics.
           */
          "React.FC": {
            message: "Use `({...}: Props): JSX.Element => {...}` style instead",
          },
          "React.VFC": {
            message: "Use `({...}: Props): JSX.Element => {...}` style instead",
          },
        },
      },
    ],
    "@typescript-eslint/consistent-type-definitions": [2, "type"],
    "@typescript-eslint/explicit-function-return-type": [
      2,
      {
        allowExpressions: true,
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": 2,
    // @typescript-eslint/init-declarations: many false positives for our code
    "@typescript-eslint/init-declarations": 0,
    "@typescript-eslint/naming-convention": [2, ...lenientNamingConventions],
    "@typescript-eslint/no-magic-numbers": 0,
    "@typescript-eslint/no-type-alias": 0,
    "@typescript-eslint/prefer-readonly-parameter-types": 0,
    "array-func/prefer-array-from": 0,
    "import-access/jsdoc": 2,
    "import/no-default-export": 2,
    "no-console": [
      2,
      {
        allow: ["info", "warn", "error"],
      },
    ],
    "no-restricted-imports": [2, { patterns: ["./", "../"] }],
    "no-restricted-properties": [
      2,
      {
        message: "Use `axios` instead.",
        object: "window",
        property: "fetch",
      },
      {
        message: "Use `src/external/localStorage/localStorage.ts` instead.",
        object: "window",
        property: "localStorage",
      },
    ],
    "no-restricted-syntax": [
      2,
      {
        message:
          "Do not use `enum`. Use `Plain Object` or `Literal Types` instead.",
        selector: "TSEnumDeclaration",
      },
      {
        message:
          "`for..in` loops iterate over the entire prototype chain, which is virtually never what you want. Use `for..of` or `Object.{keys,values,entries}`, and iterate over the resulting array.",
        selector: "ForInStatement",
      },
      {
        message:
          "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
        selector: "LabeledStatement",
      },
      {
        message:
          "ES-Class has many traps. Use `Plain Object ({})` or function.",
        selector: "ClassDeclaration",
      },
    ],
    "no-shadow": 2,
    "no-void": [2, { allowAsStatement: true }],
    "prefer-arrow-functions/prefer-arrow-functions": 2,
    "prefer-template": 2,
    "react-refresh/only-export-components": 2,
    "react/jsx-sort-props": 2,
    "react/no-array-index-key": 2,
    "react/no-unsafe": [2, { checkAliases: true }],
    "react/prefer-stateless-function": 2,
    "react/react-in-jsx-scope": 0,
    "react/self-closing-comp": 2,
    "react/void-dom-elements-no-children": 2,
    "rulesdir/eslint-enforce-eqeq-null-check": 2,
    "sort-destructure-keys/sort-destructure-keys": 2,
    "sort-keys-fix/sort-keys-fix": 2,
    "toplevel/no-toplevel-let": 2,
    "toplevel/no-toplevel-var": 2,
    "unicorn/filename-case": [
      2,
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    // unicorn/no-null: React often needs to use `null`
    "unicorn/no-null": 0,
    "unicorn/no-useless-undefined": [2, { checkArguments: false }],
    "unicorn/prevent-abbreviations": [
      2,
      {
        allowList: {
          Fn: true,
          Params: true,
          Props: true,
          args: true,
          ctx: true,
          env: true,
          obj: true,
          params: true,
          props: true,
        },
        replacements: {
          res: {
            response: true,
            result: true,
          },
          resp: {
            response: true,
          },
        },
      },
    ],
    yoda: [2, "never", { onlyEquality: true }],
  },
  settings: {
    "import/resolver": {
      typescript: { project: "./" },
    },
  },
}

module.exports = config
