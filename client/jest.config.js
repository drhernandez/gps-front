module.exports = {
  "globals": {
    "google": {
      "maps": {
        "Animation": {
          DROP: "DROP"
        }
      }
    }
  },
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,mjs}"
  ],
  "coveragePathIgnorePatterns": [
    "node_modules",
    "shards-dashboard"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}",
    "<rootDir>/src/**/?(+*.)(spec|test).{js,jsx,mjs}"
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