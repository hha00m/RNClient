import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import ChangePassword from "../screens/ChangePassword";
import Routes from "../Routes";

const Stack = createStackNavigator();
const UserNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.Profile}>
      <Stack.Screen
        name={Routes.Profile}
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.EDIT_PROFILE}
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.CHANGE_PASSWORD}
        component={ChangePassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;
