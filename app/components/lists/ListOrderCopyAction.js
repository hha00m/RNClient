import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

function ListItemDeleteAction({ onPress, icon }) {
  return (
    <TouchableHighlight style={styles.containerT} onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name={icon} size={25} color={colors.white} />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.basic,
    width: "100%",
    height: "100%",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  containerT: {
    width: 60,
    margin: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItemDeleteAction;
