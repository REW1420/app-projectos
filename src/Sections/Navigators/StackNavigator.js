import React from "react";
import { Text, Pressable, Platform } from "react-native";
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
import ToastService from "../../components/elements/Toast/ToastService";
import { useToast } from "react-native-toast-notifications";
import EditProject from "../Screens/EditProject";
import SingIn from "../Screens/SingIn";
import Validation from "../../utils/Validations/Validation";

const Stack = createStackNavigator();
export default function StackNavigator() {
  const toast = useToast();
  const ProjectNetworking = new ProjectController(toast);
  const toastService = new ToastService(toast);
  const validation = new Validation();
  const { state, dispatch } = React.useContext(AppContext);
  const data = {
    projectName: state.projectTitle,
    deadLine: state.deadLine,
    team: { id: state.userID },
    projectOwner: state.userID,
    deadLine: state.deadLine,
    ...state.misionData,
  };
  const newData = {
    projectName: state.newProjectTitle,
    team: { id: state.userID },
    projectOwner: state.userID,
    deadLine: state.deadLine,
    ...state.newMisionData,
  };

  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerTitle: Platform.OS === "ios" ? "Atras" : null,
      }}
    >
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
          headerTitle: "Proyecto",
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
                    try {
                      ProjectNetworking.updateJoinTeam(
                        state.projectID,
                        state.userID,
                        toast
                      );
                    } catch (error) {}
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
      <Stack.Screen
        name="ProfileSetting"
        component={ProfileSetting}
        options={{
          headerTitle: "Editar perfil",
        }}
      />
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
                if (
                  validation.validateNotNullData(data) &&
                  validation.validateNotNullMisionData(state.misionData)
                ) {
                  ProjectNetworking.createProject(data);
                } else {
                  toastService.CustomToast(
                    "Los campos no pueden estar vacios",
                    "warning"
                  );
                }
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
                const projectNameNotEmpty = validation.validateNotNullArray([
                  newData.projectName,
                ]);
                const misionDataValid = validation.validateEditMisionData(
                  state.newMisionData.mision
                );

                if (!projectNameNotEmpty || !misionDataValid) {
                  toastService.CustomToast(
                    "Los datos no pueden quedar vacíos",
                    "warning"
                  );
                } else {
                  ProjectNetworking.updateProject(state.projectID, newData);
                }
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
          headerTitle: "Editar Proyecto",
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
