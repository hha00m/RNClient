import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

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
        options={{ headerShown: false, title: "صفحة البحث" }}
      />

      <Stack.Screen
        name={Routes.ORDER_DETAILS}
        component={OrderDetails}
        options={{ title: "طلبية" }}
      />
      <Stack.Screen
        name={Routes.CHAT_MODEL}
        component={ChatModel}
        options={{ title: "محادثة فورية" }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
