import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import ListItemOrderDetail from "../ListItemOrderDetail";
import colors from "../../config/colors";
import borderRadiuss from "../../config/borderRadiuss";
import { I18nManager } from "react-native";

const OrderDetails = ({ order }) => {
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
    <ScrollView>
      <View style={{ flex: 1 }}>
        {order ? (
          <View style={{ flex: 1 }}>
            <View style={styles.orderDetailsContainer}>
              <View style={{ width: "100%", height: "35%" }}>
                <View style={styles.headerDetails}>
                  <View
                    style={[
                      styles.titleOrderStatusView,
                      { backgroundColor: handelColor(order.order_status_id) },
                    ]}
                  >
                    <Text style={styles.titleOrderStatus}>
                      {order.status_name}
                    </Text>
                  </View>
                  <Text style={styles.titleOrderId}>{order.order_no}</Text>
                  <Text style={styles.titleStore}>{order.store_name}</Text>
                </View>
              </View>
              <View style={styles.textContainer}>
                <ListItemOrderDetail
                  caption="أسم الزبون"
                  details={order.customer_name}
                />
                <ListItemOrderDetail
                  onPress={true}
                  caption="هاتف الزبون"
                  details={order.customer_phone}
                />
                {order.address ? (
                  <ListItemOrderDetail
                    caption="عنوان الزبون"
                    details={`${order.city} - ${order.town} - ${order.address}`}
                  />
                ) : (
                  <ListItemOrderDetail
                    caption="عنوان الزبون"
                    details={`${order.city} - ${order.town}`}
                  />
                )}
                {order.dev_price && (
                  <ListItemOrderDetail
                    caption="سعر التوصيل"
                    details={order.dev_price}
                  />
                )}
                {order.client_price && (
                  <ListItemOrderDetail
                    caption="السعر الصافي"
                    details={order.client_price}
                  />
                )}
                {order.price && (
                  <ListItemOrderDetail
                    caption="مبلغ الوصل"
                    details={order.price}
                  />
                )}
                {order.new_price && (
                  <ListItemOrderDetail
                    caption="المبلغ المستلم"
                    details={order.new_price}
                  />
                )}
                {order.driver_name && (
                  <ListItemOrderDetail
                    caption="أسم المندوب"
                    details={order.driver_name}
                  />
                )}
                {order.driver_phone && (
                  <ListItemOrderDetail
                    onPress={true}
                    caption="هاتف المندوب"
                    details={order.driver_phone}
                  />
                )}
                {order.driver_phone && (
                  <ListItemOrderDetail
                    caption="تم التحاسب؟"
                    details={order.money_status === "1" ? "نعم" : "كلا"}
                  />
                )}
                {order.date && (
                  <ListItemOrderDetail
                    caption="تاريخ الطلب"
                    details={order.date}
                  />
                )}
                {order.t_note ? (
                  order.t_note != "" && (
                    <ListItemOrderDetail
                      caption="الحالة "
                      details={order.t_note}
                    />
                  )
                ) : (
                  <ListItemOrderDetail
                    caption="الحالة "
                    details={order.status_name}
                  />
                )}
              </View>
            </View>
          </View>
        ) : (
          <Text>loading..</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  headerDetails: {
    width: "80%",
    height: "100%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row-reverse",
    borderBottomColor: colors.primery,
    borderBottomWidth: 1,
  },
  container: {
    backgroundColor: colors.black,
    width: "100%",
    height: "100%",
  },
  orderDetailsContainer: {
    backgroundColor: colors.light4,
    alignSelf: "center",
    width: "100%",
    height: 300,
    paddingBottom: 5,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // marginBottom: 10
  },
  textContainer: {
    width: "100%",
    height: "60%",
    // backgroundColor: "gray",
    marginRight: "10%",
    marginBottom: "5%",
    // marginTop: "2%",
    flexDirection: "column",
  },

  chatShadow: {
    width: 70,
    height: 70,
    position: "absolute",
    top: 150,
    left: 30,
    borderRadius: borderRadiuss.Radius_larg,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 10,
    margin: 5,
  },
  chatIcon: {
    width: "90%",
    height: "90%",
    padding: 5,
    borderRadius: borderRadiuss.Radius_larg,
    borderWidth: 1,
    borderColor: colors.medium,
  },
  titleStore: {
    fontSize: 20,
    paddingTop: 5,
    fontFamily: "Tjw_medum",
    color: colors.black,
  },
  titleOrderId: {
    fontSize: 22,
    fontFamily: "Tjw_medum",
    color: colors.black,
  },
  titleOrderStatus: {
    color: "white",
    fontFamily: "Tjw_xblod",
  },
  titleOrderStatusView: {
    backgroundColor: colors.primery,
    padding: 15,
    borderRadius: borderRadiuss.Radius_circl,
    margin: 5,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily: "Tjw_blod",
  },
  contanerBox: {
    height: "100%",
    width: "100%",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row-reverse",
    justifyContent: "space-around",
    margin: 5,
  },
  trackingTitle: {
    color: "#39C555",
    fontFamily: "Tjw_blod",
    fontSize: 14,
    paddingBottom: 10,
    color: colors.light4,
  },
  trackingNote: {
    color: colors.medium,
    fontSize: 12,
  },
});
