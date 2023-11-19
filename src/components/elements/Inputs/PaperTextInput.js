import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../../../utils/COLORS";

export default function PaperTextInput({
  label,
  iconName,
  error,
  password,
  OnChangeText = () => {},
  onFocus = () => {},
  keyboardType,
  autoCapitalize,
  ...props
}) {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.black,
            alignItems: "center",
          },
        ]}
      >
        <Icon
          name={iconName}
          style={{ color: COLORS.darkBlue, fontSize: 22, marginRight: 10 }}
        />
        <TextInput
          onChangeText={OnChangeText}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ color: COLORS.black, flex: 1 }}
          {...props}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={{ color: COLORS.darkBlue, fontSize: 22 }}
          />
        )}
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 15,
    color: COLORS.black,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.primary_backgroud,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
});
