import React from 'react'
import { I18nManager } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Linking } from 'react-native'

import colors from '../config/colors'
const ListItemOrderDetail = ({ caption, details, onPress = false }) => {
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return (
        <View style={styles.containertextContainer} >
            <View style={styles.textView2}>
                {onPress ?
                    <Text onPress={() => { Linking.openURL(`tel:${details}`) }} style={styles.text, { color: colors.secondery, textDecorationLine: 'underline' }}>{details}</Text> :
                    <Text style={styles.text}>{numberWithCommas(details)}</Text>}
            </View>
            <View style={styles.textView}>
                <Text style={styles.titleText}>{caption}</Text>
            </View>

        </View>
    )
}

export default ListItemOrderDetail

const styles = StyleSheet.create({

    containertextContainer: {
        width: "100%",
        height: 20,
        flexDirection: I18nManager.isRTL ? "row" : "row",
        // backgroundColor: "gold"
    },
    textView: {
        width: "25%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 5
    },
    textView2: {
        width: "70%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    text: {
        fontFamily: 'Tjw_xblod',
        fontSize: 12,
        fontFamily: 'Tjw_blod',
        color: colors.black,

    },
    titleText: {
        fontWeight: "200",
        fontSize: 11,
        color: colors.black,
        fontFamily: 'Tjw_medum',
    },

})
