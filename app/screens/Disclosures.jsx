import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ReportCard, ListItemSeparator } from "../components/lists";
import Screen from './../components/Screen'
import AppPickerCity from './../components/AppPickerCites'
import AppPickerTime from './../components/AppPickerTime'
import Button from './../components/AppButton'
import useAuth from "../auth/useAuth";
import getStores from '../api/getStores'
import getStatues from '../api/getStatues'
import getPdfs from '../api/getPdfs'
import colors from '../config/colors';
import Routes from '../Routes';
import ActivityIndicator from '../components/ActivtyIndectors/ActivityIndecatorSimpleLine'
import ActivityIndecator from '../components/ActivtyIndectors/ActivityIndecatorMoneyTotal';



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
    const prefix = "Disclosures";



    const loadPdfs = async () => {
        setIsLoading(true);
        const results = (await getPdfs.getPdfs(user.token, store));
        setPdfs(results.data.data);
        setTotal(results.data.total)
        setIsLoading(false);
    };
    useEffect(() => {
        loadStores();
        loadStatues();
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
    const loadStatues = async () => {
        const results = await getStatues.getStatues(user.token);
        const array = [{
            name: "الكل",
            id: ""
        }];
        setStatues([...array, ...results.data.data]);
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{ flexDirection: "row-reverse", width: "100%", justifyContent: "space-around", backgroundColor: colors.white }}>

                <View style={{ width: "60%", marginHorizontal: 2 }}>
                    <AppPickerTime placeholder="الحالة" name="calendar"
                        items={statues}
                        onSelectItem={item => setStatus(item)}
                        selectedItem={status}
                        backgroundColor={colors.white}
                        icon="calendar" />
                </View>
                <View style={{ width: "30%", marginHorizontal: 2 }}>
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
                                    <Text style={{ paddingHorizontal: 10 }}> {total.income && numberWithCommas(total.income)}</Text>
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
                        onPress={() => navigator.navigate(Routes.PDF_VIEW, { item: item })} />

                )}
                ItemSeparatorComponent={ListItemSeparator}
            />
            {isLoading && <ActivityIndicator animating={isLoading} size="large" hidesWhenStopped={true} />}

        </View>);
}
export default Dashboard;