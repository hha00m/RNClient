import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Routes from '../../Routes';

import OptionsTwo from './OptionsTwo'

const options = [
    {
        options: [
            {
                path: require("./../../assets/dashboard/underReceive.png"), name: "جاري التسليم", forwardTo: Routes.DASHBOARD_LIST, action: "onway"
            },
            {
                path: require("./../../assets/dashboard/underProcess.png"), name: "قيد المعالجة", forwardTo: Routes.DASHBOARD_LIST, action: "returned"
            },
        ],

        key: 1232322233,
    },
    {
        options: [
            {
                path: require("./../../assets/dashboard/puse.png"), name: "مؤجل", forwardTo: Routes.DASHBOARD_LIST, action: "posponded"
            },
            {
                path: require("./../../assets/dashboard/reports.png"), name: "كشوفات", forwardTo: Routes.DISCLOSURES, action: "disclosures"
            },
        ],
        key: 232333232,
    },
    {
        options: [
            {
                path: require("./../../assets/dashboard/inWarehouse.png"), name: "في المخزن الرئيسي", action: "instorage",
                forwardTo: Routes.DASHBOARD_LIST

            },
            {
                path: require("./../../assets/dashboard/delivery.png"), name: "تم التوصيل", action: "recived",
                forwardTo: Routes.DASHBOARD_LIST
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
