import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../AppText";
import colors from "../../config/colors";
function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  seen = colors.white,
  date,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            color={colors.medium}
            name="chevron-left"
            size={25}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={1}>
                {subTitle}
              </Text>
            )}
            {date && (
              <Text style={styles.subTitle} numberOfLines={1}>
                {date}
              </Text>
            )}
          </View>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
  },
  image: {
    width: 40,
    height: 40,
  },
  subTitle: {
    color: colors.medium,
    fontSize: 12,
    paddingTop: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default ListItem;
