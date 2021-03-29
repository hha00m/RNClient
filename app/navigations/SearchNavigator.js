import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

import OrderDetails from "../screens/OrderDetails";
import SearchResults from "../screens/SearchResults";
import ChatModel from "../screens/ChatModel";
import Routes from "../Routes";

const Stack = createStackNavigator();
const DashboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.DASHBOARD}>
      <Stack.Screen
        name={Routes.SEARCH_RESULTS}
        component={SearchResults}
        options={{ headerShown: false, title: () => null }}
      />

      <Stack.Screen
        name={Routes.ORDER_DETAILS}
        component={OrderDetails}
        options={{
          title: <Text style={{ fontFamily: "Tjw_reg" }}>طلبية</Text>,
        }}
      />
      <Stack.Screen
        name={Routes.CHAT_MODEL}
        component={ChatModel}
        options={{
          title: (
            <Text style={{ fontFamily: "Tjw_reg" }}>محادثة مع الشركة</Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
