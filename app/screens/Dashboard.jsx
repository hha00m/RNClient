import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Headline, Title } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

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
import Routes from '../Routes';
import borderRadiuss from '../config/borderRadiuss';
import cache from "../utility/cache";
import { I18nManager } from 'react-native';

const Dashboard = () => {
    const [adsText, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const navigator = useNavigation();

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
    const loadStatic_storage = async () => {
        const results = await cache.get("/static.php?token=" + user.token);
        setData(results.static[0]);
        const o = (results.last1[0]);
        const s = (results.last7[0]);
        const m = (results.last30[0]);
        setCalcData({ oneDay: o, sevenDay: s, month: m });
        setIsLoading(false);
        setRefreshing(false);
    }
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
    const adsView_local = async () => {
        const results = await cache.get("/config.php?token=" + user.token);
        setText(results.config);
        setIsLoading(false);
        setRefreshing(false);
    };
    useEffect(() => {
        setIsLoading(true);
        loadStatic_storage();
        adsView_local();
        loadStatic();
        adsView();
    }, []);

    return (
        <Screen>
            <View
                style={{
                    justifyContent: "space-between", alignItems: "center", flexDirection: 'row-reverse',
                }} >
                <Headline
                    style={{
                        fontFamily: "Tjw_blod",
                        alignSelf: "flex-end",
                        paddingTop: 10,
                        paddingHorizontal: 10,
                        color: colors.black,
                    }}
                >
                    أهل الدقة
            </Headline>
                <View
                    style={{
                        justifyContent: "space-between", alignItems: "center", flexDirection: 'row',
                    }} >
                    <Pressable
                        onPress={() => navigator.navigate(Routes.STATISTICS_PAGE2)}
                    >
                        <Feather name="pie-chart" size={24} color={colors.black} style={{
                            paddingTop: 10,
                            paddingHorizontal: 10,
                        }} />
                    </Pressable>
                    <Pressable
                        onPress={() => navigator.navigate(Routes.CALLCENTER)}
                    >
                        <Feather name="help-circle" size={25} color={colors.black} style={{
                            paddingTop: 10,
                            paddingHorizontal: 10,
                        }} />
                    </Pressable>
                </View>

            </View>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                {!adsText.c_ad1 ? <ActivityIndecator visable={isLoading} type={loadings.adsTab} /> :
                    adsText.c_ad1 && <AdsCompany title={adsText.c_ad1} />}
                {<SummaryBoxes data={calcData} isLoading={isLoading} />}
                <Pressable
                    onPress={() => navigator.navigate(Routes.CALLCENTER)}
                >
                    <View
                        style={{
                            width: "90%",
                            height: 45,
                            backgroundColor: "#c8e6c9",
                            alignSelf: "center",
                            margin: 10,
                            borderRadius: borderRadiuss.Radius_larg,
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: I18nManager.isRTL ? "row-reverse" : "row-reverse",
                        }}>
                        <Feather name="phone-call" size={20} color={"#388e3c"} />
                        <Title
                            style={{
                                alignSelf: "center",
                                paddingHorizontal: 8,
                                color: "#388e3c",
                                fontFamily: "Tjw_xblod",
                                fontSize: 14
                            }}>خدمة العملاء</Title>

                    </View>
                </Pressable>


                {<OptionsList data={data} />}
            </ScrollView>
        </Screen>
    )
}
export default Dashboard;

