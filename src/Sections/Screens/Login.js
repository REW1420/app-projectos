import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
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
import ProjectController from "../../utils/Networking/ProjectController";
import PaperTextInput from "../../components/elements/Inputs/PaperTextInput";
import Loader from "../../components/elements/Loaders/Loader";
import Validation from "../../utils/Validations/Validation";

export default function Login() {
  const { dispatch } = React.useContext(AppContext);
  const { state } = React.useContext(ConfigContext);
  const validations = new Validation();
  const toast = useToast();
  const userNetworking = new UserController(toast);
  const dashboardNetworking = new DashboardController(toast);
  const projecNetworking = new ProjectController(toast);

  const toastService = new ToastService(toast);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [isEmailValid, setEmailValid] = useState();
  const [isPasswordValid, setPasswordValid] = useState();

  async function handleGetUserInfo(userID) {
    const data = await userNetworking.getUserInfo(userID);
    const kpiData = await dashboardNetworking.getDataFromID(userID);
    const projectIOwnData = await projecNetworking.GetProjectIOwn(userID);

    dispatch({ type: "SET_PROJECTIOWN_DATA", payload: projectIOwnData });

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

  async function handleValidate() {
    try {
      const [emailIsValid, passwordIsValid] = await Promise.all([
        validations.validateEmail(user),
        validations.validateNotNull(pwd),
      ]);

      setEmailValid(emailIsValid);
      setPasswordValid(passwordIsValid);
    } catch (error) {
      console.error("Error en la validación:", error);
    }

    if (isEmailValid !== undefined && isPasswordValid !== undefined) {
      if (isEmailValid.status && isPasswordValid.status) {
        handleLogin();
      }
    }
  }
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await userNetworking.Login({
        email: user,
        password: pwd,
      });
      if (res !== undefined) {
        console.log(res);
        handleGetUserInfo(res.profile._id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader key={2} visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Iniciar sesion
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Bienvenido!, Ingresa tus credenciales para iniciar sesion
        </Text>
        <View style={{ marginVertical: 20 }}>
          <PaperTextInput
            iconName="mail-outline"
            label="Email"
            placeholder="Ingresa tu correo"
            autoCapitalize={"none"}
            keyboardType={"email-address"}
            error={isEmailValid !== undefined ? isEmailValid.message : null}
            OnChangeText={(text) => setUser(text)}
          />
          <PaperTextInput
            iconName="lock-closed-outline"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            password
            autoCapitalize={"none"}
            error={
              isPasswordValid !== undefined ? isPasswordValid.message : null
            }
            OnChangeText={(text) => setPwd(text)}
          />
          <View style={{ display: "flex", marginLeft: "auto" }}>
            <TouchableOpacity onPress={toggleResetPasswordModal}>
              <Text style={styles.forgot_button}>¿Olvidó la contraseña?</Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            width={"100%"}
            title={"Iniciar sesion"}
            onPress={async () => {
              await handleValidate();
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <Text style={{ fontSize: 15 }}>No tienes cuenta?, </Text>
            <Pressable
              onPress={() => {
                navigation.navigate("singIn");
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Crea una aquí
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <NoInternetConnectionModal key={0} hasConnection={!state.isAppReady} />
      <ResetPasswordModal
        isVisible={resetPasswordModal}
        toggleModal={toggleResetPasswordModal}
        key={1}
      />
    </SafeAreaView>
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
