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
function OrderCard({ item, onPress }) {
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
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View
        style={{
          alignSelf: "center",
          width: "90%",
          height: 80,
          // backgroundColor: colors.primery,
        }}
      >
        <View style={styles.container}>
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
          <TouchableWithoutFeedback
            onPress={() => Linking.openURL(`tel:${item.driver_phone}`)}
          >
            <Icon
              backgroundColor={handelColor(item.order_status_id)}
              name="phone"
              size={60}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableHighlight>
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
