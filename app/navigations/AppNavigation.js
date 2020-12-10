import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Platform } from "react-native";

import SearchResults from "./../navigations/SearchNavigator";
import NotificationsNavigator from "./NotificationsNavigator";
import DashboardNavigator from "./DashboardNavigator";
import navitation from "../navigations/rootNavigation";
import expoPushTokenApi from "../api/expoPushTokens";
import ChatNavigator from "./ChatNavigator";
import Profile from "./../screens/Profile";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import Routes from "../Routes";

const Tab = createBottomTabNavigator();
const AppNavigator = (ref) => {
  const { user } = useAuth();
  useEffect(() => {
    regesterForPushNotificaition();
    Notifications.addNotificationReceivedListener(
      (notificationListener) =>
        navitation.navigate(Routes.ORDER_DETAILS, { id: "233469" })
      // console.log(notificationListener)
    );
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
      // const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      // if (!permission.granted) return null;
      const token = await Notifications.getExpoPushTokenAsync({
        experienceId,
      });
      expoPushTokenApi.register(user.token, JSON.stringify(token.data));
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync(
          `alnahr_user_id_${user.data.id}`,
          {
            name: `alnahr_user_id_${user.data.id}`,
            sound: true,
          }
        );
      }
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
  return (
    <Tab.Navigator
      activeColor={colors.primery}
      style={{ backgroundColor: colors.primery }}
      initialRouteName={Routes.DASHBOARD}
      // screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name={Routes.SEARCH_RESULTS}
        component={SearchResults}
        options={{
          tabBarLabel: "بحث",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.NOTIFICATION}
        component={NotificationsNavigator}
        options={{
          tabBarLabel: "اشعاراتي",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-notifications" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.DASHBOARD}
        component={DashboardNavigator}
        options={({ navigation }) => ({
          tabBarLabel: "لوحة التحكم",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
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
          tabBarLabel: "محادثتي",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-chatbubbles" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.PROFILE}
        component={Profile}
        options={{
          tabBarLabel: "حسابي",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default AppNavigator;
