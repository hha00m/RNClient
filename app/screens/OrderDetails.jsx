import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Image } from 'react-native-animatable'
import { useNavigation, useRoute } from '@react-navigation/native'
import uuid from 'uuid/v4';

import ActivityIndicator from '../components/ActivtyIndectors/ActivityIndecatorOrderDetails'
import ListItemOrderDetail from '../components/ListItemOrderDetail'
import colors from '../config/colors'
import TrackingBox from '../components/TrackingBox'
import getOrder from '../api/getOrder'
import useAuth from "../auth/useAuth";
import Routes from '../Routes';




const OrderDetails = () => {
    const route = useRoute();
    let { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const navigation = useNavigation();
    const prefix = "DelayedOrders";

    const loadDetails = async (token, id, notificatin_id = "0") => {
        const results = (await getOrder.getOrder(token, id, notificatin_id));
        setOrder(results.data.data[0]);
        setIsLoading(false);
    };
    useEffect(() => {
        loadDetails(user.token, route.params.id, route.params.notify_id);
    }, [])
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
    const startChating = (id) => {
        navigation.navigate(Routes.CHAT_MODEL, { id: id })
    }
    return (
        <ScrollView>
            <View style={{ flex: 1, marginBottom: 10, paddingBottom: 5 }}>
                {order ?
                    <View style={{ flex: 1, marginBottom: 10, paddingBottom: 5 }}>
                        <View style={styles.orderDetailsContainer}>
                            <View style={{ width: "100%", height: "25%" }} >
                                <View style={styles.headerDetails}>
                                    <View style={[styles.titleOrderStatusView, { backgroundColor: handelColor(order.order_status_id) }]}>
                                        <Text style={styles.titleOrderStatus}>{order.order_status}</Text>
                                    </View>
                                    <Text style={styles.titleOrderId}>{order.order_no}</Text>
                                    <Text style={styles.titleStore}>{order.store_name}</Text>
                                </View>
                            </View>
                            <View style={styles.textContainer} >
                                <ListItemOrderDetail caption="أسم الزبون" details={order.customer_name} />
                                <ListItemOrderDetail onPress={true} caption="هاتف الزبون" details={order.customer_phone} />
                                {order.address ? <ListItemOrderDetail caption="عنوان الزبون" details={`${order.city} - ${order.town} - ${order.address}`} /> :
                                    <ListItemOrderDetail caption="عنوان الزبون" details={`${order.city} - ${order.town}`} />}
                                {order.dev_price && <ListItemOrderDetail caption="سعر التوصيل" details={order.dev_price} />}
                                {order.client_price && <ListItemOrderDetail caption="السعر الصافي" details={order.client_price} />}
                                {order.price && <ListItemOrderDetail caption="مبلغ الوصل" details={order.price} />}
                                {order.new_price && <ListItemOrderDetail caption="المبلغ المستلم" details={order.new_price} />}
                                {order.driver_name && <ListItemOrderDetail caption="أسم المندوب" details={order.driver_name} />}
                                {order.driver_phone && <ListItemOrderDetail onPress={true} caption="هاتف المندوب" details={order.driver_phone} />}
                                {order.driver_phone && <ListItemOrderDetail caption="تم التحاسب؟" details={order.money_status === "1" ? "نعم" : "كلا"} />}
                            </View>

                        </View>
                        <TouchableWithoutFeedback onPress={() => startChating(order.id)}>
                            <View style={styles.chatShadow}
                            >
                                <Image style={styles.chatIcon} source={require("./../assets/icons/chatIcon.png")} />
                            </View>
                        </TouchableWithoutFeedback>
                        <ScrollView >
                            {order.tracking.map((item) =>
                                <TrackingBox key={`${item.order_status_id}${uuid()}`.toString()} bgColor={handelColor(item.order_status_id)} item={item} />)}
                        </ScrollView>
                    </View>
                    :
                    <ActivityIndicator visable={isLoading} />
                }
            </View >
        </ScrollView>
    )
}

export default OrderDetails

const styles = StyleSheet.create({

    headerDetails: {
        width: "90%",
        height: "100%",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderBottomColor: colors.primery,
        borderBottomWidth: 1,
        marginBottom: 5
    },
    container: {
        backgroundColor: colors.black,
        width: "100%",
        height: "100%"
    },
    orderDetailsContainer: {
        backgroundColor: colors.white,
        width: "100%",
        height: 300,
        marginBottom: 10,
        paddingBottom: 5,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: "#000",
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
        borderRadius: 10,
        shadowColor: colors.black,
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
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.medium,
    },
    titleStore: {
        fontSize: 22,
        paddingTop: 5
    },
    titleOrderId: {
        fontSize: 22
    },
    titleOrderStatus: {
        color: "white",
        fontWeight: "bold"
    },
    titleOrderStatusView: {
        backgroundColor: colors.primery,
        padding: 15,
        borderRadius: 40,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    contanerBox: {
        height: "100%",
        width: "100%",
        flexDirection: "row-reverse",
        justifyContent: "space-around",
        margin: 5,
    },
    trackingTitle: {
        color: "#39C555",
        fontWeight: "bold",
        fontSize: 14,
        paddingBottom: 10,
    },
    trackingNote: {
        color: colors.medium,
        fontSize: 12
    },

})
