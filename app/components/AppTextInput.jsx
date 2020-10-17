import React, { useState } from 'react'
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from './AppText'
import defultStyle from '../config/styles'

export default function AppTextinput({ rightIcon, leftIcon, caption, ...otherProps }) {
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };


    return (
        <View style={styles.contaioner}>
            {caption && <AppText style={{ fontWeight: "bold" }}>{caption}</AppText>}

            <View style={styles.inputContainer}>
                {rightIcon && <MaterialCommunityIcons style={styles.icon} size={20} colors={defultStyle.colors.medium} name={rightIcon} />}
                <View style={{ width: '85%' }}>
                    {leftIcon ? <TextInput style={defultStyle.text}
                        secureTextEntry={secureTextEntry}  {...otherProps} />
                        : <TextInput style={defultStyle.text} {...otherProps} />}
                </View>
                {leftIcon &&
                    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
                        <MaterialCommunityIcons size={20} colors={defultStyle.colors.medium} name={secureTextEntry ? 'eye-off' : 'eye'} />
                    </TouchableWithoutFeedback>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contaioner: {
        paddingHorizontal: 15,
        borderColor: "black",
        marginVertical: 10,

    },
    inputContainer: {
        backgroundColor: defultStyle.colors.light,
        borderRadius: 5,
        width: '100%',
        padding: 15,
        alignSelf: 'center',
        marginHorizontal: 5,
        flexDirection: 'row-reverse',
        borderWidth: 2,
        borderColor: defultStyle.colors.borderColor,


    },
    icon: {
        marginLeft: 10,
    }

})
