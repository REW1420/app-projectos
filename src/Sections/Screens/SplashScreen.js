import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Validation from "../../utils/Validations/Validation";
import NetInfo from "@react-native-community/netinfo";
import ConfigContext from "../../utils/context/ConfigContext";
import MainNavigation from "../Navigators/MainNavigation";
export default function SplashScreen() {
  const [isServerReady, setIsServerReady] = React.useState(false);
  const [hasIntenerConnection, setHasInternetConnection] =
    React.useState(false);

  const validation = new Validation();
  const validateServerStatus = validation.validateServerStatus();

  useEffect(() => {
    async function prepare() {
      console.log("preparing");
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
        validateInternetConnection();
        console.log(hasIntenerConnection);
        console.log(isServerReady);
      });
    }
    prepare();
  }, []);

  const validateInternetConnection = async () => {
    console.log("entro");
    await NetInfo.fetch().then((res) => {
      setHasInternetConnection(res.isConnected);
    });
  };
  return (
    <React.Fragment>
      <Splash
        key={0}
        hasIntenerConnection={hasIntenerConnection}
        isServerReady={isServerReady}
      />
    </React.Fragment>
  );
}
function Splash({ hasIntenerConnection, isServerReady }) {
  return (
    <SafeAreaView style={{ backgroundColor: "#671517", ...styles.container }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.centeredContent}>
          <Text>SplashScreen</Text>
          {hasIntenerConnection === false ? (
            <Text>No posee conexion a internet</Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
function Nav() {
  return <MainNavigation />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
  },
  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});
