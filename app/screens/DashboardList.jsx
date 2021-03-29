import React, { useState, useEffect } from 'react';
import {
    View, FlatList, StyleSheet, Linking, Animated, TouchableOpacity,
    Dimensions
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Select, SelectItem, Modal, Card, Text, Spinner, Button } from '@ui-kitten/components';
import { default as UUID } from "uuid";
import cache from "../utility/cache";

import ActivityIndecatorLoadingList from "../components/ActivtyIndectors/ActivityIndecatorLoadingList";
import { OrderCard, ListItemSeparator, QuckViewDetails, QuckViewDetails2, OrderSheet } from "../components/lists";
import { handleCopy } from '../utility/helper'
import getOrders from '../api/categoryOrders'
import useAuth from "../auth/useAuth";
import getCities from '../api/getCities'
import getStores from '../api/getStores'
import colors from '../config/colors';
import { useRoute } from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet';
import Routes from '../Routes';
import { I18nManager } from 'react-native';
//================================================

function Dashboard() {
    let { user } = useAuth();
    const route = useRoute();
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
    const [order, setOrder] = useState(null);

    //================================================
    const window = Dimensions.get('window');
    const [visible, setVisible] = React.useState(false);

    const bs = React.createRef(null);
    const [state, setState] = useState({
        opacity: new Animated.Value(0),
        isOpen: false,
    });
    const onClose = () => {
        Animated.timing(state.opacity, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
        }).start();
        bs.current.snapTo(0);
        setTimeout(() => {
            setState({ ...state, isOpen: false });
        }, 50);
    };

    const onOpen = () => {
        setState({ ...state, isOpen: true });
        bs.current.snapTo(2);
        Animated.timing(state.opacity, {
            toValue: 0.7,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const renderBackDrop = () => (
        <Animated.View
            style={{
                opacity: state.opacity,
                backgroundColor: '#000',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}>
            <TouchableOpacity
                style={{
                    width: window.width,
                    height: window.height,
                    backgroundColor: 'transparent',
                }}
                activeOpacity={1}
                onPress={onClose}
            />
        </Animated.View>
    );
    //---------------
    const openWindowFast = (order) => {
        setOrder(order);
        onOpen();
    }

    //---------------

    const renderInner = () => (
        <OrderSheet order={order} />
    );
    const renderHeader = () => (
        <View
            style={{
                width: '100%',
                backgroundColor: colors.light4,
                height: 50,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                marginLeft: 20,
                marginRight: 20,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: I18nManager.isRTL ? "row-reverse" : "row-reverse",
            }}>
            {/* <QuckViewDetails2 icon="information"
                onPress={() =>
                    navigator.navigate(Routes.ORDER_DETAILS, {
                        id: order.id,
                    })
                }
            /> */}
            <QuckViewDetails2 icon="content-copy"
                onPress={() => {
                    handleCopy(order)
                    setVisible(true)
                }}
            />
            {/* <QuckViewDetails2 icon="chat"
                onPress={() => {
                    navigator.navigate(Routes.CHAT_MODEL, { id: order.id })

                }}
            /> */}

            <QuckViewDetails2 icon="phone"
                onPress={() => {
                    Linking.openURL(`tel:${order.driver_phone}`)

                }}
            />
        </View>
    );
    //=================token, status, city, store, search, page = 1, limit = 10===========
    const loadOrders_local = async (nextPage) => {
        const results = await cache.get("/getOrders.php?token=" + user.token + "&status=" + route.params.action + "&limit=10&page=" + nextPage);
        if (results.data.length < 1) {

            return setIsLoading(false);
        }
        setOrders(results.data);
        setIsLoading(false);
    }
    //   ================================  
    const loadOrders = async (nextPage) => {
        const results = (await getOrders.get(user.token, route.params.action,
            city ? city.row : null, store ? store.row.id : null,
            search ? search : null, nextPage));
        if (results.data.success === "0") {

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
    const LoadingIndicator = (props) => (
        <View style={[props.style]}>
            <Spinner size='small' />
        </View>
    );
    //================================================

    const loadCities = async () => {
        const results = await getCities.getCities(user.token);
        const array = [{
            name: "المحافظات",
            id: ""
        }];
        setCities([...array, ...results.data.data]);
    };
    //================================================

    const loadStores = async () => {
        const results = await getStores.getStores(user.token);
        const array = [{
            name: "الصفحات",
            id: ""
        }];
        setStores([...array, ...results.data.data]);
    };
    //================================================

    useEffect(() => {
        setIsLoading(true);
        loadOrders("1");
        loadOrders_local("1");
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
            <Searchbar
                placeholder='بحث رقم الوصل او رقم الهاتف...'
                onChangeText={x => setSearch(x)}
                value={search}
                onChange={x => setSearch(x)}
                style={{
                    backgroundColor: colors.light3,
                    margin: 10,
                    direction: "rtl",
                    fontFamily: "Tjw_blod",
                    fontSize: 11
                }}

            />
            <View
                style={{ flexDirection: I18nManager.isRTL ? "row-reverse" : "row-reverse", width: "100%", justifyContent: "space-around", backgroundColor: colors.light, paddingHorizontal: 5 }}>
                <View style={{ width: "45%", marginHorizontal: 2 }}>

                    <Select
                        selectedIndex={city}
                        value={city ? cities[city.row].name : "المحافظة"}
                        size='small'
                        onSelect={index => setCity(index)}
                        style={{ direction: "rtl", textAlign: "right" }}
                    >
                        {
                            cities.map((item) => <SelectItem key={UUID.v4()} title={item.name}
                                style={{
                                    direction: "rtl",
                                }} />)
                        }
                    </Select>
                </View>
                <View style={{ width: "45%", marginHorizontal: 2 }}>
                    <Select
                        selectedIndex={store}
                        value={store ? stores[store.row].name : "الصفحة"}
                        size='small'
                        onSelect={index => setStore(index)}
                        style={{ direction: "rtl" }}>
                        {
                            stores.map((item) => <SelectItem title={item.name} key={UUID.v4()} style={{ direction: "rtl" }} />)
                        }
                    </Select>
                </View>
            </View>
            <View style={{
                alignItems: "center",
                width: "100%",
                backgroundColor: colors.light
            }}>
                <Button
                    appearance='outline'
                    size='small'
                    style={{ width: "93%", alignSelf: "center", margin: 5 }}
                    accessoryRight={isLoading ? LoadingIndicator : ""}
                    color="black"
                    onPress={() => {
                        setIsLoading(true);
                        loadOrders("1");
                    }}
                >
                    {evaProps => <Text {...evaProps}> أبحث في ({noOrders}) طلبية </Text>}
                </Button>
            </View>
            <FlatList
                style={{ flex: 1, width: "100%", }}
                data={orders}
                keyExtractor={(item) => (`${item.id}${UUID.v4()}`).toString()}
                renderItem={({ item }) => (
                    <OrderCard
                        openWindowFast={openWindowFast}
                        item={item}
                        renderRightActions={() =>
                            <QuckViewDetails icon="content-copy"
                                onPress={() => handleCopy(item)}
                            />
                        }
                    />)}
                ItemSeparatorComponent={ListItemSeparator}
                onEndReachedThreshold={0.25}
                onEndReached={() => onEndReachedMohamed()}
                refreshing={refreshing}
                onRefresh={() => refreshingMethod()}
                ListFooterComponent={footer}
            />
            <Modal
                onBackdropPress={() => setVisible(false)}
                backdropStyle={styles.backdrop}
                visible={visible}>
                <Card disabled={true}>
                    <Text> 😻 تم نسخ المعلومات</Text>
                </Card>
            </Modal>
            {state.isOpen && renderBackDrop()}

            <BottomSheet
                ref={bs}
                snapPoints={[
                    '-10%',
                    window.height * 0.4,
                    window.height * 0.6,
                    window.height * 0.8,
                ]}
                initialSnap={0}
                renderContent={renderInner}
                renderHeader={renderHeader}
                onCloseEnd={onClose}
            />
        </View>
    );
}
const styles = StyleSheet.create({

    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
});
export default Dashboard;