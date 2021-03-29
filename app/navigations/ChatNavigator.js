import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

import Routes from "../Routes";
import ChatModel from "../screens/ChatModel";
import Chat from "../screens/Chat";

const Stack = createStackNavigator();
const DashboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.CHAT}>
      <Stack.Screen
        name={Routes.CHAT}
        component={Chat}
        options={{
          headerShown: false,
          title: () => null,
          // title: <Text style={{ fontFamily: "Tjw_reg" }}>صفحة المحادثات</Text>,
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
