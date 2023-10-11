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
import AlertModal from "../../components/elements/Modals/AlertModal";
import EditProject from "../Screens/EditProject";
import SingIn from "../Screens/SingIn";
const ProjectNetworking = new ProjectController();
const Stack = createStackNavigator();
export default function StackNavigator() {
  const { state, dispatch } = React.useContext(AppContext);
  const data = {
    projectName: state.projectTitle,
    team: { id: state.userID },
    projectOwner: state.userID,
    ...state.misionData,
  };
  const newData = {
    projectName: state.newProjectTitle,
    team: { id: state.userID },
    projectOwner: state.userID,
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
            } else if (state.isOwner === false) {
              return state.isInTeam ? (
                <Pressable
                  onPress={() => {
                    /**   ProjectNetworking.updateJoinTeam(
                      state.projectID,
                      state.userID
                    ); */
                    dispatch({
                      type: "SET_ALERTMODAL_VISIBILITY",
                      payload: true,
                    });
                  }}
                  style={{ marginRight: 15 }}
                >
                  <Text
                    style={{
                      color: "red",
                      fontSize: 15,
                      fontWeight: "400",
                    }}
                  >
                    Abandonar
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    /**   ProjectNetworking.updateJoinTeam(
                      state.projectID,
                      state.userID
                    ); */
                    console.log(state.isInTeam);
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
              );
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
      <Stack.Screen
        name="SearchProject"
        component={SearchProject}
        options={{ title: "Proyectos disponibles" }}
      />
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
      <Stack.Screen
        name="singIn"
        component={SingIn}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
