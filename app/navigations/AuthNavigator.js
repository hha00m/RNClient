import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "../screens/WelcomScreen";
import LoginScreen from "../screens/LoginPage";
import Dashboard from "../screens/Dashboard";
import Routes from "../Routes";

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.WELCOME}>
      <Stack.Screen
        name={Routes.WELCOME}
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.LOGIN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={Routes.DASHBOARD} component={Dashboard} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
