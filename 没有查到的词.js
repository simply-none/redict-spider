const data = [
  { cihui: "setup", status: "当前词汇未查到" },
  { cihui: "currectly", status: "当前词汇未查到" },
  { cihui: "preprocess", status: "当前词汇未查到" },
  { cihui: "preprocessor", status: "当前词汇未查到" },
  { cihui: "over-qualified", status: "当前词汇未查到" },
  { cihui: "don't have to", status: "当前词汇未查到" },
  { cihui: "mixin", status: "当前词汇未查到" },
  { cihui: "series of", status: "当前词汇未查到" },
  { cihui: "fluid grid", status: "当前词汇未查到" },
  { cihui: "look no further than", status: "当前词汇未查到" },
  { cihui: "it's up to you", status: "当前词汇未查到" },
  { cihui: "superset", status: "当前词汇未查到" },
  { cihui: "pass through", status: "当前词汇未查到" },
  { cihui: "accessor", status: "当前词汇未查到" },
  { cihui: "callee", status: "当前词汇未查到" },
  { cihui: "function call", status: "当前词汇未查到" },
  { cihui: "library(lib)", status: "当前词汇未查到" },
  { cihui: "hexadecimal", status: "当前词汇未查到" },
  {"cihui":"positives","status":"重定向单词，原单词未查到","redirect":"false positive"},
  {"cihui":"parserOption","status":"当前词汇未查到"},

  {
    cihui: "as far as..(is concerned)",
    status: "重定向单词，原单词未查到",
    redirect: "concerned",
  },
  { cihui: "the rest of", status: "当前词汇未查到" },
  { cihui: "comment out", status: "当前词汇未查到" },
  { cihui: "annotation", status: "当前词汇未查到" },
  { cihui: "as-is", status: "当前词汇未查到" },
  { cihui: "forwards-compatibility", status: "当前词汇未查到" },
  { cihui: "over and over again", status: "当前词汇未查到" },
  { cihui: "combinator", status: "当前词汇未查到" },
  { cihui: "pass in", status: "当前词汇未查到" },
  { cihui: "fun fact", status: "当前词汇未查到" },
  { cihui: "pseudo class", status: "当前词汇未查到" },
  { cihui: "as a rule of thumb(**[θʌm]**)", status: "当前词汇未查到" },
  { cihui: "no matter how", status: "当前词汇未查到" },
  { cihui: "**", status: "当前词汇未查到" },
  { cihui: "entrypoint", status: "当前词汇未查到" },
  { cihui: "refactor", status: "当前词汇未查到" },
  { cihui: "lexical scope", status: "当前词汇未查到" },
  { cihui: "for a while", status: "当前词汇未查到" },
  { cihui: "divider", status: "当前词汇未查到" },
  { cihui: "iterator", status: "当前词汇未查到" },
  { cihui: "iterable", status: "当前词汇未查到" },
  { cihui: "destructuring", status: "当前词汇未查到" },
  { cihui: "count up", status: "当前词汇未查到" },
  { cihui: "count down", status: "当前词汇未查到" },
  { cihui: "natively", status: "当前词汇未查到" },
  { cihui: "keyframe", status: "当前词汇未查到" },
  { cihui: "numeric", status: "当前词汇未查到" },
  { cihui: "desaturate", status: "当前词汇未查到" },
  { cihui: "higher-order", status: "当前词汇未查到" },
  { cihui: "work with", status: "当前词汇未查到" },
  { cihui: "unary", status: "当前词汇未查到" },
  { cihui: "comparision", status: "当前词汇未查到" },
  { cihui: "modulo", status: "当前词汇未查到" },
  { cihui: "fluidly", status: "当前词汇未查到" },
  { cihui: "grayscale", status: "当前词汇未查到" },
  { cihui: "ceil", status: "当前词汇未查到" },
  { cihui: "beraking", status: "当前词汇未查到" },
  { cihui: "breaking change", status: "当前词汇未查到" },
  { cihui: "apply to", status: "当前词汇未查到" },
  { cihui: "unrecognize", status: "当前词汇未查到" },
  { cihui: "synchronously", status: "当前词汇未查到" },
  { cihui: "stdin", status: "当前词汇未查到" },
  { cihui: "line feed", status: "当前词汇未查到" },
  { cihui: "carriage return（cr\\r）", status: "当前词汇未查到" },
  { cihui: "carriage return（cr\\r）", status: "$不是一个函数" },
  { cihui: "run into", status: "单词标题为空" },
  { cihui: "run into", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "figure out", status: "单词标题为空" },
  { cihui: "figure out", status: "单词标题为空" },
  { cihui: "figure out", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "code review", status: "当前词汇未查到" },
  { cihui: "odd-looking", status: "当前词汇未查到" },
  {
    cihui: "apart from",
    status: "重定向单词，原单词未查到",
    redirect: "apart",
  },
  { cihui: "dive into", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "dive into", status: "单词标题为空" },
  { cihui: "leak out", status: "当前词汇未查到" },
  { cihui: "nearest", status: "重定向单词，原单词未查到", redirect: "near" },
  { cihui: "temporal dead zone", status: "当前词汇未查到" },
  { cihui: "end up", status: "单词标题为空" },
  { cihui: "end up", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "double-edged sword", status: "当前词汇未查到" },
  { cihui: "for instance", status: "当前词汇未查到" },
  {
    cihui: "in effect",
    status: "重定向单词，原单词未查到",
    redirect: "effect",
  },
  { cihui: "const", status: "当前词汇未查到" },
  {
    cihui: "it depends",
    status: "重定向单词，原单词未查到",
    redirect: "depend",
  },
  { cihui: "in case", status: "重定向单词，原单词未查到", redirect: "case" },
  { cihui: "Initializer", status: "当前词汇未查到" },
  { cihui: "pile on", status: "重定向单词，原单词未查到", redirect: "pile-on" },
  { cihui: "in a bit", status: "当前词汇未查到" },
  { cihui: "mistyped", status: "当前词汇未查到" },
  { cihui: "sneak in", status: "当前词汇未查到" },
  { cihui: "get around", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "get around", status: "单词标题为空" },
  {
    cihui: "keep in mind",
    status: "重定向单词，原单词未查到",
    redirect: "mind",
  },
  { cihui: "indexable", status: "当前词汇未查到" },
  { cihui: "indice", status: "当前词汇未查到" },
  {
    cihui: "protected",
    status: "重定向单词，原单词未查到",
    redirect: "protect",
  },
  {
    cihui: "orient",
    status: "重定向单词，原单词未查到",
    redirect: "orientate",
  },
  { cihui: "drived", status: "当前词汇未查到" },
  { cihui: "play out", status: "单词标题为空" },
  { cihui: "play out", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "in term of", status: "当前词汇未查到" },
  { cihui: "up to this point", status: "当前词汇未查到" },
  { cihui: "mimicking", status: "重定向单词，原单词未查到", redirect: "mimic" },
  {
    cihui: "hand-off",
    status: "重定向单词，原单词未查到",
    redirect: "handoff",
  },
  { cihui: "in short", status: "当前词汇未查到" },
  { cihui: "standalone", status: "当前词汇未查到" },
  { cihui: "inherently", status: "当前词汇未查到" },
  { cihui: "identity function", status: "当前词汇未查到" },
  { cihui: "command line interface", status: "当前词汇未查到" },
  { cihui: "sign up", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "sign up", status: "单词标题为空" },
  { cihui: "sign in", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "sign in", status: "单词标题为空" },
  { cihui: "log in", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "log in", status: "单词标题为空" },
  { cihui: "sign out", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "sign out", status: "单词标题为空" },
  { cihui: "two-factor authentication", status: "当前词汇未查到" },
  {
    cihui: "N/A",
    status: "重定向单词，原单词未查到",
    redirect:
      "\r\n                                                    \r\n                                                        missing\r\n                                                    \r\n                                                    adjective\r\n                                                ",
  },
  { cihui: "unpublish", status: "当前词汇未查到" },
  { cihui: "one-time password", status: "当前词汇未查到" },
  {
    cihui: "dialog",
    status: "重定向单词，原单词未查到",
    redirect: "dialog box",
  },
  {
    cihui: "expiration",
    status: "重定向单词，原单词未查到",
    redirect: "expiry",
  },
  { cihui: "value added tax", status: "当前词汇未查到" },
  {
    cihui: "augmentation",
    status: "重定向单词，原单词未查到",
    redirect: "breast augmentation surgery",
  },
  { cihui: "line up", status: "重定向单词，原单词未查到", redirect: "line-up" },
  { cihui: "so long as", status: "重定向单词，原单词未查到", redirect: "long" },
  { cihui: "runtime", status: "当前词汇未查到" },
  {
    cihui: "short-circuit",
    status: "重定向单词，原单词未查到",
    redirect: "short circuit",
  },
  { cihui: "pass around", status: "单词标题为空" },
  { cihui: "pass around", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "indirection", status: "当前词汇未查到" },
  {
    cihui: "take place",
    status: "重定向单词，原单词未查到",
    redirect: "place",
  },
  { cihui: "what if", status: "当前词汇未查到" },
  { cihui: "start out", status: "单词标题为空" },
  { cihui: "start out", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "bivariate", status: "当前词汇未查到" },
  { cihui: "bivariance", status: "当前词汇未查到" },
  { cihui: "postfix", status: "当前词汇未查到" },
  { cihui: "mind-bending", status: "当前词汇未查到" },
  { cihui: "discriminat", status: "当前词汇未查到" },
  { cihui: "polymorphic", status: "当前词汇未查到" },
  { cihui: "pluck", status: "当前词汇未查到" },
  { cihui: "manufacture", status: "当前词汇未查到" },
  { cihui: "enough", status: "当前词汇未查到" },
  { cihui: "hard-coded", status: "当前词汇未查到" },
  { cihui: "in some way", status: "当前词汇未查到" },
  { cihui: "homomorphic", status: "当前词汇未查到" },
  { cihui: "stick around", status: "单词标题为空" },
  { cihui: "stick around", status: "重定向单词，原单词未查到", redirect: "" },
  {
    cihui: "in the meantime",
    status: "重定向单词，原单词未查到",
    redirect: "meantime",
  },
  {
    cihui: "well-known",
    status: "重定向单词，原单词未查到",
    redirect: "well known",
  },
  { cihui: "it's worth nothing that", status: "当前词汇未查到" },
  { cihui: "assets", status: "重定向单词，原单词未查到", redirect: "asset" },
  { cihui: "middleware", status: "当前词汇未查到" },
  { cihui: "", status: "当前词汇未查到" },
  { cihui: "in order", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "in order", status: "单词标题为空" },
  { cihui: "space-around", status: "当前词汇未查到" },
  { cihui: "space-between", status: "当前词汇未查到" },
  { cihui: "space-evenly", status: "当前词汇未查到" },
  { cihui: "assumed", status: "重定向单词，原单词未查到", redirect: "assume" },
  {
    cihui: "the same as",
    status: "重定向单词，原单词未查到",
    redirect: "same",
  },
  { cihui: "be passeda s", status: "当前词汇未查到" },
  { cihui: "be permitted to", status: "当前词汇未查到" },
  { cihui: "so that", status: "当前词汇未查到" },
  { cihui: "place on", status: "重定向单词，原单词未查到", redirect: "place" },
  {
    cihui: "up-to-date",
    status: "重定向单词，原单词未查到",
    redirect: "up to date",
  },
  {
    cihui: "and such",
    status: "重定向单词，原单词未查到",
    redirect: "such and such",
  },
  {
    cihui: "conversely",
    status: "重定向单词，原单词未查到",
    redirect: "converse",
  },
  { cihui: "tarball", status: "当前词汇未查到" },
  { cihui: "transpiler", status: "当前词汇未查到" },
  { cihui: "semver", status: "当前词汇未查到" },
  {
    cihui: "in place of",
    status: "重定向单词，原单词未查到",
    redirect: "place",
  },
  { cihui: "memoized", status: "当前词汇未查到" },
  { cihui: "memoization", status: "当前词汇未查到" },
  { cihui: "patch up", status: "单词标题为空" },
  { cihui: "patch up", status: "重定向单词，原单词未查到", redirect: "" },
  {
    cihui: "pull down",
    status: "重定向单词，原单词未查到",
    redirect: "pull-down menu",
  },
  {
    cihui: "lowercase",
    status: "重定向单词，原单词未查到",
    redirect: "lower case",
  },
  {
    cihui: "uppercase",
    status: "重定向单词，原单词未查到",
    redirect: "upper case",
  },
  { cihui: "sitemap", status: "当前词汇未查到" },
  { cihui: "dropdown", status: "当前词汇未查到" },
  { cihui: "bundler", status: "当前词汇未查到" },
  { cihui: "debounce", status: "当前词汇未查到" },
  { cihui: "--", status: "当前词汇未查到" },
  { cihui: "is placed in", status: "当前词汇未查到" },
  {
    cihui: "patterns",
    status: "重定向单词，原单词未查到",
    redirect: "pattern",
  },
  { cihui: "Ignore", status: "重定向单词，原单词未查到", redirect: "ignore" },
  { cihui: "may or may not", status: "当前词汇未查到" },
  {
    cihui: "guarantees",
    status: "重定向单词，原单词未查到",
    redirect: "guarantee",
  },
  { cihui: "Usually", status: "重定向单词，原单词未查到", redirect: "usually" },
  { cihui: "loadable", status: "当前词汇未查到" },
  { cihui: "Espree", status: "当前词汇未查到" },
  {
    cihui: "concatenated",
    status: "重定向单词，原单词未查到",
    redirect: "concatenate",
  },
  {
    cihui: "Alternatively",
    status: "重定向单词，原单词未查到",
    redirect: "alternatively",
  },
  { cihui: "Thus", status: "重定向单词，原单词未查到", redirect: "thus" },
  { cihui: "derived", status: "重定向单词，原单词未查到", redirect: "derive" },
  {
    cihui: "In other words",
    status: "重定向单词，原单词未查到",
    redirect: "other",
  },
  {
    cihui:
      'positives , This is typically used when introducing a new rule that will eventually be set to "error',
    status: "当前词汇未查到",
  },
  {
    cihui:
      'certainty , This is typically used when introducing a new rule that will eventually be set to "error',
    status: "当前词汇未查到",
  },
  {
    cihui:
      'potential , This is typically used when introducing a new rule that will eventually be set to "error',
    status: "当前词汇未查到",
  },
  {
    cihui:
      'eventually , This is typically used when introducing a new rule that will eventually be set to "error',
    status: "当前词汇未查到",
  },
  {
    cihui: "overrides",
    status: "重定向单词，原单词未查到",
    redirect: "override",
  },
  {
    cihui: "violations",
    status: "重定向单词，原单词未查到",
    redirect: "violation",
  },
  { cihui: "comes with", status: "单词标题为空" },
  { cihui: "comes with", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "Severities", status: "当前词汇未查到" },
  { cihui: "year-based", status: "当前词汇未查到" },
  { cihui: "By the same token", status: "当前词汇未查到" },
  { cihui: "expects", status: "重定向单词，原单词未查到", redirect: "expect" },
  {
    cihui: "deprecated",
    status: "重定向单词，原单词未查到",
    redirect: "deprecate",
  },
  {
    cihui: "overwritten",
    status: "重定向单词，原单词未查到",
    redirect: "overwrite",
  },
  { cihui: "be sure to", status: "重定向单词，原单词未查到", redirect: "sure" },
  {
    cihui: "assumptions",
    status: "重定向单词，原单词未查到",
    redirect: "assumption",
  },
  { cihui: "Browser", status: "重定向单词，原单词未查到", redirect: "browser" },
  { cihui: "scoping", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "scoping", status: "单词标题为空" },
  {
    cihui: "Specifying",
    status: "重定向单词，原单词未查到",
    redirect: "specify",
  },
  {
    cihui: "comments",
    status: "重定向单词，原单词未查到",
    redirect: "comment",
  },
  { cihui: "Version", status: "重定向单词，原单词未查到", redirect: "version" },
  {
    cihui: 'curly , /* eslint eqeqeq: "off',
    status: "重定向单词，原单词未查到",
    redirect:
      "\r\n                                                    \r\n                                                        missing\r\n                                                    \r\n                                                    adjective\r\n                                                ",
  },
  { cihui: "implied", status: "重定向单词，原单词未查到", redirect: "imply" },
  {
    cihui: 'dangle , module.exports = { "extends": "eslint:all',
    status: "当前词汇未查到",
  },
  {
    cihui: 'comma , module.exports = { "extends": "eslint:all',
    status: "当前词汇未查到",
  },
  { cihui: "Formats", status: "重定向单词，原单词未查到", redirect: "format" },
  {
    cihui: "Resolution",
    status: "重定向单词，原单词未查到",
    redirect: "resolution",
  },
  {
    cihui: "modifications",
    status: "重定向单词，原单词未查到",
    redirect: "modification",
  },
  { cihui: "shipped", status: "重定向单词，原单词未查到", redirect: "ship" },
  {
    cihui: "collisions",
    status: "重定向单词，原单词未查到",
    redirect: "collision",
  },
  { cihui: "nonzero", status: "当前词汇未查到" },
  { cihui: "treated", status: "重定向单词，原单词未查到", redirect: "treat" },
  { cihui: "pieces", status: "重定向单词，原单词未查到", redirect: "piece" },
  {
    cihui: "indicates",
    status: "重定向单词，原单词未查到",
    redirect: "indicate",
  },
  { cihui: "are used to", status: "当前词汇未查到" },
  {
    cihui:
      'preset , import babelParser from "@babel/eslint-parser"; export default [ { files: ["**/*.js',
    status: "重定向单词，原单词未查到",
    redirect:
      "\r\n                                                    \r\n                                                        missing\r\n                                                    \r\n                                                    adjective\r\n                                                ",
  },
  { cihui: "You", status: "重定向单词，原单词未查到", redirect: "you" },
  {
    cihui:
      'parserOption , import babelParser from "@babel/eslint-parser"; export default [ { files: ["**/*.js',
    status: "重定向单词，原单词未查到",
    redirect:
      "\r\n                                                    \r\n                                                        missing\r\n                                                    \r\n                                                    adjective\r\n                                                ",
  },
  { cihui: "optionally", status: "当前词汇未查到" },
  { cihui: "is intended to", status: "当前词汇未查到" },
  {
    cihui: "evaluates",
    status: "重定向单词，原单词未查到",
    redirect: "evaluate",
  },
  {
    cihui: "directives",
    status: "重定向单词，原单词未查到",
    redirect: "directive",
  },
  {
    cihui: "interpreted",
    status: "重定向单词，原单词未查到",
    redirect: "interpret",
  },
  {
    cihui: "Cascading",
    status: "重定向单词，原单词未查到",
    redirect: "cascade",
  },
  { cihui: "no other", status: "当前词汇未查到" },
  { cihui: "i", status: "重定向单词，原单词未查到", redirect: "I" },
  { cihui: "related to", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "related to", status: "单词标题为空" },
  { cihui: "ignores", status: "重定向单词，原单词未查到", redirect: "ignore" },
  {
    cihui: "indicating",
    status: "重定向单词，原单词未查到",
    redirect: "indicate",
  },
  {
    cihui:
      "Each configuration object contains all of the information ESLint needs to execute on a set of files. Each configuration object is made up of these properties:",
    status: "当前词汇未查到",
  },
  { cihui: "Objects", status: "重定向单词，原单词未查到", redirect: "object" },
  { cihui: "enables", status: "重定向单词，原单词未查到", redirect: "enable" },
  { cihui: "be placed in", status: "当前词汇未查到" },
  { cihui: "apply to", status: "当前词汇未查到" },
  { cihui: "ppl", status: "当前词汇未查到" },
  { cihui: "fine-grained", status: "当前词汇未查到" },
  { cihui: "bundled", status: "重定向单词，原单词未查到", redirect: "bundle" },
  { cihui: "configurable", status: "当前词汇未查到" },
  { cihui: "JavaScript", status: "当前词汇未查到" },
  { cihui: "integrations", status: "当前词汇未查到" },
  {
    cihui: "extracts",
    status: "重定向单词，原单词未查到",
    redirect: "extract",
  },
  {
    cihui: "converts",
    status: "重定向单词，原单词未查到",
    redirect: "convert",
  },
  { cihui: "parser", status: "当前词汇未查到" },
  { cihui: "Often", status: "重定向单词，原单词未查到", redirect: "often" },
  {
    cihui: "implements",
    status: "重定向单词，原单词未查到",
    redirect: "implement",
  },
  {
    cihui: "Shareable",
    status: "重定向单词，原单词未查到",
    redirect: "shareable",
  },
  {
    cihui: "enforced",
    status: "重定向单词，原单词未查到",
    redirect: "enforce",
  },
  { cihui: "linter", status: "当前词汇未查到" },
  { cihui: "Refer to", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "Refer to", status: "单词标题为空" },
  {
    cihui: "configured",
    status: "重定向单词，原单词未查到",
    redirect: "configure",
  },
  { cihui: "assumes", status: "重定向单词，原单词未查到", redirect: "assume" },
  { cihui: "semi standard", status: "当前词汇未查到" },
  { cihui: "semistandard", status: "当前词汇未查到" },
  {
    cihui: "configurations",
    status: "重定向单词，原单词未查到",
    redirect: "configuration",
  },
  { cihui: "plugin", status: "当前词汇未查到" },
  { cihui: "pluggable", status: "当前词汇未查到" },
  {
    cihui: "identifying",
    status: "重定向单词，原单词未查到",
    redirect: "identify",
  },
  {
    cihui: "Prerequisites",
    status: "重定向单词，原单词未查到",
    redirect: "prerequisite",
  },
  { cihui: "Table", status: "重定向单词，原单词未查到", redirect: "table" },
  {
    cihui: "contributions",
    status: "重定向单词，原单词未查到",
    redirect: "contribution",
  },
  { cihui: "Backers", status: "重定向单词，原单词未查到", redirect: "backer" },
  {
    cihui: "One-time",
    status: "重定向单词，原单词未查到",
    redirect: "one-time",
  },
  {
    cihui: "donations",
    status: "重定向单词，原单词未查到",
    redirect: "donation",
  },
  {
    cihui: "sponsors",
    status: "重定向单词，原单词未查到",
    redirect: "sponsor",
  },
  {
    cihui: "Dependent",
    status: "重定向单词，原单词未查到",
    redirect: "dependent",
  },
  {
    cihui: "Dependents",
    status: "重定向单词，原单词未查到",
    redirect: "dependent",
  },
  { cihui: "View", status: "重定向单词，原单词未查到", redirect: "view" },
  {
    cihui: "Announcing",
    status: "重定向单词，原单词未查到",
    redirect: "announce",
  },
  { cihui: "syntaxaware", status: "当前词汇未查到" },
  { cihui: "syntax-aware", status: "当前词汇未查到" },
  { cihui: "fixes", status: "重定向单词，原单词未查到", redirect: "fix" },
  { cihui: "built into", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "built into", status: "单词标题为空" },
  { cihui: "Continuous Delivery", status: "当前词汇未查到" },
  {
    cihui: "Delivery",
    status: "重定向单词，原单词未查到",
    redirect: "delivery",
  },
  { cihui: "depoly", status: "当前词汇未查到" },
  { cihui: "depolyment", status: "当前词汇未查到" },
  {
    cihui: "CI/CD",
    status: "重定向单词，原单词未查到",
    redirect:
      "\r\n                                                    \r\n                                                        missing\r\n                                                    \r\n                                                    adjective\r\n                                                ",
  },
  { cihui: "continuous integration", status: "当前词汇未查到" },
  { cihui: "live its best life", status: "当前词汇未查到" },
  { cihui: "It doesn't matter", status: "当前词汇未查到" },
  {
    cihui: "Emeritus",
    status: "重定向单词，原单词未查到",
    redirect: "emeritus",
  },
  {
    cihui: "Incubation",
    status: "重定向单词，原单词未查到",
    redirect: "incubation",
  },
  {
    cihui: "At-Large",
    status: "重定向单词，原单词未查到",
    redirect: "editor-at-large",
  },
  { cihui: "Impact", status: "重定向单词，原单词未查到", redirect: "impact" },
  { cihui: "release-as", status: "当前词汇未查到" },
  { cihui: "Polling", status: "重定向单词，原单词未查到", redirect: "poll" },
  {
    cihui: "Interval",
    status: "重定向单词，原单词未查到",
    redirect: "interval",
  },
  {
    cihui: "Access Token Lifespan For Implicit Flow",
    status: "当前词汇未查到",
  },
  { cihui: "Flow", status: "重定向单词，原单词未查到", redirect: "flow" },
  {
    cihui: "Implicit",
    status: "重定向单词，原单词未查到",
    redirect: "implicit",
  },
  {
    cihui: "Lifespan",
    status: "重定向单词，原单词未查到",
    redirect: "lifespan",
  },
  { cihui: "Revoke", status: "重定向单词，原单词未查到", redirect: "revoke" },
  { cihui: "General", status: "重定向单词，原单词未查到", redirect: "general" },
  { cihui: "validity", status: "当前词汇未查到" },
  { cihui: "common-authcommon-auth-func", status: "当前词汇未查到" },
  { cihui: "dialogConfig", status: "当前词汇未查到" },
  { cihui: "currentViewFirst", status: "当前词汇未查到" },
  { cihui: "Sibling", status: "重定向单词，原单词未查到", redirect: "sibling" },
  { cihui: "nextSibling", status: "当前词汇未查到" },
  { cihui: "Numberish", status: "当前词汇未查到" },
  {
    cihui: "conventional-changelog -p angular -i CHANGELOG.md -s -r 0",
    status: "当前词汇未查到",
  },
  { cihui: "inverts", status: "重定向单词，原单词未查到", redirect: "invert" },
  {
    cihui: "references",
    status: "重定向单词，原单词未查到",
    redirect: "reference",
  },
  {
    cihui: "Expected",
    status: "重定向单词，原单词未查到",
    redirect: "expected",
  },
  {
    cihui: "Signature",
    status: "重定向单词，原单词未查到",
    redirect: "signature",
  },
  {
    cihui: "encountered",
    status: "重定向单词，原单词未查到",
    redirect: "encounter",
  },
  { cihui: "Parser presets", status: "当前词汇未查到" },
  {
    cihui: "Convention",
    status: "重定向单词，原单词未查到",
    redirect: "convention",
  },
  {
    cihui:
      'essence , In essence, npm and husky will run "precommit" scripts twice if you name the script "commit',
    status: "当前词汇未查到",
  },
  { cihui: "thanks to", status: "当前词汇未查到" },
  { cihui: "pointing to", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "pointing to", status: "单词标题为空" },
  {
    cihui: "relative to",
    status: "重定向单词，原单词未查到",
    redirect: "relative",
  },
  {
    cihui: "Alternatively",
    status: "重定向单词，原单词未查到",
    redirect: "alternatively",
  },
  {
    cihui: "the top of",
    status: "重定向单词，原单词未查到",
    redirect: "top-of-the-range",
  },
  { cihui: "prompted", status: "重定向单词，原单词未查到", redirect: "prompt" },
  { cihui: "fill out", status: "单词标题为空" },
  { cihui: "fill out", status: "重定向单词，原单词未查到", redirect: "" },
  {
    cihui: "Philosophy",
    status: "重定向单词，原单词未查到",
    redirect: "philosophy",
  },
  { cihui: "shines", status: "重定向单词，原单词未查到", redirect: "shine" },
  {
    cihui:
      "Congratulations! Your repo is Commitizen friendly. Time to flaunt it!",
    status: "当前词汇未查到",
  },
  {
    cihui: "Congratulations",
    status: "重定向单词，原单词未查到",
    redirect: "congratulation",
  },
  { cihui: "assumes", status: "重定向单词，原单词未查到", redirect: "assume" },
  {
    cihui:
      'triggered , In essence, npm and husky will run "precommit" scripts twice if you name the script "commit',
    status: "当前词汇未查到",
  },
  {
    cihui:
      'prevent , In essence, npm and husky will run "precommit" scripts twice if you name the script "commit',
    status: "当前词汇未查到",
  },
  {
    cihui:
      'workaround , In essence, npm and husky will run "precommit" scripts twice if you name the script "commit',
    status: "当前词汇未查到",
  },
  { cihui: "folks", status: "重定向单词，原单词未查到", redirect: "folk" },
  { cihui: "sharing", status: "重定向单词，原单词未查到", redirect: "share" },
  { cihui: "alternative to", status: "当前词汇未查到" },
  { cihui: "tinkered", status: "重定向单词，原单词未查到", redirect: "tinker" },
  { cihui: "important to", status: "当前词汇未查到" },
  {
    cihui: "Overarching",
    status: "重定向单词，原单词未查到",
    redirect: "overarching",
  },
  {
    cihui: "explained",
    status: "重定向单词，原单词未查到",
    redirect: "explain",
  },
  { cihui: "pinst", status: "当前词汇未查到" },
  { cihui: "npm test", status: "当前词汇未查到" },
  {
    cihui: "Follows npm and Yarn best practices regarding autoinstall",
    status: "当前词汇未查到",
  },
  { cihui: "plier", status: "当前词汇未查到" },
  { cihui: "make sense", status: "当前词汇未查到" },
  { cihui: "makes sense", status: "当前词汇未查到" },
  { cihui: "adheres", status: "重定向单词，原单词未查到", redirect: "adhere" },
  {
    cihui: "Conclusion",
    status: "重定向单词，原单词未查到",
    redirect: "conclusion",
  },
  { cihui: "arised", status: "当前词汇未查到" },
  { cihui: "evolves", status: "重定向单词，原单词未查到", redirect: "evolve" },
  { cihui: "related to", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "related to", status: "单词标题为空" },
  { cihui: "led to", status: "单词标题为空" },
  { cihui: "led to", status: "重定向单词，原单词未查到", redirect: "" },
  { cihui: "conventional JS config", status: "当前词汇未查到" },
  { cihui: "Powered by", status: "当前词汇未查到" },
  {
    cihui: "Lightweight",
    status: "重定向单词，原单词未查到",
    redirect: "lightweight",
  },
  { cihui: "Pulse", status: "重定向单词，原单词未查到", redirect: "pulse" },
  {
    cihui: "Applicable",
    status: "重定向单词，原单词未查到",
    redirect: "applicable",
  },
  { cihui: "filter to", status: "当前词汇未查到" },
  { cihui: "filters to", status: "当前词汇未查到" },
  {
    cihui: "surfaces",
    status: "重定向单词，原单词未查到",
    redirect: "surface",
  },
  { cihui: "stored", status: "重定向单词，原单词未查到", redirect: "store" },
  { cihui: "carriage return（cr\\r）", status: "$不是一个函数" },
  { cihui: "carriage return（cr\\r）", status: "当前词汇未查到" },
  {
    cihui:
      'positives , This is typically used when introducing a new rule that will eventually be set to "error',
    status: "当前词汇未查到",
  },
  {
    cihui:
      'certainty , This is typically used when introducing a new rule that will eventually be set to "error',
    status: "当前词汇未查到",
  },
  {
    cihui:
      'potential , This is typically used when introducing a new rule that will eventually be set to "error',
    status: "当前词汇未查到",
  },
  {
    cihui:
      'eventually , This is typically used when introducing a new rule that will eventually be set to "error',
    status: "当前词汇未查到",
  },
  {
    cihui: 'curly , /* eslint eqeqeq: "off',
    status: "重定向单词，原单词未查到",
    redirect:
      "\r\n                                                    \r\n                                                        missing\r\n                                                    \r\n                                                    adjective\r\n                                                ",
  },
  {
    cihui: 'dangle , module.exports = { "extends": "eslint:all',
    status: "当前词汇未查到",
  },
  {
    cihui: 'comma , module.exports = { "extends": "eslint:all',
    status: "当前词汇未查到",
  },
  {
    cihui:
      'preset , import babelParser from "@babel/eslint-parser"; export default [ { files: ["**/*.js',
    status: "重定向单词，原单词未查到",
    redirect:
      "\r\n                                                    \r\n                                                        missing\r\n                                                    \r\n                                                    adjective\r\n                                                ",
  },
  {
    cihui:
      'parserOption , import babelParser from "@babel/eslint-parser"; export default [ { files: ["**/*.js',
    status: "重定向单词，原单词未查到",
    redirect:
      "\r\n                                                    \r\n                                                        missing\r\n                                                    \r\n                                                    adjective\r\n                                                ",
  },
  {
    cihui:
      'essence , In essence, npm and husky will run "precommit" scripts twice if you name the script "commit',
    status: "当前词汇未查到",
  },
  {
    cihui:
      'triggered , In essence, npm and husky will run "precommit" scripts twice if you name the script "commit',
    status: "当前词汇未查到",
  },
  {
    cihui:
      'prevent , In essence, npm and husky will run "precommit" scripts twice if you name the script "commit',
    status: "当前词汇未查到",
  },
  {
    cihui:
      'workaround , In essence, npm and husky will run "precommit" scripts twice if you name the script "commit',
    status: "当前词汇未查到",
  },
];


