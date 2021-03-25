import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, Text } from 'react-native';
import { Headline } from 'react-native-paper';

import ActivityIndecator from '../components/ActivtyIndectors/ActivityIndecatorAds';
import SummaryBoxes from '../components/dashboard/SummaryBoxes'
import AdsCompany from './../components/dashboard/AdsCompany'
import OptionsList from '../components/dashboard/OptionsList'
import loadings from '../config/loadings';
import Screen from '../components/Screen';
import getAdsAPI from '../api/getAds';
import useAuth from "../auth/useAuth";
import getStatistic from '../api/getSummayBoxed'
import colors from '../config/colors';

const Dashboard = () => {
    const [adsText, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadStatic();
        adsView();
    }, []);
    const [calcData, setCalcData] = useState({
        oneDay: null,
        sevenDay: null,
        month: null
    });
    let { user } = useAuth();

    const loadStatic = async () => {
        const results = (await getStatistic.get(user.token));
        setData(results.data.static[0]);
        const o = (results.data.last1[0]);
        const s = (results.data.last7[0]);
        const m = (results.data.last30[0]);
        setCalcData({ oneDay: o, sevenDay: s, month: m });
        setIsLoading(false);
        setRefreshing(false);
    };

    const adsView = async () => {
        const results = (await getAdsAPI.get(user.token));
        setText(results.data.config);
        setIsLoading(false);
        setRefreshing(false);
    };
    useEffect(() => {
        setIsLoading(true);
        loadStatic();
        adsView();
    }, []);

    return (
        <Screen>
            <Headline
                style={{
                    fontFamily: "Tjw_blod",
                    alignSelf: "flex-end",
                    paddingTop: 10,
                    paddingHorizontal: 10,
                    color: colors.black,
                }}
            >
                شركة البرق
            </Headline>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                {!adsText.c_ad1 ? <ActivityIndecator visable={isLoading} type={loadings.adsTab} /> :
                    adsText.c_ad1 && <AdsCompany title={adsText.c_ad1} />}
                {<SummaryBoxes data={calcData} isLoading={isLoading} />}
                {<OptionsList data={data} />}
            </ScrollView>
        </Screen>
    )
}
export default Dashboard;

