import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ReportCard, ListItemSeparator } from "../components/lists";
import AppFormField from '../components/AppTextInput'
import Screen from './../components/Screen'
import AppPickerCity from './../components/AppPickerCites'
import Button from './../components/AppButton'
import useAuth from "../auth/useAuth";
import getStores from '../api/getStores'
import getStatues from '../api/getStatues'
import getPdfs from '../api/getPdfs'
import colors from '../config/colors';



function Dashboard() {
    const navigator = useNavigation();
    let { user } = useAuth();
    const [pdfs, setPdfs] = useState(null);
    const [total, setTotal] = useState({});
    const [stores, setStores] = useState([]);
    const [store, setStore] = useState(null);
    const [statues, setStatues] = useState([]);
    const [status, setStatus] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [LoadMore, setLoadMore] = useState("1");

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const loadPdfs = async () => {
        setIsLoading(true);
        const results = (await getPdfs.getPdfs(user.token));
        setPdfs(results.data.data);
        setTotal(results.data.total)
        setIsLoading(false);
    };
    useEffect(() => {
        // setLoadMore("1");
        loadStores();
        loadStatues();
    }, []);
    useEffect(() => {
        // setLoadMore("1");
        // setPdfs([]);
        loadPdfs();
    }, [status, store]);

    const loadStores = async () => {
        const results = await getStores.getStores(user.token);
        const array = [{
            name: "الكل",
            id: ""
        }];
        setStores([...array, ...results.data.data]);
    };
    const loadStatues = async () => {
        const results = await getStatues.getStatues(user.token);
        const array = [{
            name: "الكل",
            id: ""
        }];
        setStatues([...array, ...results.data.data]);
    };
    const onEndReachedMohamed = () => {
        loadPdfs();
    }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    const refreshingMethod = () => {
        setRefreshing(true);

        setLoadMore("1");
        setPdfs([]);
        loadPdfs();
        setRefreshing(false);
    }
    return (
        <Screen>
            <View
                style={{ flexDirection: "row-reverse", width: "100%", justifyContent: "space-around", backgroundColor: colors.white }}>

                <View style={{ width: "27%", marginHorizontal: 2 }}>
                    <AppPickerCity placeholder="الحالة" name="town"
                        items={statues}
                        onSelectItem={item => setStatus(item)}
                        selectedItem={status}
                        backgroundColor={colors.white}
                        icon="crosshairs-gps" />
                </View>
                <View style={{ width: "27%", marginHorizontal: 2 }}>
                    <AppPickerCity placeholder="صفحة" name="page"
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
                    <View style={{ backgroundColor: colors.white, borderColor: "gray", borderWidth: 1, margin: 10, padding: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                            <Text style={{ paddingHorizontal: 10 }}> عدد الطلبيات:</Text>
                            <Text style={{ paddingHorizontal: 10 }}> {(total.orders)}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ paddingHorizontal: 10 }}>صافي الحساب:</Text>
                            <Text style={{ paddingHorizontal: 10 }}> {(total.income)}</Text>
                        </View>
                    </View>
                </View>

            </View>
            <FlatList
                style={{ flex: 1, width: "100%", }}
                data={pdfs}
                keyExtractor={(item) => (`${item.id}-${item.date}`).toString()}
                renderItem={({ item }) => (
                    <ReportCard
                        item={item}
                        onPress={() => console.log("pdf pressed")} />
                )}
                ItemSeparatorComponent={ListItemSeparator}
                onEndReachedThreshold={0.25}
                onEndReached={() => onEndReachedMohamed()}
            // refreshing={refreshing}
            // onRefresh={() => refreshingMethod()}
            />
            {isLoading && <ActivityIndicator animating={isLoading} size="large" hidesWhenStopped={true} />}

        </Screen>
    );
}
export default Dashboard;