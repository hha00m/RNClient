import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";

import Dashboard from "./../screens/Dashboard";
import Profile from "./../screens/Profile";
import SearchResults from "./../navigations/SearchNavigator";
import Notification from "./../screens/Notificaitons";
import DashboardButton from "./../components/DashboardButton";
import Chat from "./../screens/Chat";
import colors from "../config/colors";
import Routes from "../Routes";
import UserNavigator from "./UserNavigation";
import DashboardNavigator from "./DashboardNavigator";
import NotificationsNavigator from "./NotificationsNavigator";
const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator
      activeColor="#e91e63"
      style={{ backgroundColor: colors.primery }}
      initialRouteName={Routes.DASHBOARD}
      // screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name={Routes.DASHBOARD}
        component={DashboardNavigator}
        options={({ navigation }) => ({
          tabBarLabel: "محادثتي",
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
        name={Routes.CHAT}
        component={Chat}
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
