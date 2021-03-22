import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

import colors from '../config/colors';
import borderRadiuss from '../config/borderRadiuss';

const DashboardButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={styles.container}>
                <MaterialIcons name='home' color={colors.white} size={40} />
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primery,
        height: 80,
        width: 80,
        borderRadius: borderRadiuss.Radius_larg,
        bottom: 25,
        borderColor: colors.white,
        borderWidth: 10,
        alignItems: 'center',
        justifyContent: 'center'

    }
});

export default DashboardButton;