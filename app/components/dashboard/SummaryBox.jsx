import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import AppText from '../AppText';
import colors from '../../config/colors'
import { Text } from 'react-native';
import borderRadiuss from '../../config/borderRadiuss';
const SummaryBox = ({ background, boxes, amount, time, colorM }) => {

    return (
        <View
            style={{
                width: "26%",
                height: 94,
                borderRadius: borderRadiuss.Radius_light,
                backgroundColor: background,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,

                elevation: 2,

            }}>
            <View style={styles.boxContainer}>
                <FontAwesome5 name="box-open" size={17} color={colorM ? colorM : colors.black} />
                <Text style={{ fontSize: 15, paddingRight: 5, color: colorM ? colorM : colors.black }}>{boxes}</Text>
            </View>

            <View style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5
            }}>
                <Text style={{ fontFamily: 'Tjw_blod', fontSize: 15, color: colorM ? colorM : colors.dark }}> {(amount)}</Text>
                <Text style={{
                    fontFamily: 'Tjw_blod', fontSize: 12, color: colorM ? colorM : colors.black, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 1.41,

                    elevation: 2,
                }}> {(time)}</Text>

            </View>

        </View >
    )
}
export default SummaryBox;
const styles = StyleSheet.create({
    boxContainer: {
        flexDirection: 'row-reverse',
    },
})
