import React, { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FloatingAction } from "react-native-floating-action";
import AddButton from "../../components/elements/Buttons/AddButton";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../../utils/COLORS";
import Profile from "../Screens/Profile";
import Dashboard from "../Screens/Dashboard";
import TopTapNavigator from "./TopTapNavigator";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const navigation = useNavigation();
  const [height, setHeight] = useState(Dimensions.get("screen").height);

  useEffect(() => {
    if (Platform.OS === "android") {
      setHeight(Dimensions.get("screen").height - 250);
    } else {
      setHeight(Dimensions.get("screen").height / 10);
    }
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: height / 10,
          alignItems: "center",
          justifyContent: "center",
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,

          backgroundColor: "black",
        },
      })}
    >
      <Tab.Screen
        name="Proyectos"
        component={TopTapNavigator}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon name="home" color={"black"} size={30} />
              </View>
            ) : (
              <Icon name="home" color={"white"} size={30} />
            ),
          headerRight: () => (
            <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
              <AddButton />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  width: 40,
                  height: 40,

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon name="stats-chart" color={"black"} size={30} />
              </View>
            ) : (
              <Icon name="stats-chart" color={"white"} size={30} />
            ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="settings-outline"
                size={25}
                style={{
                  marginRight: 15,
                }}
                onPress={() => {
                  navigation.navigate("ProfileSetting");
                }}
              />
              <Icon
                name="log-out-outline"
                color={"red"}
                size={25}
                style={{
                  marginRight: 15,
                }}
                onPress={() => navigation.navigate("Login")}
              />
            </View>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon name="person" color={"black"} size={30} />
              </View>
            ) : (
              <Icon name="person" color={"white"} size={30} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
