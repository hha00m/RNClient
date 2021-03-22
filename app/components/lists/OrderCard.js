import React, { PureComponent } from "react";
import { View, StyleSheet, Linking, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Icon from "./../Icon";
import Text from "../AppText";
import colors from "../../config/colors";
import Routes from "../../Routes";
import borderRadiuss from "../../config/borderRadiuss";
class OrderCard extends PureComponent {
  handelColor = (id) => {
    switch (id) {
      case "4":
        return colors.success;
      case "5":
        return colors.secondery;
      case "6":
        return colors.primery;
      case "7":
        return colors.pause;
      case "8":
        return colors.returned;
      case "9":
        return colors.returned;
      case "13":
        return colors.gray;
      default:
        return colors.medium;
    }
  };
  openWindowFast = () => {
    this.props.openWindowFast(this.props.item);
  };
  render() {
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
      <Swipeable
        renderLeftActions={this.props.renderRightActions}
        renderRightActions={this.props.renderRightActions}
      >
        <View
          style={{
            alignSelf: "center",
            width: "90%",
            height: 72,
          }}
        >
          <View
            style={[
              styles.container,
              {
                backgroundColor:
                  this.props.item.money_status === "1"
                    ? colors.lightGreen
                    : colors.white,
              },
            ]}
          >
            <TouchableHighlight
              style={{ width: "87%", height: "100%" }}
              underlayColor={colors.light}
              onPress={this.openWindowFast.bind(this)}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  flexDirection: "row-reverse",
                }}
              >
                <View style={styles.detailsContainer}>
                  <Text style={styles.title} numberOfLines={1}>
                    {this.props.item.order_no}
                  </Text>
                  {this.props.item.city && (
                    <Text style={styles.subTitle} numberOfLines={1}>
                      {this.props.item.city} - {this.props.item.town}
                    </Text>
                  )}
                  {this.props.item.days && (
                    <Text style={styles.subTitle} numberOfLines={1}>
                      {this.props.item.days} منذ تسجيل الطلب
                    </Text>
                  )}
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.title} numberOfLines={1}>
                    {this.props.item.store_name}
                  </Text>
                  {this.props.item.city && (
                    <Text style={styles.subTitle} numberOfLines={1}>
                      {this.props.item.status_name}{" "}
                      {this.props.item.t_note ? this.props.item.t_note : ""}
                    </Text>
                  )}
                  <Text style={styles.subTitle2} numberOfLines={1}>
                    المبلغ ({numberWithCommas(this.props.item.new_price)})
                  </Text>
                </View>
                {false && (
                  <View style={styles.detailsContainer2}>
                    <MaterialCommunityIcons
                      name="star"
                      size={25}
                      color={colors.pause}
                    />
                  </View>
                )}
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() =>
                Linking.openURL(`tel:${this.props.item.driver_phone}`)
              }
            >
              <Icon
                backgroundColor={this.handelColor(
                  this.props.item.order_status_id
                )}
                name="phone"
                size={60}
              />
            </TouchableHighlight>
          </View>
        </View>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    paddingRight: 20,
    fontSize: 14,
  },
  container: {
    alignItems: "center",
    flexDirection: "row-reverse",
    borderRadius: borderRadiuss.Radius_light,
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginBottom: 10,
    width: "100%",
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
  },
  detailsContainer2: {
    justifyContent: "center",
  },
  subTitle: {
    color: colors.medium,
    fontSize: 12,
  },
  subTitle2: {
    color: colors.secondery,
    fontSize: 12,
  },
  title: {
    fontFamily: "Tjw_xblod",
    fontSize: 12,
    color: colors.secondery,
  },
});
export default function (props) {
  const navigation = useNavigation();

  return <OrderCard {...props} navigation={navigation} />;
}
