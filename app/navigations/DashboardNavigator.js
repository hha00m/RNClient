import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

import DashboardList from "../screens/DashboardList";
import Disclosures from "../screens/Disclosures";
import OrderDetails from "../screens/OrderDetails";
import Dashboard from "../screens/Dashboard";
import Routes from "../Routes";
import ChatModel from "../screens/ChatModel";
import pdfViewerScreen from "../screens/pdfViewerScreen";
import Statistics from "../screens/Statistics";
import CallCenter from "../screens/CallCenter";

const Stack = createStackNavigator();
const DashboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.DASHBOARD}>
      <Stack.Screen
        name={Routes.DASHBOARD}
        component={Dashboard}
        options={{ headerShown: false, title: () => null }}
      />

      <Stack.Screen
        name={Routes.DISCLOSURES}
        component={Disclosures}
        options={{
          title: <Text style={{ fontFamily: "Tjw_reg" }}>الكشوفات</Text>,
        }}
      />
      <Stack.Screen
        name={Routes.STATISTICS_PAGE2}
        component={Statistics}
        options={{
          title: <Text style={{ fontFamily: "Tjw_reg" }}>حسابات</Text>,
        }}
      />
      <Stack.Screen
        name={Routes.CALLCENTER}
        component={CallCenter}
        options={{
          title: (
            <Text style={{ fontFamily: "Tjw_reg" }}>هواتف خدمة العملاء</Text>
          ),
        }}
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
          title: <Text style={{ fontFamily: "Tjw_reg" }}>محادثة فورية</Text>,
        }}
      />
      <Stack.Screen
        name={Routes.PDF_VIEW}
        component={pdfViewerScreen}
        options={{
          title: <Text style={{ fontFamily: "Tjw_reg" }}>كشف</Text>,
        }}
      />
      <Stack.Screen
        name={Routes.DASHBOARD_LIST}
        component={DashboardList}
        options={({ route }) => ({
          title: (
            <Text style={{ fontFamily: "Tjw_reg" }}>{route.params.name}</Text>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
