import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../config/colors'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { I18nManager } from 'react-native';

const Receiver = ({ item }) => {
    return (
        <View style={{ alignSelf: "flex-end" }}>
            {item.staff_name && <Text style={styles.data}>{item.staff_name} ({item.role_name})</Text>}
            <View style={styles.container
            } >
                <Text style={styles.text}>{item.message}</Text>
                <View style={{ flexDirection: I18nManager.isRTL ? "row-reverse" : "row-reverse", alignItems: "flex-end" }}>
                    <MaterialCommunityIcons style={styles.checkIcon} name="checkbox-marked-circle" size={12} color={item.driver_seen === "0" ? "white" : colors.secondery} />
                    <MaterialCommunityIcons style={styles.checkIcon} name="checkbox-marked-circle" size={12} color={item.admin_seen === "0" ? "white" : colors.secondery} />
                </View >
            </View>
            <Text style={styles.data}>{item.date}</Text>

        </View >

    )
}

export default Receiver

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primery,
        padding: 5,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 40,
        borderTopLeftRadius: 40,
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
        color: colors.white,
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
