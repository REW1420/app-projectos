import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import CustomProgressCircle from "../Particles/CustomProgressCircle";
import COLORS from "../../../utils/COLORS";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import Modal from "react-native-modal";
import AppContext from "../../../utils/context/AppContext";

const EditProjectCard = ({ projectName, date }) => {
  //app context
  const { dispatch } = React.useContext(AppContext);
  const [title, setTitle] = useState(projectName);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState(date);

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();
    setSelectedStartDate(`${date}/${month}/${year}`);
    dispatch({ type: "SET_NEW_PROJECT_TITLE", payload: title });
  }, []);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  const handleChangeStartDate = (propDate) => {
    setStartedDate(propDate);
  };
  const today = new Date();

  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "dd/MM/yyyy"
  );
  const handleChangeText = (newText) => {
    setTitle(newText);

    dispatch({ type: "SET_NEW_PROJECT_TITLE", payload: newText });
  };
  return (
    <>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="Nombra tu proyecto..."
                style={Inputstyles.inputTxt}
                keyboardType="default"
                multiline={true}
                onChangeText={handleChangeText}
                value={title}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <Text style={{ fontSize: 15 }}>
                Fecha esperada de finalización:
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                {selectedStartDate}
              </Text>
            </View>

            <DatePicker
              mode="calendar"
              onDateChanged={handleChangeStartDate}
              minimumDate={startDate}
              selected={startedDate}
              onSelectedChange={(date) => setSelectedStartDate(date)}
              style={{
                borderRadius: 15,
                marginVertical: 15,
              }}
              options={{
                borderColor: "rgba(122, 146, 165, 0.1)",
                mainColor: "black",
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 25,
    backgroundColor: "#ECDFE9",
    margin: 20,
  },
  percentageText: {
    fontSize: 32 * 2,
    fontWeight: "bold",
    color: "black",
  },
  projectName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  daysRemaining: {
    backgroundColor: "black",
    borderRadius: 15, // Esto hace que el fondo sea redondo
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    marginLeft: 5,
  },
  daysRemainingText: {
    color: "white",
  },
  modalBackdround: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
const Inputstyles = StyleSheet.create({
  inputTxt: {
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: 15,
    fontSize: 30,
  },

  hint_text: {
    color: "red",

    fontSize: 25,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
});
export default EditProjectCard;
