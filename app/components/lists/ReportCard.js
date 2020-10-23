import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useNavigation } from "@react-navigation/native";

import Icon from "../Icon";
import Text from "../AppText";
import colors from "../../config/colors";
import Routes from "../../Routes";

function OrderCard({ item, onPress, renderRightActions }) {
  const navigation = useNavigation();
  const handelColor = (id) => {
    switch (id) {
      case "4":
        return colors.success;

      default:
        return colors.returned;
    }
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  //=========================================================
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
                item.orders_status === "4" ? colors.lightGreen : "#FFE7D7",
            },
          ]}
        >
          <TouchableHighlight
            style={{ width: "87%", height: "100%" }}
            underlayColor={colors.light}
            onPress={onPress}
          >
            <View
              style={{ width: "100%", height: "100%", flexDirection: "row" }}
            >
              <View style={styles.detailsContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.in_date}
                </Text>
                <Text style={styles.subTitle} numberOfLines={1}>
                  {item.store_name}
                </Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.orders} طلبية
                </Text>
                <Text style={styles.subTitle} numberOfLines={1}>
                  {numberWithCommas(item.total - item.dev_price)}
                </Text>
              </View>
            </View>
          </TouchableHighlight>

          <TouchableWithoutFeedback onPress={onPress}>
            <Icon
              backgroundColor={handelColor(item.orders_status)}
              name="file-pdf"
              size={60}
            />
          </TouchableWithoutFeedback>
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
    backgroundColor: colors.white,
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
