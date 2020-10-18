import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';

import colors from '../../config/colors'
import { ScrollView } from 'react-native-gesture-handler';
const AdsCompany = ({ title }) => {
    return (
        <View style={styles.adsContainer}>
            <ScrollView>
                {/* <Image style={styles.adsAlart} source={require('../../assets/avatar/002-promotion-1.png')} /> */}
                <HTML html={title} style={styles.htmltag} imagesMaxWidth={Dimensions.get('window').width} tagsStyles={{ p: { marginTop: 0, marginBottom: 12 }, blockquote: { backgroundColor: "#f1f1f1", padding: 12, paddingBottom: 0, marginTop: 6 } }} />
            </ScrollView>
        </View>

    )
}
export default AdsCompany;
const styles = StyleSheet.create({
    adsContainer: {
        direction: "rtl",
        width: "98%",
        height: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.white,
        margin: "1%",
        padding: 20,
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
