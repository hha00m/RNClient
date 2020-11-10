import React, { PureComponent } from "react";
import { View, StyleSheet, Linking, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useNavigation } from "@react-navigation/native";

import Icon from "./../Icon";
import Text from "../AppText";
import colors from "../../config/colors";
import Routes from "../../Routes";
class OrderCard extends PureComponent {
  // const navigation = useNavigation();
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

  render() {
    const { navigation } = this.props;

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
              onPress={() =>
                navigation.navigate(Routes.ORDER_DETAILS, {
                  id: this.props.item.id,
                })
              }
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
                </View>
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
    paddingTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    flexDirection: "row-reverse",
    borderRadius: 5,
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
    marginBottom: 10,
    width: "100%",
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
export default function (props) {
  const navigation = useNavigation();

  return <OrderCard {...props} navigation={navigation} />;
}
