import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'

import AppButton from '../components/AppButton';
import Routes from './../Routes';

export default function WelcomeScreen() {
    const navigation = useNavigation();

    return (
        <ImageBackground
            blurRadius={2}
            style={styles.background} source={require('../assets/background/welcomePage.png')} >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo/logo.png')} />
                <Text style={styles.text}>انت مهم جدا لنا </Text>
                <Text style={styles.text}>ولذالك أخترنا لك الافضل </Text>
            </View>
            <View style={{
                width: "100%", bottom: "5%"
            }}>
                <AppButton title='أبداء رحلتك معنا' onPress={() => navigation.navigate(Routes.LOGIN)
                } />
            </View>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logoContainer: {
        position: 'absolute',
        top: 70,
        alignItems: 'center'
    },
    text: {
        fontSize: 25,
        paddingVertical: 5,
    },

    logo: {
        width: 120,
        height: 120,
    }
})
