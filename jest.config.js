module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testPathIgnorePatterns: [
    "<rootDir>/build/",
    "<rootDir>/node_modules/"
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  coveragePathIgnorePatterns: [
    "<rootDir>/build/",
    "<rootDir>/node_modules/",
    "/__tests__/config/",
    "/db/",
    "/infrastructure/aws/",
    "/infrastructure/errors/",
    "/test-data-factories/",
    "/controllers/",
    "/dto/",
    "/interfaces/"
  ],
  roots: ["<rootDir>/src/"]
};
