import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DashboardList from "../screens/DashboardList";
import Disclosures from "../screens/Disclosures";
import OrderDetails from "../screens/OrderDetails";
import Dashboard from "../screens/Dashboard";
import Routes from "../Routes";
import ChatModel from "../screens/ChatModel";
import pdfViewerScreen from "../screens/pdfViewerScreen";

const Stack = createStackNavigator();
const DashboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.DASHBOARD}>
      <Stack.Screen
        name={Routes.DASHBOARD}
        component={Dashboard}
        options={{ headerShown: false, title: "لوحة التحكم" }}
      />

      <Stack.Screen
        name={Routes.DISCLOSURES}
        component={Disclosures}
        options={{ title: "كشوفات" }}
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
      <Stack.Screen
        name={Routes.PDF_VIEW}
        component={pdfViewerScreen}
        options={{ title: "كشف" }}
      />
      <Stack.Screen
        name={Routes.DASHBOARD_LIST}
        component={DashboardList}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
