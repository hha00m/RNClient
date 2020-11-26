import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../AppText';
import SummaryBox from './SummaryBox';
import ActivityIndecator from '../ActivtyIndectors/ActivityIndecatorSquers';

const SummaryBoxes = ({ data, isLoading }) => {

    let { user } = useAuth();

    return (
        <>

            <AppText style={styles.text}>مرحبا, {user.data.name} ...</AppText>
            {isLoading && <ActivityIndecator style={styles.summaryContainer} visable={isLoading} />}
            <View style={styles.summaryContainer}>
                {data.oneDay && <SummaryBox isLoading={isLoading} background="#4CAF50" boxes={data.oneDay.orders} amount={data.oneDay.client_price} time="اليوم" />}
                {data.sevenDay && <SummaryBox background="#0B4EBC" boxes={data.sevenDay.orders} amount={data.sevenDay.client_price} time="٧ ايام" colorM="#fff"></SummaryBox>}
                {data.month && <SummaryBox background="#F4B400" boxes={data.month.orders} amount={data.month.client_price} time="٣٠ يوم"></SummaryBox>}

            </View>
        </>
    )
}
export default SummaryBoxes;
const styles = StyleSheet.create({
    summaryContainer: {
        flexDirection: 'row-reverse',
        justifyContent: "space-around",
        padding: 5
    },
    text: {
        paddingTop: 25,
        textAlign: 'center'
    }

})
