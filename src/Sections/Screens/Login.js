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
import { useToast } from "react-native-toast-notifications";

import ToastService from "../../components/elements/Toast/ToastService";
const userNetworking = new UserController();

export default function Login() {
  const { state, dispatch } = React.useContext(AppContext);
  const toast = useToast();
  const toastService = new ToastService(toast);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const navigation = useNavigation();

  async function handleGetUserInfo() {
    const data = await userNetworking.getUserInfo("6516094b91620132c9e11d81");
    console.log(data);
    try {
      dispatch({ type: "SET_USER_INFO", payload: data });
      dispatch({ type: "SET_USER_ID", payload: data._id });
      toastService.CustomToast(`Bienvenido ${data.name}`, "success");
      navigation.navigate("TabNav");
    } catch (error) {
      toastService.CustomToast(`Ocurrio un error`, "danger");
    }
  }
  const showWelcomeToast = () => {
    //toastService.UpdateToast(true);
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

        <View style={styles.container}>
          <TouchableOpacity>
            <Text style={styles.forgot_button}>¿Olvido la contraseña?</Text>
          </TouchableOpacity>
        </View>
        <View style={{ gap: 20 }}>
          <CustomButton
            width={"80%"}
            title={"Iniciar sesion"}
            onPress={async () => {
              await handleGetUserInfo();
            }}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>O</Text>
          </View>
          <CustomButton
            width={"80%"}
            title={"Crear cuenta"}
            onPress={async () => {
              navigation.navigate("singIn");
            }}
          />
          <CustomButton
            width={"80%"}
            title={"as"}
            onPress={async () => {
              handleGetUserInfo();
            }}
          />
        </View>
      </View>
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
