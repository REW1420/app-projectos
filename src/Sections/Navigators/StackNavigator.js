import React from "react";
import { Text, Pressable, Button } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/Login";
import BottomTabNavigator from "./BottomTabNavigator";
import Mision from "../Screens/Mision";
import ProfileSetting from "../Screens/ProfileSetting";
import News from "../Screens/News";
import SearchProject from "../Screens/SearchProject";
import Icon from "react-native-vector-icons/Ionicons";
import AddProject from "../Screens/AddProject";
import AppContext from "../../utils/context/AppContext";
import ProjectController from "../../utils/Networking/ProjectController";
import EditProject from "../Screens/EditProject";
const ProjectNetworking = new ProjectController();
const Stack = createStackNavigator();
export default function StackNavigator() {
  const { state, dispatch } = React.useContext(AppContext);
  const data = {
    projectName: state.projectTitle,
    team: [{ id: "user2" }, { id: "user3" }],
    projectOwner: "user2",
    ...state.misionData,
  };
  const newData = {
    projectName: state.newProjectTitle,
    team: [{ id: "user2" }, { id: "user3" }],
    projectOwner: "user2",
    ...state.newMisionData,
  };
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabNav"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Mision"
        component={Mision}
        options={{
          headerTitle: "",
          headerRight: () => {
            if (state.isOwner === true) {
              return state.FABvisibility === false ? (
                <Icon
                  style={{ marginRight: 20 }}
                  name="build-outline"
                  size={25}
                  onPress={() =>
                    dispatch({ type: "SET_FAB_VISIBILITY", payload: true })
                  }
                />
              ) : (
                <Icon
                  style={{ marginRight: 20 }}
                  name="stop-circle-outline"
                  size={25}
                  onPress={() =>
                    dispatch({ type: "SET_FAB_VISIBILITY", payload: false })
                  }
                />
              );
            } else {
              return state.isInTeam === false ? (
                <Pressable
                  onPress={() => {
                    ProjectNetworking.updateJoinTeam(state.projectID, "user1");
                  }}
                  style={{ marginRight: 15 }}
                >
                  <Text
                    style={{
                      color: "#2B5664",
                      fontSize: 15,
                      fontWeight: "400",
                    }}
                  >
                    Unirme
                  </Text>
                </Pressable>
              ) : null;
            }
          },
        }}
      />
      <Stack.Screen
        name="News"
        component={News}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
      <Stack.Screen name="SearchProject" component={SearchProject} />
      <Stack.Screen
        name="AddProject"
        component={AddProject}
        options={{
          headerTitle: "Agregar nuevo projecto",
          headerRight: () => (
            <Pressable
              onPress={() => {
                ProjectNetworking.createProject(data);
              }}
              style={{ marginRight: 15 }}
            >
              <Text
                style={{ color: "#2B5664", fontSize: 15, fontWeight: "400" }}
              >
                Guardar
              </Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="editProject"
        component={EditProject}
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => {
                ProjectNetworking.updateProject(state.projectID, newData);
              }}
              style={{ marginRight: 15 }}
            >
              <Text
                style={{ color: "#2B5664", fontSize: 15, fontWeight: "400" }}
              >
                Actualizar
              </Text>
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
