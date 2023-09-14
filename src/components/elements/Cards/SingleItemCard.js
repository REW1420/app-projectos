import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function SingleItemCard({ tittle, content }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>
        {tittle}: {content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1D1A39",
    width: "30%",
    borderRadius: 100,
    height: 25,
  },
});
