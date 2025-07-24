module.exports = {
  testEnvironment: "jsdom",
  testMatch: [
    "**/src/scripts/**/*.test.js"
  ],
  moduleFileExtensions: ["js", "json"],
  transform: {},
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};