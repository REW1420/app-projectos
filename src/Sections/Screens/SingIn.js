import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../utils/COLORS";

import CustomTextInputForm from "../../components/elements/Inputs/CustomTextInputForm";
import CustomButton from "../../components/elements/Buttons/CustomButton";
import AppContext from "../../utils/context/AppContext";
import UserController from "../../utils/Networking/UserController";
import Validation from "../../utils/Validations/Validation";
import { useToast } from "react-native-toast-notifications";
import ToastService from "../../components/elements/Toast/ToastService";
import PaperTextInput from "../../components/elements/Inputs/PaperTextInput";

const validations = new Validation();
export default function SingIn() {
  const toast = useToast();
  const userNetworking = new UserController(toast);
  const toastService = new ToastService(toast);
  const { state, dispatch } = React.useContext(AppContext);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    occupation: "",
    name: "",
    confirmPassword: "",
  });
  const [isFormDataValid, setIsFormDataValid] = useState({
    email: {},
    password: {},
    occupation: false,
    name: false,
    confirmPassword: {},
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigation = useNavigation();

  async function handleGetUserInfo() {
    const data = userNetworking.getUserInfo("6516094b91620132c9e11d81");
    dispatch({ type: "SET_USER_INFO", payload: data });
  }

  //hooks for validation

  const [isEmailValid, setEmailValid] = useState();
  const [isPasswordValid, setPasswordValid] = useState();
  const [isNameValid, setNameValid] = useState();
  const [isOccupationValid, setOccupationValid] = useState();

  async function handleValidate() {
    try {
      const [emailIsValid, passwordIsValid, nameIsValid, occupationIsValid] =
        await Promise.all([
          validations.validateEmail(formData.email),
          validations.validatePassword(
            formData.password,
            formData.confirmPassword
          ),
          validations.validateName(formData.name),
          validations.validateNotNull(formData.occupation),
        ]);

      setEmailValid(emailIsValid);
      setPasswordValid(passwordIsValid);
      setNameValid(nameIsValid);
      setOccupationValid(occupationIsValid);
    } catch (error) {
      console.error("Error en la validación:", error);
    }
  }

  async function handleIsFormOK() {
    const { name, email, occupation, confirmPassword, password } = formData;

    if (!name || !email || !occupation || !confirmPassword || !password) {
      toastService.CustomToast("Los datos no pueden estar vacíos", "warning");
      return;
    }

    await handleValidate();

    const validations = [
      isEmailValid.status,
      isNameValid.status,
      isOccupationValid.status,
      isPasswordValid.status,
    ];

    if (
      validations.every((status) => status !== undefined && status === true)
    ) {
      try {
        const newUser = {
          name,
          email,
          occupation,
          password: confirmPassword,
        };

        const res = await userNetworking.createUser(newUser);
        res && navigation.navigate("Login");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No hay datos o algunos datos no son válidos");
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Registrarse
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Ingresa tus datos para crear una cuenta
        </Text>
        <View style={{ marginVertical: 20 }}>
          <PaperTextInput
            autoCapitalize={"none"}
            keyboardType={"email-address"}
            iconName="mail-outline"
            label="Correo"
            placeholder="Ingresa tu correo personal"
            OnChangeText={(text) => {
              handleChange("email", text);
            }}
            error={isEmailValid !== undefined ? isEmailValid.message : null}
          />

          <PaperTextInput
            autoCapitalize={"words"}
            iconName="body-outline"
            label="Nombre"
            placeholder="Ingresa tu nombre completo"
            OnChangeText={(text) => {
              handleChange("name", text);
            }}
            error={isNameValid !== undefined ? isNameValid.message : null}
          />
          <PaperTextInput
            iconName="body-outline"
            label="Ocupación"
            placeholder="Ingresa tu ocupación (ejm programador jr)"
            OnChangeText={(text) => {
              handleChange("occupation", text);
            }}
            autoCapitalize={"sentences"}
            error={
              isOccupationValid !== undefined ? isOccupationValid.message : null
            }
          />
          <PaperTextInput
            iconName={"lock-closed-outline"}
            label="Contraseña"
            placeholder="Debe contener mayusculas y numeros"
            password
            OnChangeText={(text) => {
              handleChange("password", text);
            }}
            autoCapitalize={"none"}
            error={
              isPasswordValid !== undefined ? isPasswordValid.message : null
            }
          />
          <PaperTextInput
            iconName={"lock-closed-outline"}
            label="Confirmar contraseña"
            placeholder="Deben coincidir la contraseña"
            password
            error={
              isPasswordValid !== undefined ? isPasswordValid.message : null
            }
            OnChangeText={(text) => {
              handleChange("confirmPassword", text);
            }}
            autoCapitalize={"none"}
          />
          <CustomButton
            title={"Crear cuenta"}
            width={"100%"}
            onPress={async () => {
              await handleIsFormOK();
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
            <Text style={{ fontSize: 15 }}>Si ya tiene una cuenta, </Text>
            <Pressable
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Inicie sesion
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
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
