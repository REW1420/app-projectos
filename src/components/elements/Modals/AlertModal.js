import { View, Text, Button } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import CustomButton from "../Buttons/CustomButton";
export default function AlertModal({
  isModalVisible,
  back,
  handleDelete,
  title,
}) {
  const [visible, setVisible] = React.useState(isModalVisible);
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
          height: 100,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 15,
          }}
        >
          <Text>{title}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <CustomButton title={"Cancelar"} onPress={back} />
          <CustomButton title={"Aceptar"} onPress={handleDelete} />
        </View>
      </View>
    </Modal>
  );
}
