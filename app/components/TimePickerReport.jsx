import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Screen from './Screen';
const TimePickerReport = () => {

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(!show);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    return (
        <Screen>
            <View>
                <View>
                    <Button onPress={showDatepicker} title="Show date picker!" />
                </View>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        display="calendar"
                        onChange={onChange}
                    />
                )}
            </View>
        </Screen>
    );
}
export default TimePickerReport

