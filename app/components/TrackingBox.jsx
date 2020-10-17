import React from 'react'
import { StyleSheet, View } from 'react-native'

import AppTaxt from '../components/AppText'
import colors from '../config/colors'
import Icon from '../components/Icon'
const iconNames = [
    "", "car", "car", "van-utility", "check-bold", "arrow-left-right-bold-outline", "backburger", "timer", "map", "logout", "axis-x-arrow"
]
const TrackingBox = ({ item, bgColor }) => {
    return (
        <View style={styles.mainContanerBox}>
            <View style={{ alignSelf: "center" }}>
                <Icon name={iconNames[item.order_status_id]} backgroundColor={bgColor} />
            </View>
            <View style={[styles.boxContainer, { borderColor: bgColor }]} >
                <View >
                    <AppTaxt style={[styles.trackingTitle, { color: bgColor }]} >{item.status}</AppTaxt>
                    <AppTaxt style={styles.trackingNote}>{item.note}</AppTaxt>
                </View>
                <View style={{ alignSelf: "flex-end" }}>
                    <AppTaxt style={[styles.trackingTitle, { color: bgColor }]} >{item.date}</AppTaxt>
                    <AppTaxt style={styles.trackingNote}>{item.hour}</AppTaxt>

                </View>
            </View>
        </View>

    )
}

export default TrackingBox

const styles = StyleSheet.create({
    mainContanerBox: {
        marginTop: 25,
        height: 75,
        width: "100%",
        flexDirection: "row-reverse",
        justifyContent: "space-around",
        alignItems: "center",
    },
    trackingTitle: {
        color: colors.success,
        fontWeight: "bold",
        fontSize: 14,
        paddingBottom: 10,

    },
    trackingNote: {
        color: colors.medium,
        fontSize: 12
    },

    boxContainer: {
        borderWidth: 1,
        padding: 10,
        borderColor: colors.medium,
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        width: "75%",
        height: "100%",
        alignSelf: "flex-start",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})
