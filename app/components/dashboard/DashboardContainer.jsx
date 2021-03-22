import React from 'react';
import { View, StyleSheet } from 'react-native';
const SummaryBoxes = ({ children }) => {
    return (
        <>
            <View style={styles.container}>
                {children}
            </View>
        </>
    )
}
export default SummaryBoxes;
const styles = StyleSheet.create({
    container: {

    }
})
