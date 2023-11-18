import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import CustomButton from "../Buttons/CustomButton";

import COLORS from "../../../utils/COLORS";
import ProjectController from "../../../utils/Networking/ProjectController";

import { useToast } from "react-native-toast-notifications";
import Validation from "../../../utils/Validations/Validation";
export default function NewMisionModal({
  isModalVisible,
  back,
  title,
  id,
  projectID,
}) {
  const [visible, setVisible] = React.useState(isModalVisible);
  const [hasError, setHasError] = React.useState(false);
  const validation = new Validation();
  const [misionName, setMisionName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const toast = useToast();
  const ProjecNetworking = new ProjectController(toast);
  const handleChangeText = (text, state) => {
    state(text);
    console.log(data);
  };
  const [newID, setNewID] = React.useState("");

  const data = {
    id: parseInt(id) + 1,
    misionName: misionName,
    description: description,
    isFinished: false,
    status: "Pendiente",
  };
  const handleAddMision = async () => {
    if (!validation.validateNotNullArray([data.misionName, data.description])) {
      setHasError(true);
    } else {
      await ProjecNetworking.updateAddNewMision(data, projectID);
      setHasError(false);
      handleClearData();
      back();
    }
  };

  function handleClearData() {
    setDescription("");
    setMisionName("");
  }

  return (
    <Modal
      isVisible={isModalVisible}
      onBackButtonPress={back}
      onBackdropPress={back}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{title}</Text>
        {hasError && (
          <View>
            <Text style={{ color: "red" }}>
              Los campos no pueden estar vacios
            </Text>
          </View>
        )}
        <TextInput
          placeholder="Titulo"
          style={styles.inputTxt}
          autoCapitalize="none"
          placeholderTextColor={COLORS.text_color}
          multiline={true}
          onChangeText={(text) => handleChangeText(text, setMisionName)}
        />

        <TextInput
          placeholder="Descripcion"
          style={styles.inputTxt}
          autoCapitalize="none"
          placeholderTextColor={COLORS.text_color}
          multiline={true}
          onChangeText={(text) => handleChangeText(text, setDescription)}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            title={"Cancelar"}
            onPress={() => {
              handleClearData();
              back();
            }}
          />
          <CustomButton title={"Aceptar"} onPress={handleAddMision} />
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 350,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  inputTxt: {
    backgroundColor: COLORS.input_background,
    padding: 15,
    margin: 15,
    borderRadius: 50,
    borderWidth: 1.5,
    width: "80%",
    color: COLORS.text_color,
    textAlign: "center",
    borderColor: COLORS.inputBorderColor,
    alignSelf: "center",
  },
});
