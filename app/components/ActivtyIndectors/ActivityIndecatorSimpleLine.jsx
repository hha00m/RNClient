import React from 'react'
import LottieView from 'lottie-react-native';
import Loading from '../../config/loadings'
import { View, StyleSheet, ScrollView } from 'react-native';

const ActivityIndecator = (visable = false, style) => {
    const t = Loading.simpleLine;
    if (!visable) return null;
    return <View>
        <LottieView style={styles.item} autoPlay loop source={t} />
        <LottieView style={styles.item} autoPlay loop source={t} />
        <LottieView style={styles.item} autoPlay loop source={t} />
        <LottieView style={styles.item} autoPlay loop source={t} />
        <LottieView style={styles.item} autoPlay loop source={t} />
        <LottieView style={styles.item} autoPlay loop source={t} />
        <LottieView style={styles.item} autoPlay loop source={t} />
        <LottieView style={styles.item} autoPlay loop source={t} />
        <LottieView style={styles.item} autoPlay loop source={t} />


    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: "100%",
    }

})
export default ActivityIndecator
