const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      offline: true,
      babel: {
        dangerouslyAddModulePathsToTranspile: ["@ui-kitten/components"],
      },
      resolve: {
        alias: {
          "react-native": "react-native-web",
          "lottie-react-native": "react-native-web-lottie",
        },
      },
    },
    argv
  );
  return config;
};
