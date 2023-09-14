import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FishishedProjects from "../Screens/FishishedProjects";
import PendingProjects from "../Screens/PendingProjects";
const Tab = createMaterialTopTabNavigator();
export default function TopTapNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 10,
          backgroundColor: "#1DA1F2",
        },
      }}
    >
      <Tab.Screen name="Pendiente" component={PendingProjects} />
      <Tab.Screen name="Completado" component={FishishedProjects} />
    </Tab.Navigator>
  );
}
