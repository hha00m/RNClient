import { Platform } from "react-native";
import colors from "./colors";

export default {
  colors,
  text: {
    fontSize: 14,
    textAlign: "right",
    color: colors.dark,
    width: "100%",
    fontFamily: "Tjw_medum",
    // fontFamily: Platform.OS === "andriod" ? "Roboto" : "Avenir",
  },
};
