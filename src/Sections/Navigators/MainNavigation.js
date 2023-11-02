import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import NetInfo from "@react-native-community/netinfo";
import ConfigContext from "../../utils/context/ConfigContext";
export default function MainNavigation() {
  const { dispatch } = React.useContext(ConfigContext);
  React.useEffect(() => {
    NetInfo.fetch().then((state) => {
      console.log(state.isConnected);
      dispatch({ type: "SET_APP_READY", payload: state.isConnected });
    });
  }, []);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
