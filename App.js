import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

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
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const [loaded] = useFonts({
    Tjw_blod: require("./app/assets/fonts/Cairo-Bold.ttf"),
    Tjw_xblod: require("./app/assets/fonts/Cairo-Black.ttf"),
    Tjw_medum: require("./app/assets/fonts/Cairo-SemiBold.ttf"),
    Tjw_light: require("./app/assets/fonts/Cairo-Light.ttf"),
    Tjw_reg: require("./app/assets/fonts/Cairo-Regular.ttf"),
    Tjw_Ereg: require("./app/assets/fonts/Cairo-ExtraLight.ttf"),
  });
  const restoreUser = async () => {
    const user = await authStorage.getUser();

    if (user.code != "300") setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );
  if (!loaded) {
    return null;
  }
  return (
    // <TimePickerReport />
    // <AcvityIn visable={true} />
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? (
          user.token ? (
            <ApplicationProvider {...eva} theme={eva.light}>
              <AppNavigator />
            </ApplicationProvider>
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
