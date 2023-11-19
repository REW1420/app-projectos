import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import AppContext from "../../../utils/context/AppContext";
import CustomButton from "../Buttons/CustomButton";
import ProjectController from "../../../utils/Networking/ProjectController";
import ToastService from "../Toast/ToastService";
import { useToast } from "react-native-toast-notifications";
import Validation from "../../../utils/Validations/Validation";
import AuthController from "../../../utils/Networking/AuthController";
import PaperTextInput from "../Inputs/PaperTextInput";
export default function ResetPasswordModal({ isVisible, toggleModal }) {
  const toas = useToast();
  const projectNetworking = new ProjectController(toas);
  const authNetworking = new AuthController(toas);
  const validation = new Validation();
  const toastService = new ToastService(toas);
  const [email, setEmail] = React.useState("");
  const [res, setRes] = React.useState(undefined);
  const handleChangeText = (text) => {
    setEmail(text);
  };
  const handleSendEmail = async () => {
    try {
      const res = await validation.validateEmail(email);

      if (res !== undefined && res.status) {
        authNetworking.sendOneTimeResetPassword(email);
        toggleModal();
        setEmail("");
      }

      setRes(res);
    } catch (error) {
      console.error("Error during email validation:", error);
    }
  };

  let inputColor = "gray";
  if (res === undefined) {
    inputColor = "gray";
  } else {
    inputColor = res.status ? "green" : "red";
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin: 15,
          }}
        >
          <Text style={{ fontSize: 25 }}>Restaurar contraseña</Text>
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <PaperTextInput
            iconName="mail-outline"
            label="Correo"
            placeholder="Ingresa tu correo asociado"
            autoCapitalize={"none"}
            keyboardType={"email-address"}
            OnChangeText={(text) => handleChangeText(text)}
            error={res !== undefined ? res.message : null}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <CustomButton
            title={"Cancelar"}
            onPress={() => {
              setEmail("");
              setRes(undefined);
              toggleModal();
            }}
          />
          <CustomButton title={"Enviar correo"} onPress={handleSendEmail} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    height: 50,

    fontSize: 14,
    fontWeight: "500",
    borderRadius: 50,
    borderWidth: 1.5,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});
