import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../../utils/COLORS";
export default function CustomButton({ title, onPress, width }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ width: width, ...styles.button }}
        onPress={onPress}
      >
        <Text style={styles.button_text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#413B57",
    borderRadius: 20,
    shadowColor: COLORS.secondary_button,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button_text: {
    color: COLORS.button_text,
    fontWeight: "bold",
    fontSize: 16,
  },
});
