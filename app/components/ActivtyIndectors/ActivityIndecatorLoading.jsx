import React from 'react'
import LottieView from 'lottie-react-native';
import Loading from '../../config/loadings'
import { View, StyleSheet } from 'react-native';

const ActivityIndecator = (visable = false, style) => {
    const t = Loading.loading;
    if (!visable) return null;
    return <View style={styles.contaner}>
        <LottieView
            style={{
                width: 20,
                height: 50,

            }}
            autoPlay
            loop
            source={t} />
    </View>
}
const styles = StyleSheet.create({
    contaner: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    }
})

export default ActivityIndecator
