import { View, Text, Button } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import CustomButton from "../Buttons/CustomButton";
import CustomPasswordInput from "../Inputs/CustomPasswordInput";
export default function UpdatePasswordModal({ isModalVisible, back }) {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackButtonPress={back}
      onBackdropPress={back}
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
            marginVertical: 15,
          }}
        >
          <Text style={{ fontSize: 30 }}>Cambiar contraseña</Text>
        </View>

        <CustomPasswordInput Placeholder={"Contraseña actual"} />
        <CustomPasswordInput Placeholder={"Contraseña nueva"} />

        <View style={{ flexDirection: "row", marginVertical: 15 }}>
          <CustomButton title={"Cancelar"} onPress={back} />
          <CustomButton title={"Aceptar"} onPress={() => console.log("a")} />
        </View>
      </View>
    </Modal>
  );
}
