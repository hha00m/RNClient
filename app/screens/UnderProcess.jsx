import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { OrderCard, ListItemSeparator } from "../components/lists";
import AppFormField from '../components/AppTextInput'
import Screen from './../components/Screen'
import AppPickerCity from './../components/AppPickerCites'
import Button from './../components/AppButton'
import useAuth from "../auth/useAuth";
import Routes from '../Routes';
import getCities from '../api/getCities'
import getStores from '../api/getStores'
import getOrders from '../api/categoryOrders'
import colors from '../config/colors';
import ActivityIndecatorLoadingList from "./../components/ActivtyIndectors/ActivityIndecatorLoadingList";



function Dashboard() {
    const navigator = useNavigation();
    let { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState(null);
    const [stores, setStores] = useState([]);
    const [store, setStore] = useState(null);
    const [search, setSearch] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    const [noOrders, setNoOrders] = useState("0");
    const [page, setPage] = useState("1");

    const prefix = "UnderProcess";

    const loadOrders = async (nextPage) => {
        const results = (await getOrders.get(user.token, "returned", city ? city.id : null, store ? store.id : null, search ? search : null, nextPage));
        if (!results.ok) {

            return setIsLoading(false);
        }
        setPage(results.data.nextPage);

        if (nextPage === "1") {
            setNoOrders(results.data.orders);
            setOrders(results.data.data);
            return setIsLoading(false);
        }
        setOrders([...orders, ...results.data.data]);
        setIsLoading(false);
    }

    const loadCities = async () => {
        const results = await getCities.getCities(user.token);
        const array = [{
            name: "الكل",
            id: ""
        }];
        setCities([...array, ...results.data.data]);
    };
    const loadStores = async () => {
        const results = await getStores.getStores(user.token);
        const array = [{
            name: "الكل",
            id: ""
        }];
        setStores([...array, ...results.data.data]);
    };

    useEffect(() => {
        setIsLoading(true);
        loadOrders("1");
    }, [city, store]);

    useEffect(() => {
        setIsLoading(true);
        loadCities();
        loadStores();
    }, []);
    //================================================
    const onEndReachedMohamed = () => {
        loadOrders(page);
    }
    const refreshingMethod = () => {
        setRefreshing(true);
        loadOrders("1");
        setRefreshing(false);
    }
    return (
        <Screen>
            <AppFormField
                rightIcon='table-search'
                autoCapitalize="none"
                autoCorrect={true}
                onChangeText={x => setSearch(x)}
                placeholder='بحث رقم الوصل او رقم الهاتف...' />
            <View
                style={{ flexDirection: "row-reverse", width: "100%", justifyContent: "space-around", backgroundColor: colors.white, paddingHorizontal: 5 }}>
                <View style={{ width: "45%", marginHorizontal: 2 }}>
                    <AppPickerCity items={cities} placeholder={city ? city : "المحافظة"} name="city"
                        onSelectItem={item => setCity(item)}
                        selectedItem={city}
                        icon="city"
                        backgroundColor={colors.white}
                        color={colors.white} />
                </View>
                <View style={{ width: "45%", marginHorizontal: 2 }}>
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
                marginBottom: 5,
                backgroundColor: colors.white
            }}>
                <Button onPress={() => loadOrders("1")} title={`أبحث في (${noOrders}) طلبية`} color="returned" />
            </View>
            <FlatList
                style={{ flex: 1, width: "100%", }}
                data={orders}
                keyExtractor={(item) => (`${item.id}-${prefix}`).toString()}
                renderItem={({ item }) => (
                    <OrderCard
                        item={item}
                        onPress={() => navigator.navigate(Routes.ORDER_DETAILS, { id: item.id })} />
                )}
                ItemSeparatorComponent={ListItemSeparator}
                onEndReachedThreshold={0.25}
                onEndReached={() => onEndReachedMohamed()}
            // refreshing={refreshing}
            // onRefresh={() => refreshingMethod()}
            />
            {isLoading && <ActivityIndecatorLoadingList visable={isLoading} />}

        </Screen>
    );
}
export default Dashboard;