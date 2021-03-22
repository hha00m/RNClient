import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../AppText';
import SummaryBox from './SummaryBox';
import ActivityIndecator from '../ActivtyIndectors/ActivityIndecatorSquers';
import useAuth from "../../auth/useAuth";

const SummaryBoxes = ({ data, isLoading }) => {

    let { user } = useAuth();

    return (
        <>

            <AppText style={styles.text}>مرحبا, {user.data.name} ...</AppText>
            {isLoading && <ActivityIndecator style={styles.summaryContainer} visable={isLoading} />}
            <View style={styles.summaryContainer}>
                {data.oneDay && <SummaryBox isLoading={isLoading} boxes={data.oneDay.orders} amount={data.oneDay.client_price} time="اليوم" background="#e8f5e9" colorM="#1b5e20" />}
                {data.sevenDay && <SummaryBox boxes={data.sevenDay.orders} amount={data.sevenDay.client_price} time="٧ ايام" background="#bbdefb" colorM="#0d47a1"></SummaryBox>}
                {data.month && <SummaryBox boxes={data.month.orders} amount={data.month.client_price} time="٣٠ يوم" background="#fbe9e7" colorM="#bf360c"></SummaryBox>}

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
        paddingTop: 15,
        paddingHorizontal: 10,
        textAlign: 'right',
        fontSize: 15
    }

})
