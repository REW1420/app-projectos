import { StyleSheet, View, TextInput } from "react-native";
import React, { useState } from "react";
import COLORS from "../../../utils/COLORS";
export default function CustomTextInput({
  placeholder,
  secureTextEntry,
  onChangeText,
}) {
  const [inputValue, setInputValue] = useState(''); // hook for the input value

  const handleTextChange = (text) => {
    setInputValue(text); //update the hook
    if (onChangeText) {
      onChangeText(text); // call the funtion from prop
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={styles.inputTxt}
          autoCapitalize="none"
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
    borderColor: COLORS.input_background,
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
