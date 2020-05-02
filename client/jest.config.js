module.exports = {
  "moduleNameMapper": {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,mjs}"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}"
  ],
  "transform": {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/config/jest-transformer.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/config/jest.setup.js"
  ]
};