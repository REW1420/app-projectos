import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppContext from "../../../utils/context/AppContext";
import { useFocusEffect } from "@react-navigation/native";
const NewProjectCard = ({ percentage, projectName, total, missingTotal }) => {
  //app context
  const { dispatch, state } = React.useContext(AppContext);
  const [title, setTitle] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [deadLine, setDeadLine] = useState();
  const [startedDate, setStartedDate] = useState(state.deadLine);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setDeadLine(formatDate(new Date()));
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        console.log("data cleared");
        dispatch({
          type: "SET_PROJECT_DEADLINE",
          payload: null,
        });
        dispatch({ type: "SET_PROJECT_TITLE", payload: null });
      };
    }, [])
  );

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
    const newDeadLine = `${year}/${month + 1}/${day}`;

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
    toggleDatePicker();
  };
  const handleChangeText = (newText) => {
    setTitle(newText);

    dispatch({ type: "SET_PROJECT_TITLE", payload: newText });
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
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity onPress={toggleDatePicker}>
                    <Text>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={confirmIOSDate}>
                    <Text>Aceptar</Text>
                  </TouchableOpacity>
                </View>
              )}
              <Text style={styles.label}>Fehca esperada de finalización</Text>

              <Pressable
                onPress={() => {
                  toggleDatePicker();
                }}
              >
                {!showPicker && (
                  <TextInput
                    style={styles.input}
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
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
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
  IOSDatePicker: {
    height: 120,
    marginTop: -10,
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
export default NewProjectCard;
