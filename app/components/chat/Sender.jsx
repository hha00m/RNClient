import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../config/colors'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { I18nManager } from 'react-native';

const sender = ({ item }) => {
    return (
        <View style={{ alignSelf: "flex-start" }}>
            <Text style={styles.data}>{item.client_name} (تاجر)</Text>
            <View style={styles.container
            } >
                <Text style={styles.text}>{item.message}</Text>
                <View style={{ flexDirection: I18nManager.isRTL ? "row" : "row" }}>
                    <MaterialCommunityIcons style={styles.checkIcon} name="checkbox-marked-circle" size={12} color={item.driver_seen === "0" ? "black" : colors.primery} />
                    <MaterialCommunityIcons style={styles.checkIcon} name="checkbox-marked-circle" size={12} color={item.admin_seen === "0" ? "black" : colors.primery} />
                </View >
            </View>
            <Text style={styles.data}>{item.date}</Text>

        </View >

    )
}

export default sender

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: 5,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 30,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    text: {
        fontSize: 16,
        paddingHorizontal: 5,
        paddingTop: 5,
    }
    , data: {
        fontSize: 12,
        paddingHorizontal: 10,
        color: colors.medium,
    },
    checkIcon: {
        // alignSelf: "flex-start"
    }
})
