import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";

import navigationTheme from "./app/navigations/NavigationTheme";
import AppNavigator from "./app/navigations/AppNavigation";
import AuthNavigator from "./app/navigations/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import OfflineNotice from "./app/components/OfflineNotice";
import { I18nManager } from "react-native";
import { navigationRef } from "./app/navigations/rootNavigation";

export default function App() {
  // Logger.start();
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  I18nManager.forceRTL(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();

    if (user.code != "300") setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    // <TimePickerReport />
    // <AcvityIn visable={true} />
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? (
          user.token ? (
            <AppNavigator />
          ) : (
            <AuthNavigator />
          )
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
