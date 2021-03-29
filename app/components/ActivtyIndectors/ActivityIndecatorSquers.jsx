import React from 'react'
import LottieView from 'lottie-react-native';
import Loading from '../../config/loadings'
import { View, StyleSheet, ScrollView } from 'react-native';
import { I18nManager } from 'react-native';

const ActivityIndecator = (visable = false, style) => {
    const t = Loading.moneyDaily;
    if (!visable) return null;
    return <View style={styles.container}>
        <LottieView style={styles.item} autoPlay loop source={t} />
        <LottieView style={styles.item} autoPlay loop source={t} />
        <LottieView style={styles.item} autoPlay loop source={t} />
    </View>


}
const styles = StyleSheet.create({
    container: {
        //top: 99,
        flex: 1,

        flexDirection: I18nManager.isRTL ? "row-reverse" : "row-reverse",
        justifyContent: "space-around",
        // alignItems: "center"
    },
    item: {
        width: 95,
        height: 95,
        marginHorizontal: 5,
    }

})
export default ActivityIndecator
