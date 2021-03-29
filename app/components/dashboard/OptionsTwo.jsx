import React from 'react';
import { I18nManager } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { default as UUID } from "uuid";

import Option from './Option';
const OptionsList = ({ options, data }) => {
    return (
        <View>
            <View style={styles.container}>
                {options.options.map((item) => {
                    return <Option data={data} key={UUID.v4()} path={item} />
                })}

            </View>
        </View>
    )
}
export default OptionsList;
const styles = StyleSheet.create({

    container: {
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row-reverse",
        justifyContent: "center",
        alignItems: "center",
    }
})
