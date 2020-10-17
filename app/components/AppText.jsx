import React from "react";
import { Text } from "react-native";
import defultStyle from "../config/styles";

const AppText = ({ children, style, numberOfLines = 1 }) => {
  return <Text numberOfLines={numberOfLines} style={[defultStyle.text, style]}>{children}</Text>;
};

export default AppText;
