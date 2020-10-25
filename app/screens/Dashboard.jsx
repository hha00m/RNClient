import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AdsCompany from './../components/dashboard/AdsCompany'
import Screen from '../components/Screen'
import SummaryBoxes from '../components/dashboard/SummaryBoxes'
import OptionsList from '../components/dashboard/OptionsList'
import Routes from '../Routes';
import getAdsAPI from '../api/getAds';
import useAuth from "../auth/useAuth";
import ActivityIndecator from '../components/ActivtyIndectors/ActivityIndecatorAds';
import loadings from '../config/loadings';

const Dashboard = () => {

    const [adsText, setText] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const navigator = useNavigation();

    let { user } = useAuth();

    const adsView = async () => {
        setIsLoading(true);
        const results = (await getAdsAPI.get(user.token));
        setText(results.data.config);
        setIsLoading(false);
    };
    useEffect(() => {
        adsView();
    }, []);

    return (

        <Screen>
            <ScrollView>
                {!adsText.c_ad1 ? <ActivityIndecator visable={isLoading} type={loadings.adsTab} /> :
                    adsText.c_ad1 && <AdsCompany title={adsText.c_ad1} />}
                <SummaryBoxes />
                <OptionsList />
            </ScrollView>
        </Screen>
    )
}
export default Dashboard;
const styles = StyleSheet.create({
})
