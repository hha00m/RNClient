import { Platform } from "react-native";
import colors from "./colors";

export default {
  colors,
  text: {
    fontSize: 18,
    textAlign: "right",
    color: colors.dark,
    width: "100%",
    // fontFamily: Platform.OS === "andriod" ? "Roboto" : "Avenir",
  },
};
