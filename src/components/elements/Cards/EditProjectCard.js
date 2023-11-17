import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import AppContext from "../../../utils/context/AppContext";

const EditProjectCard = ({ projectName, DATE }) => {
  //app context
  const { dispatch } = React.useContext(AppContext);
  const [title, setTitle] = useState(projectName);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [deadLine, setDeadLine] = useState(DATE);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();
    setSelectedStartDate(`${date}/${month}/${year}`);
    dispatch({ type: "SET_NEW_PROJECT_TITLE", payload: title });
  }, []);

  const handleChangeText = (newText) => {
    setTitle(newText);

    dispatch({ type: "SET_NEW_PROJECT_TITLE", payload: newText });
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };
  const onChangeDate = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setDeadLine(formatDate(currentDate));
        dispatch({
          type: "SET_PROJECT_DEADLINE",
          payload: formatDateForDB(currentDate),
        });
        console.log(formatDateForDB(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };
  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    //month = month < 9 ? `0${month + 1}` : month + 1; // Increment month by 1 and add leading zero if necessary
    day = day < 10 ? `0${day}` : day; // Add leading zero if necessary

    const MONTHS = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    return `${day} - ${MONTHS[month]} - ${year}`;
  };
  const formatDateForDB = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${year}/${month}/${day}`;
  };

  const confirmIOSDate = () => {
    setDeadLine(formatDate(date));
    dispatch({
      type: "SET_PROJECT_DEADLINE",
      payload: formatDateForDB(date),
    });
    toggleDatePicker();
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
            <View>
              {showPicker && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onChangeDate}
                  minimumDate={date}
                />
              )}
              {showPicker && Platform.OS === "ios" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TouchableOpacity
                    onPress={toggleDatePicker}
                    style={styles.IOSButton}
                  >
                    <Text>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={confirmIOSDate}
                    style={styles.IOSButton}
                  >
                    <Text>Aceptar</Text>
                  </TouchableOpacity>
                </View>
              )}
              <Text style={styles.label}>Fecha esperada de finalización</Text>

              <Pressable
                onPress={() => {
                  toggleDatePicker();
                }}
              >
                {!showPicker && (
                  <TextInput
                    style={{
                      backgroundColor: "transparent",
                      height: 50,
                      fontSize: 14,
                      fontWeight: "500",
                      borderRadius: 50,
                      borderWidth: 1.5,
                      paddingHorizontal: 20,
                      marginBottom: 20,
                      marginVertical: 15,
                    }}
                    placeholder={deadLine}
                    editable={false}
                    onPressIn={toggleDatePicker}
                  />
                )}
              </Pressable>
            </View>
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
  IOSButton: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    marginVertical: 15,
    padding: 10,
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
