import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';

import AdsCompany from './../components/dashboard/AdsCompany'
import Screen from '../components/Screen'
import SummaryBoxes from '../components/dashboard/SummaryBoxes'
import OptionsList from '../components/dashboard/OptionsList'
import Routes from '../Routes';
import getAdsAPI from '../api/getAds';
import useAuth from "../auth/useAuth";
import { useNavigation } from '@react-navigation/native';
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
                <AdsCompany title={adsText.c_ad1} />
                <SummaryBoxes />
                <OptionsList />
            </ScrollView>
        </Screen>
    )
}
export default Dashboard;
const styles = StyleSheet.create({
})
