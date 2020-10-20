import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Platform } from "react-native";
import Profile from "./../screens/Profile";
import SearchResults from "./../navigations/SearchNavigator";
import colors from "../config/colors";
import Routes from "../Routes";
import UserNavigator from "./UserNavigation";
import DashboardNavigator from "./DashboardNavigator";
import ChatNavigator from "./ChatNavigator";
import NotificationsNavigator from "./NotificationsNavigator";
import expoPushTokenApi from "../api/expoPushTokens";
import Navigation from "./rootNavigation";
import useAuth from "../auth/useAuth";
const Tab = createBottomTabNavigator();
const AppNavigator = (ref) => {
  const { user } = useAuth();
  useEffect(() => {
    regesterForPushNotificaition();
    Notifications.addNotificationReceivedListener(
      Navigation.navigate(Routes.CHAT)
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
