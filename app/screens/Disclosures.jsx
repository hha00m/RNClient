import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ReportCard, ListItemSeparator, ListOrderCopyAction } from "../components/lists";
import AppPickerCity from './../components/AppPickerCites'
// import AppPickerTime from './../components/AppPickerTime'
import Button from './../components/AppButton'
import useAuth from "../auth/useAuth";
import getStores from '../api/getStores'
import getPdfs from '../api/getPdfs'
import colors from '../config/colors';
import Routes from '../Routes';
import ActivityIndicator from '../components/ActivtyIndectors/ActivityIndecatorSimpleLine'
import ActivityIndecator from '../components/ActivtyIndectors/ActivityIndecatorMoneyTotal';
import { onShare } from '../utility/helper'
import { I18nManager } from 'react-native';

function Dashboard() {
    const navigator = useNavigation();
    let { user } = useAuth();
    const [pdfs, setPdfs] = useState(null);
    const [total, setTotal] = useState({});
    const [stores, setStores] = useState([]);
    const [store, setStore] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const prefix = "Disclosures";


    const loadPdfs = async () => {
        setIsLoading(true);
        const results = (await getPdfs.getPdfs(user.token, store, startDate ? startDate : null, endDate ? endDate : null));
        if (results.data.success === "0") {

            return setIsLoading(false);
        }

        setPdfs(results.data.data);

        setTotal(results.data.total)
        setIsLoading(false);
    };
    useEffect(() => {
        loadStores();
    }, []);
    useEffect(() => {

        loadPdfs();
    }, [store]);

    const loadStores = async () => {
        const results = await getStores.getStores(user.token);
        const array = [{
            name: "الكل",
            id: ""
        }];
        setStores([...array, ...results.data.data]);
    };


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    const updateStartTime = (value) => {
        setStartDate(value)
    }
    const updateEndTime = (value) => {
        setEndDate(value)
    }
    const refreshingMethod = () => {
        setRefreshing(true);
        loadPdfs();
        setRefreshing(false);
    }



    return (
        <View style={{ flex: 1 }}>
            <View
                style={{ flexDirection: I18nManager.isRTL ? "row-reverse" : "row-reverse", width: "100%", justifyContent: "space-around", backgroundColor: colors.white }}>
                {/* <View style={{ width: "33%", marginHorizontal: 2 }}>
                    <AppPickerTime placeholder="من تاريخ" name="calendar"
                        updateTime={updateStartTime}
                        selectedTime={startDate}
                        backgroundColor={colors.white}
                        icon="calendar" />
                </View>
                <View style={{ width: "33%", marginHorizontal: 2 }}>
                    <AppPickerTime placeholder="الى تاريخ" name="calendar"
                        updateTime={updateEndTime}
                        selectedTime={endDate}
                        backgroundColor={colors.white}
                        icon="calendar" />
                </View> */}

                <View style={{ width: "25%", marginHorizontal: 2 }}>
                    <AppPickerCity
                        placeholder="صفحة"
                        name="page"
                        onSelectItem={item => setStore(item)}
                        selectedItem={store}
                        items={stores}
                        backgroundColor={colors.white}
                        icon="store" />
                </View>
            </View>
            <View style={{
                alignItems: "center",
                width: "100%",
                borderBottomColor: colors.primery,
                borderBottomWidth: 2,
                backgroundColor: colors.white
            }}>
                <Button onPress={loadPdfs} title="أبداء البحث" />
                <View style={{ width: "100%", alignItems: "center" }}>
                    <Text>مبالغ لم يتم التحاسب عليها بعد</Text>
                    <View style={{ backgroundColor: colors.white, borderColor: "gray", borderWidth: 1, margin: 10, padding: 10, width: "50%" }}>
                        {isLoading ? <ActivityIndecator visable={isLoading} /> :
                            <>
                                <View style={{ flexDirection: "row-reverse", alignItems: "flex-end" }}>
                                    <Text style={{ paddingHorizontal: 10 }}> عدد الطلبيات:</Text>
                                    <Text style={{ paddingHorizontal: 10 }}> {(total.orders)}</Text>
                                </View>
                                <View style={{ flexDirection: "row-reverse" }}>
                                    <Text style={{ paddingHorizontal: 10 }}>صافي الحساب:</Text>
                                    <Text style={{ paddingHorizontal: 10 }}> {total.client_price && numberWithCommas(total.client_price)}</Text>
                                </View>
                            </>
                        }
                    </View>
                </View>

            </View>
            <FlatList
                style={{ flex: 1, width: "100%", }}
                data={pdfs}
                keyExtractor={(item) => (`${item.id}-${prefix}`).toString()}
                renderItem={({ item }) => (
                    <ReportCard
                        item={item}
                        onPress={() => navigator.navigate(Routes.PDF_VIEW, { item: item })}
                        renderRightActions={() =>
                            <ListOrderCopyAction icon="share-variant"
                                onPress={() => onShare(item)}
                            />
                        }
                    />
                )}
                ItemSeparatorComponent={ListItemSeparator}
                refreshing={refreshing}
                onRefresh={() => refreshingMethod()} />
            {isLoading && <ActivityIndicator animating={isLoading} size="large" hidesWhenStopped={true} />}

        </View>);
}
export default Dashboard;