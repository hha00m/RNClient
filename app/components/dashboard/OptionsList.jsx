import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Routes from '../../Routes';

import OptionsTwo from './OptionsTwo'

const options = [
    {
        options: [
            {
                path: require("./../../assets/dashboard/underReceive.png"), name: "جاري التسليم", forwardTo: Routes.UNDER_RECEIVER_ORDERS
            },
            {
                path: require("./../../assets/dashboard/underProcess.png"), name: "قيد المعالجة", forwardTo: Routes.UNDER_PROCESS_ORDERS
            },
        ],

        key: 1232322233,
    },
    {
        options: [
            {
                path: require("./../../assets/dashboard/puse.png"), name: "مؤجل", forwardTo: Routes.DELAYED_ORDERS
            },
            {
                path: require("./../../assets/dashboard/reports.png"), name: "كشوفات", forwardTo: Routes.DISCLOSURES
            },
        ],
        key: 232333232,
    },
    {
        options: [
            {
                path: require("./../../assets/dashboard/inWarehouse.png"), name: "في المخزن الرئيسي",
                forwardTo: Routes.IN_WEARHOUSE_ORDERS

            },
            {
                path: require("./../../assets/dashboard/delivery.png"), name: "تم التوصيل",
                forwardTo: Routes.COMPLETE_ORDERS
            },
        ],
        key: 3424232233,

    }
]
const OptionsList = () => {
    return (

        <View>
            {
                options.map((item) => {
                    return <OptionsTwo key={Math.random()} options={item} />
                })
            }
        </View>
    )
}
export default OptionsList;
const styles = StyleSheet.create({
})
