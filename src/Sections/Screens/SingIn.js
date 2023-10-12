import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
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

const validations = new Validation();
export default function SingIn() {
  const toast = useToast();
  const userNetworking = new UserController(toast);
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
    const emailPromise = validations.validateEmail(formData.email);
    const passwordPromise = validations.validatePassword(
      formData.password,
      formData.confirmPassword
    );
    const namePromise = validations.validateName(formData.email);
    const notNullPromise = validations.validateNotNull(formData.occupation);

    Promise.all([emailPromise, passwordPromise, namePromise, notNullPromise])
      .then(
        ([emailIsValid, passwordIsValid, nameIsValid, occupationIsValid]) => {
          setEmailValid(emailIsValid);
          setPasswordValid(passwordIsValid);
          setNameValid(nameIsValid);
          setOccupationValid(occupationIsValid);
        }
      )
      .catch((error) => {
        console.error("Error en la validación:", error);
      });
  }

  async function handleIsFormOK() {
    const newUser = {
      name: formData.name,
      email: formData.email,
      occupation: formData.occupation,
      password: formData.confirmPassword,
    };
    await handleValidate();
    if (
      isEmailValid.status === true &&
      isNameValid.status === true &&
      isOccupationValid.status === true &&
      isPasswordValid.status === true
    ) {
      try {
        await userNetworking.createUser(newUser);
      } catch (error) {
        throw error;
      } finally {
        navigation.navigate("Login");
      }
    } else {
      return;
    }
  }
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

            height: 100,
          }}
        >
          <Text style={styles.hint_text}>Crea una nueva cuenta</Text>
        </View>
        <CustomTextInputForm
          placeholder={"Nombre"}
          autoCapitalize="words"
          isValid={isNameValid === undefined ? null : isNameValid.status}
          secureTextEntry={false}
          onChangeText={(text) => {
            handleChange("name", text);
          }}
        />
        {isNameValid === undefined ? null : <Text>{isNameValid.message}</Text>}
        <CustomTextInputForm
          placeholder={"Correo"}
          secureTextEntry={true}
          isValid={isEmailValid === undefined ? null : isEmailValid.status}
          onChangeText={(text) => {
            handleChange("email", text);
          }}
        />
        {isEmailValid === undefined ? null : (
          <Text>{isEmailValid.message}</Text>
        )}
        <CustomTextInputForm
          placeholder={"Ocupacion"}
          secureTextEntry={true}
          isValid={
            isOccupationValid === undefined ? null : isOccupationValid.status
          }
          autoCapitalize="sentences"
          onChangeText={(text) => {
            handleChange("occupation", text);
          }}
        />
        {isOccupationValid === undefined ? null : (
          <Text>{isOccupationValid.message}</Text>
        )}
        <CustomTextInputForm
          placeholder={"Contraseña"}
          isValid={
            isPasswordValid === undefined ? null : isPasswordValid.status
          }
          secureTextEntry={true}
          onChangeText={(text) => {
            handleChange("password", text);
          }}
        />
        {isPasswordValid === undefined ? null : (
          <Text>{isPasswordValid.message}</Text>
        )}
        <CustomTextInputForm
          placeholder={"Confirmar contraseña"}
          isValid={
            isPasswordValid === undefined ? null : isPasswordValid.status
          }
          secureTextEntry={true}
          onChangeText={(text) => {
            handleChange("confirmPassword", text);
          }}
        />

        {isPasswordValid === undefined ? null : (
          <Text>{isPasswordValid.message}</Text>
        )}
        <View style={{ gap: 20, marginVertical: 10 }}>
          <CustomButton
            title={"Crear nueva cuenta"}
            width={"80%"}
            onPress={async () => {
              await handleIsFormOK();
            }}
          />

          <CustomButton
            title={"Cancelar"}
            width={"80%"}
            onPress={async () => {
              navigation.navigate("Login");
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
