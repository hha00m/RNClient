import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UnderReceive from "../screens/UnderReceive";
import UnderProcess from "../screens/UnderProcess";
import Delayed from "../screens/DelayedOrders";
import InWarehouseOrders from "../screens/InWarehouseOrders";
import CompleteOrders from "../screens/CompleteOrders";
import StatisticsPage from "../screens/StatisticsPage";
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
        name={Routes.UNDER_RECEIVER_ORDERS}
        component={UnderReceive}
        options={{ title: "قيد التسليم" }}
      />
      <Stack.Screen
        name={Routes.UNDER_PROCESS_ORDERS}
        component={UnderProcess}
        options={{ title: "قيد المعالجة" }}
      />
      <Stack.Screen
        name={Routes.DELAYED_ORDERS}
        component={Delayed}
        options={{ title: "المؤجلات" }}
      />
      <Stack.Screen
        name={Routes.IN_WEARHOUSE_ORDERS}
        component={InWarehouseOrders}
        options={{ title: "في المخزن " }}
      />
      <Stack.Screen
        name={Routes.COMPLETE_ORDERS}
        component={CompleteOrders}
        options={{ title: "طلبيات الواصلة" }}
      />
      <Stack.Screen
        name={Routes.STATISTICS_PAGE}
        component={StatisticsPage}
        options={{ title: "الاحصائيات" }}
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
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
