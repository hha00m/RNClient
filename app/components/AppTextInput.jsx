import React, { useState } from 'react'
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from './AppText'
import defultStyle from '../config/styles'
import borderRadiuss from '../config/borderRadiuss';
import { Text } from 'react-native';
import colors from '../config/colors';

export default function AppTextinput({ rightIcon, leftIcon, caption, ...otherProps }) {
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };


    return (
        <View style={styles.contaioner}>
            {caption && <Text style={styles.caption}>{caption}</Text>}

            <View style={styles.inputContainer}>
                {rightIcon && <MaterialCommunityIcons style={styles.icon} size={20} colors={defultStyle.colors.medium} name={rightIcon} />}
                <View style={{ width: '85%' }}>
                    {leftIcon ? <TextInput style={defultStyle.text}
                        secureTextEntry={secureTextEntry}  {...otherProps} />
                        : <TextInput style={defultStyle.text} {...otherProps} />}
                </View>
                {leftIcon &&
                    <TouchableWithoutFeedback onPress={toggleSecureEntry} >
                        <MaterialCommunityIcons style={styles.icon} size={20} colors={defultStyle.colors.medium} name={secureTextEntry ? 'eye-off' : 'eye'} />
                    </TouchableWithoutFeedback>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contaioner: {
        paddingHorizontal: 15,
        paddingTop: 15,
        backgroundColor: defultStyle.colors.white,

    },
    inputContainer: {
        width: 335,
        height: 50,
        alignSelf: 'center',
        justifyContent: "center",
        alignContent: "center",
        marginHorizontal: 5,
        flexDirection: 'row-reverse',
        borderColor: defultStyle.colors.medium,
        backgroundColor: defultStyle.colors.white,
        borderBottomWidth: 1,
    },
    icon: {
        paddingLeft: 10,
        alignSelf: "center"
    },
    caption: {
        fontFamily: "Tjw_medum",
        textAlign: "right",
        color: colors.vueColorButtom,
        fontSize: 12
    }

})
