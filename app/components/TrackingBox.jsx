import React from 'react'
import { StyleSheet, View } from 'react-native'

import AppTaxt from '../components/AppText'
import colors from '../config/colors'
import Icon from '../components/Icon'
import borderRadiuss from '../config/borderRadiuss'
import { I18nManager } from 'react-native'
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
        marginBottom: 10,
        height: 75,
        width: "100%",
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row-reverse",
        justifyContent: "space-around",
        alignItems: "center",
    },
    trackingTitle: {
        color: colors.success,
        fontSize: 14,
        paddingBottom: 10,
        fontFamily: 'Tjw_xblod'


    },
    trackingNote: {
        color: colors.medium,
        fontSize: 12,
        fontFamily: 'Tjw_medum'

    },

    boxContainer: {
        borderWidth: 1,
        padding: 10,
        borderColor: colors.medium,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        width: "75%",
        height: "100%",
        alignSelf: "flex-start",
        borderRadius: borderRadiuss.Radius_larg,
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
