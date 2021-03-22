import React, { useState } from 'react';
import { StyleSheet, Button, TouchableWithoutFeedback, View, Modal, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import defultStyle from '../config/styles';
import PickerItem from './PickerItem'
import colors from '../config/colors';
import ListItemSeparator from './lists/ListItemSeparator'
import borderRadiuss from '../config/borderRadiuss';
export default function AppPicker({ icon, items, width = "100%", onSelectItem, placeholder, selectedItem, PickerItemComponent = PickerItem, backgroundColor, color }) {
    const [modalVisable, setModalVisable] = useState(false);
    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisable(!modalVisable)}>
                <View style={[styles.container, { width: width, backgroundColor: backgroundColor, color: color }]}>
                    {icon && <MaterialCommunityIcons style={styles.icon} size={15} colors={defultStyle.colors.white} name={icon} />}
                    <AppText style={styles.text}    >{selectedItem ? selectedItem.name : placeholder}</AppText>
                    {icon && <MaterialCommunityIcons size={15} colors={defultStyle.colors.white} name='chevron-down' />}
                </View>
            </TouchableWithoutFeedback>
            <Modal
                animationType="slide"
                // transparent={true}
                visible={modalVisable}>
                <Screen>
                    <Button title="أغلاق" onPress={() => setModalVisable(!modalVisable)} />
                    <FlatList
                        data={items}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>
                            <PickerItemComponent
                                label={item.name}
                                onPress={() => {
                                    setModalVisable(!modalVisable);
                                    onSelectItem(item);

                                }} />}
                        ItemSeparatorComponent={ListItemSeparator}

                    />
                </Screen>
            </Modal>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defultStyle.colors.light,
        borderRadius: borderRadiuss.light,
        padding: 5,
        marginVertical: 8,
        flexDirection: 'row-reverse',
        borderWidth: 1,
        borderColor: colors.black
    },
    icon: {
        marginLeft: 10,
    },
    text: {
        flex: 1,
        fontSize: 12,
    }

})
