import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../utils/COLORS";
import CustomTextInput from "../../components/elements/Inputs/CustomTextInput";
import CustomButton from "../../components/elements/Buttons/CustomButton";
import AppContext from "../../utils/context/AppContext";
import CustomPasswordInput from "../../components/elements/Inputs/CustomPasswordInput";
import UserController from "../../utils/Networking/UserController";
import DashboardController from "../../utils/Networking/DashboarController";
import { useToast } from "react-native-toast-notifications";
import ConfigContext from "../../utils/context/ConfigContext";
import ToastService from "../../components/elements/Toast/ToastService";
import { Pressable } from "react-native";
import NoInternetConnectionModal from "../../components/elements/Modals/NoInternetConnectionModal";
import ResetPasswordModal from "../../components/elements/Modals/ResetPasswordModal";
export default function Login() {
  const { dispatch } = React.useContext(AppContext);
  const { state } = React.useContext(ConfigContext);
  const configContext = React.useContext(ConfigContext);
  const toast = useToast();
  const userNetworking = new UserController(toast);
  const dashboardNetworking = new DashboardController(toast);
  const toastService = new ToastService(toast);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const navigation = useNavigation();
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  async function handleGetUserInfo() {
    const data = await userNetworking.getUserInfo("6516094b91620132c9e11d81");
    const kpiData = await dashboardNetworking.getDataFromID(
      "6516094b91620132c9e11d81"
    );

    const usefulData = kpiData.kpi.map((item) => ({
      count: item.count,
      date: item.date,
    }));

    if (data !== undefined || data !== null) {
      dispatch({ type: "SET_USER_INFO", payload: data });
      dispatch({ type: "SET_USER_ID", payload: data._id });
      dispatch({ type: "SET_KPI_DATA", payload: usefulData });
      dispatch({ type: "SET_PROJECT_KPI_DATA", payload: kpiData.project });

      navigation.navigate("TabNav");
    }
  }
  const toggleResetPasswordModal = () => {
    setResetPasswordModal(!resetPasswordModal);
  };
  return (
    <ScrollView style={styles.initB}>
      <View style={styles.secondary_backgroud}></View>
      <View style={styles.primary_backgroud}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 16,
            marginRight: 16,
            marginBottom: 16,
            height: 200,
          }}
        ></View>

        <View style={styles.textContainer}>
          <Text style={styles.hint_text}>Bienvenido</Text>
        </View>
        <CustomTextInput
          placeholder={"Correo"}
          secureTextEntry={false}
          onChangeText={(text) => {
            setUser(text);
          }}
        />

        <CustomPasswordInput
          Placeholder="Contraseña"
          _onChangeText={(text) => setPwd(text)}
        />

        <View style={{ display: "flex", marginLeft: "auto", marginRight: 30 }}>
          <TouchableOpacity onPress={toggleResetPasswordModal}>
            <Text style={styles.forgot_button}>¿Olvidó la contraseña?</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: -20 }}>
          <CustomButton
            width={"80%"}
            title={"Iniciar sesion"}
            onPress={async () => {
              await handleGetUserInfo();
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 15,
          }}
        >
          <Text>O inicia sesion con</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 15 }}>Si eres nuevo </Text>
        <Pressable
          onPress={() => {
            navigation.navigate("singIn");
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Crea una cuenta
          </Text>
        </Pressable>
      </View>
      <NoInternetConnectionModal key={0} hasConnection={!state.isAppReady} />
      <ResetPasswordModal
        isVisible={resetPasswordModal}
        toggleModal={toggleResetPasswordModal}
        key={1}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  forgot_button: {
    height: 30,
    marginBottom: 30,
    margin: 10,
  },

  primary_backgroud: {
    backgroundColor: COLORS.primary_backgroud,
    padding: 10 * 2,
    borderRadius: 10 * 3,
    bottom: 10 * 3,
  },
  Logo: {
    width: 205,
    height: 105,
    alignSelf: "center",
    marginBottom: 5,
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    flexDirection: "row",
  },
  hint_text: {
    color: COLORS.tittle_color,
    fontSize: 25,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  initB: {
    backgroundColor: COLORS.primary_backgroud,
  },
  secondary_backgroud: {
    backgroundColor: COLORS.secondary_background,
    width: "100%",
    height: 100,
  },
});
