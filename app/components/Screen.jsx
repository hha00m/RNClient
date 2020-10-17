import React from 'react'
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView } from 'react-native'
Screen = ({ children }) => {
    return (
        <SafeAreaView style={styles.screen}>
            {children}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1
    }
});
export default Screen;
