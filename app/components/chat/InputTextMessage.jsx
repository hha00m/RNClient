import React, { useState } from 'react'
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import defultStyle from '../../config/styles'

export default function AppTextinput({ onPress, ...otherProps }) {
    // I18nManager.forceRTL(false)

    return (
        <View style={styles.contaioner}>

            <View style={styles.inputContainer}>


                <View style={{ width: '90%' }}>
                    <TextInput
                        keyboardType="twitter"
                        placeholder="أكتب نص هنا"
                        style={defultStyle.text} {...otherProps} />
                </View>
                <TouchableWithoutFeedback onPress={onPress}>
                    <MaterialCommunityIcons style={{
                        transform: [{ rotate: '180deg' }]
                    }} size={35} color={defultStyle.colors.primery} name='send' />
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contaioner: {
        paddingHorizontal: 15,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        backgroundColor: defultStyle.colors.light,
        borderRadius: 5,
        width: '100%',
        padding: 8,
        alignSelf: 'center',
        flexDirection: 'row-reverse',
        color: defultStyle.colors.medium,
    },
    icon: {
        marginLeft: 10,
    }

})
