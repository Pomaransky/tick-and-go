/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-expo",
  moduleNameMapper: {
    "^lucide-react-native$": require.resolve("lucide-react-native"),
  },
};
