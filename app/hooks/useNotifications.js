import { useEffect } from "react";
import expoPushTokenApi from "../api/expoPushTokens";
import useAuth from "../auth/useAuth";
import navitation from "../navigations/rootNavigation";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Platform } from "react-native";
import Routes from "../Routes";

export default useNotifications = () => {
  const { user } = useAuth();
  useEffect(() => {
    regesterForPushNotificaition();
    Notifications.addNotificationReceivedListener(
      (notificationListener) =>
        navitation.navigate(Routes.ORDER_DETAILS, { id: "233469" })
      //console.log(notificationListener)
    );
  }, []);
  const regesterForPushNotificaition = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return null;
      const token = await Notifications.getExpoPushTokenAsync();
      expoPushTokenApi.register(user.token, token);
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync(
          "haydermohamedaliweaakalialiweaakalihellosafarticabogauallylayer",
          {
            name:
              "haydermohamedaliweaakalialiweaakalihellosafarticabogauallylayer",
            sound: true,
          }
        );
      }
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
};
