import React from "react";
import {
  View,
  Share,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

import Icon from "../Icon";
import Text from "../AppText";
import colors from "../../config/colors";
import { useNavigation } from "@react-navigation/native";
import Routes from "../../Routes";

function OrderCard({ item, onPress }) {
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

  //===============================================
  const onShare = async (item) => {
    //item.path
    try {
      const result = await Share.share({
        message: item.path,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  //=========================================================
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View
        style={{
          alignSelf: "center",
          width: "95%",
          height: 80,
          paddingVertical: 10,
          // backgroundColor: colors.primery,
        }}
      >
        <View style={styles.container}>
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
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(Routes.PDF_VIEW)}
          >
            <Icon
              backgroundColor={handelColor(item.orders_status)}
              name="file-pdf"
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
    // marginBottom: 10,
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
