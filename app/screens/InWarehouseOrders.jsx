import React, { useState, useContext, useEffect } from 'react';
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
import getStatues from '../api/getStatues'
import getOrders from '../api/categoryOrders'
import colors from '../config/colors';



function Dashboard() {
  const navigator = useNavigation();
  let { user } = useAuth();
  const [orders, setOrders] = useState({});
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState(null);
  const [statues, setStatues] = useState([]);
  const [status, setStatus] = useState(null);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [LoadMore, setLoadMore] = useState("1");


  const loadOrders = async () => {
    setIsLoading(true);
    const results = (await getOrders.get(user.token, "instorage", city ? city.id : null, store ? store.id : null, search ? search : null, LoadMore));
    // const array = [...orders, ...results.data]
    // setOrders(array);
    setOrders(results.data);
    setIsLoading(false);
    // setLoadMore(results.nextPage);

  };
  useEffect(() => {
    // setLoadMore("1");
    loadCities();
    loadStores();
  }, []);
  useEffect(() => {
    // setLoadMore("1");
    // setOrders([]);
    loadOrders();
  }, [status, city, store]);
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

  const onEndReachedMohamed = () => {
    loadOrders();
  }
  const refreshingMethod = () => {
    setRefreshing(true);

    setLoadMore("1");
    setOrders([]);
    loadOrders();
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
        backgroundColor: colors.white
      }}>
        <Button onPress={loadOrders} title="أبداء البحث" />
      </View>
      <FlatList
        style={{ flex: 1, width: "100%", }}
        data={orders}
        keyExtractor={(item) => (`${item.id}-${item.date}`).toString()}
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
      {isLoading && <ActivityIndicator animating={isLoading} size="large" hidesWhenStopped={true} />}

    </Screen>
  );
}
export default Dashboard;