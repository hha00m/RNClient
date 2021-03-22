import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";
import borderRadiuss from "../../config/borderRadiuss";

function ListItemDeleteAction({ onPress, icon, color }) {
  return (
    <TouchableHighlight style={styles.containerT} onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name={icon} size={25} color={color} />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    width: "100%",
    height: "70%",
    borderRadius: borderRadiuss.Radius_light,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  containerT: {
    width: 50,
    margin: 5,
    borderRadius: borderRadiuss.Radius_circl,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItemDeleteAction;
