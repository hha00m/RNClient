import Constants from "expo-constants";
// http://alzaimexpress.com/
// https://albarqexpress.com  albarqlogo
//http://tamenexpress.com/
const settings = {
  dev: {
    apiUrl: "http://albarqexpress.com/client/api",
    logo: require("../assets/logo/logo.png"),
  },
  staging: {
    apiUrl: "http://albarqexpress.com/client/api",
    logo: require("../assets/logo/logo.png"),
  },
  prod: {
    apiUrl: "http://albarqexpress.com/client/api",
    logo: require("../assets/logo/logo.png"),
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
