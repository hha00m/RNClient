import React, { PureComponent } from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default class ListItem extends PureComponent {
  render() {
    return (
      <Swipeable renderRightActions={this.props.renderRightActions}>
        <TouchableHighlight
          underlayColor={colors.light}
          onPress={this.props.onPress}
        >
          <View style={styles.container}>
            <MaterialCommunityIcons
              color={colors.medium}
              name="chevron-left"
              size={25}
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {this.props.title}
              </Text>
              {subTitle && (
                <Text style={styles.subTitle} numberOfLines={1}>
                  {this.props.subTitle}
                </Text>
              )}
              {date && (
                <Text style={styles.subTitle} numberOfLines={1}>
                  {this.props.date}
                </Text>
              )}
            </View>
            {this.props.IconComponent}
            {this.props.image && (
              <Image style={styles.image} source={this.props.image} />
            )}
          </View>
        </TouchableHighlight>
      </Swipeable>
    );
  }
}
