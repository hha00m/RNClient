import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../AppText';
import SummaryBox from './SummaryBox';
import getStatistic from '../../api/getSummayBoxed'
import ActivityIndecator from '../ActivtyIndectors/ActivityIndecatorSquers';

const SummaryBoxes = () => {
    const [oneDay, setOneDay] = useState(null);
    const [sevenDay, setSevenDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let { user } = useAuth();

    const loadStatic = async () => {
        setIsLoading(true);
        const results = (await getStatistic.get(user.token));
        setOneDay(results.data.last1[0]);
        setSevenDay(results.data.last7[0]);
        setMonth(results.data.last30[0])
        setIsLoading(false);
    };

    useEffect(() => {
        loadStatic();
    }, []);


    return (
        <>

            <AppText style={styles.text}>مرحبا, {user.data.name} ...</AppText>
            {isLoading && <ActivityIndecator style={styles.summaryContainer} visable={isLoading} />}
            <View style={styles.summaryContainer}>
                {oneDay && <SummaryBox isLoading={isLoading} background="#4CAF50" boxes={oneDay.orders} amount={oneDay.client_price} time="اليوم" />}
                {sevenDay && <SummaryBox background="#0B4EBC" boxes={sevenDay.orders} amount={sevenDay.client_price} time="٧ ايام" colorM="#fff"></SummaryBox>}
                {month && <SummaryBox background="#F4B400" boxes={month.orders} amount={month.client_price} time="٣٠ يوم"></SummaryBox>}

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
