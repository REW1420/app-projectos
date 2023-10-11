import { StyleSheet, View, TextInput } from "react-native";
import React, { useState } from "react";
import COLORS from "../../../utils/COLORS";
export default function CustomTextInputForm({
  placeholder,
  secureTextEntry,
  onChangeText,
  value,
  isValid,
  autoCapitalize = "none",
}) {
  const [inputValue, setInputValue] = useState(value); // hook for the input value

  const handleTextChange = (text) => {
    setInputValue(text); //update the hook
    if (onChangeText) {
      onChangeText(text); // call the funtion from prop
    }
  };
  let border_color = "black";
  switch (isValid) {
    case true:
      border_color = "green";

      break;
    case false:
      border_color = "red";
      break;
    case undefined:
      border_color = "black";
    default:
      border_color = "black";
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={{ borderColor: border_color, ...styles.inputTxt }}
          autoCapitalize={autoCapitalize}
          placeholderTextColor={COLORS.text_color}
          value={inputValue}
          onChangeText={handleTextChange}
          multiline={true}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  inputTxt: {
    backgroundColor: COLORS.input_background,
    padding: 15,
    margin: 15,
    borderRadius: 50,
    borderWidth: 1.5,
    width: "80%",
    color: COLORS.text_color,
    textAlign: "center",

    alignSelf: "center",
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
