import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
export default function CustomSearchbar({ PlaceHolder, onChange, query }) {
  return (
    <View style={{ marginTop: 25 }}>
      <SearchBar
        placeholder={PlaceHolder}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        value={query}
        onChangeText={(value) => onChange(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    width: "auto",
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    height: 40,
  },
  input: {
    color: "black",
  },
});
