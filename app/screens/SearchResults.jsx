import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Linking, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { Select, SelectItem, Modal, Card, Button, Text, Spinner } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet';
import { Searchbar } from 'react-native-paper';
import { default as UUID } from "uuid";
import cache from "../utility/cache";

import { OrderCard, ListItemSeparator, QuckViewDetails, QuckViewDetails2, OrderSheet } from "../components/lists";
import ActivityIndecatorLoadingList from "./../components/ActivtyIndectors/ActivityIndecatorLoadingList";
import { handleCopy } from '../utility/helper'
import Screen from './../components/Screen'
import getStatues from '../api/getStatues'
import getCities from '../api/getCities'
import getStores from '../api/getStores'
import getOrders from '../api/getOrders'
import useAuth from "../auth/useAuth";
import colors from '../config/colors';
import Routes from '../Routes';
import { I18nManager } from 'react-native';

//-------------------------------------------------------------------------
function Dashboard() {
    let { user } = useAuth();
    const navigator = useNavigation();
    const [order, setOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState(null);
    const [stores, setStores] = useState([]);
    const [store, setStore] = useState(null);
    const [statues, setStatues] = useState([]);
    const [status, setStatus] = useState(null);
    const [search, setSearch] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [noOrders, setNoOrders] = useState("0");
    const [page, setPage] = useState("1");
    const [visible, setVisible] = React.useState(false);

    const prefix = "SearchResults";
    //==============================(Bottom Sheet)========================================
    const window = Dimensions.get('window');
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
    const openWindowFast = (order) => {
        setOrder(order);
        onOpen();
    }

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
                flexDirection: I18nManager.isRTL ? "row" : "row",
            }}>
            <QuckViewDetails2 icon="information-outline"
                onPress={() =>
                    navigator.navigate(Routes.ORDER_DETAILS, {
                        id: order.id,
                    })
                }
            />
            <QuckViewDetails2 icon="content-copy"
                onPress={() => {
                    handleCopy(order)
                    setVisible(true)
                }}
            />
            <QuckViewDetails2 icon="chat-outline"
                onPress={() => {
                    navigator.navigate(Routes.CHAT_MODEL, { id: order.id })
                }}
            />
            <QuckViewDetails2 icon="phone"
                onPress={() => {
                    Linking.openURL(`tel:${order.driver_phone}`)
                }}
            />
            {true ?
                <QuckViewDetails2 icon="star"//"star-outline"
                    color={colors.pause}
                    onPress={() => {
                        Linking.openURL(`tel:${item.driver_phone}`)
                    }}
                /> : <QuckViewDetails2 icon="star-outline"
                    color={colors.secondery}
                    onPress={() => {
                        Linking.openURL(`tel:${item.driver_phone}`)
                    }}
                />}
        </View>
    );
    const LoadingIndicator = (props) => (
        <View style={[props.style]}>
            <Spinner size='small' />
        </View>
    );
    //=====================LOADING==================================

    const loadOrders = async (nextPage) => {
        const results = (await getOrders.getOrders(user.token, status ? status.row : null, city ? city.row : null, store ? store.row.id : null, search ? search : null, nextPage));
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
    const loadOrders_local = async (nextPage) => {
        const results = await cache.get("http://albarqexpress.com/client/api/search.php?token=" + user.token + "&limit=20&page=" + nextPage);
        if (results.data.success === "0") {

            return null;
        }
        setOrders(results.data);
        setIsLoading(false);
    }
    useEffect(() => {
        setIsLoading(true);
        loadOrders_local("1");
        loadOrders("1");
    }, [status, city, store]);
    useEffect(() => {
        setIsLoading(true);
        loadCities();
        loadStores();
        loadStatues();
    }, []);

    const loadCities = async () => {
        const results = await getCities.getCities(user.token);
        const array = [{
            name: "المحافظات",
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
    const loadStatues = async () => {
        const results = await getStatues.getStatues(user.token);
        const array = [{
            name: "جميع الحالات",
            id: ""
        }];
        setStatues([...array, ...results.data.data]);
    };
    const onEndReachedMohamed = () => {
        setIsLoading(true);
        loadOrders(page);
    }
    const refreshingMethod = () => {
        setRefreshing(true);
        loadOrders("1");
        setRefreshing(false);
    }
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
    //===============================(Main body)=========================================
    return (
        <Screen>

            <Searchbar
                placeholder='بحث رقم الوصل او رقم الهاتف...' onChangeText={x => setSearch(x)}
                value={search}
                onChange={x => setSearch(x)}
                iconColor={colors.secondery}
                onSubmitEditing={true}
                style={{
                    // backgroundColor: colors.light3,
                    margin: 10,
                    direction: "rtl",
                }}

            />
            <View
                style={{
                    flexDirection: I18nManager.isRTL ? "row-reverse" : "row-reverse",
                    width: "100%", justifyContent: "space-around", paddingHorizontal: 2, direction: "rtl"
                }}>
                <View style={{ width: "27%", marginHorizontal: 2 }}>
                    <Select
                        selectedIndex={city}
                        status="primary"
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
                <View style={{ width: "30%", marginHorizontal: 2 }}>
                    <Select
                        selectedIndex={status}
                        status="primary"
                        value={status ? statues[status.row].name : "الحالة"}
                        size='small'
                        onSelect={index => setStatus(index)}
                        style={{ direction: "rtl" }}>
                        {
                            statues.map((item) => <SelectItem key={UUID.v4()} title={item.name} style={{ direction: "rtl" }} />)
                        }
                    </Select>
                </View>
                <View style={{ width: "30%", marginHorizontal: 2 }}>

                    <Select
                        selectedIndex={store}
                        status="primary"
                        value={store ? stores[store.row].name : "الصفحة"}
                        size='small'
                        onSelect={index => setStore(index)}
                        style={{ direction: "rtl" }}>
                        {
                            stores.map((item) => <SelectItem key={UUID.v4()} title={item.name} style={{ direction: "rtl" }} />)
                        }
                    </Select>
                </View>
            </View>
            <Button
                appearance='outline'
                size='small'
                status="primary"
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
            <FlatList
                style={{ flex: 1, width: "100%", }}
                data={orders}
                keyExtractor={(item) => (`${item.id}-${prefix}-${UUID.v4()}`).toString()}
                renderItem={({ item }) => (
                    <OrderCard
                        item={item}
                        openWindowFast={openWindowFast}
                        renderRightActions={() =>

                            <>
                                <QuckViewDetails icon="content-copy"
                                    color={colors.secondery}
                                    onPress={() => {
                                        handleCopy(item)
                                        setVisible(true)
                                    }}
                                />

                                {true ?
                                    <QuckViewDetails icon="star"//"star-outline"
                                        color={colors.pause}
                                        onPress={() => {
                                            Linking.openURL(`tel:${item.driver_phone}`)

                                        }}
                                    /> : <QuckViewDetails icon="star-outline"
                                        color={colors.secondery}
                                        onPress={() => {
                                            Linking.openURL(`tel:${item.driver_phone}`)

                                        }}
                                    />}

                            </>
                        }
                    />
                )}
                ItemSeparatorComponent={ListItemSeparator}
                onEndReachedThreshold={0.5}
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
            {state.isOpen && renderBackDrop()}

        </Screen>
    );
}
const styles = StyleSheet.create({

    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
});
export default Dashboard;