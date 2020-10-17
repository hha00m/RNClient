import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

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
        options={{ headerShown: false, title: "صفحة المحادثات" }}
      />

      <Stack.Screen
        name={Routes.CHAT_MODEL}
        component={ChatModel}
        options={{ title: "محادثة مع الشركة" }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
