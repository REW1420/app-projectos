import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import CustomButton from "../Buttons/CustomButton";
import CustomTextInput from "../Inputs/CustomTextInput";
import COLORS from "../../../utils/COLORS";
import ProjectController from "../../../utils/Networking/ProjectController";

const ProjecNetworking = new ProjectController();
export default function NewMisionModal({
  isModalVisible,
  back,
  title,
  id,
  projectID,
}) {
  const [visible, setVisible] = React.useState(isModalVisible);
  const [misionName, setMisionName] = React.useState("");
  const [description, setDescription] = React.useState("");
  
  const handleChangeText = (text, state) => {
    state(text);
    console.log(data);
  };
  const [newID, setNewID] = React.useState("");
  React.useEffect(() => {
    const _int = parseInt(id);
    const _results = _int + 1;
    setNewID(_results);
  }, []);
  const data = {
    id: newID,
    misionName: misionName,
    description: description,
    isFinished: false,
    status: "Pendiente",
  };
  const handleAddMision = async () => {
    const res = await ProjecNetworking.updateAddNewMision(data, projectID);
    console.log("res", res);
    back();
  };
  return (
    <Modal
      isVisible={isModalVisible}
      onBackButtonPress={back}
      onBackdropPress={back}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{title}</Text>

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
          <CustomButton title={"Cancelar"} onPress={back} />
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
    marginTop: 20,
    marginBottom: 15,
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
