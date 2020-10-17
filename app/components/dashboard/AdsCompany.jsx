import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';

import AppText from '../AppText';
import colors from '../../config/colors'
const AdsCompany = ({ title }) => {
    return (
        <View style={styles.adsContainer}>
            {/* <Image style={styles.adsAlart} source={require('../../assets/avatar/002-promotion-1.png')} /> */}
            <HTML html={title} style={styles.htmltag} imagesMaxWidth={Dimensions.get('window').width} />
        </View>

    )
}
export default AdsCompany;
const styles = StyleSheet.create({
    adsContainer: {
        direction: "rtl",
        width: "98%",
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.white,
        margin: "1%",
        padding: 20,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,

    },
    adsAlart: {
        width: 60,
        height: 60,
        borderRadius: 5,
        margin: 5,

    },
    htmltag: {
        direction: "rtl",

    }
})
