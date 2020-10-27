import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Toast from '@rimiti/react-native-toastify';
import { View, FlatList } from 'react-native';

import ActivityIndecatorLoadingList from "./../components/ActivtyIndectors/ActivityIndecatorLoadingList";
import { OrderCard, ListItemSeparator, ListOrderCopyAction } from "../components/lists";
import AppPickerCity from './../components/AppPickerCites';
import AppFormField from '../components/AppTextInput';
import Button from './../components/AppButton';
import { handleCopy } from '../utility/helper';
import getOrders from '../api/categoryOrders';
import getCities from '../api/getCities';
import getStores from '../api/getStores';
import useAuth from "../auth/useAuth";
import colors from '../config/colors';
import Routes from '../Routes';



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
    const [noOrders, setNoOrders] = useState("0");
    const [page, setPage] = useState("1");

    const prefix = "UnderReceive";

    //================================================
    const loadOrders = async (nextPage) => {
        const results = (await getOrders.get(user.token, "onway", city ? city.id : null, store ? store.id : null, search ? search : null, nextPage));
        if (!results.ok || results.data.success === "0") {
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
    //================================================
    const loadCities = async () => {
        const results = await getCities.getCities(user.token);
        const array = [{
            name: "الكل",
            id: ""
        }];
        setCities([...array, ...results.data.data]);
    };
    //================================================
    const loadStores = async () => {
        const results = await getStores.getStores(user.token);
        const array = [{
            name: "الكل",
            id: ""
        }];
        setStores([...array, ...results.data.data]);
    };
    //================================================
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
        setIsLoading(true);
        loadOrders(page);
    }
    //================================================
    const refreshingMethod = () => {
        setRefreshing(true);
        loadOrders("1");
        setRefreshing(false);
    }
    //================================================
    const footer = () => {
        return (
            <View style={{
                flex: 1,
                height: 300,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {isLoading && <ActivityIndecatorLoadingList visable={isLoading} />}
            </View>);
    }
    //================================================
    return (
        <View style={{ flex: 1 }}>
            <Toast ref={(c) => this.toastify = c} />
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
                borderBottomColor: colors.dark,
                borderBottomWidth: 2,
                marginBottom: 5,
                backgroundColor: colors.white
            }}>
                <Button color="basic" onPress={() => loadOrders("1")} title={`أبحث في (${noOrders}) طلبية`} />
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
                refreshing={refreshing}
                onRefresh={() => refreshingMethod()}
                renderItem={({ item }) => (
                    <OrderCard
                        item={item}
                        renderRightActions={() =>


                            <ListOrderCopyAction icon="content-copy"
                                onPress={() => handleCopy(item)}
                            />

                        }
                    />
                )}
                ListFooterComponent={footer}

            />

        </View>
    );
}
export default Dashboard;