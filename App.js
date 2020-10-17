import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import NetInfo from "@react-native-community/netinfo";

import navigationTheme from "./app/navigations/NavigationTheme";
import AppNavigator from "./app/navigations/AppNavigation";
import AuthNavigator from "./app/navigations/AuthNavigator";
import DashboardNavigator from "./app/navigations/DashboardNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import OrderDetails from "./app/screens/OrderDetails";
import ChatModel from "./app/screens/ChatModel";
import Disclosure from "./app/screens/Disclosures";
import { I18nManager } from "react-native";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  I18nManager.forceRTL(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    console.log("from app user:", user);

    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    // <Disclosure/>
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {/* <DashboardNavigator /> */}

        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
