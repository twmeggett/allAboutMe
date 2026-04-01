module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    testEnvironment: "jsdom",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/", "\\.(css|scss)$"],
};
