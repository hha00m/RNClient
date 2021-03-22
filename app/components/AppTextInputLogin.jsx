import React from 'react'
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from './AppText'
import defultStyle from '../config/styles'
import colors from '../config/colors';
import borderRadiuss from '../config/borderRadiuss';

export default function AppTextinput({ rightIcon, leftIcon, caption, ...otherProps }) {
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };


    return (
        <View style={styles.contaioner}>
            {caption && <AppText style={{ fontSize: 16, fontWeight: "bold", paddingTop: 20 }}>{caption}</AppText>}

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
        paddingHorizontal: 25,
        borderColor: colors.black,
        backgroundColor: defultStyle.colors.white,

    },
    inputContainer: {
        backgroundColor: defultStyle.colors.light,
        borderRadius: borderRadiuss.light,
        width: '100%',
        padding: 15,
        alignSelf: 'center',
        marginHorizontal: 15,
        flexDirection: 'row-reverse',
        borderWidth: 1,
        borderColor: defultStyle.colors.black,


    },
    icon: {
        marginLeft: 10,
    }

})