const type = {
  titleIsNone: [],
  $IsNotFn: [],
  redirect: [],
  notIsFound: [],
  missing: []
}

data.forEach(cihui => {
  if (cihui.cihui.includes(' , ')) {
   !type.missing.includes(cihui.cihui) && type.missing.push(cihui.cihui)
   return true
  }
  switch (cihui.status) {
    case '当前词汇未查到':
      !type.notIsFound.includes(cihui.cihui) && type['notIsFound'].push(cihui.cihui)
      break
    case '单词标题为空':
      !type.titleIsNone.includes(cihui.cihui) && type['titleIsNone'].push(cihui.cihui)
      break
    case '重定向单词，原单词未查到':
      
      if (cihui.redirect.includes('missing')) {
        !type.missing.includes(cihui.cihui) && type.missing.push(cihui.cihui)
      } else if (cihui.redirect === '') {
        !type.notIsFound.includes(cihui.cihui) && type.notIsFound.push(cihui.cihui)
      } else {
        type['redirect'].push({
          cihui: cihui.cihui,
          redirect: cihui.redirect
        })
      }
      break
    case '$不是一个函数':
      !type.$IsNotFn.includes(cihui.cihui) && type['$IsNotFn'].push(cihui.cihui)
      break
  }
})

type.titleIsNone = type.titleIsNone.filter(val => !type.notIsFound.includes(val))
type.$IsNotFn = type.titleIsNone.filter(val => !type.notIsFound.includes(val))

type.missing = type.missing.filter(val => !val.includes(' , '))

const redirect = type.redirect

const newData = {
  titleIsNone: [],
  "$IsNotFn": [],
  "redirect": type.redirect,
  "notIsFound": [],
  missing: type.missing
}

Object.keys(type).forEach(key => {
  const first = type[key]

  if (key === 'redirect') {
    return false
  }

  first.forEach(val => {
    if (!redirect.includes(val)) {
        !newData[key].includes(val) && newData[key].push(val)
    }
  })
})

const fs = require('fs')
fs.writeFileSync('./没有查到的词汇总.json', JSON.stringify(newData), function (err) {
  if (err) throw err;
});

module.exports = {
  data,
};
