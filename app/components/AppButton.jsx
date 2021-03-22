import React from 'react'
import { StyleSheet } from 'react-native'
import colors from '../config/colors'
import { Button } from 'react-native-paper';

const AppButton = ({ title, onPress, color = 'primery', isLoading = false }) => {
    return (
        <Button
            mode="contained"
            onPress={onPress}
            loading={isLoading}
            color={colors.primery}
            style={{
                margin: 5,
                fontFamily: "Tjw_blod",
                height: 54,
                width: 335,
                alignSelf: "center",
                justifyContent: "center"
            }}
        >
            {title}
        </Button>

    )
}


export default AppButton;

