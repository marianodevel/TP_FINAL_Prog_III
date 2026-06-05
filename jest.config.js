export default {
  testEnvironment: "node",
  transform: {},
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testMatch: ["**/tests/**/*.test.js"],
  collectCoverageFrom: [
    "src/services/**/*.js",
    "src/db/repositories/**/*.js",
    "src/controllers/**/*.js",
    "src/dtos/**/*.js",
    "src/middlewares/**/*.js",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  setupFiles: ["./tests/setup.js"],
};
