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
            <View style={styles.textView}>
                <Text style={styles.titleText}>{caption}</Text>
            </View>
            <View style={styles.textView2}>
                {onPress ?
                    <Text onPress={() => { Linking.openURL(`tel:${details}`) }} style={styles.text, { color: colors.secondery, textDecorationLine: 'underline' }}>{details}</Text> :
                    <Text style={styles.text}>{numberWithCommas(details)}</Text>}
            </View>
        </View>
    )
}

export default ListItemOrderDetail

const styles = StyleSheet.create({

    containertextContainer: {
        width: "98%",
        height: 20,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row-reverse",
        // backgroundColor: "gold"
    },
    textView: {
        width: "20%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    textView2: {
        width: "80%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    text: {
        fontFamily: 'Tjw_xblod',
        fontSize: 12,
        fontFamily: 'Tjw_blod'
    },
    titleText: {
        fontWeight: "200",
        fontSize: 11,
        color: colors.medium,
        fontFamily: 'Tjw_medum'

    },

})
