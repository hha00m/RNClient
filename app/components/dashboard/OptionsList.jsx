import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Routes from '../../Routes';
import { default as UUID } from "uuid";

import OptionsTwo from './OptionsTwo'

const options = [
    {
        options: [
            {
                path: require("./../../assets/dashboard/underReceive1.png"), name: "جاري التسليم", forwardTo: Routes.DASHBOARD_LIST, action: "onway"
            },
            {
                path: require("./../../assets/dashboard/underProcess.png"), name: "راجع ممكن معالجتة", forwardTo: Routes.DASHBOARD_LIST, action: "returned"
            },
        ],

        key: `1232322233-${UUID.v4()}`,
    },
    {
        options: [
            {
                path: require("./../../assets/dashboard/puse.png"), name: "مؤجلات لوقت اخر", forwardTo: Routes.DASHBOARD_LIST, action: "posponded"
            },
            {
                path: require("./../../assets/dashboard/reports.png"), name: "الكشوفات والأرباح", forwardTo: Routes.DISCLOSURES, action: "disclosures"
            },
        ],
        key: `1232322233-${UUID.v4()}`,
    },
    {
        options: [
            {
                path: require("./../../assets/dashboard/inWarehouse.png"), name: "راجع ممكن استلامه", action: "instorage",
                forwardTo: Routes.DASHBOARD_LIST

            },
            {
                path: require("./../../assets/dashboard/delivery.png"), name: "تم التسليم", action: "recived",
                forwardTo: Routes.DASHBOARD_LIST
            },
        ],
        key: `1232322233-${UUID.v4()}`,

    }
]
const OptionsList = ({ data }) => {
    return (

        <View>
            {
                options.map((item) => {
                    return <OptionsTwo data={data} key={Math.random()} options={item} />
                })
            }
        </View>
    )
}
export default OptionsList;

