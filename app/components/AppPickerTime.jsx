import React, { useState } from 'react';
import { StyleSheet, Button, TouchableWithoutFeedback, View, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TimeApp from '../components/TimeApp'

import AppText from './AppText';
import defultStyle from '../config/styles';
import borderRadiuss from '../config/borderRadiuss';
export default function AppPicker({ icon, width = "100%", updateTime, placeholder, selectedTime, PickerItemComponent = TimeApp }) {
    const [modalVisable, setModalVisable] = useState(false);
    const handerSelectedDate = (dateS) => {
        // console.log(dateS);
        setModalVisable(!modalVisable);
        return updateTime(dateS);
    }
    return (
        <View >
            <TouchableWithoutFeedback onPress={() => setModalVisable(!modalVisable)}>
                <View style={[styles.container, { width: width }]}>
                    {icon && <MaterialCommunityIcons style={styles.icon} size={15} colors={defultStyle.colors.medium} name={icon} />}
                    <AppText style={styles.text}    >{selectedTime ? selectedTime : placeholder}</AppText>
                    {icon && <MaterialCommunityIcons size={15} colors={defultStyle.colors.medium} name='chevron-down' />}
                </View>
            </TouchableWithoutFeedback>
            <Modal
                animationType="slide"
                // transparent={true}
                visible={modalVisable}>
                <Screen>
                    <Button title="أغلاق" onPress={() => setModalVisable(!modalVisable)} />
                    <TimeApp
                        onSlectedTime={handerSelectedDate}

                    />

                </Screen>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defultStyle.colors.light,
        borderRadius: borderRadiuss.light,
        padding: 9,

        marginVertical: 10,
        flexDirection: 'row-reverse',
        borderWidth: 1,
        borderColor: 'gray'
    },
    icon: {
        marginLeft: 10,
    },
    text: {
        flex: 1,
        fontSize: 12
    }

})
