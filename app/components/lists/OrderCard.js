import React from "react";
import { View, StyleSheet, Linking, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useNavigation } from "@react-navigation/native";

import Icon from "./../Icon";
import Text from "../AppText";
import colors from "../../config/colors";
import Routes from "../../Routes";

function OrderCard({ item, onPress, renderRightActions }) {
  const navigation = useNavigation();
  const handelColor = (id) => {
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
  return (
    <Swipeable renderRightActions={renderRightActions}>
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
                item.money_status === "1" ? colors.lightGreen : colors.white,
            },
          ]}
        >
          <TouchableHighlight
            style={{ width: "87%", height: "100%" }}
            underlayColor={colors.light}
            onPress={() =>
              navigation.navigate(Routes.ORDER_DETAILS, { id: item.id })
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
                  {item.order_no}
                </Text>
                {item.city && (
                  <Text style={styles.subTitle} numberOfLines={1}>
                    {item.city} - {item.town}
                  </Text>
                )}
                {item.days && (
                  <Text style={styles.subTitle} numberOfLines={1}>
                    {item.days} منذ تسجيل الطلب
                  </Text>
                )}
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.store_name}
                </Text>
                {item.city && (
                  <Text style={styles.subTitle} numberOfLines={1}>
                    {item.status_name} {item.t_note ? item.t_note : ""}
                  </Text>
                )}
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => Linking.openURL(`tel:${item.driver_phone}`)}
          >
            <Icon
              backgroundColor={handelColor(item.order_status_id)}
              name="phone"
              size={60}
            />
          </TouchableHighlight>
        </View>
      </View>
    </Swipeable>
  );
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

export default OrderCard;
