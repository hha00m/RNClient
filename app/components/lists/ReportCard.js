import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Icon from "../Icon";
import Text from "../AppText";
import colors from "../../config/colors";
import borderRadiuss from "../../config/borderRadiuss";
import { I18nManager } from "react-native";

export default class ReportCard extends PureComponent {
  handelColor(id) {
    switch (id) {
      case "4":
        return colors.success;

      default:
        return colors.returned;
    }
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  render() {
    return (
      <Swipeable
        renderLeftActions={this.props.renderRightActions}
        renderRightActions={this.props.renderRightActions}
      >
        <View
          style={{
            alignSelf: "center",
            width: "90%",
            height: 80,
            paddingTop: 10,
          }}
        >
          <View
            style={{
              backgroundColor:
                this.props.item.orders_status === "4"
                  ? colors.success
                  : colors.danger,
              width: "40%",
              borderTopLeftRadius: 100,
              borderRadius: borderRadiuss.Radius_extraLight,
              marginLeft: 10,
            }}
          >
            <Text
              style={[styles.subTitle, { color: "white", paddingRight: 5 }]}
            >
              {this.props.item.orders_status === "4"
                ? "كشف الواصل"
                : "كشف الراجع"}
            </Text>
          </View>
          <View
            style={[
              styles.container,
              {
                backgroundColor:
                  this.props.item.orders_status === "4"
                    ? colors.lightGreen
                    : "#FFE7D7",
              },
            ]}
          >
            <TouchableHighlight
              style={{ width: "87%", height: "100%" }}
              underlayColor={colors.light}
              onPress={this.props.onPress}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  flexDirection: I18nManager.isRTL
                    ? "row-reverse"
                    : "row-reverse",
                }}
              >
                <View style={styles.detailsContainer}>
                  <Text style={styles.title} numberOfLines={1}>
                    {this.props.item.in_date}
                  </Text>
                  <Text style={styles.subTitle} numberOfLines={1}>
                    {this.props.item.store_name}
                  </Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.title} numberOfLines={1}>
                    {this.props.item.orders} طلبية
                  </Text>
                  {this.props.item.total != "0" && (
                    <Text style={styles.subTitle} numberOfLines={1}>
                      {this.numberWithCommas(
                        this.props.item.total - this.props.item.dev_price
                      )}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableHighlight>

            <TouchableWithoutFeedback onPress={this.props.onPress}>
              <Icon
                backgroundColor={this.handelColor(
                  this.props.item.orders_status
                )}
                name="file-pdf"
                size={60}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    paddingRight: 20,
    paddingTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row-reverse",
    backgroundColor: colors.white,
    borderRadius: borderRadiuss.light,
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    marginBottom: 5,
    width: "100%",
    height: 40,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    flex: 1,
  },
  subTitle: {
    color: colors.medium,
    fontSize: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
  },
});
