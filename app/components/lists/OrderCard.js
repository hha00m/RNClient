import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Linking,
  TouchableHighlight,
} from "react-native";
import Icon from "./../Icon";
import Text from "../AppText";
import colors from "../../config/colors";
import Routes from "../../Routes";
import { useNavigation } from "@react-navigation/native";
function OrderCard({ item, onPress }) {
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
    <View
      style={{
        alignSelf: "center",
        width: "90%",
        height: 80,
        paddingTop: 10,
        // backgroundColor: colors.primery,
      }}
    >
      <View style={styles.container}>
        <TouchableHighlight
          style={{ width: "85%", height: "100%" }}
          underlayColor={colors.light}
          onPress={() =>
            navigation.navigate(Routes.ORDER_DETAILS, { id: item.id })
          }
        >
          <View style={{ width: "100%", height: "100%", flexDirection: "row" }}>
            <View style={styles.detailsContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.order_no}
              </Text>
              {item.city && (
                <Text style={styles.subTitle} numberOfLines={1}>
                  {item.city} - {item.town}
                </Text>
              )}
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.store_name}
              </Text>
              {item.city && (
                <Text style={styles.subTitle} numberOfLines={1}>
                  {item.status_name} - {item.t_note}
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
            size={65}
          />
        </TouchableHighlight>
      </View>
    </View>
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
    backgroundColor: colors.white,
    borderRadius: 35,
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
  },
});

export default OrderCard;
