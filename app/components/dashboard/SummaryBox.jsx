import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import AppText from '../AppText';
import colors from '../../config/colors'
const SummaryBox = ({ background, boxes, amount, time, colorM }) => {
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return (
        <View
            style={{
                width: "27%",
                height: 90,
                borderRadius: 5,
                backgroundColor: background,
                flexDirection: "column",
                alignItems: 'flex-end',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.36,
                shadowRadius: 6.68,

                elevation: 11,

            }}>
            <View style={styles.boxContainer}>
                <FontAwesome5 name="box-open" size={20} color={colorM ? colorM : colors.dark} />
                <AppText style={{ fontSize: 14, paddingRight: 5, color: colorM ? colorM : colors.dark }}>{boxes}</AppText>
            </View>

            <View style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <AppText style={{ fontSize: 16, fontWeight: "bold", color: colorM ? colorM : colors.dark }}> {(amount)}</AppText>
                <AppText style={{ fontSize: 14, color: colorM ? colorM : colors.dark }}> {(time)}</AppText>

            </View>

        </View >
    )
}
export default SummaryBox;
const styles = StyleSheet.create({
    boxContainer: {
        flexDirection: 'row-reverse',
        padding: 5,

    },
})
