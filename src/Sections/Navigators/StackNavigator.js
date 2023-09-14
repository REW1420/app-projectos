import React from "react";
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
const ProjectNetworking = new ProjectController();
const Stack = createStackNavigator();
export default function StackNavigator() {
  const { misionData, projectTitle } = React.useContext(AppContext);
  const { FABvisibility, setFABvisibility } = React.useContext(AppContext);
  const { isOwner } = React.useContext(AppContext);
  const data = {
    projectName: projectTitle,

    team: [{ id: "user2" }, { id: "user3" }],
    projectOwner: "user2",
    ...misionData,
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
          headerRight: () =>
            isOwner ? (
              FABvisibility === false ? (
                <Icon
                  style={{ marginRight: 20 }}
                  name="build-outline"
                  size={25}
                  onPress={() => setFABvisibility(true)}
                />
              ) : (
                <Icon
                  style={{ marginRight: 20 }}
                  name="stop-circle-outline"
                  size={25}
                  onPress={() => setFABvisibility(false)}
                />
              )
            ) : null,
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
            <Icon
              onPress={() => {
                try {
                  ProjectNetworking.createProject(data);
                } catch (error) {
                  console.log(error);
                }
              }}
              name="save-outline"
              size={30}
              color={"black"}
              style={{
                marginRight: "15%",
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
