import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "https://albarqexpress.com/client/api",
  },
  staging: {
    apiUrl: "https://albarqexpress.com/client/api",
  },
  prod: {
    apiUrl: "https://albarqexpress.com/client/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
