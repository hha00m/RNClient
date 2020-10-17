import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OrderDetails from "../screens/OrderDetails";
import Notificaitons from "../screens/Notificaitons";
import Routes from "../Routes";

const Stack = createStackNavigator();
const DashboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.DASHBOARD}>
      <Stack.Screen
        name={Routes.NOTIFICATION}
        component={Notificaitons}
        options={{ headerShown: false, title: "صفحة الاشعارات" }}
      />

      <Stack.Screen
        name={Routes.ORDER_DETAILS}
        component={OrderDetails}
        options={{ title: "طلبية" }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
