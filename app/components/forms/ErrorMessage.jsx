import React from 'react'
import { StyleSheet } from 'react-native'
import AppText from '../AppText'

const ErrorMessage = ({ error, visible }) => {
    if (!error || !visible) return null;
    return (
        <AppText style={styles.error}>{error}</AppText>
    )
}
export default ErrorMessage

const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 10,
        paddingRight: 20,
    }
})
