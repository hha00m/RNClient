import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { Vibration } from "react-native";

import SearchResults from "./../navigations/SearchNavigator";
import NotificationsNavigator from "./NotificationsNavigator";
import DashboardNavigator from "./DashboardNavigator";
import expoPushTokenApi from "../api/expoPushTokens";
import ChatNavigator from "./ChatNavigator";
import Profile from "./../screens/Profile";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import Routes from "../Routes";

const Tab = createBottomTabNavigator();
const AppNavigator = (ref) => {
  const { user } = useAuth();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    regesterForPushNotificaition();
    Notifications.addNotificationReceivedListener((notificationListener) => {
      if (notificationListener.remote) {
        Vibration.vibrate();
        Notifications.presentNotificationAsync({
          title: "تحديث حالة",
          body: "تاكد من تحديث الحالة",
          ios: { _displayInForeground: true },
        });
      }
      //  navitation.navigate(Routes.NOTIFICATION);
      // console.log(notificationListener.request.content.data.id);
    });
  }, []);

  const regesterForPushNotificaition = async () => {
    try {
      let experienceId = undefined;
      if (!Constants.manifest) {
        // Absence of the manifest means we're in bare workflow
        experienceId = "@username/clientExpo";
      }
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );

      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync({
        experienceId,
      });
      console.log(token, experienceId);
      expoPushTokenApi.register(user.token, JSON.stringify(token.data));
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync(
          `alnahr_user_id_${user.data.id}`,
          {
            name: `alnahr_user_id_${user.data.id}`,
            sound: true,
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          }
        );
      }
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
  return (
    <Tab.Navigator
      activeColor={colors.vueColorButtom}
      style={{ backgroundColor: colors.vueColorButtom, fontFamily: "Tjw_blod" }}
      initialRouteName={Routes.DASHBOARD}
    >
      <Tab.Screen
        name={Routes.SEARCH_RESULTS}
        component={SearchResults}
        options={{
          // tabBarLabel: "بحث",
          tabBarLabel: () => null,

          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.NOTIFICATION}
        component={NotificationsNavigator}
        options={{
          // tabBarLabel: "اشعاراتي",
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Feather name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.DASHBOARD}
        component={DashboardNavigator}
        options={({ navigation }) => ({
          tabBarLabel: () => null,
          // tabBarLabel: "لوحة التحكم",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          // tabBarButton: () => (
          //   <DashboardButton
          //     onPress={() => navigation.navigate(Routes.DASHBOARD)}
          //   />
          // ),
        })}
      />

      <Tab.Screen
        name={Routes.CHAT}
        component={ChatNavigator}
        options={{
          tabBarLabel: () => null,
          //tabBarLabel: "محادثتي",
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.PROFILE}
        component={Profile}
        options={{
          tabBarLabel: () => null,
          // tabBarLabel: "حسابي",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default AppNavigator;
