import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native'
import borderRadiuss from '../config/borderRadiuss'
import colors from '../config/colors'

const AppButton = ({ title, onPress, color = 'primery', isLoading = false }) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors[color] }]} onPress={onPress}>
            <Text style={styles.text}>
                <ActivityIndicator animating={isLoading} size="small" />
                {title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primery,
        borderRadius: borderRadiuss.Radius_circl,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 20,
        width: '90%',
        marginVertical: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    text: {
        fontSize: 16,
        color: colors.white,
    }


})
export default AppButton;

