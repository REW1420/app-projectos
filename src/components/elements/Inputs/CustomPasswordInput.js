import { StyleSheet, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import COLORS from "../../../utils/COLORS";

export default function CustomPasswordInput({
  Placeholder,
  _onChangeText,
  secure,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={Placeholder}
        secureTextEntry={secure}
        placeholderTextColor={COLORS.text_color}
        onChangeText={_onChangeText}
        style={styles.inputTxt}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  inputTxt: {
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
  inputContainer: {
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
