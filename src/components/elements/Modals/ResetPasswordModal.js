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
    await validation
      .validateEmail(email)
      .then((res) => {
        setRes(res);
      })
      .then(() => {
        if (res !== undefined) {
          if (res.status) {
            authNetworking.sendOneTimeResetPassword(email);
          }
        }
      });
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

          alignItems: "center",
          justifyContent: "center",
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
          <View
            style={{
              alignItems: "center",
              marginTop: 15,
              flexDirection: "row",
            }}
          >
            <TextInput
              placeholder="Ingrese su correo"
              style={{
                width: 200,
                height: 40,
                borderColor: inputColor,
                borderWidth: 1,
                padding: 10,
                borderRadius: 15,
              }}
              keyboardType="email-address"
              value={email}
              autoCapitalize="none"
              onChangeText={(text) => handleChangeText(text)}
            />
          </View>

          <View style={{ marginVertical: 15 }}>
            {res !== undefined ? (
              !res.status ? (
                <Text style={{ color: "red" }}>{res.message}</Text>
              ) : null
            ) : null}
          </View>

          <View style={{ flexDirection: "row" }}>
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
